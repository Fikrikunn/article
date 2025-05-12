"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface EditCategoryDialogProps {
  categoryId: string
  initialName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function EditCategoryDialog({ 
  categoryId, 
  initialName, 
  open, 
  onOpenChange, 
  onSuccess 
}: EditCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Set the initial category name when the dialog opens
  useEffect(() => {
    if (open) {
      setCategoryName(initialName)
    }
  }, [open, initialName])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!categoryName.trim()) {
      setError("Category name is required")
      return
    }
    
    setIsSubmitting(true)
    setError("")
    
    try {
      const token = localStorage.getItem("token")
      
      if (!token) {
        setError("You must be logged in to edit categories")
        setIsSubmitting(false)
        return
      }
      
      const response = await axios.put(
        `https://test-fe.mysellerpintar.com/api/categories/${categoryId}`,
        { name: categoryName },
        {
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json"
          }
        }
      )
      
      console.log("Category updated:", response.data)
      
      // Reset and close dialog
      onOpenChange(false)
      
      // Call the success callback to refresh categories
      if (onSuccess) onSuccess()
      
    } catch (err: any) {
      console.error("Failed to update category:", err)
      setError(err.response?.data?.message || "Failed to update category. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to the category name.
          </DialogDescription>
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
                placeholder="Category name"
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
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}