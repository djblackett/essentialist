import { ErrorHandler } from "../controllers/ErrorHandler";
import { AssignmentPrismaRepo } from "../repositories/implementations/AssignmentPrismaRepo";

export class AssignmentService {
  constructor(
    private readonly assignmentRepository: AssignmentPrismaRepo,
    private errorHandler: ErrorHandler
  ) {}

  async createAssignment(classId: string, title: string) {
    const assignment = await this.assignmentRepository.createAssignment(
      classId,
      title
    );
    return assignment;
  }
}
