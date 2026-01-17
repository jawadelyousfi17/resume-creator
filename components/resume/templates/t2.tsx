"use client";

import { T_Resume } from "@/types/resumeInfos";
import { formatMonthYear } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { Montserrat, Open_Sans } from "next/font/google";
import DOMPurify from "isomorphic-dompurify";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
const openSans = Open_Sans({ subsets: ["latin"] });

const SanitizedHtml = ({
  html,
  className,
}: {
  html: string;
  className?: string;
}) => {
  const clean = DOMPurify.sanitize(html);
  return (
    <div
      className={`[&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 ${className}`}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};

export default function ResumeTemplate2({ data }: { data: T_Resume }) {
  return (
    <div className={`w-full min-h-full bg-white flex ${openSans.className}`}>
      {/* Sidebar - Left Column */}
      <aside className="w-1/3 bg-slate-50 p-8 border-r border-gray-200">
        <div className="flex flex-col gap-8">
          {/* Header in Sidebar */}
          <section>
            <h1
              className={`text-3xl font-bold text-slate-900 uppercase tracking-tight ${montserrat.className}`}
            >
              {data.personalDetails.firstName}
              <br />
              <span className="text-blue-600">
                {data.personalDetails.lastName}
              </span>
            </h1>
            <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-widest">
              {data.personalDetails.jobTarget}
            </p>
          </section>

          {/* Contact Details */}
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-slate-700">
              {data.personalDetails.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="break-all">
                    {data.personalDetails.email}
                  </span>
                </div>
              )}
              {data.personalDetails.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>{data.personalDetails.phone}</span>
                </div>
              )}
              {data.personalDetails.cityState && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>{data.personalDetails.cityState}</span>
                </div>
              )}
              {data.personalDetails.linkedInProfile && (
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span className="truncate">LinkedIn</span>
                </div>
              )}
            </div>
          </section>

          {/* Skills Section */}
          {data.skills.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 font-medium"
                  >
                    {skill.title}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {data.languages.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Languages
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="text-slate-800 font-medium">
                      {lang.language}
                    </span>
                    <span className="text-slate-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* Main Content - Right Column */}
      <main className="w-2/3 p-10">
        {/* Summary */}
        {data.professionalSummary.description && (
          <section className="mb-10">
            <h2
              className={`text-sm font-bold text-blue-600 uppercase tracking-widest mb-3 ${montserrat.className}`}
            >
              About Me
            </h2>
            <SanitizedHtml
              html={data.professionalSummary.description}
              className="text-slate-700 text-sm leading-relaxed italic"
            />
          </section>
        )}

        {/* Experience */}
        {data.employmentHistory.length > 0 && (
          <section className="mb-10">
            <h2
              className={`text-sm font-bold text-blue-600 uppercase tracking-widest mb-5 ${montserrat.className}`}
            >
              Experience
            </h2>
            <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-slate-200 ml-1">
              {data.employmentHistory.map((job) => (
                <div key={job.id} className="relative pl-6">
                  <div className="absolute w-2 h-2 bg-blue-600 rounded-full left-[-4.5px] top-2" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-lg">
                      {job.jobTitle}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                      {job.startDate && formatMonthYear(job.startDate)} —{" "}
                      {job.endDate ? formatMonthYear(job.endDate) : "PRESENT"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                    {job.employer} | {job.cityState}
                  </p>
                  {job.description && (
                    <SanitizedHtml
                      html={job.description}
                      className="text-sm text-slate-600 leading-relaxed"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2
              className={`text-sm font-bold text-blue-600 uppercase tracking-widest mb-5 ${montserrat.className}`}
            >
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-600">
                      {edu.school}, {edu.city}
                    </span>
                    <span className="text-slate-400 italic">
                      Graduated{" "}
                      {edu.endDate ? formatMonthYear(edu.endDate) : "Present"}
                    </span>
                  </div>
                  {edu.description && (
                    <SanitizedHtml
                      html={edu.description}
                      className="text-sm text-slate-600 leading-relaxed mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
