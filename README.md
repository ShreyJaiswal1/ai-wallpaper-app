# AI Wallpaper App 🎨

A beautiful React Native wallpaper generator app using AI, built with Expo Router and TypeScript.

## Features ✨

- 🎨 AI-powered wallpaper generation using A4F API
- 📱 Beautiful splash screen with gradient design
- 🖼️ Masonry layout gallery view
- 💾 Persistent local storage (up to 20 wallpapers)
- ⬇️ Save wallpapers directly to device camera roll
- 🔄 Loading skeleton during generation
- 📐 Optimized 6:19 aspect ratio for phone screens
- 🗑️ Long-press to delete wallpapers
- 🚀 Expo Router for file-based navigation
- 📦 TypeScript for type safety

## Project Structure 📁

```
ai-wallpaper-app/
├── app/
│   ├── _layout.tsx        # Root layout with navigation
│   ├── index.tsx          # Splash screen
│   ├── gallery.tsx        # Main gallery view
│   └── preview.tsx        # Image preview & save
├── utils/
│   └── imageService.ts    # API calls & storage logic
├── constants/
│   └── Colors.ts          # Color palette
├── assets/                # Images and icons
├── components/            # Reusable components (future)
├── hooks/                 # Custom hooks (future)
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
└── README.md            # This file
```

## Setup Instructions 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ai-wallpaper-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add your A4F API Key:**
   - Open `utils/imageService.ts`
   - Replace `YOUR_A4F_API_KEY_HERE` with your actual API key

4. **Start the development server:**
   ```bash
   npx expo start
   ```

5. **Run on your device:**
   - Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - Or press `a` for Android emulator or `i` for iOS simulator

## Navigation Flow 🗺️

```
Splash Screen (/)
    ↓
Gallery (/gallery)
    ↓
Preview (/preview)
```

## File Descriptions 📝

### App Directory

- **`app/_layout.tsx`**: Root layout that sets up Expo Router navigation, configures screen options, and requests permissions.

- **`app/index.tsx`**: Splash screen with animated gradient that auto-navigates to gallery after 3 seconds.

- **`app/gallery.tsx`**: Main screen showing:
  - Gallery counter (X/20 wallpapers)
  - Prompt input with generate button
  - Masonry grid of generated wallpapers
  - Loading skeleton during generation

- **`app/preview.tsx`**: Full-screen image preview with:
  - Large image display
  - Prompt caption
  - "Back to Gallery" button
  - "Save to Device" button

### Utils

- **`utils/imageService.ts`**: Core business logic:
  - `loadGallery()`: Fetches stored images from AsyncStorage
  - `saveGallery()`: Persists gallery to AsyncStorage
  - `generateImage()`: Calls A4F API to generate wallpapers
  - `saveToDeviceGallery()`: Downloads and saves images to camera roll

### Constants

- **`constants/Colors.ts`**: Centralized color palette for consistent theming

## Key Technologies 🔧

- **Expo Router**: File-based routing system
- **TypeScript**: Type-safe development
- **AsyncStorage**: Local data persistence
- **Expo Media Library**: Save images to device
- **Expo File System**: Download remote images
- **Linear Gradient**: Beautiful gradient backgrounds

## API Integration 🔌

The app uses the A4F API for image generation:

```typescript
POST https://api.a4f.co/v1/images/generations
{
  "model": "provider-4/imagen-4",
  "prompt": "your prompt here",
  "n": 1,
  "size": "1024x1792"
}
```

## Storage Schema 💾

Gallery data is stored in AsyncStorage under key `@wallpaper_gallery`:

```typescript
interface WallpaperImage {
  id: string;           // Timestamp-based unique ID
  url: string;          // Image URL from A4F API
  prompt: string;       // User's original prompt
  timestamp: string;    // ISO timestamp
}
```

## Permissions 📱

### iOS
- **Photo Library Access**: Required to save wallpapers
- Automatically requested on app launch

### Android
- **WRITE_EXTERNAL_STORAGE**: Save images to device
- **READ_EXTERNAL_STORAGE**: Access saved images
- **READ_MEDIA_IMAGES**: Android 13+ media access

## Customization 🎨

### Update Colors
Edit `constants/Colors.ts`:
```typescript
export const Colors = {
  primary: '#FF6B35',      // Orange accent
  background: '#1a1a1a',   // Dark background
  surface: '#2a2a2a',      // Card background
  // ...
};
```

### Change Image Limit
In `app/gallery.tsx`, modify:
```typescript
const updatedGallery = [newImage, ...gallery].slice(0, 20); // Change 20 to your limit
```

### Adjust Aspect Ratio
In `utils/imageService.ts`, update the size parameter:
```typescript
size: '1024x1792', // Current: ~6:19 ratio
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements 🚀

- [ ] Backend database integration
- [ ] User authentication & cloud sync
- [ ] Unlimited storage
- [ ] Categories & tags
- [ ] Share to social media
- [ ] Favorites system
- [ ] Image editing capabilities
- [ ] Multiple aspect ratios
- [ ] Style presets

## Troubleshooting 🔧

**"Module not found" errors**
```bash
npm install
npx expo start -c  # Clear cache
```

**"Failed to generate image"**
- Verify API key in `utils/imageService.ts`
- Check internet connection
- Verify API quota/limits

**Permission issues**
- Grant permissions in device settings
- Reinstall app if permissions were denied

**TypeScript errors**
```bash
npm run tsc  # Check for type errors
```

## Building for Production 📦

### Using EAS Build

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Configure EAS:**
   ```bash
   eas build:configure
   ```

3. **Build for iOS:**
   ```bash
   eas build --platform ios
   ```

4. **Build for Android:**
   ```bash
   eas build --platform android
   ```

## License 📄

MIT License - Feel free to use this project for learning and collaboration!

## Support 💬

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Screenshots 📸

*Add your app screenshots here once deployed!*

---

**Made with ❤️ using React Native, Expo Router & TypeScript**