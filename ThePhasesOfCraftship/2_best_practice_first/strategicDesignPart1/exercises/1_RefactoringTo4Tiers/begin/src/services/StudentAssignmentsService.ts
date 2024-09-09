import { IStudentAssignmentsRepo } from "../repositories/IStudentAssignmentsRepo";

export class StudentAssignmentsService {
  async updateStudentAssignment(id: any) {
    const studentAssignmentUpdated = await this.studentAssignmentsRepo.update(
      id
    );
    return studentAssignmentUpdated;
  }
  constructor(protected studentAssignmentsRepo: IStudentAssignmentsRepo) {}

  async doesStudentExist(studentId: string) {
    const response = await this.studentAssignmentsRepo.doesStudentExist(
      studentId
    );
    return response;
  }

  async doesAssignmentExist(assignmentId: string) {
    const assignment = await this.studentAssignmentsRepo.doesAssignmentExist(
      assignmentId
    );
    return assignment;
  }

  async createStudentAssignment(studentId: string, assignmentId: string) {
    await this.studentAssignmentsRepo.addStudentAssignment(
      studentId,
      assignmentId
    );
  }
}
