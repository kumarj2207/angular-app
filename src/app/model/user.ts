import { Role } from './role.enum';

export class User {

  //Role: Role;

  constructor(
    public userName: string,
    public email: string,
    public password: string,
    public role: Role
    ){}
}
