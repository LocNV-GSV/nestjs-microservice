export interface Article {
    id: number;
    title: string,
    image: string,
    userId: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}