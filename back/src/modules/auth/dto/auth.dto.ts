export type LoginDTO = {
  email: string;
  password: string;
};

export type FindEmailDTO = {
  email: string;
};

export type UpdateActivateUserDTO = {
  id: number;
  activation_token: string;
};
