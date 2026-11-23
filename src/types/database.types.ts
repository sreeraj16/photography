export type UserRole = 'owner' | 'editor' | 'viewer';
export type EnquiryStatus = 'New' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Completed' | 'Cancelled';
export type DownloadPolicy = 'none' | 'low_res' | 'full';
export type AvailabilityStatus = 'busy' | 'blocked' | 'tentative';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  cover_url: string;
  description: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
}

export interface Gallery {
  id: string;
  title: string;
  slug: string;
  category_id?: string;
  category_slug: string;
  cover_image_url: string;
  client_name?: string;
  location?: string;
  shoot_date?: string;
  description?: string;
  is_featured: boolean;
  is_published: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Photo {
  id: string;
  gallery_id?: string;
  storage_path?: string;
  url: string;
  thumbnail_url?: string;
  title?: string;
  caption?: string;
  alt_text?: string;
  order_index: number;
  is_featured: boolean;
  exif_camera?: string;
  exif_lens?: string;
  exif_focal_length?: string;
  exif_aperture?: string;
  exif_shutter_speed?: string;
  exif_iso?: string;
  likes_count: number;
  created_at: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  slug: string;
  college_name: string;
  college_id?: string;
  event_date: string;
  category: string;
  description: string;
  cover_image_url: string;
  photo_count: number;
  video_highlight_url?: string;
  is_featured: boolean;
  download_policy: DownloadPolicy;
  allow_find_my_photos: boolean;
  qr_code_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CampusEventPhoto {
  id: string;
  event_id: string;
  storage_path?: string;
  url: string;
  thumbnail_url?: string;
  caption?: string;
  order_index: number;
  created_at: string;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  category_slug: string;
  price_inr: number;
  duration: string;
  description: string;
  inclusions: string[];
  is_popular: boolean;
  is_enabled: boolean;
  order_index: number;
  created_at: string;
}

export interface Enquiry {
  id: string;
  reference_id: string;
  full_name: string;
  phone_number: string;
  category: string;
  preferred_date: string;
  location: string;
  package_id?: string;
  event_details: string;
  additional_requirements?: string;
  guest_count?: string;
  duration_hours?: string;
  budget_range?: string;
  referral_code?: string;
  source: string;
  status: EnquiryStatus;
  admin_notes?: string;
  follow_up_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  role_or_event: string;
  college_or_location?: string;
  quote: string;
  rating: number;
  avatar_url?: string;
  video_url?: string;
  is_featured: boolean;
  is_approved: boolean;
  order_index: number;
  created_at: string;
}

export interface HomepageContent {
  id: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_media_url: string;
  hero_media_type: 'video' | 'image';
  hero_poster_url?: string;
  showreel_youtube_url: string;
  cta_title: string;
  cta_subtitle: string;
  stats_events_shot: number;
  stats_photos_delivered: number;
  stats_colleges_covered: number;
  stats_years_experience: number;
  section_visibility: Record<string, boolean>;
  updated_at: string;
}

export interface WebsiteSettings {
  brand_name: string;
  brand_tagline: string;
  contact_whatsapp: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  contact_maps_url: string;
  social_instagram: string;
  social_instagram_handle: string;
  social_youtube: string;
  social_youtube_handle: string;
  social_whatsapp: string;
  show_announcement_bar: boolean;
  announcement_text: string;
  business_hours: string;
  [key: string]: any;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: string;
  tags: string[];
  author_name: string;
  is_published: boolean;
  read_time: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
}

export interface ClientGallery {
  id: string;
  client_name: string;
  title: string;
  slug: string;
  pin_hash: string;
  cover_image_url: string;
  event_date?: string;
  expiry_date?: string;
  allow_downloads: boolean;
  watermark_previews: boolean;
  download_count: number;
  last_viewed_at?: string;
  created_at: string;
}

export interface ClientGalleryPhoto {
  id: string;
  client_gallery_id: string;
  storage_path?: string;
  url: string;
  watermarked_url?: string;
  caption?: string;
  order_index: number;
  created_at: string;
}

export interface VideoHubItem {
  id: string;
  title: string;
  video_type?: 'upload' | 'youtube';
  video_file_url?: string;
  file_name?: string;
  file_size?: string;
  youtube_url: string;
  youtube_id: string;
  thumbnail_url: string;
  category: string;
  description: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'youtube';
  url: string;
  thumbnail_url: string;
  caption?: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
}

export interface LinksPageItem {
  id: string;
  title: string;
  url: string;
  icon_name: string;
  badge_text?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
}

export interface AvailabilityItem {
  id: string;
  date: string;
  status: AvailabilityStatus;
  notes?: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  details?: any;
  created_at: string;
}
