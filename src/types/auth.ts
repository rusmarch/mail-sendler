export type CreateUserData = {
  username: string;
  email: string;
  password: string;
};

export type CreateUserRequest = CreateUserData;

export type CreateUserResponse = CreateUserData & {
  id: number;
};

export type RetrieveUserData = {
  username: string;
  password: string;
};

export type RetrieveUserResponse = {
  id: number;
  username: string;
  email: string;
};

export type UserState = CreateUserResponse | RetrieveUserResponse | null;
