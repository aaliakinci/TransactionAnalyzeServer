export default interface IProvider {
  normalize<R>( prompt: string): Promise<R>;
}
