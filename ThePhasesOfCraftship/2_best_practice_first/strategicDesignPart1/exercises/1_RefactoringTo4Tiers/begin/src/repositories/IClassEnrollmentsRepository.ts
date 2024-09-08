import { Class, ClassEnrollment, Student } from "@prisma/client";

export interface IClassEnrollmentsRepo {
  get(): Promise<void>;
  enrollStudent(studentId: string, classId: string): Promise<ClassEnrollment>;
  update(): Promise<void>;
  delete(): Promise<void>;
  doesStudentExist(studentId: string): Promise<Student | null>;
  doesClassExist(classId: string): Promise<Class | null>;
  isStudentEnrolled(
    studentId: string,
    classId: string
  ): Promise<ClassEnrollment | null>;
}
