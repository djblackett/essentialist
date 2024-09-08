import { StudentsPrismaRepo } from "../repositories/implementations/studentsPrismaRepo";

export class StudentsService {
  constructor(private studentRepository: StudentsPrismaRepo) {}

  async createStudent(name: string) {
    const cls = await this.studentRepository.create(name);

    return cls;
  }
}
