export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  url_img_profile: string;
  activation_token: string;
};

export type EmailDTO = {
  email: string;
};

export type UserCreatedDTO = {
  id: number;
  active: boolean;
  recovery_pass_token?: string;
  created_at: Date;
} & CreateUserDTO;
