import { T_Resume } from "@/types/resumeInfos";
import { formatMonthYear } from "@/lib/utils";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts (you'll need to add font files to your public folder)
// Font.register({
//   family: 'Inter',
//   src: '/fonts/Inter-Regular.ttf',
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#111827",
    padding: 32,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#1f2937",
    paddingBottom: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  jobTarget: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 2,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 8,
    fontSize: 9,
    color: "#374151",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 4,
  },
  entryContainer: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  entryLeft: {
    flex: 1,
  },
  entryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
  },
  entrySubtitle: {
    fontSize: 10,
    color: "#4b5563",
    marginTop: 2,
  },
  entryDate: {
    fontSize: 9,
    color: "#4b5563",
    textAlign: "right",
  },
  description: {
    fontSize: 10,
    color: "#374151",
    marginTop: 4,
    lineHeight: 1.4,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    width: "48%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10,
  },
  skillTitle: {
    color: "#1f2937",
    fontWeight: "medium",
  },
  skillLevel: {
    fontSize: 9,
    color: "#4b5563",
  },
});

// Helper component to strip HTML tags (basic implementation)
const stripHtml = (html: string): string => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

export default function ResumeTemplate1PDF({ data }: { data: T_Resume }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {data.personalDetails.firstName} {data.personalDetails.lastName}
          </Text>
          {data.personalDetails.jobTarget && (
            <Text style={styles.jobTarget}>
              {data.personalDetails.jobTarget}
            </Text>
          )}

          {/* Contact Info */}
          <View style={styles.contactInfo}>
            {data.personalDetails.email && (
              <Text style={styles.contactItem}>
                {data.personalDetails.email}
              </Text>
            )}
            {data.personalDetails.phone && (
              <Text style={styles.contactItem}>
                {" "}
                • {data.personalDetails.phone}
              </Text>
            )}
            {data.personalDetails.cityState && (
              <Text style={styles.contactItem}>
                {" "}
                • {data.personalDetails.cityState}
                {data.personalDetails.country &&
                  `, ${data.personalDetails.country}`}
              </Text>
            )}
            {data.personalDetails.linkedInProfile && (
              <Text style={styles.contactItem}>
                {" "}
                • {data.personalDetails.linkedInProfile}
              </Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {data.professionalSummary.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>
              {stripHtml(data.professionalSummary.description)}
            </Text>
          </View>
        )}

        {/* Employment History */}
        {data.employmentHistory.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Employment History</Text>
            {data.employmentHistory.map((job) => (
              <View key={job.id} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryTitle}>{job.jobTitle}</Text>
                    <Text style={styles.entrySubtitle}>
                      {job.employer} • {job.cityState}
                    </Text>
                  </View>
                  <Text style={styles.entryDate}>
                    {job.startDate && formatMonthYear(job.startDate)} -{" "}
                    {job.endDate ? formatMonthYear(job.endDate) : "Present"}
                  </Text>
                </View>
                {job.description && (
                  <Text style={styles.description}>
                    {stripHtml(job.description)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Internships */}
        {data.internships.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Internships</Text>
            {data.internships.map((internship) => (
              <View key={internship.id} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryTitle}>{internship.jobTitle}</Text>
                    <Text style={styles.entrySubtitle}>
                      {internship.employer} • {internship.cityState}
                    </Text>
                  </View>
                  <Text style={styles.entryDate}>
                    {internship.startDate &&
                      formatMonthYear(internship.startDate)}{" "}
                    -{" "}
                    {internship.endDate
                      ? formatMonthYear(internship.endDate)
                      : "Present"}
                  </Text>
                </View>
                {internship.description && (
                  <Text style={styles.description}>
                    {stripHtml(internship.description)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryTitle}>{edu.degree}</Text>
                    <Text style={styles.entrySubtitle}>
                      {edu.school} • {edu.city}
                    </Text>
                  </View>
                  <Text style={styles.entryDate}>
                    {edu.startDate && formatMonthYear(edu.startDate)} -{" "}
                    {edu.endDate ? formatMonthYear(edu.endDate) : "Present"}
                  </Text>
                </View>
                {edu.description && (
                  <Text style={styles.description}>
                    {stripHtml(edu.description)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {data.skills.map((skill) => (
                <View key={skill.id} style={styles.skillItem}>
                  <Text style={styles.skillTitle}>{skill.title}</Text>
                  <Text style={styles.skillLevel}>{skill.level}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.skillsGrid}>
              {data.languages.map((lang) => (
                <View key={lang.id} style={styles.skillItem}>
                  <Text style={styles.skillTitle}>{lang.language}</Text>
                  <Text style={styles.skillLevel}>{lang.level}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Courses */}
        {data.courses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Courses</Text>
            {data.courses.map((course) => (
              <View key={course.id} style={styles.entryContainer}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryTitle}>{course.course}</Text>
                    <Text style={styles.entrySubtitle}>
                      {course.institution}
                    </Text>
                  </View>
                  <Text style={styles.entryDate}>
                    {course.startDate && formatMonthYear(course.startDate)} -{" "}
                    {course.endDate && formatMonthYear(course.endDate)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Additional Sections */}
        {data.additional.map((group) =>
          group.sections.length > 0 ? (
            <View key={group.id} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {group.title || "Additional Information"}
              </Text>
              {group.sections.map((section) => (
                <View key={section.id} style={styles.entryContainer}>
                  <View style={styles.entryHeader}>
                    <View style={styles.entryLeft}>
                      <Text style={styles.entryTitle}>{section.activity}</Text>
                      <Text style={styles.entrySubtitle}>{section.city}</Text>
                    </View>
                    {(section.startDate || section.endDate) && (
                      <Text style={styles.entryDate}>
                        {section.startDate &&
                          formatMonthYear(section.startDate)}{" "}
                        -{" "}
                        {section.endDate
                          ? formatMonthYear(section.endDate)
                          : "Present"}
                      </Text>
                    )}
                  </View>
                  {section.description && (
                    <Text style={styles.description}>
                      {stripHtml(section.description)}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ) : null
        )}

        {/* Hobbies */}
        {data.hobbies && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hobbies</Text>
            <Text style={styles.description}>{data.hobbies}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
