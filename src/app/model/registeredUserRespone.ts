
export class RegisteredUserResponse {

  constructor(
    public fullName: string,
    public age: number,
    public gender: string,
    public mobile: string,
    public email: string,
    public address: string,
    public city: string,
    public state: string,
    public country: string,
    public pinCode: string,
    public height: number,
    public weight: number,
    public reason: string,
    public anyExistingMedicalConditions: boolean,
    public anyExistingDietaryRestrictions: boolean,
    public pregnantStatus: boolean,
    public dietaryCustom: string,
    public bmi: string
    ){}
}
