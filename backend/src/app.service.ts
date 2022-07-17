import { Injectable } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

const DB_PATH = 'db/db.json';

@Injectable()
export class AppService {
  db: JsonDB;
  lastId: number;

  constructor() {
    this.db = new JsonDB(new Config(DB_PATH, true, true, '/'));
    const data = this.db.getData('/');
    this.lastId =
      data && Object.keys(data).length > 0
        ? Math.max(...Object.keys(data).map((key) => Number(key)))
        : -1;
  }

  get(fileId: number) {
    return this.db.getData(`/${fileId}`);
  }
}
