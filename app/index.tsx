import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Navigate after a delay
    const timer = setTimeout(() => {
      router.replace('/gallery');
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ImageBackground
      source={require('../assets/images/splash.png')} // 👈 place your AI/futuristic art image here
      style={{
        flex: 1,
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      resizeMode='cover'
    >
      <StatusBar barStyle='light-content' />

      {/* Text Container with Blur */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          zIndex: 2,
          alignItems: 'center',
        }}
      >
      </Animated.View>
    </ImageBackground>
  );
}
