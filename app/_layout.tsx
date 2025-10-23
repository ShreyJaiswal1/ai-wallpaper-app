import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

export default function RootLayout() {
  useEffect(() => {
    // Request permissions on app start
    MediaLibrary.requestPermissionsAsync();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#1a1a1a' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='gallery' />
      <Stack.Screen name='preview' />
    </Stack>
  );
}
