import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// GET - Fetch all job openings
export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const jobs = await db.collection("jobs").find({ active: true }).sort({ createdAt: -1 }).toArray();

        return NextResponse.json({ jobs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}

// POST - Submit a job application
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Extract all fields from the comprehensive form
        const {
            // Job info
            jobId,
            jobTitle,

            // Personal Information
            firstName,
            lastName,
            name, // Combined name
            email,
            phone,
            dateOfBirth,
            gender,
            currentCity,
            currentState,
            permanentAddress,

            // Professional Information
            totalExperience,
            relevantExperience,
            currentCompany,
            currentDesignation,
            noticePeriod,
            currentSalary,
            expectedSalary,

            // Education (array of qualifications)
            educationList,
            // Legacy single education fields
            highestQualification,
            university,
            graduationYear,

            // Links
            linkedinUrl,
            portfolioUrl,
            githubUrl,
            resumeUrl,

            // Additional Information
            willingToRelocate,
            preferredWorkMode,
            howDidYouHear,
            referralName,
            coverLetter,
            additionalInfo,
        } = body;

        // Validate required fields
        const applicantName = name || `${firstName || ''} ${lastName || ''}`.trim();

        if (!applicantName || !email || !jobTitle) {
            return NextResponse.json(
                { error: "Name, email, and job title are required" },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();

        const application = {
            // Job info
            jobId: jobId || null,
            jobTitle,

            // Personal Information
            firstName: firstName || null,
            lastName: lastName || null,
            name: applicantName,
            email,
            phone: phone || null,
            dateOfBirth: dateOfBirth || null,
            gender: gender || null,
            currentCity: currentCity || null,
            currentState: currentState || null,
            permanentAddress: permanentAddress || null,

            // Professional Information
            totalExperience: totalExperience || null,
            relevantExperience: relevantExperience || null,
            currentCompany: currentCompany || null,
            currentDesignation: currentDesignation || null,
            noticePeriod: noticePeriod || null,
            currentSalary: currentSalary || null,
            expectedSalary: expectedSalary || null,

            // Education - support both new array format and legacy single fields
            educationList: educationList || null,
            highestQualification: highestQualification || (educationList?.[0]?.qualification) || null,
            university: university || (educationList?.[0]?.university) || null,
            graduationYear: graduationYear || (educationList?.[0]?.graduationYear) || null,

            // Links
            linkedinUrl: linkedinUrl || null,
            portfolioUrl: portfolioUrl || null,
            githubUrl: githubUrl || null,
            resumeUrl: resumeUrl || null,

            // Additional Information
            willingToRelocate: willingToRelocate || null,
            preferredWorkMode: preferredWorkMode || null,
            howDidYouHear: howDidYouHear || null,
            referralName: referralName || null,
            coverLetter: coverLetter || null,
            additionalInfo: additionalInfo || null,

            // Status and timestamps
            status: "new",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection("job_applications").insertOne(application);

        return NextResponse.json(
            { success: true, message: "Application submitted successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error submitting application:", error);
        return NextResponse.json(
            { error: "Failed to submit application" },
            { status: 500 }
        );
    }
}
