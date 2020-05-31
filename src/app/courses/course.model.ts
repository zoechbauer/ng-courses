export class Course {
  // school data
  id: string;
  title: string;
  school: string;
  duration: number;
  teacher: string;
  confirmationDate: Date;
  certificateName: string;
  // course data
  summary: string;
  description: string;
  category: string;
  topics: string;
  // app data
  githubUrl: string;
  hostedUrl: string;
  hostingProvider: string;
  hasCredentials: boolean;
}
