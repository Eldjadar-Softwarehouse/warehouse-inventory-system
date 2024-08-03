export interface SignInPayload {
  username: string;
  password: string;
}

export interface HeadersPayload {
  SIGNATURE: string;
  SECRET: string;
  IPADDRESS: string;
  [key: string]: string;
}
