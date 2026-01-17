import { createResume } from "@/actions/resume/createResume";
import CreateResume from "./createResume";
import { redirect } from "next/navigation";
import { getResumeById } from "@/actions/resume/getResumeById";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; isempty?: string; tab?: string }>;
}) => {
  let { id, isempty, tab } = await searchParams;

  if (!id) {
    const { data, error } = await createResume();
    if (error || !data?.id) {
      return <>ERROR</>;
    }
    redirect(`/app/resumes/create?id=${data.id}&isempty=true`);
  } else {
    const resume = await getResumeById(id);
    if (resume)
      return (
        <CreateResume resume={resume} isEmpty={false} tab={tab || "details"} />
      );
  }

  return <>NOT FOUND</>;
};

export default page;
