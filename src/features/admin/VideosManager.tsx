import React, { useState, useRef } from 'react';
import { Plus, Upload, Youtube, Trash2, Play, Film, X, Check, AlertCircle } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { VideoHubItem } from '../../types/database.types';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { YouTubeModal } from '../../components/common/YouTubeModal';

export function VideosManager() {
  const [videos, setVideos] = useState<VideoHubItem[]>(() => dataStore.getVideos());
  const [showModal, setShowModal] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'youtube'>('upload');
  const [previewVideo, setPreviewVideo] = useState<{ url: string; title: string } | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [videoFileUrl, setVideoFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [category, setCategory] = useState('Showreel');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshList = () => {
    setVideos([...dataStore.getVideos()]);
  };

  const extractYouTubeId = (url: string): string => {
    if (url.includes('v=')) {
      return url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1].split('?')[0];
    }
    return url;
  };

  // Handle direct local video file selection
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    setFileSize(`${sizeInMb} MB`);

    // Generate local Object URL for immediate playback & preview
    const objectUrl = URL.createObjectURL(file);
    setVideoFileUrl(objectUrl);

    if (!title) {
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTitle(cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1));
    }

    // Auto-generate a video thumbnail from the first frame
    const video = document.createElement('video');
    video.src = objectUrl;
    video.currentTime = 1;
    video.muted = true;
    video.onloadeddata = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbData = canvas.toDataURL('image/jpeg', 0.8);
          if (!thumbnailUrl) setThumbnailUrl(thumbData);
        }
      } catch (err) {
        console.warn("Could not capture video frame:", err);
      }
    };
  };

  // Custom thumbnail file upload
  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setThumbnailUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (uploadMode === 'upload' && !videoFileUrl) {
      alert("Please select a video file to upload.");
      return;
    }

    if (uploadMode === 'youtube' && !youtubeUrl) {
      alert("Please enter a YouTube video URL or ID.");
      return;
    }

    setIsProcessing(true);

    const ytId = uploadMode === 'youtube' ? extractYouTubeId(youtubeUrl) : '';
    const defaultThumb = "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop";

    const newVideo: VideoHubItem = {
      id: `vid-${Date.now()}`,
      title,
      video_type: uploadMode,
      video_file_url: uploadMode === 'upload' ? videoFileUrl : undefined,
      file_name: uploadMode === 'upload' ? fileName : undefined,
      file_size: uploadMode === 'upload' ? fileSize : undefined,
      youtube_url: uploadMode === 'youtube' ? youtubeUrl : '',
      youtube_id: ytId,
      thumbnail_url: thumbnailUrl || defaultThumb,
      category,
      description,
      is_featured: isFeatured,
      order_index: videos.length + 1,
      created_at: new Date().toISOString()
    };

    dataStore.saveVideo(newVideo);
    setIsProcessing(false);
    setShowModal(false);

    // Reset form
    setTitle('');
    setVideoFileUrl('');
    setFileName('');
    setFileSize('');
    setYoutubeUrl('');
    setThumbnailUrl('');
    setDescription('');
    refreshList();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this video from the website?")) {
      dataStore.deleteVideo(id);
      refreshList();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white flex items-center gap-2">
            <Film className="w-6 h-6 text-teal-400" />
            <span>Video & Film Studio Manager</span>
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Upload direct video files (.mp4, .webm, .mov) or link YouTube showreels for the website films gallery.
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            setShowModal(true);
            setUploadMode('upload');
          }}
          icon={<Plus className="w-4 h-4 text-white" />}
        >
          Add / Upload Video
        </Button>
      </div>

      {/* Videos List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl group hover:border-teal-500/50 transition-all"
          >
            <div>
              {/* Thumbnail / Player Frame */}
              <div
                onClick={() => setPreviewVideo({ url: vid.video_file_url || vid.youtube_url || vid.youtube_id, title: vid.title })}
                className="relative aspect-video w-full bg-black cursor-pointer overflow-hidden group/thumb"
              >
                <img
                  src={vid.thumbnail_url}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Source Badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-orbitron border border-white/10 uppercase">
                  {vid.video_type === 'upload' || vid.video_file_url ? (
                    <>
                      <Upload className="w-3 h-3 text-teal-400" />
                      <span className="text-teal-300 font-semibold">Direct File {vid.file_size ? `(${vid.file_size})` : ''}</span>
                    </>
                  ) : (
                    <>
                      <Youtube className="w-3 h-3 text-red-500" />
                      <span className="text-red-400 font-semibold">YouTube</span>
                    </>
                  )}
                </div>

                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-orbitron text-slate-300 border border-white/10 uppercase">
                  {vid.category}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <h4 className="text-sm font-serif text-white font-medium mb-1 truncate">
                  {vid.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 font-sans">
                  {vid.description || 'No description provided.'}
                </p>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => setPreviewVideo({ url: vid.video_file_url || vid.youtube_url || vid.youtube_id, title: vid.title })}
                className="inline-flex items-center gap-1 text-[11px] font-orbitron text-teal-400 hover:text-teal-300 font-semibold uppercase tracking-wider"
              >
                <Play className="w-3 h-3 fill-teal-400" />
                <span>Play Video</span>
              </button>

              <button
                onClick={() => handleDelete(vid.id)}
                className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                title="Delete video"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Video / Upload Video */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-2xl font-serif text-white mb-1">Add New Video</h3>
            <p className="text-xs text-slate-400 mb-6 font-sans">Choose to upload an actual video file from your computer or link an existing YouTube video.</p>

            {/* Toggle Switch: Upload File vs YouTube */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => setUploadMode('upload')}
                className={`py-2 px-3 rounded-xl text-xs font-orbitron font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  uploadMode === 'upload'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>

              <button
                type="button"
                onClick={() => setUploadMode('youtube')}
                className={`py-2 px-3 rounded-xl text-xs font-orbitron font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  uploadMode === 'youtube'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>YouTube Link</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Option A: Direct File Upload */}
              {uploadMode === 'upload' && (
                <div>
                  <label className="text-xs font-orbitron uppercase text-slate-300 block mb-1.5 font-medium">
                    Video File (.mp4, .webm, .mov) *
                  </label>
                  
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-teal-500/40 hover:border-teal-500 bg-slate-950/60 rounded-2xl p-6 text-center cursor-pointer transition-colors group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime,video/*"
                      onChange={handleVideoFileChange}
                      className="hidden"
                    />

                    {videoFileUrl ? (
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-xs font-orbitron text-white font-semibold block truncate">
                            {fileName || "Video Selected"}
                          </span>
                          <span className="text-[11px] text-teal-400 block mt-0.5">
                            File Size: {fileSize} • Click to change
                          </span>
                        </div>
                        {/* Mini video preview */}
                        <div className="aspect-video max-w-xs mx-auto rounded-xl overflow-hidden bg-black border border-slate-800">
                          <video src={videoFileUrl} controls className="w-full h-full object-contain" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-teal-400 mx-auto group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-orbitron text-slate-200 block font-semibold">
                          Click to Browse & Upload Video File
                        </span>
                        <span className="text-[11px] text-slate-500 block font-sans">
                          MP4, WebM or QuickTime MOV up to 500MB
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Option B: YouTube Link */}
              {uploadMode === 'youtube' && (
                <div>
                  <label className="text-xs font-orbitron uppercase text-slate-300 block mb-1.5 font-medium">
                    YouTube URL or Video ID *
                  </label>
                  <Input
                    required
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              )}

              {/* Title */}
              <div>
                <label className="text-xs font-orbitron uppercase text-slate-300 block mb-1.5 font-medium">
                  Film Title *
                </label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Wedding 4K Cinematic Highlights"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-orbitron uppercase text-slate-300 block mb-1.5 font-medium">
                  Category
                </label>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Showreel" className="bg-slate-900 text-white">Showreel</option>
                  <option value="Weddings" className="bg-slate-900 text-white">Weddings</option>
                  <option value="Campus" className="bg-slate-900 text-white">Campus Stories</option>
                  <option value="Behind the Scenes" className="bg-slate-900 text-white">Behind the Scenes</option>
                  <option value="Fashion" className="bg-slate-900 text-white">Fashion & Commercial</option>
                </Select>
              </div>

              {/* Custom Thumbnail Upload or URL */}
              <div>
                <label className="text-xs font-orbitron uppercase text-slate-300 block mb-1.5 font-medium">
                  Cover Thumbnail (Optional)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="Cover Image URL or upload image below"
                  />
                  <label className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer text-xs font-orbitron flex items-center justify-center flex-shrink-0">
                    <Upload className="w-3.5 h-3.5 mr-1" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-orbitron uppercase text-slate-300 block mb-1.5 font-medium">
                  Description
                </label>
                <Textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief cinematic synopsis of the film..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={isProcessing}>
                  {isProcessing ? 'Saving Video...' : 'Save Video Film'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Cinema Player Modal */}
      {previewVideo && (
        <YouTubeModal
          isOpen={true}
          videoId={previewVideo.url}
          directVideoUrl={previewVideo.url}
          title={previewVideo.title}
          onClose={() => setPreviewVideo(null)}
        />
      )}
    </div>
  );
}
