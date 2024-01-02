export type LoginDTO = {
  email: string;
  password: string;
};

export type FindEmailDTO = {
  email: string;
};

export type UpdateActivateUserDTO = {
  id: number;
  name?: string;
  activation_token?: string;
  recovery_pass_token?: string;
};

export type RecoveryPasswordDTO = {
  email: string;
};
