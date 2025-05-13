"use client"

import { ArticleType } from "@/types/types";
import Footer from "@/components/ui/Footer";
import ArticleCardAdmin from "@/components/ArticleCardAdmin";
import NavbarAdmin from "@/components/ui/NavbarAdmin";

interface ArticlePreviewProps {
  article: ArticleType;
  relatedArticles: ArticleType[];
}

export default function ArticlePreviewClient({ article, relatedArticles }: ArticlePreviewProps) {
  return (
    <>
      <NavbarAdmin pathname="LogoIpsum" />
      <div className="flex flex-col items-center min-h-screen bg-white px-4 py-8">
        <p className="text-sm text-gray-500 mb-2 text-center">
          {new Date(article.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {article.user.username}
        </p>
        <h1 className="text-3xl font-bold text-center mb-6">{article.title}</h1>

        <div className="w-full max-w-4xl">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-[600px] object-cover rounded-lg shadow-lg mx-auto"
            />
          ) : (
            <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-sm text-gray-700 mt-4 rounded-lg">
              No Image
            </div>
          )}

          <div className="mt-6">
            <p className="text-lg text-gray-700 text-justify">{article.content}</p>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="w-full max-w-4xl mt-12">
            <h3 className="text-2xl font-semibold mb-6">Other articles in {article.category.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCardAdmin key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
}