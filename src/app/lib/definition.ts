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
