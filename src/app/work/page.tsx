import { getMarketingStudiesStrict } from "@/lib/content";
import WorkClient from "./WorkClient";

export const revalidate = 3600;

export default async function WorkPage() {
  const studies = await getMarketingStudiesStrict();
  return <WorkClient studies={studies} />;
}
