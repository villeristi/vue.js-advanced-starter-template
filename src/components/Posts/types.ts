export interface Post {
  title: string;
  id: number;
  body?: string;
}

export interface Message {
  type: string;
  text: string;
}

export interface PostsState {
  all: Post[];
  current?: Post;
}
