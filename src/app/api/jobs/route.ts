import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import JobPosition from '@/models/JobPosition';

// GET - Fetch all active job positions
export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const department = searchParams.get('department');
        const type = searchParams.get('type');
        const includeInactive = searchParams.get('includeInactive') === 'true';

        // Build query
        const query: Record<string, unknown> = {};
        if (!includeInactive) {
            query.isActive = true;
        }
        if (department) {
            query.department = department;
        }
        if (type) {
            query.type = type;
        }

        const jobs = await JobPosition.find(query)
            .sort({ isFeatured: -1, order: 1, createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: jobs,
            count: jobs.length
        });
    } catch (error) {
        console.error('Error fetching job positions:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch job positions' },
            { status: 500 }
        );
    }
}

// POST - Create a new job position
export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        // Generate slug if not provided
        if (!body.slug && body.title) {
            body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }

        const job = await JobPosition.create(body);

        return NextResponse.json({
            success: true,
            data: job
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating job position:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create job position' },
            { status: 500 }
        );
    }
}
