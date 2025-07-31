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

export type Gall = {
  id: number;
  abbr: string;
  name: string;
  creator_name: string;
  created_at: string;
};

export type GallMeta = {
  abbr: string;
  name: string;
};

export type PostListData = {
  postList: Post[];
  count: number;
  totalPages: number;
};

export type Post = {
  id: number;
  user_id: string;
  user_name: string;
  title: string;
  content: string;
  abbr: string;
  gall_name: string;
  view_count: number;
  like_count: number;
  dislike_count: number;
  comment_count: number;
  password: number;
  ip_address: string;
  created_at: string;
};

export type Comment = {
  id: number;
  post_id: number;
  user_name: string;
  user_id: string;
  content: string;
  ip_address: string;
  created_at: string;
  first_comment_id: number | null;
};
