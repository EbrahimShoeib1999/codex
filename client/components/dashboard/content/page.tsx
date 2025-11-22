// app/dashboard/content/page.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentManager } from "./ContentManager/ContentManager";

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("sections");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">إدارة المحتوى</h1>
        <p className="text-muted-foreground">
          إدارة جميع محتويات موقعك من مكان واحد
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="sections">الأقسام</TabsTrigger>
          <TabsTrigger value="projects">المشاريع</TabsTrigger>
          <TabsTrigger value="services">الخدمات</TabsTrigger>
          <TabsTrigger value="pricing">خطط الأسعار</TabsTrigger>
          <TabsTrigger value="faqs">الأسئلة الشائعة</TabsTrigger>
          <TabsTrigger value="team">أعضاء الفريق</TabsTrigger>
          <TabsTrigger value="testimonials">آراء العملاء</TabsTrigger>
        </TabsList>

        <TabsContent value="sections">
          <ContentManager contentType="sections" />
        </TabsContent>

        <TabsContent value="projects">
          <ContentManager contentType="projects" />
        </TabsContent>

        <TabsContent value="services">
          <ContentManager contentType="services" />
        </TabsContent>

        <TabsContent value="pricing">
          <ContentManager contentType="pricing" />
        </TabsContent>

        <TabsContent value="faqs">
          <ContentManager contentType="faqs" />
        </TabsContent>

        <TabsContent value="team">
          <ContentManager contentType="team" />
        </TabsContent>

        <TabsContent value="testimonials">
          <ContentManager contentType="testimonials" />
        </TabsContent>
      </Tabs>
    </div>
  );
}