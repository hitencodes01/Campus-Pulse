export type Role = "student" | "admin" | "clubhead" | null;

export type RegisterActions = {
  field: keyof RegisterState;
  value: string;
};

export type RegisterState = {
  name: string;
  email: string;
  password: string;
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
  inputHandler: (actions: { field: any; value: any }) => void;
}

export interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: Date;
  capacity: number;
  fest: {
    _id: string;
    name: string;
    description: string;
  };

  organizingClubs: [
    {
      _id: string;
      name: string;
      clubHeads: [
        {
          _id: string;
          name: string;
        },
      ];
    },
  ];
  createdBy: string;
  createdAt: Date;
}

export type FestItem = {
  _id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
};


export type ClubItem = {
  _id : string;
  name: string;
  description: string;
  category: string;
  clubHeads: {
    _id: string;
    name: string;
    role: string;
  }[];
  createdAt: Date;
};
