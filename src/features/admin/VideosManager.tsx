import React, { useState } from 'react';
import { Plus, Youtube, Trash2, Edit, X } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { VideoHubItem } from '../../types/database.types';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';

export function VideosManager() {
  const [videos, setVideos] = useState<VideoHubItem[]>(() => dataStore.getVideos());
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [category, setCategory] = useState('Showreel');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeUrl) return;

    const ytId = extractYouTubeId(youtubeUrl);
    const thumb = thumbnailUrl || `https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop`;

    const newVideo: VideoHubItem = {
      id: `vid-${Date.now()}`,
      title,
      youtube_url: youtubeUrl,
      youtube_id: ytId,
      thumbnail_url: thumb,
      category,
      description,
      is_featured: isFeatured,
      order_index: videos.length + 1,
      created_at: new Date().toISOString()
    };

    dataStore.saveVideo(newVideo);
    setShowModal(false);
    setTitle('');
    setYoutubeUrl('');
    setDescription('');
    refreshList();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this video?")) {
      dataStore.deleteVideo(id);
      refreshList();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif text-white">YouTube Cinema Hub & Films</h2>
          <p className="text-xs text-dotpic-muted">Curate official films, wedding teasers, and showreels linked to @dotpicphotography.</p>
        </div>

        <Button
          size="sm"
          variant="gold"
          onClick={() => setShowModal(true)}
          icon={<Plus className="w-4 h-4 text-dotpic-black" />}
        >
          Add Video Film
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-dotpic-charcoal border border-dotpic-border rounded-sm overflow-hidden flex flex-col justify-between shadow-xl">
            <div>
              <div className="relative aspect-video">
                <img src={vid.thumbnail_url} alt={vid.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-dotpic-gold border border-white/10 uppercase">
                  {vid.category}
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-serif text-white mb-1 truncate">{vid.title}</h4>
                <p className="text-xs text-dotpic-muted line-clamp-2">{vid.description}</p>
              </div>
            </div>

            <div className="p-4 bg-dotpic-surface/60 border-t border-dotpic-border flex items-center justify-between">
              <span className="text-[10px] font-mono text-red-400">ID: {vid.youtube_id}</span>
              <button
                onClick={() => handleDelete(vid.id)}
                className="p-1 text-dotpic-muted hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 text-dotpic-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif text-white mb-4">Add YouTube Video</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Film Title *</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Wedding 4K Teaser"
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">YouTube URL or ID *</label>
                <Input
                  required
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Category</label>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Showreel" className="bg-dotpic-black text-white">Showreel</option>
                  <option value="Weddings" className="bg-dotpic-black text-white">Weddings</option>
                  <option value="Campus" className="bg-dotpic-black text-white">Campus</option>
                  <option value="Behind the Scenes" className="bg-dotpic-black text-white">Behind the Scenes</option>
                </Select>
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Custom Thumbnail URL</label>
                <Input
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-xs text-dotpic-muted block mb-1">Description</label>
                <Textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief synopsis of the film..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" size="sm">
                  Add Video
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
