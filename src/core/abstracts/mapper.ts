export abstract class Mapper<D, E> {
  public abstract toEntity(param: D): E;
  public abstract toDTO(param: E): D;
}
