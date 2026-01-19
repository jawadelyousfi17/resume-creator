import { T_Resume } from "@/types/resumeInfos";

const toDateOrUndefined = (value?: string | Date | null) => {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

const ensureId = (value?: string) => value || crypto.randomUUID();

export function normalizeResume(parsed: T_Resume): T_Resume {
  return {
    personalDetails: {
      jobTarget: parsed.personalDetails?.jobTarget || "",
      firstName: parsed.personalDetails?.firstName || "",
      lastName: parsed.personalDetails?.lastName || "",
      email: parsed.personalDetails?.email || "",
      phone: parsed.personalDetails?.phone || "",
      linkedInProfile: parsed.personalDetails?.linkedInProfile || "",
      cityState: parsed.personalDetails?.cityState || "",
      postalCode: parsed.personalDetails?.postalCode || "",
      country: parsed.personalDetails?.country || "",
      profileImageUrl: parsed.personalDetails?.profileImageUrl || "",
    },
    employmentHistory: (parsed.employmentHistory || []).map((item) => ({
      id: ensureId(item.id),
      jobTitle: item.jobTitle || "",
      employer: item.employer || "",
      cityState: item.cityState || "",
      startDate: toDateOrUndefined(item.startDate),
      endDate: toDateOrUndefined(item.endDate),
      description: item.description || "",
    })),
    internships: (parsed.internships || []).map((item) => ({
      id: ensureId(item.id),
      jobTitle: item.jobTitle || "",
      employer: item.employer || "",
      cityState: item.cityState || "",
      startDate: toDateOrUndefined(item.startDate),
      endDate: toDateOrUndefined(item.endDate),
      description: item.description || "",
    })),
    education: (parsed.education || []).map((item) => ({
      id: ensureId(item.id),
      school: item.school || "",
      degree: item.degree || "",
      city: item.city || "",
      startDate: toDateOrUndefined(item.startDate),
      endDate: toDateOrUndefined(item.endDate),
      description: item.description || "",
    })),
    skills: (parsed.skills || []).map((item) => ({
      id: ensureId(item.id),
      title: item.title || "",
      level: item.level || "Novice",
    })),
    languages: (parsed.languages || []).map((item) => ({
      id: ensureId(item.id),
      language: item.language || "",
      level: item.level || "Good working knowledge",
    })),
    courses: (parsed.courses || []).map((item) => ({
      id: ensureId(item.id),
      course: item.course || "",
      institution: item.institution || "",
      startDate: toDateOrUndefined(item.startDate),
      endDate: toDateOrUndefined(item.endDate),
    })),
    additional: (parsed.additional || []).map((item) => ({
      id: ensureId(item.id),
      title: item.title || "",
      sections: (item.sections || []).map((section) => ({
        id: ensureId(section.id),
        activity: section.activity || "",
        city: section.city || "",
        startDate: toDateOrUndefined(section.startDate),
        endDate: toDateOrUndefined(section.endDate),
        description: section.description || "",
      })),
    })),
    professionalSummary: {
      description: parsed.professionalSummary?.description || "",
    },
    hobbies: parsed.hobbies || "",
  };
}
