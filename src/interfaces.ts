export interface IUser {
  name: string;
  password: string;
  email: string;
  id: number;
  tweets?: ITweet[];
}

export interface ITweet {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export interface ITweetWithAuthor extends ITweet {
  author: IUser;
  authorId: number;
}
