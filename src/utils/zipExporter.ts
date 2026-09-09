import JSZip from 'jszip';
import { FLUTTER_PROJECT_FILES } from '../data/flutterCode';
import { Wallpaper } from '../types';

/**
 * Generates and downloads a complete Flutter Dart project as a .zip file
 */
export async function downloadFlutterProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root files
  for (const file of FLUTTER_PROJECT_FILES) {
    zip.file(file.path, file.content);
  }

  // Additional Flutter project files
  zip.file(
    'README.md',
    `# GTA 6 Countdown & Vice City 4K Wallpapers (Flutter Android)

Polished, AMOLED Dark, Material 3 fan application for Android built with Flutter & Dart.

## Quick Start on Android:
1. Ensure Flutter 3.19+ and Android Studio with Android SDK 34 are installed.
2. In this project root, run:
   \`\`\`bash
   flutter pub get
   flutter run -d android
   \`\`\`
3. To build a signed release APK / App Bundle for Google Play:
   \`\`\`bash
   flutter build apk --release
   flutter build appbundle --release
   \`\`\`

## Features:
- 4K UHD & AMOLED Wallpapers with instant wallpaper-manager integration
- Live GTA 6 target launch countdown with animated flip counters
- Vice City Radio & Audio player
- Leaks, News & Trailer 1 4K scene-by-scene analysis
- Edge-to-edge transparent system bars for Android 14+
`
  );

  zip.file(
    'lib/services/wallpaper_state.dart',
    `import 'package:flutter/material.dart';

class WallpaperState extends ChangeNotifier {
  final Set<String> _favoriteIds = {'wp-2', 'wp-5'};

  bool isFavorite(String id) => _favoriteIds.contains(id);

  void toggleFavorite(String id) {
    if (_favoriteIds.contains(id)) {
      _favoriteIds.remove(id);
    } else {
      _favoriteIds.add(id);
    }
    notifyListeners();
  }

  List<dynamic> getFilteredWallpapers(String category) {
    // Sample models matching the 4K asset vault
    return [
      _WpItem('wp-1', 'COASTAL HIGHWAY', '60 FPS LIVE', 'NEON SUNSET', '4K UHD',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAtnOkNmeCsPat9SfhmtBQnBN49RnnJIjjHNfqjGTG7lFj0wpN-LdYV_MGHrckQ0XtJCh-gril-WFB38W7KBmkWImP3DQJluzoCK-BqmEKom-yrl9Y2mNSQ7rJvRPHAzr_4iaD1I4XkRQ9IJLV-I30ZvtuRBOSV2yj0pbHjMCwNLCtuDzap78nVCC8z3lDuBgtBsssVzO0a9tC7YgJoweLzea7oBIV9OzGAwIzMH1BGcqxXGWMmPca8ag',
          _favoriteIds.contains('wp-1')),
      _WpItem('wp-2', 'SUPERCAR DRIFT', 'OCEAN BLVD', 'SUPERCAR', 'HOT',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAVS3OX5gZu2UztB9A-7d-AHj3IYwHdQIAo-RaxlKrYQKsMXEx0Zo4IA6ZHqxXgwodd3VyTuWzAeimappAdOV5tksZKfM2RXeVae4TL1M_J53kd0i9PBg0dKcO4Z3zbL9COpCWO18vS_Kqo9kNEStMhBTj7RfgCGe98gCbpo0RrMlFxpDFjbPovU4gFm5tJG-eAYR6YsmIUws6shJlVGmZ9mh1SjZhxfAOsi93_AjSf9L6HNwY34gISnw',
          _favoriteIds.contains('wp-2')),
      _WpItem('wp-3', 'NEON PALMS', 'DEEP BLACK', 'AMOLED DARK', 'AMOLED',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDvTgz7chEsvCLoHw5DZwKZGKe02EWhFjl0K2YGQtptetInWjYQgzmSMRRHCqMFv1a6dIedeOkTHCIYXFbzDMDqk_nN4jt9aVC1w6qIz34TlvgSsEhHeTM9xhLCuBYnoz3LU4DeMDbMYIDx0CwYSKkf0cVC136d8QS3nYzZoKiE3sMehqycoUwlzP8c6hQvctLfVFcOeAgE425G0d9m5EYZPL-R1YHOOXPz8CeDesAZ_4o6u4fUhMI5Rg',
          _favoriteIds.contains('wp-3')),
      _WpItem('wp-4', 'OCEAN STRIP', 'HOTEL ROW', 'NEON SUNSET', '4K UHD',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD-_AeLaeMn4NbiOc3qAIx_nogATUA8GQ53gmudEIBfEPyf701yfLa3qCA0w0_2QyvpZKe-fC7QfmVewYTwk0iDKf0DmOSIUaMztlU8BSEgow61ALwfLu1Z_a3jXU-Vg64kuF5UkprKvaipUzGdTZVy7wJPL61cztBOr584H6waig69CXPAi8Y6mD1AAdjbqVlEAQCzmVIZrd4ZNyYdqNSUaikjtWIB386m-evXAJKv_kUMZxjwYfAbqQ',
          _favoriteIds.contains('wp-4')),
    ];
  }

  void downloadWallpaper(BuildContext context, dynamic wp) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: const Color(0xFF2A2931),
        content: Text('Downloading \${wp.title} in 4K UHD...'),
      ),
    );
  }

  void downloadAllZip(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: Color(0xFF2A2931),
        content: Text('Packaging 42 Wallpapers in 4K UHD ZIP...'),
      ),
    );
  }

  void setDynamicWallpaper(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: Color(0xFFFF479C),
        content: Text('Syncing 4K dynamic live wallpaper to Android home & lock screen...'),
      ),
    );
  }
}

class _WpItem {
  final String id;
  final String title;
  final String subtitle;
  final String category;
  final String badge;
  final String imageUrl;
  final bool isFavorite;

  _WpItem(this.id, this.title, this.subtitle, this.category, this.badge, this.imageUrl, this.isFavorite);
}
`
  );

  const content = await zip.generateAsync({ type: 'blob' });
  triggerBrowserDownload(content, 'gta6-flutter-android-project.zip');
}

/**
 * Downloads all wallpapers metadata & manifest as a zip
 */
export async function downloadWallpapersZip(wallpapers: Wallpaper[]): Promise<void> {
  const zip = new JSZip();
  const manifest = wallpapers.map((w) => ({
    title: w.title,
    subtitle: w.subtitle,
    category: w.category,
    resolution: w.resolution,
    url: w.imageUrl,
    description: w.description,
  }));

  zip.file('manifest.json', JSON.stringify(manifest, null, 2));
  zip.file(
    'READ_ME.txt',
    `VICE CITY 4K UHD WALLPAPERS VAULT\nTotal Assets: ${wallpapers.length}\nLossless Calibrated for AMOLED and Foldable Android Devices.\n`
  );

  const content = await zip.generateAsync({ type: 'blob' });
  triggerBrowserDownload(content, 'vice-city-wallpapers-4k.zip');
}

function triggerBrowserDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
