import APIError from "../utils/ApiError";

export interface ReadRepository<T> {
  findOne(id: string): Promise<T>;
  findAll(quantity?: number): Promise<T[]>;
}

export interface InsertRepository<T> {
  create(data: Partial<T>): Promise<any>;
}

export interface WriteRepository<T> {
  createMany(data: Partial<T>[]): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T>;
}

export default abstract class BaseRepository<T> implements ReadRepository<T>, WriteRepository<T>, InsertRepository<T> {
  private tableName: string;
  constructor(name: string) {
    this.tableName = name;
  }

  findOne(id: string): Promise<T> {
    throw new APIError('Some method was not implemented', 500);
  }

  findAll(quantity?: number): Promise<T[]> {
    throw new APIError('Some method was not implemented', 500);
  }

  create(data: Partial<T>): Promise<any> {
    throw new APIError('Some method was not implemented', 500);
  }

  createMany(data: Partial<T>[]): Promise<T[]> {
    throw new APIError('Some method was not implemented', 500);
  }

  update(id: string, data: Partial<T>): Promise<T> {
    throw new APIError('Some method was not implemented', 500);
  }
}