import { FlutterProjectFile } from '../types';

export const FLUTTER_PROJECT_FILES: FlutterProjectFile[] = [
  {
    path: 'pubspec.yaml',
    filename: 'pubspec.yaml',
    description: 'Flutter dependencies & assets configuration',
    language: 'yaml',
    content: `name: gta6_countdown_vault
description: "A polished Vice City GTA 6 Countdown & 4K AMOLED Wallpapers Android App."
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.2.1
  cached_network_image: ^3.3.1
  flutter_staggered_grid_view: ^0.7.0
  provider: ^6.1.2
  intl: ^0.19.0
  dio: ^5.4.3+1
  path_provider: ^2.1.3
  permission_handler: ^11.3.1
  flutter_animate: ^4.5.0
  audioplayers: ^6.0.0
  flutter_spinkit: ^5.2.1
  font_awesome_flutter: ^10.7.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
`,
  },
  {
    path: 'lib/main.dart',
    filename: 'main.dart',
    description: 'Android App Entry point, Material 3 Dark theme, and Navigation shell',
    language: 'dart',
    content: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'theme/neon_theme.dart';
import 'screens/wallpaper_screen.dart';
import 'screens/countdown_screen.dart';
import 'screens/news_screen.dart';
import 'screens/trailers_screen.dart';
import 'screens/system_screen.dart';
import 'services/wallpaper_state.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Set Android edge-to-edge transparent system bars
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Colors.transparent,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => WallpaperState()),
      ],
      child: const ViceCityApp(),
    ),
  );
}

class ViceCityApp extends StatelessWidget {
  const ViceCityApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GTA 6 Countdown & Vault',
      debugShowCheckedModeBanner: false,
      theme: NeonTheme.darkTheme,
      home: const MainNavigationHolder(),
    );
  }
}

class MainNavigationHolder extends StatefulWidget {
  const MainNavigationHolder({super.key});

  @override
  State<MainNavigationHolder> createState() => _MainNavigationHolderState();
}

class _MainNavigationHolderState extends State<MainNavigationHolder> {
  int _currentIndex = 3; // Default to Papers (Wallpapers)

  final List<Widget> _screens = const [
    CountdownScreen(),
    NewsScreen(),
    TrailersScreen(),
    WallpaperScreen(),
    SystemScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF13131A),
      extendBody: true,
      body: Stack(
        children: [
          // Background ambient gradient blurs
          Positioned(
            top: -50,
            right: -50,
            child: Container(
              width: 250,
              height: 250,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFFFF479C).withOpacity(0.12),
              ),
            ),
          ),
          Positioned(
            bottom: 80,
            left: -50,
            child: Container(
              width: 260,
              height: 260,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: const Color(0xFF00EEFC).withOpacity(0.08),
              ),
            ),
          ),
          IndexedStack(
            index: _currentIndex,
            children: _screens,
          ),
        ],
      ),
      bottomNavigationBar: _buildGlassBottomNav(),
    );
  }

  Widget _buildGlassBottomNav() {
    return Container(
      margin: const EdgeInsets.only(left: 20, right: 20, bottom: 20),
      height: 68,
      decoration: BoxDecoration(
        color: const Color(0xFF1B1B23).withOpacity(0.88),
        borderRadius: BorderRadius.circular(34),
        border: Border.all(color: Colors.white.withOpacity(0.08), width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.6),
            blurRadius: 30,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _navItem(0, Icons.explore_outlined, 'HOME'),
          _navItem(1, Icons.feed_outlined, 'NEWS'),
          _navItem(2, Icons.smart_display_outlined, 'TRAILERS'),
          _navItem(3, Icons.wallpaper_outlined, 'PAPERS'),
          _navItem(4, Icons.tune_outlined, 'SYSTEM'),
        ],
      ),
    );
  }

  Widget _navItem(int index, IconData icon, String label) {
    final isSelected = _currentIndex == index;
    final activeColor = const Color(0xFF00EEFC);
    final inactiveColor = const Color(0xFFE3BDC7).withOpacity(0.6);

    return InkWell(
      onTap: () => setState(() => _currentIndex = index),
      borderRadius: BorderRadius.circular(20),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 22,
              color: isSelected ? activeColor : inactiveColor,
              shadows: isSelected
                  ? [
                      Shadow(
                        color: activeColor.withOpacity(0.8),
                        blurRadius: 12,
                      ),
                    ]
                  : null,
            ),
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontFamily: 'Space Grotesk',
                fontSize: 10,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.1,
                color: isSelected ? activeColor : inactiveColor,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/theme/neon_theme.dart',
    filename: 'neon_theme.dart',
    description: 'Vice City Dark AMOLED Color Palette and Typography',
    language: 'dart',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class NeonTheme {
  static const Color surface = Color(0xFF13131A);
  static const Color surfaceContainer = Color(0xFF1F1F27);
  static const Color surfaceContainerHigh = Color(0xFF2A2931);
  static const Color surfaceContainerLowest = Color(0xFF0E0D15);
  
  static const Color neonPink = Color(0xFFFF479C);
  static const Color lightPink = Color(0xFFFFB0CA);
  static const Color neonCyan = Color(0xFF00EEFC);
  static const Color dimCyan = Color(0xFF00DBE9);
  static const Color neonPurple = Color(0xFFDBB8FF);
  
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: surface,
      colorScheme: const ColorScheme.dark(
        surface: surface,
        primary: lightPink,
        primaryContainer: neonPink,
        secondary: neonCyan,
        tertiary: neonPurple,
        onSurface: Color(0xFFE4E1EC),
      ),
      textTheme: GoogleFonts.outfitTextTheme().copyWith(
        displayLarge: GoogleFonts.spaceGrotesk(
          fontSize: 32,
          fontWeight: FontWeight.bold,
          color: const Color(0xFFE4E1EC),
        ),
        headlineMedium: GoogleFonts.spaceGrotesk(
          fontSize: 22,
          fontWeight: FontWeight.bold,
          color: const Color(0xFFE4E1EC),
        ),
        labelLarge: GoogleFonts.spaceGrotesk(
          fontSize: 12,
          fontWeight: FontWeight.w700,
          letterSpacing: 1.2,
        ),
        bodyMedium: GoogleFonts.outfit(
          fontSize: 14,
          color: const Color(0xFFE3BDC7),
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/screens/wallpaper_screen.dart',
    filename: 'wallpaper_screen.dart',
    description: 'Exact 1:1 reproduction of the UHD Asset Vault & 2-column grid in Flutter',
    language: 'dart',
    content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../services/wallpaper_state.dart';
import '../theme/neon_theme.dart';

class WallpaperScreen extends StatefulWidget {
  const WallpaperScreen({super.key});

  @override
  State<WallpaperScreen> createState() => _WallpaperScreenState();
}

class _WallpaperScreenState extends State<WallpaperScreen> {
  String _selectedCategory = 'ALL (42)';
  final List<String> _categories = [
    'ALL (42)',
    'AMOLED DARK',
    'NEON SUNSET',
    'SUPERCAR',
    'CHARACTERS',
  ];

  @override
  Widget build(BuildContext context) {
    final state = context.watch<WallpaperState>();
    final wallpapers = state.getFilteredWallpapers(_selectedCategory);

    return SafeArea(
      bottom: false,
      child: CustomScrollView(
        slivers: [
          // Header
          SliverToBoxAdapter(
            child: _buildHeader(context),
          ),
          // Subheader & Title
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: NeonTheme.neonPink.withOpacity(0.18),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: NeonTheme.neonPink.withOpacity(0.3)),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 6,
                              height: 6,
                              decoration: const BoxDecoration(
                                color: NeonTheme.lightPink,
                                shape: BoxShape.circle,
                              ),
                            ),
                            const SizedBox(width: 6),
                            const Text(
                              'UHD ASSET VAULT',
                              style: TextStyle(
                                fontFamily: 'Space Grotesk',
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: NeonTheme.lightPink,
                                letterSpacing: 1.2,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Row(
                        children: const [
                          Icon(Icons.hd, color: NeonTheme.dimCyan, size: 16),
                          SizedBox(width: 4),
                          Text(
                            '2160x3840 READY',
                            style: TextStyle(
                              fontFamily: 'JetBrains Mono',
                              fontSize: 11,
                              fontWeight: FontWeight.w600,
                              color: NeonTheme.dimCyan,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'VICE CITY WALLPAPERS',
                    style: TextStyle(
                      fontFamily: 'Space Grotesk',
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.5,
                      color: Color(0xFFE4E1EC),
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Official Key Art, Neon Landscapes & AMOLED 4K Mobile Backgrounds',
                    style: TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 13,
                      color: Color(0xFFE3BDC7),
                    ),
                  ),
                  const SizedBox(height: 14),
                  // Filter Chips Carousel
                  SizedBox(
                    height: 38,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: _categories.length,
                      separatorBuilder: (_, __) => const SizedBox(width: 8),
                      itemBuilder: (context, index) {
                        final cat = _categories[index];
                        final isSelected = cat == _selectedCategory;
                        return InkWell(
                          onTap: () => setState(() => _selectedCategory = cat),
                          borderRadius: BorderRadius.circular(20),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            decoration: BoxDecoration(
                              color: isSelected ? NeonTheme.lightPink : NeonTheme.surfaceContainerHigh,
                              borderRadius: BorderRadius.circular(20),
                              boxShadow: isSelected
                                  ? [
                                      BoxShadow(
                                        color: NeonTheme.neonPink.withOpacity(0.5),
                                        blurRadius: 14,
                                        spreadRadius: 1,
                                      )
                                    ]
                                  : null,
                            ),
                            child: Center(
                              child: Text(
                                cat,
                                style: TextStyle(
                                  fontFamily: 'Space Grotesk',
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 1.0,
                                  color: isSelected ? const Color(0xFF640036) : const Color(0xFFE3BDC7),
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
          // 2-Column Grid
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            sliver: SliverGrid(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 14,
                crossAxisSpacing: 14,
                childAspectRatio: 0.62,
              ),
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final wp = wallpapers[index];
                  return _buildWallpaperCard(context, wp, state);
                },
                childCount: wallpapers.length,
              ),
            ),
          ),
          // Spec banner & Action Buttons
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  _buildSpecBanner(),
                  const SizedBox(height: 16),
                  _buildActionControls(context, state),
                  const SizedBox(height: 100), // padding for bottom nav
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Row(
        children: [
          Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              gradient: const LinearGradient(
                colors: [NeonTheme.neonPink, NeonTheme.neonPurple],
              ),
            ),
            child: const Center(
              child: Text(
                'VI',
                style: TextStyle(
                  fontFamily: 'Space Grotesk',
                  fontWeight: FontWeight.w900,
                  fontSize: 18,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'GTA 6 COUNTDOWN',
                style: TextStyle(
                  fontFamily: 'Space Grotesk',
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  letterSpacing: 1.1,
                  color: Color(0xFFE4E1EC),
                ),
              ),
              Row(
                children: [
                  const Text(
                    'UNOFFICIAL FAN APP',
                    style: TextStyle(
                      fontFamily: 'Space Grotesk',
                      fontSize: 9,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.3,
                      color: NeonTheme.dimCyan,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Container(
                    width: 4,
                    height: 4,
                    decoration: const BoxDecoration(
                      color: NeonTheme.lightPink,
                      shape: BoxShape.circle,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const Spacer(),
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.notifications_outlined, color: Color(0xFFE4E1EC)),
          ),
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.settings_outlined, color: Color(0xFFE4E1EC)),
          ),
        ],
      ),
    );
  }

  Widget _buildWallpaperCard(BuildContext context, dynamic wp, WallpaperState state) {
    return Container(
      decoration: BoxDecoration(
        color: NeonTheme.surfaceContainer,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.6),
            blurRadius: 16,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: Stack(
        children: [
          // Image
          Positioned.fill(
            child: CachedNetworkImage(
              imageUrl: wp.imageUrl,
              fit: BoxFit.cover,
              placeholder: (_, __) => Container(color: NeonTheme.surfaceContainerLowest),
              errorWidget: (_, __) => Container(color: Colors.grey.shade900),
            ),
          ),
          // Gradients
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.black.withOpacity(0.6),
                    Colors.transparent,
                    Colors.black.withOpacity(0.85),
                  ],
                ),
              ),
            ),
          ),
          // Top Badges
          Positioned(
            top: 10,
            left: 10,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.7),
                borderRadius: BorderRadius.circular(6),
              ),
              child: Text(
                wp.badge,
                style: const TextStyle(
                  fontFamily: 'JetBrains Mono',
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: NeonTheme.dimCyan,
                ),
              ),
            ),
          ),
          Positioned(
            top: 6,
            right: 6,
            child: IconButton(
              onPressed: () => state.toggleFavorite(wp.id),
              icon: Icon(
                wp.isFavorite ? Icons.favorite : Icons.favorite_border,
                color: wp.isFavorite ? NeonTheme.neonPink : Colors.white70,
                size: 20,
              ),
            ),
          ),
          // Bottom details
          Positioned(
            bottom: 10,
            left: 10,
            right: 10,
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        wp.title,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontFamily: 'Space Grotesk',
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: NeonTheme.lightPink,
                          letterSpacing: 0.8,
                        ),
                      ),
                      Text(
                        wp.subtitle,
                        style: const TextStyle(
                          fontFamily: 'JetBrains Mono',
                          fontSize: 9,
                          color: Colors.white60,
                        ),
                      ),
                    ],
                  ),
                ),
                InkWell(
                  onTap: () => state.downloadWallpaper(context, wp),
                  child: Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: NeonTheme.surfaceContainerHigh.withOpacity(0.9),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: NeonTheme.neonCyan.withOpacity(0.3)),
                    ),
                    child: const Icon(
                      Icons.download_rounded,
                      size: 18,
                      color: NeonTheme.neonCyan,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSpecBanner() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: const Color(0xFF1B1B23).withOpacity(0.9),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: [
          Container(
            width: 38,
            height: 38,
            decoration: BoxDecoration(
              color: NeonTheme.neonCyan.withOpacity(0.12),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Icon(Icons.tune, color: NeonTheme.neonCyan, size: 20),
          ),
          const SizedBox(width: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text(
                'Auto-Fit Phone Res',
                style: TextStyle(
                  fontFamily: 'Space Grotesk',
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              Text(
                'Calibrated for OLED & Foldables',
                style: TextStyle(
                  fontFamily: 'JetBrains Mono',
                  fontSize: 11,
                  color: Color(0xFFE3BDC7),
                ),
              ),
            ],
          ),
          const Spacer(),
          Row(
            children: const [
              Icon(Icons.verified, color: NeonTheme.dimCyan, size: 16),
              SizedBox(width: 4),
              Text(
                'LOSSLESS',
                style: TextStyle(
                  fontFamily: 'Space Grotesk',
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: NeonTheme.dimCyan,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActionControls(BuildContext context, WallpaperState state) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: ElevatedButton.icon(
                onPressed: () => state.downloadAllZip(context),
                icon: const Icon(Icons.folder_zip_outlined, size: 18, color: NeonTheme.dimCyan),
                label: const Text(
                  'DOWNLOAD ALL (ZIP)',
                  style: TextStyle(
                    fontFamily: 'Space Grotesk',
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 0.8,
                  ),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: NeonTheme.surfaceContainerHigh,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30),
                  gradient: const LinearGradient(
                    colors: [NeonTheme.neonPink, NeonTheme.neonPurple],
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: NeonTheme.neonPink.withOpacity(0.4),
                      blurRadius: 18,
                      offset: const Offset(0, 6),
                    ),
                  ],
                ),
                child: ElevatedButton.icon(
                  onPressed: () => state.setDynamicWallpaper(context),
                  icon: const Icon(Icons.motion_photos_on_outlined, size: 18, color: Colors.white),
                  label: const Text(
                    'SET LIVE 4K',
                    style: TextStyle(
                      fontFamily: 'Space Grotesk',
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.8,
                      color: Colors.white,
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.transparent,
                    shadowColor: Colors.transparent,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                  ),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 5,
              height: 5,
              decoration: const BoxDecoration(
                color: NeonTheme.dimCyan,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 6),
            const Text(
              'CLOUD SYNC ACTIVE • 4 LEAKED ARTWORKS ADDED TODAY',
              style: TextStyle(
                fontFamily: 'JetBrains Mono',
                fontSize: 9,
                letterSpacing: 1.0,
                color: Color(0xFFE3BDC7),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
`,
  },
  {
    path: 'android/app/build.gradle',
    filename: 'build.gradle',
    description: 'Android module Gradle build configuration configured for SDK 34 & release APK',
    language: 'gradle',
    content: `plugins {
    id "com.android.application"
    id "kotlin-android"
    id "dev.flutter.flutter-gradle-plugin"
}

def localProperties = new Properties()
def localPropertiesFile = rootProject.file('local.properties')
if (localPropertiesFile.exists()) {
    localPropertiesFile.withReader('UTF-8') { reader ->
        localProperties.load(reader)
    }
}

android {
    namespace "com.vicecity.gta6countdown"
    compileSdkVersion 34
    ndkVersion flutter.ndkVersion

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = '17'
    }

    defaultConfig {
        applicationId "com.vicecity.gta6countdown"
        minSdkVersion 24
        targetSdkVersion 34
        versionCode flutterVersionCode.toInteger()
        versionName flutterVersionName
        multiDexEnabled true
    }

    buildTypes {
        release {
            signingConfig signingConfigs.debug
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

flutter {
    source '../..'
}

dependencies {
    implementation 'androidx.multidex:multidex:2.0.1'
}
`,
  },
  {
    path: 'android/app/src/main/AndroidManifest.xml',
    filename: 'AndroidManifest.xml',
    description: 'Android permissions for Wallpapers, Internet, Vibration, and AMOLED lockscreen',
    language: 'xml',
    content: `<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Internet for high-res 4K asset downloads -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <!-- Android Wallpaper permissions -->
    <uses-permission android:name="android.permission.SET_WALLPAPER" />
    <uses-permission android:name="android.permission.SET_WALLPAPER_HINTS" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <!-- Scoped storage for saving images to gallery -->
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />

    <application
        android:label="GTA 6 Countdown"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@style/LaunchTheme"
        android:hardwareAccelerated="true">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:taskAffinity=""
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:windowSoftInputMode="adjustResize">
            
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme" />
              
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
</manifest>
`,
  },
];
