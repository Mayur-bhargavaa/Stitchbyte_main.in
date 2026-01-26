import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import JobPosition from '@/models/JobPosition';

// GET - Fetch a single job position by slug
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;
        const job = await JobPosition.findOne({ slug });

        if (!job) {
            return NextResponse.json(
                { success: false, error: 'Job position not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error fetching job position:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch job position' },
            { status: 500 }
        );
    }
}

// PUT - Update a job position
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;
        const body = await request.json();

        const job = await JobPosition.findOneAndUpdate(
            { slug },
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!job) {
            return NextResponse.json(
                { success: false, error: 'Job position not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error updating job position:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update job position' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a job position
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;
        const job = await JobPosition.findOneAndDelete({ slug });

        if (!job) {
            return NextResponse.json(
                { success: false, error: 'Job position not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Job position deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting job position:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete job position' },
            { status: 500 }
        );
    }
}
