import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import CustomProject from '@/models/CustomProject';

function sanitizeSlug(raw: string): string {
    return raw
        .toLowerCase()
        .replace(/[—–]/g, '-')
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// GET by slug or id
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const project = await CustomProject.findOne({
            $or: [{ id }, { slug: id }],
            isActive: true
        });

        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        console.error('Error fetching custom project:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch custom project' }, { status: 500 });
    }
}

// PATCH — update slug, title, isActive, order, link, image
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        const { slug, title, isActive, order, link, image } = body;

        const updates: Record<string, unknown> = { updatedAt: new Date() };

        if (slug !== undefined) {
            const clean = sanitizeSlug(slug);
            if (!clean) {
                return NextResponse.json({ success: false, error: 'Slug cannot be empty' }, { status: 400 });
            }
            const existing = await CustomProject.findOne({ slug: clean, id: { $ne: id } });
            if (existing) {
                return NextResponse.json(
                    { success: false, error: `Slug "${clean}" is already in use by "${existing.title}"` },
                    { status: 409 }
                );
            }
            updates.slug = clean;
            updates.id = clean;
        }

        if (title !== undefined) updates.title = title;
        if (isActive !== undefined) updates.isActive = isActive;
        if (order !== undefined) updates.order = Number(order);
        if (link !== undefined) updates.link = link;
        if (image !== undefined) updates.image = image;

        const project = await CustomProject.findOneAndUpdate(
            { $or: [{ id }, { slug: id }] },
            { $set: updates },
            { new: true }
        );

        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        console.error('Error updating custom project:', error);
        return NextResponse.json({ success: false, error: 'Failed to update project' }, { status: 500 });
    }
}

// PUT — full update by slug or id
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const project = await CustomProject.findOneAndUpdate(
            { $or: [{ id }, { slug: id }] },
            body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        console.error('Error updating custom project:', error);
        return NextResponse.json({ success: false, error: 'Failed to update custom project' }, { status: 500 });
    }
}

// DELETE — soft delete (isActive = false)
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const project = await CustomProject.findOneAndUpdate(
            { $or: [{ id }, { slug: id }] },
            { $set: { isActive: false, updatedAt: new Date() } },
            { new: true }
        );

        if (!project) {
            return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: 'Project hidden (isActive = false)' });
    } catch (error) {
        console.error('Error hiding project:', error);
        return NextResponse.json({ success: false, error: 'Failed to hide project' }, { status: 500 });
    }
}
