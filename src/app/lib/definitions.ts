export type UserPayload = {
  user_id: string;
  user_name: string;
  created_at: string;
};

export type UserData = {
  name: string;
  write_count: number;
  comment_count: number;
  created_at: string;
};

export type Gall = {
  abbr: string;
  name: string;
};

export type PostList = {
  id: number;
  user_name: string;
  title: string;
  abbr: string;
  gall_name: string;
  view_count: number;
  like_count: number;
  comment_count: number;
  ip_address: string;
  created_at: string;
  is_login: boolean;
};

export type PostListData = {
  post_list: PostList[];
  count: number;
  total_page: number;
};

export type Post = {
  id: number;
  user_name: string;
  title: string;
  content: object;
  abbr: string;
  gall_name: string;
  view_count: number;
  like_count: number;
  dislike_count: number;
  comment_count: number;
  is_login: boolean;
  ip_address: string;
  created_at: string;
};

export type DBComment = {
  id: number;
  post_id: number;
  parent_id: number | null;
  user_name: string;
  content: string;
  is_login: boolean;
  created_at: string;
};
