import { IClassEnrollmentsRepo } from "../repositories/IClassEnrollmentsRepository";

export class ClassEnrollmentsService {
  constructor(private classesPrismaRepo: IClassEnrollmentsRepo) {}

  async doesStudentExist(studentId: string) {
    const response = await this.classesPrismaRepo.doesStudentExist(studentId);
    return response;
  }

  async doesClassExist(classId: string) {
    const response = await this.classesPrismaRepo.doesClassExist(classId);
    return response;
  }

  async isStudentEnrolled(studentId: string, classId: string) {
    const response = await this.classesPrismaRepo.isStudentEnrolled(
      studentId,
      classId
    );
    return response;
  }

  async enrollStudent(studentId: string, classId: string) {
    const response = await this.classesPrismaRepo.enrollStudent(
      studentId,
      classId
    );
    return response;
  }
}
