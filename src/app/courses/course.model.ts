export class Course {
  // school data
  id?: string; // id is created by Firebase and stored separately
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

  constructor() {
    this.id = 'new';
    this.confirmationDate = new Date();

    this.title = '';
    this.school = '';
    this.duration = 0;
    this.teacher = '';
    this.certificateName = '';
    this.summary = '';
    this.description = '';
    this.category = '';
    this.topics = '';
    this.githubUrl = '';
    this.hostedUrl = '';
    this.hostingProvider = '';
    this.hasCredentials = false;
  }
}
