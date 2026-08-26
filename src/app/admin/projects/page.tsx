"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Pencil, Check, X, RefreshCw, Eye, EyeOff,
    ExternalLink, AlertCircle, CheckCircle2, Loader2,
    Link as LinkIcon, ArrowUpDown, Globe, Smartphone
} from "lucide-react";

interface Project {
    id: string;
    title: string;
    slug: string;
    link: string;
    category: "websites" | "applications";
    isActive: boolean;
    order: number;
    image: string;
}

function slugify(raw: string): string {
    return raw
        .toLowerCase()
        .replace(/[—–]/g, "-")
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

type ToastType = "success" | "error";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Partial<Project>>({});
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, []);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/custom-projects");
            const data = await res.json();
            if (data.success) {
                // Include all projects (active + inactive)
                setProjects(data.data.sort((a: Project, b: Project) => a.order - b.order));
            }
        } catch {
            showToast("Failed to load projects", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    const startEdit = (project: Project) => {
        setEditingId(project.id);
        setEditValues({
            title: project.title,
            slug: project.slug,
            link: project.link,
            order: project.order,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValues({});
    };

    const saveEdit = async (project: Project) => {
        setSaving(project.id);
        try {
            const res = await fetch(`/api/custom-projects/${project.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editValues),
            });
            const data = await res.json();
            if (data.success) {
                showToast(`✓ "${project.title}" updated successfully`);
                setEditingId(null);
                setEditValues({});
                await fetchProjects();
            } else {
                showToast(data.error || "Failed to save", "error");
            }
        } catch {
            showToast("Network error — please try again", "error");
        } finally {
            setSaving(null);
        }
    };

    const toggleActive = async (project: Project) => {
        setSaving(project.id);
        try {
            const res = await fetch(`/api/custom-projects/${project.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !project.isActive }),
            });
            const data = await res.json();
            if (data.success) {
                showToast(`${project.isActive ? "Hidden" : "Published"}: ${project.title}`);
                await fetchProjects();
            } else {
                showToast(data.error || "Failed to update", "error");
            }
        } catch {
            showToast("Network error", "error");
        } finally {
            setSaving(null);
        }
    };

    const previewSlug = editValues.slug ? slugify(editValues.slug) : "";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Custom Projects Manager</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Edit slugs, titles, links and visibility</p>
                    </div>
                    <button
                        onClick={fetchProjects}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-24 text-gray-500">No projects found.</div>
                ) : (
                    <div className="space-y-4">
                        {projects.map(project => {
                            const isEditing = editingId === project.id;
                            const isSaving = saving === project.id;
                            const cleanSlug = isEditing ? slugify(editValues.slug || "") : project.slug;
                            const liveUrl = `https://stitchbyte.in/customized/${cleanSlug}`;

                            return (
                                <div
                                    key={project.id}
                                    className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                                        isEditing ? "border-indigo-300 shadow-lg ring-2 ring-indigo-100" :
                                        !project.isActive ? "border-gray-200 opacity-60" : "border-gray-200 shadow-sm"
                                    }`}
                                >
                                    <div className="p-5 sm:p-6">
                                        <div className="flex items-start gap-4">
                                            {/* Order Badge */}
                                            <div className="flex-shrink-0 w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                                                <span className="text-sm font-bold text-gray-500">#{project.order}</span>
                                            </div>

                                            {/* Main Content */}
                                            <div className="flex-1 min-w-0">
                                                {isEditing ? (
                                                    <div className="space-y-4">
                                                        {/* Title */}
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Title</label>
                                                            <input
                                                                type="text"
                                                                value={editValues.title || ""}
                                                                onChange={e => setEditValues(v => ({ ...v, title: e.target.value }))}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                                                placeholder="Project title"
                                                            />
                                                        </div>

                                                        {/* Slug */}
                                                        <div>
                                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                                Slug <span className="text-gray-400 font-normal normal-case">(URL path)</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={editValues.slug || ""}
                                                                onChange={e => setEditValues(v => ({ ...v, slug: e.target.value }))}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                                                placeholder="my-project-slug"
                                                            />
                                                            {editValues.slug && (
                                                                <div className="mt-2 px-3 py-2 bg-indigo-50 border border-indigo-100 rounded-lg">
                                                                    <p className="text-xs text-indigo-600 font-medium">Preview URL:</p>
                                                                    <p className="text-xs text-indigo-800 font-mono break-all mt-0.5">
                                                                        https://stitchbyte.in/customized/<strong>{previewSlug}</strong>
                                                                    </p>
                                                                    {previewSlug !== editValues.slug && (
                                                                        <p className="text-xs text-amber-600 mt-1">
                                                                            ⚠ Auto-cleaned from &quot;{editValues.slug}&quot; → &quot;{previewSlug}&quot;
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Link + Order row */}
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Live Demo Link</label>
                                                                <input
                                                                    type="url"
                                                                    value={editValues.link || ""}
                                                                    onChange={e => setEditValues(v => ({ ...v, link: e.target.value }))}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                                                    placeholder="https://example.com"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                                                    <ArrowUpDown className="inline w-3 h-3 mr-1" />
                                                                    Display Order
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    value={editValues.order ?? 0}
                                                                    onChange={e => setEditValues(v => ({ ...v, order: Number(e.target.value) }))}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                                                    min={0}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex items-center gap-2 pt-1">
                                                            <button
                                                                onClick={() => saveEdit(project)}
                                                                disabled={isSaving}
                                                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70"
                                                            >
                                                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                                Save Changes
                                                            </button>
                                                            <button
                                                                onClick={cancelEdit}
                                                                disabled={isSaving}
                                                                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-600 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                                                            >
                                                                <X className="w-4 h-4" />
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h2 className="text-base font-semibold text-gray-900">{project.title}</h2>
                                                            {!project.isActive && (
                                                                <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">Hidden</span>
                                                            )}
                                                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                                                                {project.category === "applications" ? <Smartphone className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                                                                {project.category}
                                                            </span>
                                                        </div>

                                                        <div className="mt-2 space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <LinkIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                                <code className="text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-mono break-all">
                                                                    /customized/{project.slug}
                                                                </code>
                                                            </div>
                                                            {project.link && (
                                                                <div className="flex items-center gap-2">
                                                                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                                    <a
                                                                        href={project.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-xs text-blue-600 hover:underline truncate"
                                                                    >
                                                                        {project.link}
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right Actions */}
                                            {!isEditing && (
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <a
                                                        href={liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="Preview on site"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                    <button
                                                        onClick={() => toggleActive(project)}
                                                        disabled={isSaving}
                                                        className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                                                            project.isActive
                                                                ? "text-green-600 hover:text-red-600 hover:bg-red-50"
                                                                : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                                                        }`}
                                                        title={project.isActive ? "Click to hide" : "Click to publish"}
                                                    >
                                                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                                         project.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={() => startEdit(project)}
                                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        title="Edit project"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Info Card */}
                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold text-amber-800">Slug Change Warning</p>
                            <p className="text-sm text-amber-700 mt-1">
                                Changing a slug will break any existing links or Google search results pointing to the old URL.
                                Make sure to add a redirect in <code className="bg-amber-100 px-1 rounded">next.config.ts</code> for the old slug before changing it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notifications */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all animate-fade-in ${
                            toast.type === "success"
                                ? "bg-gray-900 text-white"
                                : "bg-red-600 text-white"
                        }`}
                    >
                        {toast.type === "success"
                            ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                            : <AlertCircle className="w-4 h-4 text-red-200" />
                        }
                        {toast.message}
                    </div>
                ))}
            </div>
        </div>
    );
}
