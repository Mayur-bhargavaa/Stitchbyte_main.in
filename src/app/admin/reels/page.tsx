"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Play,
  RotateCcw,
  Eye,
  EyeOff,
} from "lucide-react";

interface SpotlightReel {
  id: string;
  title: string;
  category?: string;
  duration?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  reelUrl?: string;
  isActive?: boolean;
  order?: number;
}

export default function AdminReelsPage() {
  const [reels, setReels] = useState<SpotlightReel[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReel, setEditingReel] = useState<SpotlightReel | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Culture");
  const [duration, setDuration] = useState("0:45");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [reelUrl, setReelUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchReels = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/site-content/reels");
      const data = await res.json();
      if (data.success && Array.isArray(data.reels)) {
        setReels(data.reels);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load reels", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReels();
  }, [fetchReels]);

  const handleOpenAddModal = () => {
    setEditingReel(null);
    setTitle("");
    setCategory("Culture");
    setDuration("0:45");
    setThumbnailUrl("");
    setReelUrl("");
    setVideoUrl("");
    setIsActive(true);
    setModalOpen(true);
  };

  const handleOpenEditModal = (reel: SpotlightReel) => {
    setEditingReel(reel);
    setTitle(reel.title);
    setCategory(reel.category || "Culture");
    setDuration(reel.duration || "0:45");
    setThumbnailUrl(reel.thumbnailUrl);
    setReelUrl(reel.reelUrl || "");
    setVideoUrl(reel.videoUrl || "");
    setIsActive(reel.isActive !== false);
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setThumbnailUrl(data.url);
        showToast("Thumbnail uploaded to Cloudinary!");
      } else {
        showToast(data.error || "Upload failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error uploading file", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !thumbnailUrl.trim()) {
      showToast("Title and Thumbnail are required", "error");
      return;
    }

    setSaving(true);
    try {
      const payload: Partial<SpotlightReel> = {
        id: editingReel ? editingReel.id : `reel-${Date.now()}`,
        title: title.trim(),
        category: category.trim(),
        duration: duration.trim(),
        thumbnailUrl: thumbnailUrl.trim(),
        reelUrl: reelUrl.trim(),
        videoUrl: videoUrl.trim(),
        isActive,
        order: editingReel?.order ?? reels.length,
      };

      const res = await fetch("/api/site-content/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showToast(editingReel ? "Reel updated successfully!" : "New reel added!");
        setModalOpen(false);
        fetchReels();
      } else {
        showToast(data.error || "Save failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to save reel", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteReel = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reel?")) return;

    try {
      const res = await fetch(`/api/site-content/reels?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("Reel deleted");
        fetchReels();
      } else {
        showToast(data.error || "Delete failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to delete", "error");
    }
  };

  const handleToggleActive = async (reel: SpotlightReel) => {
    const updated = reels.map((r) =>
      r.id === reel.id ? { ...r, isActive: !r.isActive } : r
    );
    setReels(updated);

    try {
      await fetch("/api/site-content/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reels: updated }),
      });
      showToast(`Reel ${reel.isActive ? "hidden" : "activated"}`);
    } catch (err) {
      console.error(err);
      fetchReels();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              ← Back to Site
            </Link>
            <span className="text-slate-300">|</span>
            <h1 className="text-xl font-bold text-slate-950">Spotlight Reels Admin</h1>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-black hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-xs hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add New Reel
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">Homepage Spotlight Reels</h2>
            <p className="text-sm text-slate-500 mt-1">
              Manage video stories and reels displayed under &quot;Behind the Scenes at StitchByte&quot;.
            </p>
          </div>

          <button
            onClick={fetchReels}
            className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        {/* Reels List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-slate-600" />
            <p className="text-sm font-medium">Loading reels from database...</p>
          </div>
        ) : reels.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <p className="text-slate-600 font-medium">No reels found.</p>
            <button
              onClick={handleOpenAddModal}
              className="mt-4 inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              Add First Reel
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reels.map((reel) => (
              <div
                key={reel.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Thumbnail Preview with Overlays */}
                <div className="relative aspect-[9/15] bg-slate-900 overflow-hidden group">
                  <Image
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                  {/* Top Tags */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/30 backdrop-blur-md text-white border border-white/20">
                      {reel.category || "Culture"}
                    </span>
                    <span className="text-[11px] font-mono text-white/90 font-medium">
                      {reel.duration || "0:45"}
                    </span>
                  </div>

                  {/* Center Play Icon Preview */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Title */}
                  <div className="absolute bottom-3 inset-x-3 z-10">
                    <h3 className="text-white text-xs sm:text-sm font-bold line-clamp-2 leading-tight">
                      {reel.title}
                    </h3>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-3.5 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
                  <button
                    onClick={() => handleToggleActive(reel)}
                    className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      reel.isActive !== false
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                    }`}
                    title={reel.isActive !== false ? "Active on homepage" : "Hidden"}
                  >
                    {reel.isActive !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{reel.isActive !== false ? "Active" : "Hidden"}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {reel.reelUrl && (
                      <a
                        href={reel.reelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        title="View Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleOpenEditModal(reel)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReel(reel.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Add / Edit Reel */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-xl font-bold text-slate-950">
                {editingReel ? "Edit Spotlight Reel" : "Add New Spotlight Reel"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReel} className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Reel Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. StitchByte dhaba pe yeh sab milega 👨‍🍳🍲"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Category & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Category Tag
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-black"
                  >
                    <option value="Culture">👥 Culture</option>
                    <option value="Our Process">⚙️ Our Process</option>
                    <option value="Client Stories">❤️ Client Stories</option>
                    <option value="Work Life">⚡ Work Life</option>
                    <option value="Behind the Scenes">🎬 Behind the Scenes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0:42"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Thumbnail URL & Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Thumbnail Image *
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="/reels/... or Cloudinary image URL"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-black"
                  />

                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      {uploading ? "Uploading..." : "Upload from Device"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    {thumbnailUrl && (
                      <span className="text-xs text-emerald-600 font-medium">✓ Thumbnail set</span>
                    )}
                  </div>
                </div>

                {/* Thumbnail Preview */}
                {thumbnailUrl && (
                  <div className="mt-3 relative w-24 aspect-[9/15] rounded-xl overflow-hidden border border-slate-200">
                    <Image src={thumbnailUrl} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              {/* Instagram Reel or Watch Link */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Instagram Reel / Watch Link
                </label>
                <input
                  type="url"
                  placeholder="https://www.instagram.com/reel/..."
                  value={reelUrl}
                  onChange={(e) => setReelUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Direct Video URL (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Direct Video MP4 URL (Optional for inline playback)
                </label>
                <input
                  type="url"
                  placeholder="https://.../video.mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-slate-300 text-black focus:ring-black"
                />
                <label htmlFor="activeCheck" className="text-sm font-medium text-slate-700">
                  Visible on Homepage
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="px-6 py-2 rounded-xl bg-black hover:bg-slate-800 text-white text-sm font-semibold transition-all flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingReel ? "Save Changes" : "Create Reel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-sm font-medium ${
            toast.type === "success"
              ? "bg-white text-slate-900 border-emerald-200 shadow-emerald-500/10"
              : "bg-white text-slate-900 border-rose-200 shadow-rose-500/10"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-500" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
