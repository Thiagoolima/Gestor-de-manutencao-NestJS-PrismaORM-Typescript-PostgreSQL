export type LoginDTO = {
  email: string;
  password: string;
};

export type FindEmailDTO = {
  email: string;
};
export type ResetPasswordDTO = {
  id: number;
  recovery_pass_token: string;
};
export type UpdateActivateUserDTO = {
  id: number;
  activation_token: string;
  active: boolean;
};

export type RecoveryPasswordDTO = {
  email: string;
};

export type SetNewPasswordDTO = {
  id: number;
  password: string;
  recovery_pass_token?: string;
};

export type UserFoundDTO = {
  id: number;
  active: boolean;
  recovery_pass_token?: string;
  created_at: Date;
  name: string;
  email: string;
  password: string;
  url_img_profile: string;
  activation_token: string;
};
