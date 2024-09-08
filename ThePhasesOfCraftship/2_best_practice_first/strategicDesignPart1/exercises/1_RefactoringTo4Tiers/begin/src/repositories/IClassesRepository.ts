import { Class } from "@prisma/client";

export interface IClassesRepository {
  get(): Promise<void>;
  create(name: string): Promise<Class>;
  update(): Promise<void>;
  delete(): Promise<void>;
}
