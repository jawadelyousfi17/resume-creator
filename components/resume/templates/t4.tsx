"use client";

import { T_Resume } from "@/types/resumeInfos";
import { formatMonthYear } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Poppins, Lato } from "next/font/google";
import DOMPurify from "isomorphic-dompurify";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

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

export default function ResumeTemplate4({ data }: { data: T_Resume }) {
  return (
    <div
      className={`w-full min-h-full bg-gradient-to-br from-purple-50 to-pink-50 p-8 ${lato.className}`}
    >
      {/* Modern Card Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1
              className={`text-4xl font-bold text-purple-900 mb-2 ${poppins.className}`}
            >
              {data.personalDetails.firstName} {data.personalDetails.lastName}
            </h1>
            {data.personalDetails.jobTarget && (
              <p className="text-lg text-purple-600 font-semibold">
                {data.personalDetails.jobTarget}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
          {data.personalDetails.email && (
            <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
              <Mail className="w-4 h-4 text-purple-600" />
              {data.personalDetails.email}
            </div>
          )}
          {data.personalDetails.phone && (
            <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
              <Phone className="w-4 h-4 text-purple-600" />
              {data.personalDetails.phone}
            </div>
          )}
          {data.personalDetails.cityState && (
            <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4 text-purple-600" />
              {data.personalDetails.cityState}
            </div>
          )}
        </div>
      </div>

      {/* Summary Card */}
      {data.professionalSummary.description && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2
            className={`text-xl font-bold text-purple-900 mb-3 ${poppins.className}`}
          >
            About Me
          </h2>
          <SanitizedHtml
            html={data.professionalSummary.description}
            className="text-sm text-gray-700 leading-relaxed"
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Main Column - Experience */}
        <div className="col-span-2 space-y-6">
          {data.employmentHistory.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2
                className={`text-xl font-bold text-purple-900 mb-4 ${poppins.className}`}
              >
                Work Experience
              </h2>
              <div className="space-y-5">
                {data.employmentHistory.map((job) => (
                  <div key={job.id} className="border-l-4 border-pink-400 pl-4">
                    <h3 className="font-bold text-lg text-gray-900">
                      {job.jobTitle}
                    </h3>
                    <p className="text-sm font-semibold text-purple-600 mb-1">
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
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2
                className={`text-xl font-bold text-purple-900 mb-4 ${poppins.className}`}
              >
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-base text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-purple-600 font-semibold">
                      {edu.school}
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
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2
                className={`text-lg font-bold text-purple-900 mb-4 ${poppins.className}`}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full font-medium"
                  >
                    {skill.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2
                className={`text-lg font-bold text-purple-900 mb-4 ${poppins.className}`}
              >
                Languages
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {lang.language}
                    </span>
                    <span className="text-xs text-gray-500">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
