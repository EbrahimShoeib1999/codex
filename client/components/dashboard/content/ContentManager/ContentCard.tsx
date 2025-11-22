// components/admin/ContentManager/ContentCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ContentCardProps {
  item: any;
  contentType: string;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export function ContentCard({ item, contentType, onEdit, onDelete }: ContentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2">
              {item.title || item.name || item.question}
            </h4>
            <p className="text-muted-foreground line-clamp-2">
                  {item.description || item.answer || item.subtitle}
        </p>
        {contentType === 'pricing' && (
          <p className="text-lime-600 font-medium mt-2">
            ${item.monthlyPrice} / شهر
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(item)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        {contentType !== 'sections' && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  </CardContent>
</Card>
);
}
            