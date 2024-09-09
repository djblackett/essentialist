import express from "express";
import { Errors } from "..";
import { isMissingKeys, parseForResponse } from "../utils";
import { ErrorHandler } from "./ErrorHandler";
import { AssignmentService } from "../services/AssignmentService";

export class AssignmentController {
  private router: express.Router;
  constructor(
    private assignmentService: AssignmentService,
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
    this.router.post("/assignments", this.createAssignment);
  }

  // POST assignment created
  async createAssignment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      if (isMissingKeys(req.body, ["classId", "title"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { classId, title } = req.body;

      const assignment = await this.assignmentService.createAssignment(
        classId,
        title
      );

      res.status(201).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
