import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, unlinkSync } from 'fs';
import { join, resolve } from 'path';
import * as TOML from '@iarna/toml';

type TomlSerializable = string | number | boolean | Date | null | TomlSerializable[] | { [key: string]: TomlSerializable };

@Injectable()
export class StorageService {
  private basePath: string;

  constructor() {
    this.basePath = resolve(process.env.HOME || '.', '.interviewed');
    if (!existsSync(this.basePath)) {
      mkdirSync(this.basePath, { recursive: true });
    }
  }

  private getFilePath(collection: string, id: string): string {
    return join(this.basePath, collection, `${id}.toml`);
  }

  private ensureCollectionDir(collection: string): void {
    const dir = join(this.basePath, collection);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  async save<T>(collection: string, id: string, data: T): Promise<void> {
    this.ensureCollectionDir(collection);
    const filePath = this.getFilePath(collection, id);
    const serialized = this.serializeForToml(data);
    writeFileSync(filePath, TOML.stringify(serialized as unknown as TOML.JsonMap));
  }

  async get<T>(collection: string, id: string): Promise<T | null> {
    const filePath = this.getFilePath(collection, id);
    if (!existsSync(filePath)) return null;
    const content = readFileSync(filePath, 'utf-8');
    return TOML.parse(content) as T;
  }

  async getAll<T>(collection: string): Promise<T[]> {
    const dir = join(this.basePath, collection);
    if (!existsSync(dir)) return [];

    const files = readdirSync(dir).filter(f => f.endsWith('.toml'));
    return files.map(file => {
      const content = readFileSync(join(dir, file), 'utf-8');
      return TOML.parse(content) as T;
    });
  }

  async delete(collection: string, id: string): Promise<void> {
    const filePath = this.getFilePath(collection, id);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  async findByField<T>(collection: string, field: keyof T, value: unknown): Promise<T | null> {
    const items = await this.getAll<T>(collection);
    return items.find(item => item[field] === value) || null;
  }

  private serializeForToml(data: unknown): TomlSerializable {
    if (data instanceof Date) {
      return data.toISOString();
    }
    if (Array.isArray(data)) {
      return data.map(v => this.serializeForToml(v));
    }
    if (typeof data === 'object' && data !== null) {
      const result: { [key: string]: TomlSerializable } = {};
      for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
        result[key] = this.serializeForToml(value);
      }
      return result;
    }
    return data as TomlSerializable;
  }
}
