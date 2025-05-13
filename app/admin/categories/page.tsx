"use client"

import Sidebar from "@/components/ui/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import NavbarAdmin from "@/components/ui/NavbarAdmin";
import { AddCategoryDialog } from "@/components/ui/AddCategoryDialog";
import { EditCategoryDialog } from "@/components/ui/EditCategoryDialog";

interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;
  
  // For edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{id: string, name: string} | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/')
    } else {
      fetchCategories()
    }
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://test-fe.mysellerpintar.com/api/categories')
      setCategories(response.data.data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  // Filter categories
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory({
      id: category.id,
      name: category.name
    });
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          alert("You must be logged in to delete categories");
          return;
        }
        
        await axios.delete(`https://test-fe.mysellerpintar.com/api/categories/${id}`, {
          headers: {
            "Authorization": `${token}`
          }
        });
        
        // Refresh categories after deletion
        fetchCategories();
        
      } catch (error) {
        console.error('Failed to delete category:', error);
        alert("Failed to delete category. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex-1 justify-between items-center bg-white px-6 py-4 border-b">
          <NavbarAdmin pathname="Category"/>
        </div>

        <main className="flex-1 bg-gray-50 p-6">
          {/* Page Title */}
          <h1 className="text-xl font-medium mb-6">Category</h1>

          {/* Stats and Search */}
          <div className="bg-white p-5 rounded-md shadow-sm mb-6">
            <p className="text-sm text-black mb-4">
              Total Category: {filteredCategories.length}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Category"
                  className="pl-10 pr-4 py-2 border rounded-md w-full text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <AddCategoryDialog onSuccess={fetchCategories} />
            </div>
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-md shadow-sm overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-gray-500 font-medium">Category</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Created at</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{category.name}</td>
                    <td className="px-6 py-4">
                      {new Date(category.createdAt).toLocaleDateString('en-US', {
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <button 
                        onClick={() => handleEdit(category)} 
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)} 
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                
                {currentCategories.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredCategories.length > 0 && (
            <div className="flex justify-center items-center gap-2 py-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 flex items-center ${
                  currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <span className="mr-1">&#10094;</span> Previous
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === pageNum ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
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

      {/* Edit Category Dialog */}
      {selectedCategory && (
        <EditCategoryDialog
          categoryId={selectedCategory.id}
          initialName={selectedCategory.name}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSuccess={fetchCategories}
        />
      )}
    </div>
  );
}