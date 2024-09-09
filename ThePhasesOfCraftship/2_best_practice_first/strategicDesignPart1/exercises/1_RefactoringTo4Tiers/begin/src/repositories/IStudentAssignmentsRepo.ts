import { Assignment, StudentAssignment } from "@prisma/client";

export interface IStudentAssignmentsRepo {
  update(id: string): Promise<StudentAssignment | null>;
  doesStudentExist(studentId: string): unknown;
  addStudentAssignment(
    studentId: string,
    assignmentId: string
  ): Promise<StudentAssignment>;
  getStudentAssignments(studentId: string): Promise<string[]>;
  doesAssignmentExist(assignmentId: string): Promise<Assignment | null>;
}
