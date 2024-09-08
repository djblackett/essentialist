import { Class, PrismaClient, Student } from "@prisma/client";
import { IClassesRepository } from "../IClassesRepository";

export class ClassesPrismaRepo implements IClassesRepository {
  constructor(private readonly prisma: PrismaClient) {}

  get(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  create(name: string): Promise<Class> {
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
