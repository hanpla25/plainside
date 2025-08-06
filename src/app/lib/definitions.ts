export type Gall = {
  id: number;
  abbr: string;
  name: string;
  creator_name: string;
  created_at: string;
};

export type GallMeta = {
  name: string;
  abbr: string;
};

export type UserPayload = {
  user_id: string;
  user_name: string;
  created_at: string;
};

export type UserData = {
  id: string;
  name: string;
  write_count: number;
  comment_count: number;
  created_at: string;
};

export type Post = {
  id: number;
  user_name: string;
  title: string;
  content: string;
  abbr: string;
  gall_name: string;
  view_count: number;
  like_count: number;
  dislike_count: number;
  comment_count: number;
  ip_address: string;
  created_at: string;
  is_login: boolean;
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
