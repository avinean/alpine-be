import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UtilService {
  delete(name: string) {
    try {
      return fs.unlink(`.${name}`, () => {});
    } catch (error) {
      console.error(error);
    }
  }
}
