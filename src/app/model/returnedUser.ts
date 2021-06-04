import { Role } from './role.enum';

export class ReturnedUser {

  //Role: Role;

  constructor(
    public referralId: number,
    public userName: string,
    public role: Role,
    public token: string
    ){}
}
