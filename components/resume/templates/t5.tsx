"use client";

import { T_Resume } from "@/types/resumeInfos";
import { formatMonthYear } from "@/lib/utils";
import { Mail, Phone, MapPin } from "lucide-react";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import DOMPurify from "isomorphic-dompurify";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const sourceSans = Source_Sans_3({ subsets: ["latin"] });

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

export default function ResumeTemplate5({ data }: { data: T_Resume }) {
  return (
    <div
      className={`w-full min-h-full bg-amber-50 p-10 ${sourceSans.className}`}
    >
      {/* Classic Header with Centered Layout */}
      <header className="text-center border-b-2 border-amber-800 pb-6 mb-8">
        <h1
          className={`text-4xl font-bold text-amber-900 mb-2 ${merriweather.className}`}
        >
          {data.personalDetails.firstName} {data.personalDetails.lastName}
        </h1>
        {data.personalDetails.jobTarget && (
          <p className="text-lg text-amber-700 italic mb-4">
            {data.personalDetails.jobTarget}
          </p>
        )}

        <div className="flex justify-center gap-6 text-sm text-amber-800">
          {data.personalDetails.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {data.personalDetails.email}
            </span>
          )}
          {data.personalDetails.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {data.personalDetails.phone}
            </span>
          )}
          {data.personalDetails.cityState && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data.personalDetails.cityState}
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professionalSummary.description && (
        <section className="mb-8 bg-white p-6 rounded border border-amber-200">
          <h2
            className={`text-2xl font-bold text-amber-900 mb-3 text-center ${merriweather.className}`}
          >
            Professional Summary
          </h2>
          <SanitizedHtml
            html={data.professionalSummary.description}
            className="text-sm text-gray-700 leading-loose text-center"
          />
        </section>
      )}

      {/* Professional Experience */}
      {data.employmentHistory.length > 0 && (
        <section className="mb-8">
          <h2
            className={`text-2xl font-bold text-amber-900 mb-4 text-center border-b border-amber-300 pb-2 ${merriweather.className}`}
          >
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.employmentHistory.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded border border-amber-200"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <h3
                    className={`text-xl font-bold text-amber-900 ${merriweather.className}`}
                  >
                    {job.jobTitle}
                  </h3>
                  <span className="text-xs text-amber-700 italic">
                    {job.startDate && formatMonthYear(job.startDate)} —{" "}
                    {job.endDate ? formatMonthYear(job.endDate) : "Present"}
                  </span>
                </div>
                <p className="text-sm font-semibold text-amber-700 mb-3 italic">
                  {job.employer}, {job.cityState}
                </p>
                {job.description && (
                  <SanitizedHtml
                    html={job.description}
                    className="text-sm text-gray-700 leading-loose"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2
              className={`text-2xl font-bold text-amber-900 mb-4 border-b border-amber-300 pb-2 ${merriweather.className}`}
            >
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white p-4 rounded border border-amber-200"
                >
                  <h3
                    className={`text-lg font-bold text-amber-900 ${merriweather.className}`}
                  >
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-amber-700 italic">
                    {edu.school}, {edu.city}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
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

        {/* Skills & Languages */}
        <div className="space-y-8">
          {data.skills.length > 0 && (
            <section>
              <h2
                className={`text-2xl font-bold text-amber-900 mb-4 border-b border-amber-300 pb-2 ${merriweather.className}`}
              >
                Skills
              </h2>
              <div className="bg-white p-4 rounded border border-amber-200">
                <div className="grid grid-cols-2 gap-3">
                  {data.skills.map((skill) => (
                    <div key={skill.id} className="text-sm">
                      <span className="font-semibold text-amber-900">
                        {skill.title}
                      </span>
                      <span className="text-xs text-gray-600 ml-2">
                        ({skill.level})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2
                className={`text-2xl font-bold text-amber-900 mb-4 border-b border-amber-300 pb-2 ${merriweather.className}`}
              >
                Languages
              </h2>
              <div className="bg-white p-4 rounded border border-amber-200 space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span className="font-semibold text-amber-900">
                      {lang.language}
                    </span>
                    <span className="text-gray-600">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
