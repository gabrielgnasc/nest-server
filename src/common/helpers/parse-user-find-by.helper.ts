import { IUserFindBy } from '../interfaces/user-interfaces/user-findby.interface';

export function parseUserFindBy(userFindBy: IUserFindBy) {
  if (!userFindBy) return {};
  const isOrOperator = userFindBy.method === 'OR';
  let options = userFindBy;
  if (isOrOperator) {
    options = Object.keys(userFindBy)
      .filter((key) => key !== 'method')
      .map((key) => ({ [key]: userFindBy[key] })) as any;
  } else {
    delete options.method;
  }
  return options;
}
