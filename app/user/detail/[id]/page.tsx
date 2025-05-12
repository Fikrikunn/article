
import NavbarDetail from "@/components/ui/NavbarDetail";
import { ArticleType } from "@/types/types";
import axios from "axios";
import ArticleCard from "@/components/ui/ArticleCard";
import Footer from "@/components/ui/Footer";


// const dataDummy = {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "🔧 What Is Dev Mode? Dev Mode is a new interface within Figma that provides developer-focused tools and removes unnecessary UI clutter that designers typically use. Instead, developers can view ready-to-implement specs, such as spacing, color values, font styles, and asset exports—without disrupting the design file or asking the design team for clarifications", 
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRki_kenmX2B8uDgq-OP1WY4ke-73Xiu1Gcqg&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
// }

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailPage({params}: Props) {
    const { id } = await params;
    
    const res = await axios.get(`https://test-fe.mysellerpintar.com/api/articles/${id}`)
    const article : ArticleType = res.data
    console.log(article, "<<<<<<<<<<<<<<<<<<< data");

    const allArticlesRes = await axios.get(`https://test-fe.mysellerpintar.com/api/articles`);
    const allArticles: ArticleType[] = allArticlesRes.data.data;
    
    const relatedArticles = allArticles.filter((item) => item.category.name == article.category.name && item.id !== article.id).slice(0, 3);

    return (
        <>
      <NavbarDetail />
      <div className="flex flex-col items-center min-h-screen bg-white px-4 py-8">
        <p className="text-sm text-gray-500 mb-2 text-center">
          {new Date(article.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          • {article.user.username}
        </p>
        <h1 className="text-3xl font-bold text-center mb-6">
          {article.title}
        </h1>

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
    <p className="text-lg text-gray-700 text-justify">
      {article.content}
    </p>
  </div>
</div>


        {relatedArticles.length > 0 && (
  <div className="w-full max-w-4xl mt-12">
    <h3 className="text-2xl font-semibold mb-6">Other articles in {article.category.name}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedArticles.map((rel) => (
        <ArticleCard key={rel.id} article={rel} />
      ))}
    </div>
  </div>
)}

      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </>
    )
}