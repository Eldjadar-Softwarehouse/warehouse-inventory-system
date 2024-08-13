export interface SignInPayload {
  username: string;
  password: string;
}

export interface ForgotPasswordPayload {
  username: string;
}

export interface NewPasswordPayload {
  password: string;
  cpassword: string;
  code: string;
}

export interface NewGAuthSetupPayload {
  tempToken: string;
  gcode: string;
}

export interface HeadersPayload {
  SIGNATURE: string;
  SECRET: string;
  IPADDRESS: string;
  [key: string]: string;
}
