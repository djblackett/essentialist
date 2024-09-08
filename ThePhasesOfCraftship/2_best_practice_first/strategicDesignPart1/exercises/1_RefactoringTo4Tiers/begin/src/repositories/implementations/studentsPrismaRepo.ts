import { PrismaClient, Student } from "@prisma/client";
import { IStudentRepository } from "../IStudentRepository";

export class StudentsPrismaRepo implements IStudentRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  get(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  create(name: string): Promise<Student> {
    return this.prisma.student.create({
      data: {
        name,
      },
    });
  }

  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
