import express, { Router } from "express";
import { ErrorHandler } from "./ErrorHandler";
import { isMissingKeys, parseForResponse } from "../utils";
import { StudentsService } from "../services/studentsService";

class StudentsController {
  private router: Router;

  constructor(
    private studentService: StudentsService,
    private errorHandler: ErrorHandler
  ) {
    this.setupErrorHandler();
    this.router = Router();
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
    // Routes go here
    this.router.post("/", this.createStudent);
  }

  private async createStudent(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    // Controller logic goes here
    try {
      if (isMissingKeys(req.body, ["name"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { name } = req.body;

      const response = await this.studentService.createStudent(name);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(response),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
