export type LoginDTO = {
  email: string;
  password: string;
};

export type FindEmailDTO = {
  email: string;
};

export type UpdateActivateUserDTO = {
  id: number;
  email?: string;
  activation_token?: string;
  recovery_pass_token?: string;
};

export type RecoveryPasswordDTO = {
  email: string;
};

export type SetNewPasswordDTO = {
  password: string;
};
