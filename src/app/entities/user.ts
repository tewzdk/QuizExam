export class User {
  _id?: string;
  fullname?: string;
  email?: string;
  gender?: Gender; 
  birthdate?: Date;
}

export enum Gender {
  MALE = "Male", FEMALE = "Female", OTHER = "Other"
}