import { View, Text, Image, TouchableOpacity, StatusBar, Dimensions, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { saveToDeviceGallery } from '../utils/imageService';

const { width } = Dimensions.get('window');

export default function Preview() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { imageUrl, prompt } = params;

  const handleSave = async () => {
    if (imageUrl) {
      const success = await saveToDeviceGallery(imageUrl as string);
      if (success) {
        Alert.alert('Success', 'Wallpaper saved to your gallery!');
      } else {
        Alert.alert('Error', 'Failed to save image');
      }
    }
  };

  if (!imageUrl) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>No image data</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <StatusBar barStyle="light-content" />
      
      {/* Image Preview */}
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Image
          source={{ uri: imageUrl as string }}
          style={{
            width: width * 0.9,
            height: (width * 0.9 * 19) / 6,
            borderRadius: 20,
            alignSelf: 'center',
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            color: '#999',
            fontSize: 14,
            textAlign: 'center',
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          {prompt}
        </Text>
      </View>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#2a2a2a',
            padding: 18,
            borderRadius: 12,
            alignItems: 'center',
          }}
          onPress={() => router.back()}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
            Back to Gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#FF6B35',
            padding: 18,
            borderRadius: 12,
            alignItems: 'center',
          }}
          onPress={handleSave}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
            Save to Device
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}