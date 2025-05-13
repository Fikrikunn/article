"use client"

import { useState } from "react"
import axios, { AxiosError } from "axios" 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"

// Define API error response interface
interface ApiErrorResponse {
  message?: string;
  statusCode?: number;
  error?: string;
}

interface AddCategoryDialogProps {
  onSuccess?: () => void
}

export function AddCategoryDialog({ onSuccess }: AddCategoryDialogProps) {
  const [open, setOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    
    if (!categoryName.trim()) {
      setError("Category field cannot be empty")
      return
    }
    
    setIsSubmitting(true)
    setError("")
    
    try {
      const token = localStorage.getItem("token")
      
      if (!token) {
        setError("You must be logged in to add categories")
        setIsSubmitting(false)
        return
      }
      
      const response = await axios.post(
        "https://test-fe.mysellerpintar.com/api/categories",
        { name: categoryName },
        {
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json"
          }
        }
      )
      
      console.log("Category created:", response.data)
      
      // Reset form and close dialog
      setCategoryName("")
      setOpen(false)
      
      // Call the success callback to refresh categories
      if (onSuccess) onSuccess()
      
    } catch (err: unknown) {
      // Properly type the error
      const axiosError = err as AxiosError<ApiErrorResponse>
      console.error("Failed to create category:", axiosError)
      
      // Handle the error message more safely
      const errorMessage = axiosError.response?.data?.message || 
                          axiosError.message || 
                          "Failed to create category. Please try again."
      
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center gap-2">
          <PlusCircle size={16} /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="col-span-3"
                placeholder="Input Category"
                autoFocus
              />
            </div>
            {error && (
              <div className="text-sm text-red-500 col-span-4 text-center">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? "Creating..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}