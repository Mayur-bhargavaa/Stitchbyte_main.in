import { getCustomProjects } from "@/lib/content";
import CustomizedClient from "./CustomizedClient";

export const revalidate = 3600;

export default async function CustomizedPage() {
    const projects = await getCustomProjects();
    return <CustomizedClient initialProjects={projects} />;
}
