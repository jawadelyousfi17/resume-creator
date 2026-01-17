"use client";

import { T_Resume } from "@/types/resumeInfos";
import { formatMonthYear } from "@/lib/utils";
import { Inter, Playfair_Display } from "next/font/google";
import DOMPurify from "isomorphic-dompurify";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });

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

export default function ResumeTemplate1({ data }: { data: T_Resume }) {
  return (
    <div
      className={`w-full min-h-full bg-white text-gray-900 p-10 ${inter.className}`}
    >
      {/* Header Section */}
      <header className="border-b-4 border-gray-900 pb-6 mb-8">
        <h1
          className={`text-5xl font-extrabold text-gray-900 tracking-tight uppercase ${playfair.className}`}
        >
          {data.personalDetails.firstName} {data.personalDetails.lastName}
        </h1>
        {data.personalDetails.jobTarget && (
          <p className="text-xl text-gray-600 font-medium mt-2 tracking-wide uppercase">
            {data.personalDetails.jobTarget}
          </p>
        )}

        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-sm text-gray-600 font-medium tracking-wide">
          {data.personalDetails.email && (
            <div className="flex items-center gap-1.5">
              <span className="text-gray-900 font-bold uppercase text-xs tracking-wider">
                Email:
              </span>
              <span>{data.personalDetails.email}</span>
            </div>
          )}
          {data.personalDetails.phone && (
            <div className="flex items-center gap-1.5">
              <span className="text-gray-900 font-bold uppercase text-xs tracking-wider">
                Phone:
              </span>
              <span>{data.personalDetails.phone}</span>
            </div>
          )}
          {data.personalDetails.cityState && (
            <div className="flex items-center gap-1.5">
              <span className="text-gray-900 font-bold uppercase text-xs tracking-wider">
                Location:
              </span>
              <span>
                {data.personalDetails.cityState}
                {data.personalDetails.country &&
                  `, ${data.personalDetails.country}`}
              </span>
            </div>
          )}
          {data.personalDetails.linkedInProfile && (
            <div className="flex items-center gap-1.5">
              <span className="text-gray-900 font-bold uppercase text-xs tracking-wider">
                LinkedIn:
              </span>
              <span>{data.personalDetails.linkedInProfile}</span>
            </div>
          )}
        </div>
      </header>

      <div className="space-y-8">
        {/* Professional Summary */}
        {data.professionalSummary.description && (
          <section>
            <h2
              className={`text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1 uppercase tracking-widest ${inter.className}`}
            >
              Professional Summary
            </h2>
            <SanitizedHtml
              html={data.professionalSummary.description}
              className="text-base text-gray-700 leading-relaxed"
            />
          </section>
        )}

        {/* Employment History */}
        {data.employmentHistory.length > 0 && (
          <section>
            <h2
              className={`text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1 uppercase tracking-widest ${inter.className}`}
            >
              Employment History
            </h2>
            <div className="space-y-6">
              {data.employmentHistory.map((job) => (
                <div key={job.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {job.jobTitle}
                    </h3>
                    <div className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                      {job.startDate && formatMonthYear(job.startDate)} –{" "}
                      {job.endDate ? formatMonthYear(job.endDate) : "Present"}
                    </div>
                  </div>
                  <div className="text-base font-semibold text-gray-700 mb-2">
                    {job.employer}
                    {job.cityState && (
                      <span className="text-gray-500 font-normal">
                        {" "}
                        | {job.cityState}
                      </span>
                    )}
                  </div>
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

        {/* Internships */}
        {data.internships.length > 0 && (
          <section>
            <h2
              className={`text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1 uppercase tracking-widest ${inter.className}`}
            >
              Internships
            </h2>
            <div className="space-y-6">
              {data.internships.map((internship) => (
                <div key={internship.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {internship.jobTitle}
                    </h3>
                    <div className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                      {internship.startDate &&
                        formatMonthYear(internship.startDate)}{" "}
                      –{" "}
                      {internship.endDate
                        ? formatMonthYear(internship.endDate)
                        : "Present"}
                    </div>
                  </div>
                  <div className="text-base font-semibold text-gray-700 mb-2">
                    {internship.employer}
                    {internship.cityState && (
                      <span className="text-gray-500 font-normal">
                        {" "}
                        | {internship.cityState}
                      </span>
                    )}
                  </div>
                  {internship.description && (
                    <SanitizedHtml
                      html={internship.description}
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
              className={`text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1 uppercase tracking-widest ${inter.className}`}
            >
              Education
            </h2>
            <div className="space-y-5">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {edu.school}
                    </h3>
                    <div className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                      {edu.startDate && formatMonthYear(edu.startDate)} –{" "}
                      {edu.endDate ? formatMonthYear(edu.endDate) : "Present"}
                    </div>
                  </div>
                  <div className="text-base text-gray-700 mb-1">
                    {edu.degree}
                    {edu.city && <span> | {edu.city}</span>}
                  </div>
                  {edu.description && (
                    <SanitizedHtml
                      html={edu.description}
                      className="text-sm text-gray-600 leading-relaxed mt-1"
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
              className={`text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1 uppercase tracking-widest ${inter.className}`}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center text-sm">
                  <span className="text-gray-900 font-bold mr-2">
                    {skill.title}
                  </span>
                  {skill.level && (
                    <span className="text-gray-500 text-xs uppercase tracking-wide bg-gray-100 px-2 py-0.5 rounded">
                      {skill.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section>
            <h2
              className={`text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1 uppercase tracking-widest ${inter.className}`}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex items-center text-sm">
                  <span className="text-gray-900 font-bold mr-2">
                    {lang.language}
                  </span>
                  {lang.level && (
                    <span className="text-gray-500 text-xs italic">
                      ({lang.level})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Courses */}
        {data.courses.length > 0 && (
          <section>
            <h2
              className={`text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1 uppercase tracking-widest ${inter.className}`}
            >
              Courses
            </h2>
            <div className="space-y-2">
              {data.courses.map((course) => (
                <div key={course.id} className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-gray-800">
                    {course.course}
                  </span>
                  <span className="text-gray-500 mb-1">—</span>
                  <span className="text-sm text-gray-700">
                    {course.institution}
                  </span>
                  <div className="ml-auto text-sm font-medium text-gray-500 whitespace-nowrap">
                    {course.startDate && formatMonthYear(course.startDate)} –{" "}
                    {course.endDate && formatMonthYear(course.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Sections */}
        {data.additional.map((group) =>
          group.sections.length > 0 ? (
            <section key={group.id}>
              <h2
                className={`text-lg font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1 uppercase tracking-widest ${inter.className}`}
              >
                {group.title || "Additional Information"}
              </h2>
              <div className="space-y-5">
                {group.sections.map((section) => (
                  <div key={section.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-base font-bold text-gray-800">
                        {section.activity}
                      </h3>
                      {(section.startDate || section.endDate) && (
                        <div className="text-sm font-semibold text-gray-500 whitespace-nowrap">
                          {section.startDate &&
                            formatMonthYear(section.startDate)}{" "}
                          –{" "}
                          {section.endDate
                            ? formatMonthYear(section.endDate)
                            : "Present"}
                        </div>
                      )}
                    </div>
                    {section.city && (
                      <p className="text-sm text-gray-600 mb-1">
                        {section.city}
                      </p>
                    )}
                    {section.description && (
                      <SanitizedHtml
                        html={section.description}
                        className="text-sm text-gray-700 leading-relaxed"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : null
        )}

        {/* Hobbies */}
        {data.hobbies && (
          <section>
            <h2
              className={`text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1 uppercase tracking-widest ${inter.className}`}
            >
              Hobbies
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.hobbies}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
