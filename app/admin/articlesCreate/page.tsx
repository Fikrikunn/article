"use client";

import NavbarAdmin from "@/components/ui/NavbarAdmin";
import SideBar from "@/components/ui/SideBar";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ImagePlus } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";

const inputSchema = z.object({
  title: z.string().min(1, "Please enter title"),
  categoryId: z.string().min(1, "Please select category"),
  content: z.string().min(1, "Content field cannot be empty"),
  imageUrl: z.string().min(1, "Please enter picture")
})

type InputSchema = z.infer<typeof inputSchema>;

export default function ArticleCreate() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof InputSchema, string>>>({});
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  )
  const router = useRouter();
  const [token, setToken] = useState<string | null>("");

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://test-fe.mysellerpintar.com/api/categories"
        );
        setCategories(response.data.data);
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleUpload = async () => {
  const imageUrl = thumbnail ? thumbnail.name : "";

  const result = inputSchema.safeParse({
    title,
    categoryId,
    content,
    imageUrl,
  });

 if (!result.success) {
  const fieldErrors: Partial<Record<keyof InputSchema, string>> = {};
  result.error.errors.forEach((err) => {
    fieldErrors[err.path[0] as keyof InputSchema] = err.message;
  });
  setErrors(fieldErrors);
  return;
}
setErrors({});


  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", thumbnail!); 

    const uploadRes = await axios.post(
      "https://test-fe.mysellerpintar.com/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token}`,
        },
      }
    );

    const imageUrl = uploadRes.data.imageUrl;

    const payload = {
      title,
      categoryId,
      content,
      imageUrl,
    };

    await axios.post(
      "https://test-fe.mysellerpintar.com/api/articles",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    router.push("/admin/dashboard");
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Upload failed. Please try again.");
  } finally {
    setLoading(false);
  }
};





  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <div className="justify-between items-center bg-white px-6 py-4 border-b">
          <NavbarAdmin pathname="Articles" />
        </div>

        <div className="p-6">
          <Link href={"/admin/dashboard"}>
            <div className="flex items-center gap-2 mb-6">
              <ArrowLeft className="w-5 h-5" />
              <h3 className="text-xl font-semibold">Create Articles</h3>
            </div>
          </Link>

          <div className="space-y-6 bg-white p-6 rounded-lg shadow border">
            {/* Upload Thumbnail */}
            <div>
              <Label>Thumbnails</Label>
              
              <div className="flex flex-col">
              <div className="mt-2 flex-1 border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer w-60 justify-center items-center">
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer flex flex-col items-center"
                  >
                  <ImagePlus className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2 underline">
                    Click to select files
                  </p>
                  <p className="text-xs text-gray-400">
                    Support File Type: jpg or png
                  </p>
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setThumbnail(e.target.files?.[0] || null)
                    }
                    className="hidden"
                    />
                </label>
                {thumbnail && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected: {thumbnail.name}
                  </p>
                )}
                </div>
                {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}

              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Input title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

            </div>

            {/* Category */}
            <div className="flex flex-col gap-2 ">
              <Label>Category</Label>
              <Select onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories
                  .filter((category) => category.id.trim() !== "") // hindari id kosong
                  .map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

              <p className="text-sm text-muted-foreground">
                The existing category list can be seen in the{" "}
                <a
                  href="/admin/categories"
                  className="text-blue-500 underline"
                >
                  category
                </a>{" "}
                menu
              </p>
              {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}

            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Type a content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {wordCount} Words
              </p>
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}

            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="secondary">Preview</Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
                onClick={handleUpload}
              >
                {loading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
