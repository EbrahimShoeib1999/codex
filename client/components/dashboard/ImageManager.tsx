// components/admin/ImageManager.tsx
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Image as ImageIcon, 
  Search, 
  Trash2, 
  Download,
  Copy,
  CheckCircle,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ImageItem {
  id: string;
  url: string;
  name: string;
  size: number;
  uploadedAt: string;
  dimensions: { width: number; height: number };
}

export function ImageManager() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // تصفية الصور بناء على البحث
  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // محاكاة رفع الصور (في التطبيق الحقيقي، ستتصل بخادم)
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    // محاكاة التأخير للرفع
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newImages: ImageItem[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target?.result as string;
          
          img.onload = () => {
            const newImage: ImageItem = {
              id: Date.now() + i + '',
              url: URL.createObjectURL(file),
              name: file.name,
              size: file.size,
              uploadedAt: new Date().toISOString(),
              dimensions: { width: img.width, height: img.height }
            };
            
            newImages.push(newImage);
            
            if (newImages.length === files.length) {
              setImages(prev => [...prev, ...newImages]);
              setIsUploading(false);
              
              toast({
                title: "تم الرفع بنجاح",
                description: `تم رفع ${newImages.length} صورة`,
              });
            }
          };
        };
        
        reader.readAsDataURL(file);
      }
    }

    // إعادة تعيين حقل الرفع
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    
    toast({
      title: "تم الحذف",
      description: "تم حذف الصورة بنجاح",
    });
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط الصورة إلى الحافظة",
    });

    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* رأس قسم إدارة الصور */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">مكتبة الوسائط</h2>
          <p className="text-muted-foreground">
            إدارة الصور والوسائط الخاصة بموقعك
          </p>
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="بحث في الصور..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            multiple
            accept="image/*"
            className="hidden"
          />
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-primary hover:bg-primary/90"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "جاري الرفع..." : "رفع صور"}
          </Button>
        </div>
      </div>

      {/* شبكة الصور */}
      {filteredImages.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا توجد صور</h3>
            <p className="text-muted-foreground mb-4">
              ابدأ برفع صورك الأولى إلى المكتبة
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary hover:bg-primary/90"
            >
              <Upload className="h-4 w-4 mr-2" />
              رفع صور
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all">
                <div 
                  className="aspect-square relative cursor-pointer bg-muted"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(image.url);
                        }}
                      >
                        {copiedUrl === image.url ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(image.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{image.name}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(image.size)}</span>
                    <span>{image.dimensions.width}×{image.dimensions.height}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* نافذة معاينة الصورة */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedImage && (
            <div className="space-y-4">
              <div className="relative bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="w-full max-h-96 object-contain"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>الحجم:</strong> {formatFileSize(selectedImage.size)}
                </div>
                <div>
                  <strong>الأبعاد:</strong> {selectedImage.dimensions.width}×{selectedImage.dimensions.height}
                </div>
                <div>
                  <strong>النوع:</strong> {selectedImage.name.split('.').pop()?.toUpperCase()}
                </div>
                <div>
                  <strong>تاريخ الرفع:</strong> {new Date(selectedImage.uploadedAt).toLocaleDateString('ar-SA')}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={selectedImage.url}
                  readOnly
                  className="flex-1"
                />
                <Button
                  onClick={() => copyToClipboard(selectedImage.url)}
                  variant="outline"
                >
                  {copiedUrl === selectedImage.url ? (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  نسخ الرابط
                </Button>
                <Button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = selectedImage.url;
                    link.download = selectedImage.name;
                    link.click();
                  }}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  تحميل
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}