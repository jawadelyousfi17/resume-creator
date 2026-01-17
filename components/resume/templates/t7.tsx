"use client";

import { T_Resume } from "@/types/resumeInfos";
import { formatMonthYear } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Ubuntu, Lora } from "next/font/google";
import DOMPurify from "isomorphic-dompurify";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"] });
const lora = Lora({ subsets: ["latin"] });

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

export default function ResumeTemplate7({ data }: { data: T_Resume }) {
  return (
    <div className={`w-full min-h-full bg-gray-50 ${ubuntu.className}`}>
      {/* Professional Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className={`text-5xl font-bold mb-2 ${lora.className}`}>
            {data.personalDetails.firstName} {data.personalDetails.lastName}
          </h1>
          {data.personalDetails.jobTarget && (
            <p className="text-xl font-light mb-4 text-indigo-100">
              {data.personalDetails.jobTarget}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm">
            {data.personalDetails.email && (
              <div className="flex items-center gap-2 bg-indigo-700 px-3 py-1 rounded">
                <Mail className="w-4 h-4" />
                {data.personalDetails.email}
              </div>
            )}
            {data.personalDetails.phone && (
              <div className="flex items-center gap-2 bg-indigo-700 px-3 py-1 rounded">
                <Phone className="w-4 h-4" />
                {data.personalDetails.phone}
              </div>
            )}
            {data.personalDetails.cityState && (
              <div className="flex items-center gap-2 bg-indigo-700 px-3 py-1 rounded">
                <MapPin className="w-4 h-4" />
                {data.personalDetails.cityState}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        {/* Professional Summary */}
        {data.professionalSummary.description && (
          <section className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <h2
              className={`text-2xl font-bold text-indigo-600 mb-3 flex items-center gap-2 ${lora.className}`}
            >
              <div className="w-1 h-8 bg-indigo-600 rounded"></div>
              Professional Summary
            </h2>
            <SanitizedHtml
              html={data.professionalSummary.description}
              className="text-sm text-gray-700 leading-relaxed"
            />
          </section>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="col-span-2 space-y-8">
            {/* Experience */}
            {data.employmentHistory.length > 0 && (
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2
                  className={`text-2xl font-bold text-indigo-600 mb-4 flex items-center gap-2 ${lora.className}`}
                >
                  <div className="w-1 h-8 bg-indigo-600 rounded"></div>
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {data.employmentHistory.map((job) => (
                    <div key={job.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {job.jobTitle}
                          </h3>
                          <p className="text-sm font-medium text-indigo-600">
                            {job.employer} • {job.cityState}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                          {job.startDate && formatMonthYear(job.startDate)} —{" "}
                          {job.endDate
                            ? formatMonthYear(job.endDate)
                            : "Present"}
                        </span>
                      </div>
                      {job.description && (
                        <SanitizedHtml
                          html={job.description}
                          className="text-sm text-gray-700 leading-relaxed"
                        />
                      )}
                      <div className="border-b border-gray-200 mt-4"></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2
                  className={`text-2xl font-bold text-indigo-600 mb-4 flex items-center gap-2 ${lora.className}`}
                >
                  <div className="w-1 h-8 bg-indigo-600 rounded"></div>
                  Education
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-lg font-bold text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium text-indigo-600">
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            {data.skills.length > 0 && (
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2
                  className={`text-lg font-bold text-indigo-600 mb-4 ${lora.className}`}
                >
                  Skills
                </h2>
                <div className="space-y-2">
                  {data.skills.map((skill) => (
                    <div key={skill.id} className="bg-gray-50 p-2 rounded">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">
                          {skill.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2
                  className={`text-lg font-bold text-indigo-600 mb-4 ${lora.className}`}
                >
                  Languages
                </h2>
                <div className="space-y-3">
                  {data.languages.map((lang) => (
                    <div key={lang.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {lang.language}
                        </span>
                        <span className="text-xs text-gray-500">
                          {lang.level}
                        </span>
                      </div>
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full w-4/5"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
