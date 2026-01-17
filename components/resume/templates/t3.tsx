"use client";

import { T_Resume } from "@/types/resumeInfos";
import { formatMonthYear } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Inter, Roboto_Mono } from "next/font/google";
import DOMPurify from "isomorphic-dompurify";

const inter = Inter({ subsets: ["latin"] });
const robotoMono = Roboto_Mono({ subsets: ["latin"] });

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

export default function ResumeTemplate3({ data }: { data: T_Resume }) {
  return (
    <div
      className={`w-full min-h-full bg-white text-gray-900 ${inter.className}`}
    >
      {/* Minimalist Header */}
      <header className="border-b-4 border-black pb-6 mb-6 px-12 pt-12">
        <h1
          className={`text-5xl font-black uppercase tracking-wider mb-2 ${robotoMono.className}`}
        >
          {data.personalDetails.firstName} {data.personalDetails.lastName}
        </h1>
        {data.personalDetails.jobTarget && (
          <p className="text-xl font-light tracking-wide text-gray-600">
            {data.personalDetails.jobTarget}
          </p>
        )}

        <div className="flex flex-wrap gap-6 mt-4 text-xs uppercase tracking-wider">
          {data.personalDetails.email && (
            <span className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              {data.personalDetails.email}
            </span>
          )}
          {data.personalDetails.phone && (
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              {data.personalDetails.phone}
            </span>
          )}
          {data.personalDetails.cityState && (
            <span className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              {data.personalDetails.cityState}
            </span>
          )}
        </div>
      </header>

      <div className="px-12 pb-12">
        {/* Professional Summary */}
        {data.professionalSummary.description && (
          <section className="mb-8">
            <h2
              className={`text-sm font-black uppercase tracking-widest mb-3 ${robotoMono.className}`}
            >
              Profile
            </h2>
            <SanitizedHtml
              html={data.professionalSummary.description}
              className="text-sm leading-relaxed text-gray-700"
            />
          </section>
        )}

        {/* Experience */}
        {data.employmentHistory.length > 0 && (
          <section className="mb-8">
            <h2
              className={`text-sm font-black uppercase tracking-widest mb-4 ${robotoMono.className}`}
            >
              Experience
            </h2>
            <div className="space-y-6">
              {data.employmentHistory.map((job) => (
                <div key={job.id} className="border-l-2 border-black pl-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-lg uppercase">
                      {job.jobTitle}
                    </h3>
                    <span className="text-xs font-mono text-gray-500">
                      {job.startDate && formatMonthYear(job.startDate)} —{" "}
                      {job.endDate ? formatMonthYear(job.endDate) : "Present"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    {job.employer} • {job.cityState}
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

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2
                className={`text-sm font-black uppercase tracking-widest mb-4 ${robotoMono.className}`}
              >
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-base">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    <p className="text-xs text-gray-500 font-mono mt-1">
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

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2
                className={`text-sm font-black uppercase tracking-widest mb-4 ${robotoMono.className}`}
              >
                Skills
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between text-sm">
                    <span className="font-semibold">{skill.title}</span>
                    <span className="text-gray-500 text-xs">{skill.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className="mt-8">
            <h2
              className={`text-sm font-black uppercase tracking-widest mb-4 ${robotoMono.className}`}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.languages.map((lang) => (
                <span
                  key={lang.id}
                  className="px-3 py-1 bg-black text-white text-xs font-mono"
                >
                  {lang.language} — {lang.level}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
