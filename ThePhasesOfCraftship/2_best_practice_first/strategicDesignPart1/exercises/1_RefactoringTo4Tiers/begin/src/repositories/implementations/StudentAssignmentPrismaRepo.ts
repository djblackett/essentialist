import {
  Assignment,
  PrismaClient,
  Student,
  StudentAssignment,
} from "@prisma/client";
import { IStudentAssignmentsRepo } from "../IStudentAssignmentsRepo";

export class StudentAssignmentsPrismaRepo implements IStudentAssignmentsRepo {
  constructor(private prisma: PrismaClient) {}

  getStudentAssignments(studentId: string): Promise<string[]> {
    throw new Error("Method not implemented.");
  }

  async doesAssignmentExist(assignmentId: string): Promise<Assignment | null> {
    const assignment = await this.prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });
    return assignment;
  }

  async doesStudentExist(studentId: string): Promise<Student | null> {
    const student = await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
    return student;
  }

  async addStudentAssignment(
    studentId: string,
    assignmentId: string
  ): Promise<StudentAssignment> {
    const studentAssignment = await this.prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId,
      },
    });
    return studentAssignment;
  }

  async update(id: string) {
    return this.prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        status: "submitted",
      },
    });
  }
}
