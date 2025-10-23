import { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/gallery');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient
      colors={['#FF6B35', '#F7931E', '#FF4500']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <StatusBar barStyle='light-content' />
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: 'rgba(255,255,255,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <Text style={{ fontSize: 48, fontWeight: 'bold', color: '#fff' }}>
            AI
          </Text>
        </View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom: 10,
          }}
        >
          AI Wallpapers
        </Text>
        <Text style={{ fontSize: 16, color: '#fff', opacity: 0.9 }}>
          Discover the Serenity of the Wild
        </Text>
      </View>
    </LinearGradient>
  );
}
