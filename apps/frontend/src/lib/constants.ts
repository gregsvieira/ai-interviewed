export const INTERVIEW_DURATIONS = [5, 10, 15, 30] as const
export type InterviewDuration = (typeof INTERVIEW_DURATIONS)[number]
