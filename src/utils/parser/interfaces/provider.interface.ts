export default interface IProvider 
{
    parseCSV<T>(filePath: string): Promise<T[]>
}