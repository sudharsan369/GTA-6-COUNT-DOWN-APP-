export type TabType = 'home' | 'news' | 'trailers' | 'wallpapers' | 'system';

export interface Wallpaper {
  id: string;
  title: string;
  subtitle: string;
  category: 'ALL' | 'AMOLED DARK' | 'NEON SUNSET' | 'SUPERCAR' | 'CHARACTERS';
  badge: string;
  badgeColor: string;
  imageUrl: string;
  aspectRatio: string;
  downloads: number;
  resolution: string;
  fileSize: string;
  description: string;
  isFavorite?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  tag: string;
  imageUrl: string;
  source: string;
}

export interface TrailerItem {
  id: string;
  title: string;
  releaseDate: string;
  views: string;
  duration: string;
  youtubeId: string;
  thumbnail: string;
  breakdownCount: number;
  highlights: string[];
}

export interface FlutterProjectFile {
  path: string;
  filename: string;
  description: string;
  language: 'dart' | 'yaml' | 'gradle' | 'xml';
  content: string;
}
