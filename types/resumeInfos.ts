export type T_Level =
  | "Novice"
  | "Beginner"
  | "Skillful"
  | "Experienced"
  | "Expert";

export type T_LanguageLevel =
  | "Native speaker"
  | "Highly proficient"
  | "Very good command"
  | "Good working knowledge"
  | "Working knowledge"
  | "C2"
  | "C1"
  | "B2"
  | "B1"
  | "A2"
  | "A1";
export type T_Resume = {
  personalDetails: {
    jobTarget: string;
    firstName: string;
    lastName: string; // was "lastname"
    email: string;
    phone: string;
    linkedInProfile: string;
    cityState: string;
    postalCode: string; // should be string, not number (postal codes can have letters/leading zeros)
    country: string;
    profileImageUrl?: string; // optional - may not exist initially
    profileImageFile?: File; // optional - only when uploading
  };

  employmentHistory: {
    // was "employementHistory" (typo)
    id: string;
    jobTitle: string;
    employer: string;
    cityState: string;
    startDate?: Date;
    endDate?: Date; // optional - current job may not have end date
    description: string;
  }[]; // should be an array - multiple jobs

  internships: {
    id: string;
    jobTitle: string;
    employer: string;
    cityState: string;
    startDate?: Date;
    endDate?: Date; // optional - current job may not have end date
    description: string;
  }[];

  education: {
    id: string;
    school: string;
    degree: string;
    city: string;
    startDate?: Date;
    endDate?: Date; // optional - currently studying
    description: string;
  }[]; // should be an array - multiple education entries

  skills: {
    // plural "skills"
    id: string;
    title: string;
    level: T_Level;
  }[]; // should be an array - multiple skills

  languages: {
    id: string;
    language: string;
    level: T_LanguageLevel;
  }[];

  courses: {
    id: string;
    course: string;
    institution: string;
    startDate?: Date;
    endDate?: Date; // optional - currently studying
  }[];

  additional: {
    id: string;
    title: string;
    sections: {
      id: string;
      activity: string;
      city: string;
      startDate?: Date;
      endDate?: Date;
      description: string;
    }[];
  }[];

  professionalSummary: {
    description: string;
  };

  hobbies: string;
};
