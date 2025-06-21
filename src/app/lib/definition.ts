export type Gallery = {
  id: number;
  abbr: string;
  gall_name: string;
  creator_name: string;
  created_at: string;
};

export type RecentGall = {
  abbr: string;
  name: string;
  href: string;
};

export type Post = {
  id: number;
  nickname: string;
  abbr: string;
  gall_name: string;
  title: string;
  content: string;
  view_count: string;
  like_count: number;
  dislike_count: number;
  comment_count: number;
  ip_address?: string;
  created_at: string;
};

export type UserPayload = {
  user_id: string;
  user_name: string;
  created_at: string;
};

export type UserData = {
  user_id: string;
  user_name: string;
  write_count: number;
  comment_count: number;
  created_at: string;
};

export type AuthForm = {
  id: string;
  password: string;
  name?: string;
  redirectTo?: string;
};

export type LoginFormState = {
  errorMsg?: string;
  nameErrorMsg?: string;
  idErrorMsg?: string;
  passwordErrorMsg?: string;
  input?: {
    id: string;
    password: string;
    name?: string;
  };
};
