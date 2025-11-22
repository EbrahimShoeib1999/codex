// app/dashboard/content/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // Import motion
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentManager } from "./ContentManager/ContentManager";

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState("sections");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="section-padding space-y-6" // Use section-padding for consistent spacing
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">إدارة المحتوى</h1> {/* Adjust heading size */}
        <p className="text-lg text-muted-foreground"> {/* Adjust text size */}
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
    </motion.section>
  );
}