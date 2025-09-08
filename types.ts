
export interface Course {
  id: number;
  name: string;
}

export interface Student {
  studentId: string; // Using string for UUID
  name: string;
  email: string;
  courseId: number;
  imageUrl: string;
}