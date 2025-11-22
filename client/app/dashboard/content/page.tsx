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
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground">
          Manage all your website content from one place.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
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