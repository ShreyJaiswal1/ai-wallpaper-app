import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { loadGallery, saveGallery, generateImage } from '../utils/imageService';

const { width } = Dimensions.get('window');

export default function Gallery() {
  const router = useRouter();
  type WallpaperImage = {
    id: string;
    url: string;
    prompt: string;
    timestamp: string;
  };

  const [gallery, setGallery] = useState<WallpaperImage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadGalleryData();
    }, [])
  );

  const loadGalleryData = async () => {
    const data = await loadGallery();
    setGallery(data);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    setIsGenerating(true);

    try {
      const newImage = await generateImage(prompt);

      if (newImage) {
        // Add to gallery (limit to 20)
        const updatedGallery = [newImage, ...gallery].slice(0, 20);
        setGallery(updatedGallery);
        await saveGallery(updatedGallery);

        // Navigate to preview
        router.push({
          pathname: '/preview',
          params: { imageUrl: newImage.url, prompt: newImage.prompt },
        });
      }
    } catch (error) {
      console.error('Error generating image:', error);
      Alert.alert('Error', 'Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
      setPrompt('');
    }
  };

  const handleImagePress = (image: any) => {
    router.push({
      pathname: '/preview',
      params: { imageUrl: image.url, prompt: image.prompt },
    });
  };

  const handleDeleteImage = (imageId: string) => {
    Alert.alert('Delete Image', 'Are you sure you want to delete this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updatedGallery = gallery.filter(
            (img: any) => img.id !== imageId
          );
          setGallery(updatedGallery);
          await saveGallery(updatedGallery);
        },
      },
    ]);
  };

  if (isGenerating) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#1a1a1a',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <StatusBar barStyle='light-content' />
        <View
          style={{
            width: width * 0.8,
            height: (width * 0.8 * 19) / 6,
            backgroundColor: '#2a2a2a',
            borderRadius: 20,
            marginBottom: 30,
          }}
        >
          <ActivityIndicator size='large' color='#FF6B35' style={{ flex: 1 }} />
        </View>
        <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>
          Creating your wallpaper...
        </Text>
        <Text style={{ color: '#999', fontSize: 14, textAlign: 'center' }}>
          This may take a few moments
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <StatusBar barStyle='light-content' />

      {/* Header */}
      <View style={{ padding: 20, paddingTop: 60 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff' }}>
          My Gallery
        </Text>
        <Text style={{ fontSize: 14, color: '#999', marginTop: 5 }}>
          {gallery.length} / 20 wallpapers
        </Text>
      </View>

      {/* Prompt Input */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#2a2a2a',
            borderRadius: 12,
            padding: 4,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              color: '#fff',
              fontSize: 16,
              padding: 12,
            }}
            placeholder='Describe your wallpaper...'
            placeholderTextColor='#666'
            value={prompt}
            onChangeText={setPrompt}
            onSubmitEditing={handleGenerate}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#FF6B35',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 10,
              justifyContent: 'center',
            }}
            onPress={handleGenerate}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
              Generate
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Gallery - Masonry Layout */}
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 10,
          }}
        >
          {gallery.length === 0 ? (
            <View
              style={{
                width: '100%',
                padding: 40,
                alignItems: 'center',
              }}
            >
              <Text
                style={{ color: '#666', fontSize: 16, textAlign: 'center' }}
              >
                No wallpapers yet.{'\n'}Create your first one!
              </Text>
            </View>
          ) : (
            gallery.map((image: any, index: number) => {
              const isLeft = index % 2 === 0;
              const height = 200 + (index % 3) * 50;

              return (
                <TouchableOpacity
                  key={image.id}
                  style={{
                    width: '48%',
                    marginLeft: isLeft ? '1%' : '2%',
                    marginRight: isLeft ? 0 : '1%',
                    marginBottom: 10,
                  }}
                  onPress={() => handleImagePress(image)}
                  onLongPress={() => handleDeleteImage(image.id)}
                >
                  <Image
                    source={{ uri: image.url }}
                    style={{
                      width: '100%',
                      height: height,
                      borderRadius: 12,
                      backgroundColor: '#2a2a2a',
                    }}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
