export type Role = "student" | "admin" | "clubhead" | null

export type RegisterActions = {
  field: keyof RegisterState;
  value: string;
};

export type RegisterState = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type LoginState = {
  email: string;
  password: string;
  role: Role;
};

export type LoginActions = {
   field: keyof LoginState;
  value: string;
};


export interface UserInputProps {
  inputHandler: (actions: {field : any , value : any}) => void;
};

