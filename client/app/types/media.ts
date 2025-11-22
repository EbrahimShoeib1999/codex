// types/media.ts
export interface ImageItem {
  id: string;
  url: string;
  name: string;
  size: number;
  uploadedAt: string;
  dimensions: { width: number; height: number };
  altText?: string;
  title?: string;
}

export interface MediaState {
  images: ImageItem[];
  loading: boolean;
  error: string | null;
}