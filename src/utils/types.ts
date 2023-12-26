export type LogInParams = {
  username: string;
  password: string;
};

export type CreateUserParams = {
  username: string;
  password_hash: string;
  email: string;
  account_status: string;
  registration_date: Date;
  last_login_date: Date;
  first_name: string;
  last_name: string;
  phone_number: string;
  current_organization: number;
};

export type UpdateUserParams = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};
