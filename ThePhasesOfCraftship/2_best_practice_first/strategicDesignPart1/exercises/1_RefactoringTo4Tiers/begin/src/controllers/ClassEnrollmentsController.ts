import express, { Router } from "express";
import { ErrorHandler } from "./ErrorHandler";
import { isMissingKeys, parseForResponse } from "../utils";
import { ClassesService } from "../services/classesService";
import { Errors } from "..";
import { prisma } from "../database";
import { ClassEnrollmentsService } from "../services/ClassEnrollmentsService";

export class ClassesController {
  private router: Router;

  constructor(
    private classEnrollmentService: ClassEnrollmentsService,
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
    this.router.post("/class-enrollments", this.enrollInClass);
  }

  private async enrollInClass(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      if (isMissingKeys(req.body, ["studentId", "classId"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { studentId, classId } = req.body;

      // check if student exists
      const student = await this.classEnrollmentService.doesStudentExist(
        studentId
      );

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      // check if class exists
      const cls = await this.classEnrollmentService.doesClassExist(classId);

      // check if student is already enrolled in class
      const duplicatedClassEnrollment =
        await this.classEnrollmentService.isStudentEnrolled(studentId, classId);

      if (duplicatedClassEnrollment) {
        return res.status(400).json({
          error: Errors.StudentAlreadyEnrolled,
          data: undefined,
          success: false,
        });
      }

      if (!cls) {
        return res.status(404).json({
          error: Errors.ClassNotFound,
          data: undefined,
          success: false,
        });
      }

      const classEnrollment = await this.classEnrollmentService.enrollStudent(
        studentId,
        classId
      );

      res.status(201).json({
        error: undefined,
        data: parseForResponse(classEnrollment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
