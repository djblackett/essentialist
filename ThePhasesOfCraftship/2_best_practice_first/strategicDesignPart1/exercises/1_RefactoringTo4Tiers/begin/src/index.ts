import express, { Request, Response } from "express";
import { prisma } from "./database";
import { Student, Class, Assignment, StudentAssignment } from "@prisma/client";
import { error } from "console";
import { StudentsPrismaRepo } from "./repositories/implementations/studentsPrismaRepo";
import { isMissingKeys, parseForResponse, isUUID } from "./utils";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

export const Errors = {
  ValidationError: "ValidationError",
  StudentNotFound: "StudentNotFound",
  ClassNotFound: "ClassNotFound",
  AssignmentNotFound: "AssignmentNotFound",
  ServerError: "ServerError",
  ClientError: "ClientError",
  StudentAlreadyEnrolled: "StudentAlreadyEnrolled",
};

// POST student assignment graded
app.post("/student-assignments/grade", async (req: Request, res: Response) => {
  try {
    if (isMissingKeys(req.body, ["id", "grade"])) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    const { id, grade } = req.body;

    // validate grade
    if (!["A", "B", "C", "D"].includes(grade)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    // check if student assignment exists
    const studentAssignment = await prisma.studentAssignment.findUnique({
      where: {
        id,
      },
    });

    if (!studentAssignment) {
      return res.status(404).json({
        error: Errors.AssignmentNotFound,
        data: undefined,
        success: false,
      });
    }

    const studentAssignmentUpdated = await prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        grade,
      },
    });

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
});

// GET all students
app.get("/students", async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    res.status(200).json({
      error: undefined,
      data: parseForResponse(students),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET a student by id
app.get("/students/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: Errors.StudentNotFound,
        data: undefined,
        success: false,
      });
    }

    res.status(200).json({
      error: undefined,
      data: parseForResponse(student),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET assignment by id
app.get("/assignments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }
    const assignment = await prisma.assignment.findUnique({
      include: {
        class: true,
        studentTasks: true,
      },
      where: {
        id,
      },
    });

    if (!assignment) {
      return res.status(404).json({
        error: Errors.AssignmentNotFound,
        data: undefined,
        success: false,
      });
    }

    res.status(200).json({
      error: undefined,
      data: parseForResponse(assignment),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET all assignments for class
app.get("/classes/:id/assignments", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    // check if class exists
    const cls = await prisma.class.findUnique({
      where: {
        id,
      },
    });

    if (!cls) {
      return res
        .status(404)
        .json({ error: Errors.ClassNotFound, data: undefined, success: false });
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        classId: id,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    res.status(200).json({
      error: undefined,
      data: parseForResponse(assignments),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET all student submitted assignments
app.get("/student/:id/assignments", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: Errors.StudentNotFound,
        data: undefined,
        success: false,
      });
    }

    const studentAssignments = await prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        status: "submitted",
      },
      include: {
        assignment: true,
      },
    });

    res.status(200).json({
      error: undefined,
      data: parseForResponse(studentAssignments),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

// GET all student grades
app.get("/student/:id/grades", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) {
      return res.status(400).json({
        error: Errors.ValidationError,
        data: undefined,
        success: false,
      });
    }

    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return res.status(404).json({
        error: Errors.StudentNotFound,
        data: undefined,
        success: false,
      });
    }

    const studentAssignments = await prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        status: "submitted",
        grade: {
          not: null,
        },
      },
      include: {
        assignment: true,
      },
    });

    res.status(200).json({
      error: undefined,
      data: parseForResponse(studentAssignments),
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: Errors.ServerError, data: undefined, success: false });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
