
export type ArticleType = {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  content: string;
  imageUrl: string | null;
  category: {
    id: string;
    name: string;
    userId: string;
  };
  user: {
    id: string;
    username: string;
  };
}