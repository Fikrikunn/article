"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

const ArticleEdit = () => {
  const { id } = useParams()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null) 

  const [article, setArticle] = useState<Article | null>(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newImage, setNewImage] = useState<File | null>(null) 
  const [imagePreview, setImagePreview] = useState<string | null>(null) 
  const { register, handleSubmit, setValue } = useForm()

  useEffect(() => {
    fetchArticle()
    fetchCategories()
  }, [id])

  const fetchArticle = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await axios.get(`https://test-fe.mysellerpintar.com/api/articles/${id}`)
      
      const data = res.data
      
      if (data && data.id) {
        setArticle(data)
        
        setValue("title", data.title || "")
        setValue("categoryId", data.categoryId || "")
        setValue("content", data.content || "")
      } else {
        setError("Article not found or invalid format")
        console.error("Invalid article data format:", res.data)
      }
    } catch (err) {
      console.error("Error fetching article:", err)
      setError("Failed to load article. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChangeClick = (e: React.MouseEvent) => {
    e.preventDefault() 
    fileInputRef.current?.click() 
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImage(file)
      
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setNewImage(null)
    setImagePreview(null)
    if (article) {
      setArticle({
        ...article,
        imageUrl: undefined
      })
    }
  }

 const fetchCategories = async () => {
  try {
    const res = await axios.get(`https://test-fe.mysellerpintar.com/api/categories`)
    
    
    if (res.data && Array.isArray(res.data.data)) {
      setCategories(res.data.data)
    } else {
      console.error("Unexpected categories format:", res.data)
      setCategories([]) // Set empty array if format is unexpected
    }
  } catch (err) {
    console.error("Error fetching categories:", err)
    setCategories([]) // Set empty array on error
  }
}

const onSubmit = async (formData: any) => {
  try {
    // Get auth token
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("You are not authenticated. Please login again.");
      router.push('/');
      return;
    }

    
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
      const userId = localStorage.getItem('userId');
      if (article?.userId !== userId) {
        alert("You don't have permission to edit this article.");
        router.push('/admin/dashboard');
        return;
      }
    }
    
    // Define payload
    let payload = {
      title: formData.title,
      content: formData.content,
      categoryId: formData.categoryId,
      imageUrl: article?.imageUrl || null
    };
    
    // If we have a new image, upload it first using the dedicated upload endpoint
    if (newImage) {
      try {
        console.log("Uploading new image:", newImage.name);
        
        // Create FormData for image upload only
        const imageFormData = new FormData();
        imageFormData.append("image", newImage);  // Use "image" as the field name like in ArticlesCreate
        
        // Upload the image to the dedicated upload endpoint
        const uploadResponse = await axios.post(
          "https://test-fe.mysellerpintar.com/api/upload",  
          imageFormData,
          {
            headers: {
              "Authorization": `${token}`,
            }
          }
        );
        
        // Get the image URL from the response
        const imageUrl = uploadResponse.data.imageUrl;
        console.log("Image uploaded successfully, got URL:", imageUrl);
        
        // Update the payload with the new image URL
        payload.imageUrl = imageUrl;
      } catch (uploadError) {
        console.error("Failed to upload image:", uploadError);
        alert("Failed to upload image. Please try again.");
        return;  
      }
    }
    
    try {
  console.log("Updating article with payload:", payload);
  
  const response = await axios.put(
    `https://test-fe.mysellerpintar.com/api/articles/${id}`,
    payload,
    {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  console.log("Article update successful:", response.data);
  
  const updatedArticleResponse = await axios.get(
    `https://test-fe.mysellerpintar.com/api/articles/${id}`,
    {
      headers: {
        'Authorization': `${token}`
      }
    }
  );
  
  console.log("Final article state after update:", updatedArticleResponse.data);
  setArticle(updatedArticleResponse.data);
  
  alert("Article updated successfully!");
  router.push("/admin/dashboard");
} catch (error) {
  // Properly type the error as AxiosError
  const apiError = error as AxiosError<any>;
  console.error("API Error:", apiError.response?.data || apiError.message);
  alert(`Failed to update article: ${apiError.response?.data?.message || apiError.message}`);
}
  } catch (err) {
    console.error("General error:", err);
    alert("An unexpected error occurred. Please try again.");
  }
}


  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  if (error) return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <p className="text-red-500 mb-4">{error}</p>
      <Button onClick={() => fetchArticle()}>Try Again</Button>
    </div>
  )

  if (!article) return (
    <div className="flex justify-center items-center min-h-screen">
      <p>Article not found</p>
    </div>
  )

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <div className="bg-white p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Articles</h2>
        </div>
        <main className="flex-1 p-6 bg-gray-50">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-md shadow-sm space-y-6 max-w-4xl mx-auto">
            {/* Thumbnail with added file input functionality */}
            <div>
              <Label className="mb-1 block">Thumbnails</Label>
              
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
                accept="image/*"
              />
              
              {/* Show either the new preview image or the existing image */}
              {(imagePreview || article?.imageUrl) && (
                <Image
                  src={imagePreview || article?.imageUrl || ''}
                  alt="Thumbnail"
                  width={150}
                  height={150}
                  className="rounded-md mb-2"
                />
              )}
              
              {/* Change button with onClick handler */}
              <button 
                onClick={handleChangeClick}
                type="button"
                className="text-sm text-blue-600 underline cursor-pointer inline-block mr-4"
              >
                Change
              </button>
              
              {/* Delete button with onClick handler */}
              <button 
                onClick={handleDeleteClick}
                type="button"
                className="text-sm text-red-600 underline cursor-pointer inline-block"
              >
                Delete
              </button>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} className="mt-1" />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="categoryId">Category</Label>
              <select
                id="categoryId"
                {...register("categoryId")}
                className="mt-1 border rounded-md px-3 py-2 w-full text-sm"
              >
                <option value="">Select Category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                The existing category list can be seen in the <Link href="/admin/categories" className="underline text-blue-600">category menu</Link>.
              </p>
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={10}
                {...register("content")}
                className="mt-1"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button onClick={() => router.push(`/admin/preview/${article.id}`)} type="button" variant="outline">
                Preview
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default ArticleEdit