import React, { useState } from 'react';
import { Plus, Trash2, Edit, BookOpen, HelpCircle } from 'lucide-react';
import { dataStore } from '../../lib/dataStore';
import { JournalPost, FAQ } from '../../types/database.types';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/Input';

export function JournalFAQManager() {
  const [posts, setPosts] = useState<JournalPost[]>(() => dataStore.getJournalPosts());
  const [faqs, setFaqs] = useState<FAQ[]>(() => dataStore.getFAQs());

  // FAQ Form
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  // Post Form
  const [postTitle, setPostTitle] = useState('');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');

  const refreshList = () => {
    setPosts([...dataStore.getJournalPosts()]);
    setFaqs([...dataStore.getFAQs()]);
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQ || !faqA) return;

    const newFaq: FAQ = {
      id: `faq-${Date.now()}`,
      question: faqQ,
      answer: faqA,
      category: 'General',
      order_index: faqs.length + 1,
      is_published: true,
      created_at: new Date().toISOString()
    };

    dataStore.saveFAQ(newFaq);
    setFaqQ('');
    setFaqA('');
    refreshList();
  };

  const handleDeleteFaq = (id: string) => {
    dataStore.deleteFAQ(id);
    refreshList();
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;

    const slug = postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newPost: JournalPost = {
      id: `jrn-${Date.now()}`,
      title: postTitle,
      slug,
      excerpt: postExcerpt || postTitle,
      content: postContent,
      cover_image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
      category: 'Photography Tips',
      tags: ['Photography', 'Tips'],
      author_name: 'DOTPIC Studio',
      is_published: true,
      read_time: '4 min read',
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    dataStore.saveJournalPost(newPost);
    setPostTitle('');
    setPostExcerpt('');
    setPostContent('');
    refreshList();
  };

  const handleDeletePost = (id: string) => {
    dataStore.deleteJournalPost(id);
    refreshList();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif text-white">Journal Stories & FAQ Management</h2>
        <p className="text-xs text-dotpic-muted">Manage SEO shoot journals, photography advice, and customer questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FAQs Section */}
        <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-dotpic-gold" />
            <h3 className="text-lg font-serif text-white">Frequently Asked Questions ({faqs.length})</h3>
          </div>

          <form onSubmit={handleAddFaq} className="p-4 rounded bg-dotpic-surface border border-dotpic-border space-y-3">
            <span className="text-xs text-dotpic-gold font-mono block">Add New FAQ</span>
            <Input
              required
              placeholder="Question..."
              value={faqQ}
              onChange={(e) => setFaqQ(e.target.value)}
            />
            <Textarea
              required
              rows={2}
              placeholder="Answer..."
              value={faqA}
              onChange={(e) => setFaqA(e.target.value)}
            />
            <Button type="submit" variant="gold" size="sm">
              Add FAQ
            </Button>
          </form>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {faqs.map((f) => (
              <div key={f.id} className="p-3 rounded bg-dotpic-surface border border-dotpic-border flex items-start justify-between gap-3 text-xs">
                <div>
                  <h5 className="text-white font-medium mb-1">{f.question}</h5>
                  <p className="text-dotpic-muted line-clamp-2">{f.answer}</p>
                </div>
                <button
                  onClick={() => handleDeleteFaq(f.id)}
                  className="p-1 text-dotpic-muted hover:text-red-400 flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Journal Section */}
        <div className="bg-dotpic-charcoal border border-dotpic-border rounded-sm p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-dotpic-gold" />
            <h3 className="text-lg font-serif text-white">Journal Articles ({posts.length})</h3>
          </div>

          <form onSubmit={handleAddPost} className="p-4 rounded bg-dotpic-surface border border-dotpic-border space-y-3">
            <span className="text-xs text-dotpic-gold font-mono block">Publish New Article</span>
            <Input
              required
              placeholder="Article Title..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <Input
              placeholder="Short Excerpt..."
              value={postExcerpt}
              onChange={(e) => setPostExcerpt(e.target.value)}
            />
            <Textarea
              required
              rows={3}
              placeholder="Article Content (Supports markdown)..."
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <Button type="submit" variant="gold" size="sm">
              Publish Story
            </Button>
          </form>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {posts.map((p) => (
              <div key={p.id} className="p-3 rounded bg-dotpic-surface border border-dotpic-border flex items-start justify-between gap-3 text-xs">
                <div>
                  <h5 className="text-white font-medium mb-1">{p.title}</h5>
                  <span className="text-[10px] text-dotpic-gold font-mono">{p.category} • {p.read_time}</span>
                </div>
                <button
                  onClick={() => handleDeletePost(p.id)}
                  className="p-1 text-dotpic-muted hover:text-red-400 flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
