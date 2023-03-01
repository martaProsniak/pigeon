export interface IUser {
    name: string,
    password: string,
    email: string,
    id: number,
    tweets?: ITweet[]
}

export interface ITweet {
    id: number,
    title: string,
    content: string,
    author: IUser,
    authorId: number,
    createdAt: Date
}