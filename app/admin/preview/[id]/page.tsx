import ArticlePreviewClient from "@/components/ui/ArticlePreviewClient";
import { ArticleType } from "@/types/types";

// Remove the custom interface and use the Next.js expected format
export default async function PreviewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    // Use fetch instead of axios for server components
    const res = await fetch(`https://test-fe.mysellerpintar.com/api/articles/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch article');
    const article: ArticleType = await res.json();

    const allArticlesRes = await fetch(`https://test-fe.mysellerpintar.com/api/articles`, { cache: 'no-store' });
    if (!allArticlesRes.ok) throw new Error('Failed to fetch articles');
    const allArticlesData = await allArticlesRes.json();
    const allArticles: ArticleType[] = allArticlesData.data;

    const relatedArticles = allArticles
      .filter((item) => item.category?.name === article.category?.name && item.id !== article.id)
      .slice(0, 3);

    // Pass the data to the client component
    return <ArticlePreviewClient article={article} relatedArticles={relatedArticles} />;
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load article</p>
      </div>
    );
  }
}