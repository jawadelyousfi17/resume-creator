"use client";

import PersonalDetails from "./_components/personalDetails";
import { Button } from "@/components/ui/button";
import RoundedIndex from "@/components/general/roundedIndex";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { T_Resume } from "@/types/resumeInfos";
import EmploymentHistory from "./_components/employementHistory";
import Education from "./_components/education";
import Skills from "./_components/skills";
import ProfessionalSummary from "./_components/professionalSummary";
import Hobbies from "./_components/hoobies";
import Language from "./_components/languages";
import Internships from "./_components/internship";
import Courses from "./_components/courses";
import CustomSection from "./_components/custom";

import Review from "./_components/review";

import { calculateScore } from "./_utils/score";
import ResumePreview from "./_components/ResumePreview";
import { Resume } from "@/lib/generated/prisma";
import { updateResumeById } from "@/actions/resume/updateResumeById";
import toast from "react-hot-toast";
import NewResumeCard from "./_components/cards/newResume";
import { useRouter } from "next/navigation";

import ResumeTemplate1 from "@/components/resume/templates/t1";
import ResumeTemplate2 from "@/components/resume/templates/t2";
import ResumeTemplate3 from "@/components/resume/templates/t3";
import ResumeTemplate4 from "@/components/resume/templates/t4";
import ResumeTemplate5 from "@/components/resume/templates/t5";
import ResumeTemplate6 from "@/components/resume/templates/t6";
import { templates } from "@/_templates";
import { RiSparklingFill } from "react-icons/ri";
import Tailor from "./_components/tailor";
import ResumeStartDialog, {
  ResumeStartMode,
} from "./_components/ResumeStartDialog";
import { parseResumeFromFile } from "@/actions/resume/parseResumeFromFile";
import { normalizeResume } from "./_utils/normalizeResume";

const defaultSections = [
  {
    section: PersonalDetails,
    id: 1,
    active: true,
    sectionTitle: "Personal Details",
  },
  {
    section: EmploymentHistory,
    id: 2,
    active: true,
    sectionTitle: "Employment History",
  },
  { section: Education, id: 3, active: true, sectionTitle: "Education" },
  { section: Skills, id: 4, active: true, sectionTitle: "Skills" },
  {
    section: ProfessionalSummary,
    id: 5,
    active: true,
    sectionTitle: "Professional Summary",
  },
  { section: Hobbies, id: 6, active: false, sectionTitle: "Hobbies" },
  { section: Language, id: 7, active: false, sectionTitle: "Languages" },
  { section: Courses, id: 8, active: false, sectionTitle: "Courses" },
  {
    section: CustomSection,
    id: 9,
    active: false,
    sectionTitle: "Custom Section",
  },
  {
    section: Internships,
    id: 10,
    active: false,
    sectionTitle: "Internships",
  },
];

const CreateResume = ({
  resume,
  isEmpty,
  tab,
}: {
  resume: Resume;
  isEmpty: boolean;
  tab: string;
}) => {
  const [data, setData] = useState<T_Resume>(
    resume?.content as unknown as T_Resume
  );
  const [mounted, setMounted] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [startMode, setStartMode] = useState<ResumeStartMode | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const template = templates[resume.template];

  const [next, setNext] = useState("");

  const getSectionsForResume = (resumeData: T_Resume) => {
    return defaultSections.map((section) => {
      // Keep default active sections always active
      if (section.active) return section;

      // Check if section has data and activate accordingly
      let hasData = false;

      switch (section.id) {
        case 6: // Hobbies
          hasData =
            !!resumeData?.hobbies && resumeData.hobbies.trim().length > 0;
          break;
        case 7: // Languages
          hasData = resumeData?.languages && resumeData.languages.length > 0;
          break;
        case 8: // Courses
          hasData = resumeData?.courses && resumeData.courses.length > 0;
          break;
        case 9: // Custom Section (Additional)
          hasData =
            resumeData?.additional &&
            resumeData.additional.some((group) => group.sections.length > 0);
          break;
        case 10: // Internships
          hasData =
            resumeData?.internships && resumeData.internships.length > 0;
          break;
      }

      return { ...section, active: hasData };
    });
  };

  const [sections, setSections] = useState(() =>
    getSectionsForResume(resume?.content as unknown as T_Resume)
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeSections = [...sections.filter((s) => s.active)];

  let step__;
  if (tab === "review") {
    step__ = activeSections.length + 2;
  } else if (tab === "tailor") {
    step__ = activeSections.length + 3;
  } else step__ = 1;
  const [step, setStep] = useState(step__);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const update = async () => {
      try {
        const newResume = await updateResumeById(resume?.id, data);
      } catch (error) {
        console.error("Error saving resume:", error);
      }
    };

    timeoutRef.current = setTimeout(() => {
      update();
    }, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, resume?.id]);

  useEffect(() => {
    (() => {})();
  }, [data]);

  // Save step to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("resumeStep", step.toString());
    } catch (error) {
      console.error("Error saving step to localStorage:", error);
    }
  }, [step]);

  // Save sections state to localStorage
  useEffect(() => {
    try {
      // Save without component references
      const sectionsToSave = sections.map(({ section, ...rest }) => rest);
      localStorage.setItem("resumeSections", JSON.stringify(sectionsToSave));
    } catch (error) {
      console.error("Error saving sections to localStorage:", error);
    }
  }, [sections]);

  const isEndScreen = step === activeSections.length + 1;
  const isReview = step === activeSections.length + 2;
  const isTailoring = tab === "tailor";

  const score = calculateScore(data);

  const handleToggleSection = (sectionId: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, active: !section.active }
          : section
      )
    );
    // Navigate to the newly activated section
    const currentActiveCount = sections.filter((s) => s.active).length;
    setStep(currentActiveCount + 1);
  };

  useEffect(() => {
    if (step > activeSections.length + 2) {
      // Past review screen
      setNext("Finish");
    } else if (step === activeSections.length + 1) {
      // On end screen
      setNext("Review");
    } else if (step === activeSections.length + 2) {
      // On review screen
      setNext("Finish");
    } else {
      const activeFiltered = activeSections.filter((s) => s.id > step);
      if (activeFiltered.length) {
        setNext(activeFiltered[0].sectionTitle);
      } else {
        setNext("Add Sections");
      }
    }
  }, [step, activeSections]);

  if (!mounted) return null;

  return (
    <>
      <ResumeStartDialog
        open={startOpen}
        mode={startMode}
        uploading={uploadingResume}
        uploadError={uploadError}
        onSelectMode={(mode) => {
          if (mode === "analyze") {
            router.push("/app/analyze");
            return;
          }

          if (mode === "scratch") {
            setStartMode(mode);
            setStartOpen(false);
            return;
          }

          setStartMode(mode);
        }}
        onContinueUpload={async (file) => {
          setUploadError(null);
          setUploadingResume(true);

          const result = await parseResumeFromFile(file);

          if (result.error || !result.data) {
            setUploadError(result.error || "Failed to parse resume");
            setUploadingResume(false);
            return;
          }

          const normalized = normalizeResume(result.data);
          setData(normalized);
          setSections(getSectionsForResume(normalized));
          setStep(1);
          setStartOpen(false);
          setUploadingResume(false);
          toast.success("Resume imported");
        }}
      />
      <main className="flex flex-col bg-muted h-svh">
        {/* <nav className="flex justify-center items-center">EDIT - CUSTOMIZE</nav> */}
        <div
          className={`flex ${
            isReview && "flex-row-reverse"
          } h-[calc(100svh-70px)]`}
        >
          <div className="flex flex-col gap-1 flex-1 overflow-y-scroll">
            {/* <div className="overflow-hidden relative flex justify-between items-center bg-background  p-4">
            <div className="absolute top-0 left-0 w-[85%] h-full bg-green-500 opacity-20 z-5"></div>
            <div className="flex gap-2 items-center z-10">
              <span className="bg-green-600 flex justify-center items-center px-2 py-1 rounded-sm text-white font-semibold text-sm">
                {score}%
              </span>
              <span className="text-sm text-foreground">Your resume score</span>
            </div>
          </div> */}

            {activeSections.map(
              (item, index) =>
                step === index + 1 && (
                  <item.section key={item.id} setData={setData} data={data} />
                )
            )}

            {isEndScreen && (
              <div className="bg-background p-4 space-y-5">
                <div className="flex flex-col">
                  <span className="text-lg font-serif font-semibold">
                    Add additional Sections
                  </span>
                  <span className="text-xs text-foreground/50 font-light">
                    Here is description that you can add or skip without it
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {sections
                    .filter((s) => !s.active)
                    .map((section) => (
                      <div
                        key={section.id}
                        onClick={() => handleToggleSection(section.id)}
                        className="justify-start flex flex-row items-center gap-2 cursor-pointer hover:text-primary p-3 border border-border/5 bg-muted rounded-lg group transition-all"
                      >
                        <svg
                          className="h-7 w-7"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <circle
                              opacity="0.5"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="#1C274C"
                              stroke-width="1.5"
                              className="group-hover:stroke-primary"
                            ></circle>{" "}
                            <path
                              d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                              stroke="#1C274C"
                              className="group-hover:stroke-primary"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>{" "}
                          </g>
                        </svg>
                        <span className="text-sm font-semibold">
                          {section.sectionTitle}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {isReview && <Review data={data} setData={setData} />}
            {isTailoring && (
              <div>
                <div className="flex-1 px-4 flex flex-col overflow-y-scroll gap-3 ">
                  <Tailor
                    resume={resume}
                    sections={activeSections}
                    data={data}
                    setData={setData}
                  />
                </div>
              </div>
            )}

            {!isTailoring && (
              <div className="bg-background p-4 flex justify-between items-center sticky bottom-0 border-t-4 border-muted">
                {" "}
                <div>
                  {step > 1 && (
                    <Button
                      onClick={() => setStep((prev) => prev - 1)}
                      variant="outline"
                      className="bg-muted border-0 shadow-none"
                    >
                      Back
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <RoundedIndex
                    totalSteps={activeSections.length + 2}
                    index={step - 1}
                  />
                  {/* <div cl */}
                </div>
                <Button
                  onClick={() => setStep((prev) => prev + 1)}
                  className="bg-primary border-0 shadow-none"
                >
                  {!isReview && (
                    <>
                      Next <ArrowRight />
                    </>
                  )}

                  {isReview && <>Done</>}
                </Button>
              </div>
            )}
          </div>
          {!isReview && (
            <div className="flex-1 h-svh overflow-hidden">
              <ResumePreview Template={template.template} data={data} />
            </div>
          )}

          {isReview && (
            <div className="flex-1 px-4 flex flex-col overflow-y-scroll gap-3 ">
              {activeSections.map((item, index) => (
                <item.section key={item.id} setData={setData} data={data} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CreateResume;
