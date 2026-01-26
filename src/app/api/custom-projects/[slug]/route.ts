import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import CustomProject from '@/models/CustomProject';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;
        const project = await CustomProject.findOne({ slug, isActive: true });

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error fetching custom project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch custom project' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;
        const body = await request.json();

        const project = await CustomProject.findOneAndUpdate(
            { slug },
            body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error updating custom project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update custom project' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;
        const project = await CustomProject.findOneAndDelete({ slug });

        if (!project) {
            return NextResponse.json(
                { success: false, error: 'Project not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting custom project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete custom project' },
            { status: 500 }
        );
    }
}
