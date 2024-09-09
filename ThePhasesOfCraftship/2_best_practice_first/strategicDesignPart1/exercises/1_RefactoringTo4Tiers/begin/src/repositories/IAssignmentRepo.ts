import { Assignment } from "@prisma/client";

export interface IAssignmentRepo {
  getAllAssignments(): Promise<any>;
  getAssignmentById(id: string): Promise<any>;
  createAssignment(classId: string, title: string): Promise<Assignment>;
  updateAssignment(id: string, assignment: any): Promise<any>;
  deleteAssignment(id: string): Promise<any>;
}
