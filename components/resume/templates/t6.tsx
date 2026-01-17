"use client";

import { T_Resume } from "@/types/resumeInfos";
import { formatMonthYear } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Raleway, Nunito } from "next/font/google";
import DOMPurify from "isomorphic-dompurify";

const raleway = Raleway({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

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

export default function ResumeTemplate6({ data }: { data: T_Resume }) {
  return (
    <div className={`w-full min-h-full bg-white flex ${nunito.className}`}>
      {/* Creative Left Sidebar */}
      <aside className="w-2/5 bg-gradient-to-b from-teal-600 to-cyan-700 text-white p-8">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-3 ${raleway.className}`}>
            {data.personalDetails.firstName}
            <br />
            {data.personalDetails.lastName}
          </h1>
          {data.personalDetails.jobTarget && (
            <p className="text-lg font-light text-teal-100">
              {data.personalDetails.jobTarget}
            </p>
          )}
        </div>

        {/* Contact */}
        <section className="mb-8">
          <h3
            className={`text-sm font-bold uppercase tracking-widest mb-4 border-b border-teal-400 pb-2 ${raleway.className}`}
          >
            Contact
          </h3>
          <div className="space-y-3 text-sm">
            {data.personalDetails.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{data.personalDetails.email}</span>
              </div>
            )}
            {data.personalDetails.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{data.personalDetails.phone}</span>
              </div>
            )}
            {data.personalDetails.cityState && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{data.personalDetails.cityState}</span>
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <h3
              className={`text-sm font-bold uppercase tracking-widest mb-4 border-b border-teal-400 pb-2 ${raleway.className}`}
            >
              Skills
            </h3>
            <div className="space-y-3">
              {data.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold">{skill.title}</span>
                    <span className="text-teal-200 text-xs">{skill.level}</span>
                  </div>
                  <div className="h-1 bg-teal-800 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section>
            <h3
              className={`text-sm font-bold uppercase tracking-widest mb-4 border-b border-teal-400 pb-2 ${raleway.className}`}
            >
              Languages
            </h3>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between text-sm">
                  <span className="font-semibold">{lang.language}</span>
                  <span className="text-teal-200 text-xs">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-3/5 p-10">
        {/* Summary */}
        {data.professionalSummary.description && (
          <section className="mb-8">
            <h2
              className={`text-2xl font-bold text-teal-700 mb-4 ${raleway.className}`}
            >
              About Me
            </h2>
            <SanitizedHtml
              html={data.professionalSummary.description}
              className="text-sm text-gray-700 leading-relaxed"
            />
          </section>
        )}

        {/* Experience */}
        {data.employmentHistory.length > 0 && (
          <section className="mb-8">
            <h2
              className={`text-2xl font-bold text-teal-700 mb-4 ${raleway.className}`}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {data.employmentHistory.map((job) => (
                <div
                  key={job.id}
                  className="relative pl-6 border-l-2 border-teal-200"
                >
                  <div className="absolute w-3 h-3 bg-teal-600 rounded-full -left-[7px] top-2"></div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {job.jobTitle}
                  </h3>
                  <p className="text-sm font-semibold text-teal-600 mb-1">
                    {job.employer} • {job.cityState}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {job.startDate && formatMonthYear(job.startDate)} —{" "}
                    {job.endDate ? formatMonthYear(job.endDate) : "Present"}
                  </p>
                  {job.description && (
                    <SanitizedHtml
                      html={job.description}
                      className="text-sm text-gray-700 leading-relaxed"
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
              className={`text-2xl font-bold text-teal-700 mb-4 ${raleway.className}`}
            >
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="pl-6 border-l-2 border-teal-200">
                  <h3 className="text-lg font-bold text-gray-900">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-teal-600">
                    {edu.school}, {edu.city}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {edu.endDate && formatMonthYear(edu.endDate)}
                  </p>
                  {edu.description && (
                    <SanitizedHtml
                      html={edu.description}
                      className="text-sm text-gray-700 mt-2"
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
