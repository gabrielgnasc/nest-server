import { RequestDTO } from '../dtos/auth';

export function userIdMatch(request: RequestDTO, id: string) {
  return request && request.user && request.user.id === id;
}
