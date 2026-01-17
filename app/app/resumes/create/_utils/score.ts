import { T_Resume } from "@/types/resumeInfos";

export const calculateScore = (data: T_Resume): number => {
  let score = 0;

  // 1. Personal Details (Max 20)
  if (data.personalDetails.firstName && data.personalDetails.lastName)
    score += 2;
  if (data.personalDetails.email) score += 4;
  if (data.personalDetails.phone) score += 4;
  if (data.personalDetails.jobTarget) score += 4;
  if (data.personalDetails.cityState || data.personalDetails.country)
    score += 2;
  if (data.personalDetails.linkedInProfile) score += 2;
  if (data.personalDetails.profileImageUrl) score += 2;

  // 2. Professional Summary (Max 15)
  if (data.professionalSummary.description) {
    score += 5;
    if (data.professionalSummary.description.length > 50) score += 5;
    if (data.professionalSummary.description.length > 200) score += 5;
  }

  // 3. Employment History (Max 25)
  if (data.employmentHistory.length > 0) {
    score += 10;
    if (data.employmentHistory.length >= 2) score += 5;

    // Check for descriptions
    const hasDescriptions = data.employmentHistory.some(
      (job) => job.description && job.description.length > 20
    );
    if (hasDescriptions) score += 10;
  }

  // 4. Education (Max 15)
  if (data.education.length > 0) {
    score += 10;
    const hasDetails = data.education.some((edu) => edu.degree && edu.school);
    if (hasDetails) score += 5;
  }

  // 5. Skills (Max 10)
  if (data.skills.length >= 3) score += 5;
  if (data.skills.length >= 5) score += 5;

  // 6. Others (Max 15)
  // Languages
  if (data.languages.length > 0) score += 5;

  // Internships / Courses / Custom Sections (Any of these adds 5 points)
  if (
    data.internships.length > 0 ||
    data.courses.length > 0 ||
    data.additional.some((section) => section.sections.length > 0)
  ) {
    score += 5;
  }

  // Hobbies
  if (data.hobbies && data.hobbies.length > 10) score += 5;

  return Math.min(score, 100);
};
