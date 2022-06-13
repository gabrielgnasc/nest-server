export interface IUserFindBy {
  method?: 'OR' | 'AND';

  name?: string;
  id?: string;
  email?: string;
  login?: string;
}
