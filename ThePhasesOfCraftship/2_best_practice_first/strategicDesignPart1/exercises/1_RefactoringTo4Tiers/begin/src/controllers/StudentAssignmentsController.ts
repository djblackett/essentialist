import express from "express";
import { Errors } from "..";
import { isMissingKeys, parseForResponse } from "../utils";
import { ErrorHandler } from "./ErrorHandler";
import { StudentAssignmentsService } from "../services/StudentAssignmentsService";

export class StudentAssignmentsController {
  private router: express.Router;
  constructor(
    private studentAssignmentsService: StudentAssignmentsService,
    private errorHandler: ErrorHandler
  ) {
    this.setupErrorHandler();
    this.router = express.Router();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  getRouter() {
    return this.router;
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  private setupRoutes() {
    this.router.post("/student-assignments", this.createStudentAssignment);
    this.router.post("/student-assignments/submit", this.submit);
  }

  // POST assignment created
  async createStudentAssignment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      if (isMissingKeys(req.body, ["studentId", "assignmentId"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { studentId, assignmentId, grade } = req.body;

      // check if student exists
      const student = await this.studentAssignmentsService.doesStudentExist(
        studentId
      );

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      // check if assignment exists
      const assignment =
        await this.studentAssignmentsService.doesAssignmentExist(assignmentId);

      if (!assignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignment =
        await this.studentAssignmentsService.createStudentAssignment(
          studentId,
          assignmentId
        );

      res.status(201).json({
        error: undefined,
        data: parseForResponse(studentAssignment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  async submit(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      if (isMissingKeys(req.body, ["id"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { id } = req.body;

      // check if student assignment exists
      const studentAssignment =
        await this.studentAssignmentsService.doesAssignmentExist(id);

      if (!studentAssignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignmentUpdated =
        await this.studentAssignmentsService.updateStudentAssignment(id);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignmentUpdated),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
