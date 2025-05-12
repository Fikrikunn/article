"use client"

import { ArticleType } from "@/types/types";
import Link from "next/link";


export default function ArticleCardAdmin({ article }: { article: ArticleType }) {

    return (
        <Link href={`/admin/preview/${article.id}`}>
        <div key={article.id} className="bg-white rounded-xl overflow-hidden">
              
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-sm text-gray-700">
                No Image
              </div>
            )}
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <h2 className="text-lg font-semibold mb-1">{article.title}</h2>
              <div className="mb-3">
                <span>
                  {article.content.split(" ").slice(0, 10).join(" ")}
                </span>

              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className=" text-blue-800 bg-blue-200 px-3 py-1.5 rounded-full">
                  {article.category.name}
                </span>
                <span className="text-blue-800 bg-blue-200 px-3 py-1.5 rounded-full">
                  {article.user.username}
                </span>
              </div>
            </div>
          </div>
          </Link>
    )
}