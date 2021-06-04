import { Batch } from './batch';
import { RegisteredUserResponse } from './registeredUserRespone';

export class Applicant {

  constructor(
    public registrations: RegisteredUserResponse[],
    public batches: Batch[]
    ){}
}
