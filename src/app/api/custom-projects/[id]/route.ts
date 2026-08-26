import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import CustomProject from '@/models/CustomProject';

// Helper: sanitize slug — lowercase, only a-z, 0-9, hyphens
function sanitizeSlug(raw: string): string {
    return raw
        .toLowerCase()
        .replace(/[—–]/g, '-')   // em/en dash → hyphen
        .replace(/&/g, 'and')   // & → and
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const body = await request.json();
        const { slug, title, isActive, order, link, image } = body;

        const updates: Record<string, unknown> = { updatedAt: new Date() };

        if (slug !== undefined) {
            const clean = sanitizeSlug(slug);
            if (!clean) {
                return NextResponse.json({ success: false, error: 'Slug cannot be empty' }, { status: 400 });
            }
            // Check uniqueness (excluding current doc)
            const existing = await CustomProject.findOne({ slug: clean, id: { $ne: params.id } });
            if (existing) {
                return NextResponse.json({ success: false, error: `Slug "${clean}" is already in use by "${existing.title}"` }, { status: 409 });
            }
            updates.slug = clean;
            // Keep id in sync if it previously matched the old slug
            updates.id = clean;
        }

        if (title !== undefined) updates.title = title;
        if (isActive !== undefined) updates.isActive = isActive;
        if (order !== undefined) updates.order = Number(order);
        if (link !== undefined) updates.link = link;
        if (image !== undefined) updates.image = image;

        const project = await CustomProject.findOneAndUpdate(
            { id: params.id },
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

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const project = await CustomProject.findOneAndUpdate(
            { id: params.id },
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
