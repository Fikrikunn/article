"use client"

import Sidebar from "@/components/ui/SideBar";
import Navbar from "@/components/ui/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import { ArticleType } from "@/types/types";
import NavbarAdmin from "@/components/ui/NavbarAdmin";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== 'Admin') {
    router.push('/');
  } else {
    setToken(token);
    fetchArticles();
  }
}, []);


  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://test-fe.mysellerpintar.com/api/articles')
      setArticles(response.data.data)
    } catch (error) {
      console.error('Gagal mengambil data artikel:', error)
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const uniqueCategories = Array.from(
    new Set(articles.map((a) => a.category.name))
  );

  const filteredArticles = articles.filter((article) => {
    const matchCategory = selectedCategory
      ? article.category.name === selectedCategory
      : true;
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };

  const handleDelete = async (id: string) => {
  const confirm = window.confirm("Are you sure you want to delete this article?");
  if (!confirm) return;

  try {
    const response = await axios.delete(
      `https://test-fe.mysellerpintar.com/api/articles/${id}`,
      { headers: { Authorization: `${token}` } }
    );
    alert("Article deleted successfully.");
    fetchArticles();
  } catch (error: any) {
    console.error("Failed to delete article:", error.response?.data || error.message);
    alert("Failed to delete article.");
  }
};



  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className=" justify-between items-center bg-white px-6 py-4 border-b">
          <NavbarAdmin pathname="Article"/>
        </div>
        <main className="flex-1 bg-gray-50 p-6">

          {/* Top stats + filter */}
          <div className="bg-white p-4 rounded-md shadow-sm mb-6">
            <p className="text-sm text-black mb-4 font-semibold">
              Total Articles : {filteredArticles.length}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <select
                  className="bg-white pl-3 pr-8 py-2 border rounded-md text-sm min-w-[150px]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative flex-grow max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title"
                  className="pl-10 pr-4 py-2 border rounded-md w-full text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button onClick={() => router.push("/admin/articlesCreate")} className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer">
                + Add Articles
              </button>
              
            </div>
          </div>

          {/* Articles Table */}
          <div className="bg-white rounded-md shadow-sm overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Thumbnails</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Created at</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentArticles.map((article) => (
                  <tr key={article.id} className="border-t">
                    <td className="px-4 py-2">

                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                      ) : (
                        <div className="w-15 h-15 bg-gray-300 flex items-center justify-center text-sm text-gray-700 rounded-md">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">{article.title}</td>
                    <td className="px-4 py-2">{article.category.name}</td>
                    <td className="px-4 py-2">
                      {new Date(article.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <Link href={`/admin/preview/${article.id}`} className="text-blue-600 underline font-semibold hover:text-blue-800">Preview</Link>
                      <Link href={`/admin/articleEdit/${article.id}`} className="text-blue-600 underline font-semibold hover:text-blue-800">Edit</Link>
                      <button onClick={() => handleDelete(article.id)} className="text-red-600 underline font-semibold hover:text-red-800">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredArticles.length > 0 && (
  <div className="flex justify-center items-center gap-2 py-8">
    <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className={`px-4 py-2 flex items-center ${
        currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      <span className="mr-1">&#10094;</span> Previous
    </button>

    {/* First page */}
    <button
      onClick={() => setCurrentPage(1)}
      className={`w-8 h-8 flex items-center justify-center rounded-md ${
        currentPage === 1 ? "border border-gray-300 font-medium" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      1
    </button>

    {/* Show ellipsis if there are pages between 1 and currentPage */}
    {currentPage > 3 && <span className="px-2">...</span>}

    {/* Show page numbers around current page */}
    {Array.from({ length: totalPages }).map((_, index) => {
      const pageNumber = index + 1;
      // Only show page numbers 2 to totalPages-1, and only those close to current page
      if (pageNumber !== 1 && pageNumber !== totalPages) {
        if (
          (currentPage > 2 && pageNumber === currentPage - 1) || 
          pageNumber === currentPage || 
          (currentPage < totalPages - 1 && pageNumber === currentPage + 1)
        ) {
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === pageNumber ? "border border-gray-300 font-medium" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {pageNumber}
            </button>
          );
        }
      }
      return null;
    })}

    {/* Show ellipsis if there are pages between currentPage and last page */}
    {currentPage < totalPages - 2 && <span className="px-2">...</span>}

    {/* Last page - only show if there's more than one page */}
    {totalPages > 1 && (
  <button
    onClick={() => setCurrentPage(totalPages)}
    className={`w-8 h-8 flex items-center justify-center rounded-md ${
      currentPage === totalPages ? "border border-gray-300 font-medium" : "text-gray-700 hover:text-blue-600"
    }`}
  >
    {totalPages}
  </button>
)}


    <button
      onClick={nextPage}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 flex items-center ${
        currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      Next <span className="ml-1">&#10095;</span>
    </button>
  </div>
)}
        </main>
      </div>
    </div>
  );
}
