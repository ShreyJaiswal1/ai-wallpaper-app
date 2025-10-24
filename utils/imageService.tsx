import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system/legacy';

const STORAGE_KEY = '@wallpaper_gallery';
const A4F_API_KEY = 'YOUR_A4F_API_KEY_HERE'; // Replace with your actual API key

export interface WallpaperImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
}

// Load gallery from AsyncStorage
export const loadGallery = async (): Promise<WallpaperImage[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error) {
    console.error('Error loading gallery:', error);
    return [];
  }
};

// Save gallery to AsyncStorage
export const saveGallery = async (gallery: WallpaperImage[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gallery));
  } catch (error) {
    console.error('Error saving gallery:', error);
  }
};

// Generate image using A4F API
export const generateImage = async (
  prompt: string
): Promise<WallpaperImage | null> => {
  try {
    const response = await fetch('https://api.a4f.co/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${A4F_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'provider-4/imagen-4',
        prompt: prompt,
        n: 1,
        size: '1024x1792', // 6:19 aspect ratio approximation
      }),
    });

    const data = await response.json();

    if (data.data && data.data[0] && data.data[0].url) {
      const newImage: WallpaperImage = {
        id: Date.now().toString(),
        url: data.data[0].url,
        prompt: prompt,
        timestamp: new Date().toISOString(),
      };
      return newImage;
    }

    return null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
};

// Save image to device gallery
export const saveToDeviceGallery = async (
  imageUrl: string
): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync(true);
    if (status !== 'granted') {
      console.error('Media library permission not granted');
      return false;
    }

    const fileUri =
      FileSystem.documentDirectory + `wallpaper_${Date.now()}.jpg`;
    const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri);

    await MediaLibrary.createAssetAsync(downloadResult.uri);
    return true;
  } catch (error) {
    console.error('Error saving to gallery:', error);
    return false;
  }
};
