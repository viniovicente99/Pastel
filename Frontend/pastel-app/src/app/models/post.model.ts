
export interface Post {
    id: string,
    id_user: string,
    name_user: string,
    title: string,
    description: string,
    category: string,
    content: string,
    imageUrls?: string[];
    creation_date? : string;

};