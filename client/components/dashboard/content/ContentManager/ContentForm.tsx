"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, X } from "lucide-react";

interface ContentFormProps {
  editedData: any;
  contentType: string;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (field: string, value: string) => void;
}

export function ContentForm({ 
  editedData, 
  contentType, 
  onSave, 
  onCancel, 
  onInputChange 
}: ContentFormProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Input
            value={editedData.title || editedData.name || editedData.question || ''}
            onChange={(e) => onInputChange(
              contentType === 'faqs' ? 'question' : 
              contentType === 'pricing' ? 'name' : 'title', 
              e.target.value
            )}
            placeholder="العنوان"
          />
          <textarea
            value={editedData.description || editedData.answer || editedData.subtitle || ''}
            onChange={(e) => onInputChange(
              contentType === 'faqs' ? 'answer' : 
              contentType === 'pricing' ? 'description' : 'description', 
              e.target.value
            )}
            placeholder="الوصف"
            className="w-full p-2 border rounded-md min-h-[100px]"
          />
          <div className="flex gap-2">
            <Button 
              onClick={onSave}
              className="bg-lime-500 hover:bg-lime-600"
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              حفظ
            </Button>
            <Button 
              onClick={onCancel}
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              إلغاء
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}