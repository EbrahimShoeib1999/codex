// client/app/dashboard/media/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface MediaItem {
  id: string;
  url: string;
  alt: string;
  type: string;
}

export default function MediaPage() {
  const { toast } = useToast();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    { id: "m1", url: "/1.PNG", alt: "First Image", type: "image/png" },
    { id: "m2", url: "/2.PNG", alt: "Second Image", type: "image/png" },
    { id: "m3", url: "/3.PNG", alt: "Third Image", type: "image/png" },
    { id: "m4", url: "/4.PNG", alt: "Fourth Image", type: "image/png" },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMediaItem, setEditingMediaItem] = useState<MediaItem | null>(null);
  const [editFormData, setEditFormData] = useState({ alt: "" });


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Simulate upload process
      setLoading(true);
      // In a real application, you would upload the file to your backend
      // and get a URL back. For now, we use URL.createObjectURL for preview.
      setTimeout(() => {
        const newMediaItem = {
          id: `m${mediaItems.length + 1}`,
          url: URL.createObjectURL(file), // Use URL.createObjectURL for client-side preview
          alt: file.name,
          type: file.type,
        };
        setMediaItems((prev) => [...prev, newMediaItem]);
        toast({
          title: "Upload successful!",
          description: `${file.name} has been uploaded.`,
        });
        setSelectedFile(null);
        setLoading(false);
        // Clear the file input
        event.target.value = ''; 
      }, 1500);
    }
  };

  const handleDelete = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      setMediaItems((prev) => prev.filter((item) => item.id !== id));
      toast({
        title: "Media item deleted!",
        description: "The selected media item has been removed.",
      });
      setLoading(false);
    }, 500);
  };

  const handleEditClick = (item: MediaItem) => {
    setEditingMediaItem(item);
    setEditFormData({ alt: item.alt });
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateMediaItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMediaItem) return;

    setLoading(true);
    setTimeout(() => {
      setMediaItems((prev) =>
        prev.map((item) =>
          item.id === editingMediaItem.id ? { ...item, alt: editFormData.alt } : item
        )
      );
      toast({
        title: "Media item updated!",
        description: "The media item details have been saved.",
      });
      setLoading(false);
      setIsEditModalOpen(false);
    }, 1000);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <div className="flex items-center gap-2">
          <Input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={handleFileUpload} 
            disabled={loading}
          />
          <Label htmlFor="file-upload">
            <Button asChild disabled={loading}>
              <div>
                <Upload className="mr-2 h-4 w-4" /> Upload Media
              </div>
            </Button>
          </Label>
        </div>
      </div>

      {loading && selectedFile && <p>Uploading {selectedFile.name}...</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item) => (
          <div key={item.id} className="relative group overflow-hidden rounded-lg border">
            <Image
              src={item.url}
              alt={item.alt}
              width={300}
              height={200}
              objectFit="cover"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="outline" 
                size="icon" 
                className="text-white hover:text-primary mr-2"
                onClick={() => handleEditClick(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      media item.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(item.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <p className="p-2 text-sm truncate">{item.alt}</p>
          </div>
        ))}
      </div>

      {/* Edit Media Item Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Media Item</DialogTitle>
            <DialogDescription>
              Make changes to the media item details here.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateMediaItem} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alt" className="text-right">
                Alt Text
              </Label>
              <Input
                id="alt"
                value={editFormData.alt}
                onChange={handleEditFormChange}
                className="col-span-3"
                disabled={loading}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

