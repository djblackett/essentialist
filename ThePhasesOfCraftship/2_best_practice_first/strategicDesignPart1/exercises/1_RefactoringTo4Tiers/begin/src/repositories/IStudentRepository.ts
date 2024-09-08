import { Student } from "@prisma/client";

export interface IStudentRepository {
  get(): Promise<void>;
  create(name: string): Promise<Student>;
  update(): Promise<void>;
  delete(): Promise<void>;
}
