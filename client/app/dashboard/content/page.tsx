"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Save, Loader2, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useContentStore } from "./store/contentStore";

const contentFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  subtitle: z.string().min(2, { message: "Subtitle must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
});

type SectionFormValues = z.infer<typeof contentFormSchema>;

// مكون منفصل لكل تبويب
function SectionTabContent({ sectionId, sectionLabel }: { sectionId: string; sectionLabel: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<SectionFormValues | null>(null);
  const { toast } = useToast();
  const { sections, updateSection, error } = useContentStore();

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      title: sections[sectionId]?.title || "",
      subtitle: sections[sectionId]?.subtitle || "",
      description: sections[sectionId]?.description || "",
    },
  });

  // تحديث القيم الافتراضية عند تغيير البيانات
  useEffect(() => {
    if (sections[sectionId]) {
      form.reset({
        title: sections[sectionId].title,
        subtitle: sections[sectionId].subtitle,
        description: sections[sectionId].description,
      });
    }
  }, [sections[sectionId], form, sectionId]);

  async function onSubmit(values: SectionFormValues) {
    setIsLoading(true);
    try {
      await updateSection(sectionId, values);
      toast({
        title: `${sectionLabel} updated`,
        description: "Changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update content.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // وظيفة المعاينة
  const handlePreview = () => {
    const values = form.getValues();
    if (form.formState.isValid) {
      setPreviewData(values);
      toast({
        title: "Preview Ready",
        description: "Content is ready for preview.",
      });
    } else {
      form.trigger(); // لإظهار أخطاء التحقق
      toast({
        title: "Validation Error",
        description: "Please fix the errors before preview.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 dark:text-white capitalize">
            {sectionId} Section
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Update the {sectionLabel.toLowerCase()} section content of your website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={`Enter ${sectionLabel} title`} 
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Subtitle</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={`Enter ${sectionLabel} subtitle`} 
                        className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={`Enter ${sectionLabel} description`} 
                        className="min-h-[100px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* معاينة المحتوى */}
              {previewData && (
                <div className="p-4 border border-lime-200 dark:border-lime-800 bg-lime-50 dark:bg-lime-950/20 rounded-lg">
                  <h4 className="font-semibold text-lime-800 dark:text-lime-300 mb-2 flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Title:</strong> {previewData.title}</p>
                    <p><strong>Subtitle:</strong> {previewData.subtitle}</p>
                    <p><strong>Description:</strong> {previewData.description}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-lime-500 hover:bg-lime-600 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={handlePreview}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => window.open(`/?preview=${sectionId}`, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in New Tab
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ContentPage() {
  const { sections, fetchSections, loading, error } = useContentStore();

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const sectionTabs = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pricing", label: "Pricing" },
    { id: "support", label: "Support" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Content Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage the content of your website sections. Changes will be reflected immediately on the main page.
          </p>
        </motion.div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              Connection error: {error}. Using demo data for development.
            </AlertDescription>
          </Alert>
        )}

        {loading && Object.keys(sections).length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue={sectionTabs[0].id} className="space-y-6">
              <TabsList className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-1">
                {sectionTabs.map((section) => (
                  <TabsTrigger 
                    key={section.id} 
                    value={section.id}
                    className="data-[state=active]:bg-lime-500 data-[state=active]:text-white dark:data-[state=active]:text-gray-900"
                  >
                    {section.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {sectionTabs.map((section) => (
                <TabsContent key={section.id} value={section.id}>
                  <SectionTabContent sectionId={section.id} sectionLabel={section.label} />
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">ℹ️ How to use</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Edit the content for each section and click "Save Changes". The updates will be immediately reflected on your main website while preserving the original design and theme.
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
            Use "Preview" to see your changes before saving, and "Open in New Tab" to view the section on your actual website.
          </p>
        </motion.div>
      </div>
    </div>
  );
}