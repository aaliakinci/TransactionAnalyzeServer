 import * as fs from 'node:fs';
import * as Papa from 'papaparse';
import IProvider from '../interfaces/provider.interface';

export default class PapaProvider implements IProvider {
  async parseCSV<T>(filePath: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const parsed = Papa.parse<T>(data, {
            header: true, // İlk satırı başlık olarak kullanır
            dynamicTyping: true,
            skipEmptyLines: true,
          });
          resolve(parsed.data);
        }
      });
    });
  }
}
