export abstract class IGenericStrategy {
  abstract validate(...params: string[]): Promise<any>;
}
