import { PrismaClient } from "@prisma/client";
import { IAssignmentRepo } from "../IAssignmentRepo";

export class AssignmentPrismaRepo implements IAssignmentRepo {
  constructor(private prisma: PrismaClient) {}

  getAllAssignments(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getAssignmentById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async createAssignment(classId: string, title: string): Promise<any> {
    const assignment = await this.prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });
    return assignment;
  }

  updateAssignment(id: string, assignment: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteAssignment(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
