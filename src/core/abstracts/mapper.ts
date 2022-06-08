export abstract class Mapper<T, R, S> {
  public abstract mapFrom(param: T): R;
  public abstract mapTo(param: R): S;
}
