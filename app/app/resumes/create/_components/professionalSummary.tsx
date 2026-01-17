"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { T_Resume } from "@/types/resumeInfos";
import { Crown, Plus, Sparkles } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useConfirm } from "@/components/general/confirmContext";
import { enhaceProfessionalSummary } from "@/actions/openai/enhaceJobDescription";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HtmlEditor from "@/components/general/htmlEditor";
import { RiSparklingFill } from "react-icons/ri";
import { Spinner } from "@/components/ui/spinner";
export const reactions = [
  {
    value: 80,
    reaction: "😞",
  },
  {
    value: 160,
    reaction: "😕",
  },
  {
    value: 240,
    reaction: "😐",
  },
  {
    value: 320,
    reaction: "🙂",
  },
  {
    value: 400,
    reaction: "😊",
  },
];
const ProfessionalSummary = ({
  data,
  setData,
}: {
  data: T_Resume;
  setData: Dispatch<SetStateAction<T_Resume>>;
}) => {
  const [filterVal, setFilterVal] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const confirm = useConfirm();

  async function handleEnhaceSummary() {
    setIsEnhancing(true);
    try {
      const res = await enhaceProfessionalSummary(
        data.professionalSummary.description
      );
      const confirmed = await confirm({
        title: "AI Enhanced Summary",
        description: res,
        confirmText: "Use This",
        cancelText: "Cancel",
      });
      if (confirmed) {
        setData((prev) => ({
          ...prev,
          professionalSummary: {
            ...prev.professionalSummary,
            description: res,
          },
        }));
      }
    } catch (error) {
      console.error("Failed to enhance summary:", error);
    } finally {
      setIsEnhancing(false);
    }
  }

  const summaries = [
    "Passionate and results-driven professional with extensive experience in delivering high-quality solutions. Proven track record of leading cross-functional teams and driving strategic initiatives that exceed business objectives.",
    "Dynamic marketing specialist with 5+ years of experience in digital strategy and brand development. Expert in leveraging data analytics to optimize campaigns and increase ROI by 150%.",
    "Innovative software engineer specializing in full-stack development and cloud architecture. Successfully deployed scalable applications serving millions of users with 99.9% uptime.",
    "Detail-oriented financial analyst with expertise in risk management and investment strategies. Consistently identified cost-saving opportunities resulting in $2M+ annual savings.",
    "Creative graphic designer with a keen eye for visual storytelling and brand identity. Award-winning portfolio spanning Fortune 500 companies and emerging startups.",
    "Strategic project manager certified in Agile and Scrum methodologies. Led 30+ projects from conception to completion, delivering 95% on-time and within budget.",
    "Enthusiastic customer success manager dedicated to building lasting client relationships. Achieved 98% customer retention rate and increased NPS scores by 40 points.",
    "Experienced HR professional specializing in talent acquisition and organizational development. Successfully reduced time-to-hire by 35% while improving candidate quality.",
    "Skilled data scientist with expertise in machine learning and predictive analytics. Developed models that increased revenue forecasting accuracy by 60%.",
    "Versatile content writer and SEO specialist with proven ability to drive organic traffic growth. Increased website visitors by 300% through strategic content marketing.",
    "Accomplished sales executive with consistent track record of exceeding quotas. Generated $10M+ in new business revenue and expanded client base by 200%.",
    "Proactive business analyst with strong problem-solving skills and technical acumen. Streamlined operations processes resulting in 40% efficiency improvements.",
    "Dedicated registered nurse with 8+ years of critical care experience. Known for compassionate patient care and maintaining excellence in high-pressure environments.",
    "Motivated mechanical engineer with expertise in CAD design and manufacturing processes. Optimized production workflows reducing costs by 25% annually.",
    "Ambitious educator passionate about student development and innovative teaching methods. Improved student performance metrics by 45% through personalized learning approaches.",
    "Results-oriented operations manager with expertise in supply chain optimization. Reduced logistics costs by 30% while improving delivery times by 20%.",
    "Tech-savvy cybersecurity analyst protecting enterprise systems from emerging threats. Successfully prevented security breaches and maintained 100% compliance standards.",
    "Charismatic public relations specialist with extensive media relations experience. Secured 500+ media placements and managed crisis communications for major brands.",
    "Analytical business intelligence developer creating actionable insights from complex datasets. Built dashboards that enabled executive teams to make faster, data-driven decisions.",
    "Committed social worker advocating for vulnerable populations and community development. Successfully connected 1,000+ individuals with essential resources and support services.",
  ];

  const filteredSumaries = summaries.filter((item) =>
    item.toLocaleLowerCase().includes(filterVal.toLocaleLowerCase())
  );
  return (
    <div className="bg-background p-4 space-y-5">
      <div className="flex flex-col gap-0.5">
        <span className="font-semibold font-serif">Professional Summary</span>
        <span className="text-xs font-light text-foreground/50">
          Write 2-4 short, energitic sentences how great you are. Mention the
          role and what youdid. What were the big acheivements? describe your
          motivation and list your skills.
        </span>
      </div>
      <div className="flex items-center gap-1 ">
        <div className="flex flex-col gap-1 flex-1 ">
          <label className="text-sm font-light text-foreground/60">
            Description
          </label>
          <div className="h-auto  w-full bg-muted rounded-lg flex flex-col  overflow-hidden">
            {/* <div className="flex items-center justify-end p-2 gap-2 relative border-b border-background">
             
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-background  rounded-full text-green-500 hover:text-green-700 hover:bg-background/80"
                    size="sm"
                  >
                    Get inspired
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex absolute top-0 left-0 border-b w-full items-center gap-2 px-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M17 17L21 21"
                          stroke="#323232"
                          className="stroke-foreground/50"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                          stroke="#323232"
                          stroke-width="2"
                          className="stroke-foreground/50"
                        ></path>{" "}
                      </g>
                    </svg>
                    <input
                      value={filterVal}
                      onChange={(e) => setFilterVal(e.target.value)}
                      className="bg-transparent border-0 w-full outline-0 h-12"
                      placeholder="Filter phrases by keyword and job title"
                    />
                  </div>

                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <div className="mt-2 flex flex-col gap-4">
                    <div className="flex flex-col gap-4 overflow-y-scroll max-h-120">
                      <span className="text-sm font-light text-yellow-400 flex items-center gap-2">
                        <Crown strokeWidth={1} className="w-5" /> MOST POPULAR
                      </span>
                      {filteredSumaries.map((summary, index) => (
                        <div
                          className="group flex flex-row gap-4 items-start cursor-pointer"
                          key={index}
                          onClick={() =>
                            setData((prev) => ({
                              ...prev,
                              professionalSummary: {
                                ...prev.professionalSummary,
                                description:
                                  prev.professionalSummary.description +
                                  `${summary}`,
                              },
                            }))
                          }
                        >
                          <Button className="w-8 h-8 rounded-full bg-muted text-foreground/50 text-lg mt-1 group-hover:text-primary group-hover:bg-primary/10 hover:text-foreground/50">
                            <Plus />
                          </Button>
                          <div className="p-0 text-sm font-light text-foreground/60 group-hover:text-primary">
                            {summary}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div> */}
            <HtmlEditor
              sufix={
                <Button
                  onClick={handleEnhaceSummary}
                  disabled={
                    isEnhancing || !data.professionalSummary.description
                  }
                  className="bg-background  rounded-full text-indigo-500 hover:text-indigo-700 hover:bg-background/80 disabled:opacity-50"
                  size="sm"
                >
                  {isEnhancing ? <Spinner/> : <RiSparklingFill />}
                  {isEnhancing ? "Enhancing..." : "Enhace with AI"}
                </Button>
              }
              value={data?.professionalSummary.description}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  professionalSummary: {
                    ...prev.professionalSummary,
                    description: e,
                  },
                }))
              }
              className="bg-muted w-full border-0  shadow-none rounded-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-light text-foreground/50">
              Tip: write 400-600 characters to increase interview chances
            </span>
            <div className="flex items-center  text-xs">
              <span>{data.professionalSummary.description.length}</span>
              <span className="text-foreground/50">/400</span>
              <span className="text-lg ml-2">
                {[...reactions]
                  .reverse()
                  .find(
                    (reaction) =>
                      data.professionalSummary.description.length >=
                      reaction.value
                  )?.reaction || "🧐"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
