import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import CustomProject from '@/models/CustomProject';

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const query: Record<string, unknown> = { isActive: true };
        if (category && category !== 'all') {
            query.category = category;
        }

        const projects = await CustomProject.find(query).sort({ order: 1, createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: projects,
            count: projects.length
        });
    } catch (error) {
        console.error('Error fetching custom projects:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch custom projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        // Generate slug if not provided
        if (!body.slug && body.title) {
            body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }

        // Generate id if not provided
        if (!body.id && body.slug) {
            body.id = body.slug;
        }

        const project = await CustomProject.create(body);

        return NextResponse.json({
            success: true,
            data: project
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating custom project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create custom project' },
            { status: 500 }
        );
    }
}
