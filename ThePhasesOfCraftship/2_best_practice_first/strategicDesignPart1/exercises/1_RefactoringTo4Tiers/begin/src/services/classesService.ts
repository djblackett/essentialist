import { ClassesPrismaRepo } from "../repositories/implementations/classesPrismaRepository";

export class ClassesService {
  constructor(private classesPrismaRepo: ClassesPrismaRepo) {}

  async createClass(name: string) {
    const response = await this.classesPrismaRepo.create(name);
    return response;
  }
}
