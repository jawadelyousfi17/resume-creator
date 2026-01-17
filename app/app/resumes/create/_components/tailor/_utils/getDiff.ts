import { T_Resume } from "@/types/resumeInfos";

/**
 * Compares two T_Resume objects and returns a diff object.
 * Each key in the returned object corresponds to a section in T_Resume,
 * and its value is true if that section has changed.
 *
 * @param oldResume - The original resume
 * @param newResume - The tailored resume
 * @returns An object mapping section keys to a boolean (true if changed)
 */
export function getResumeDiff(
  oldResume: T_Resume,
  newResume: T_Resume
): Partial<Record<keyof T_Resume, boolean>> {
  const diff: Partial<Record<keyof T_Resume, boolean>> = {};

  const keys = Object.keys(oldResume) as (keyof T_Resume)[];

  keys.forEach((key) => {
    // Deep comparison using stringification for these nested structures
    const isDifferent =
      JSON.stringify(oldResume[key]) !== JSON.stringify(newResume[key]);

    if (isDifferent) {
      diff[key] = true;
    }
  });

  return diff;
}
