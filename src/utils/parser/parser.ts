import { Injectable } from '@nestjs/common';
import IProvider from './interfaces/provider.interface';
import PapaProvider from './providers/papa';

@Injectable()
export default class Parser {
  private readonly csvParser: IProvider;
  constructor() {
    this.csvParser = new PapaProvider();
  }

  async parseCsv<T>(filePath: string): Promise<T[]> {
    return await this.csvParser.parseCSV<T>(filePath);
  }
}
