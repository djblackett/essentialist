import { ClassEnrollment, PrismaClient } from "@prisma/client";
import { IClassEnrollmentsRepo } from "../IClassEnrollmentsRepository";

export class ClassEnrollmentPrismaRepo implements IClassEnrollmentsRepo {
  constructor(private readonly prisma: PrismaClient) {}

  get(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async enrollStudent(
    studentId: string,
    classId: string
  ): Promise<ClassEnrollment> {
    const classEnrollment = await this.prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });
    return classEnrollment;
  }

  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async doesStudentExist(studentId: string) {
    const student = await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
    return student;
  }

  async doesClassExist(classId: string) {
    const cls = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
    });
    return cls;
  }

  async isStudentEnrolled(studentId: string, classId: string) {
    const classEnrollment = await this.prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });
    return classEnrollment;
  }
}
