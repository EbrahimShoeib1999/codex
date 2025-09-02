"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Trash2, Pencil, Loader2, Save, Eye, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

// تعريف schema للصور
const imageFormSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  altText: z.string().min(2, { message: "Alt text must be at least 2 characters." }),
  url: z.string().url({ message: "Please enter a valid URL." }),
});

// تعريف schema للنصوص
const textFormSchema = z.object({
  heading: z.string().min(2, { message: "Heading must be at least 2 characters." }),
  subheading: z.string().min(2, { message: "Subheading must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
});

export default function MediaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [previewData, setPreviewData] = useState<any>(null);
  const { toast } = useToast();

  // تعريف جميع أقسام الموقع
  const websiteSections = [
    {
      id: "hero",
      title: "Hero Section",
      type: "mixed",
      images: [
        {
          id: "hero-bg",
          title: "Hero Background",
          url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          altText: "Digital Innovation",
        },
      ],
      texts: [
        {
          id: "hero-heading",
          heading: "Transforming Ideas Into Digital Excellence",
          subheading: "",
          description: "We're a team of expert developers and designers crafting innovative software solutions that drive business growth and user engagement."
        }
      ]
    },
    {
      id: "about",
      title: "About Section",
      type: "mixed",
      images: [
        {
          id: "about-1",
          title: "About Image 1",
          url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          altText: "Our Team",
        },
      ],
      texts: [
        {
          id: "about-heading",
          heading: "Who We Are",
          subheading: "",
          description: "A passionate team of developers, designers, and digital strategists dedicated to creating exceptional software solutions."
        },
        {
          id: "mission",
          heading: "Our Mission",
          subheading: "",
          description: "To empower businesses through innovative technology solutions that solve real-world problems."
        },
        {
          id: "vision",
          heading: "Our Vision",
          subheading: "",
          description: "To be the leading force in digital transformation, setting new standards in software development."
        }
      ]
    },
    {
      id: "services",
      title: "Services Section",
      type: "mixed",
      images: [
        {
          id: "web-dev",
          title: "Web Development",
          url: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          altText: "Web Development",
        },
        {
          id: "mobile-dev",
          title: "Mobile Development",
          url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          altText: "Mobile Development",
        },
      ],
      texts: [
        {
          id: "services-heading",
          heading: "Our Services",
          subheading: "Comprehensive software solutions tailored to your business needs",
          description: ""
        }
      ]
    },
    {
      id: "portfolio",
      title: "Portfolio Section",
      type: "mixed",
      images: [
        {
          id: "project-1",
          title: "HealthTrack Pro",
          url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          altText: "Healthcare Project",
        },
        {
          id: "project-2",
          title: "EcoShop",
          url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          altText: "E-commerce Project",
        },
      ],
      texts: [
        {
          id: "portfolio-heading",
          heading: "Featured Projects",
          subheading: "Explore some of our best work and success stories",
          description: ""
        }
      ]
    },
    {
      id: "testimonials",
      title: "Testimonials Section",
      type: "mixed",
      images: [
        {
          id: "client-1",
          title: "Sarah Chen",
          url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          altText: "Client Sarah Chen",
        },
        {
          id: "client-2",
          title: "Mark Johnson",
          url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          altText: "Client Mark Johnson",
        },
      ],
      texts: [
        {
          id: "testimonials-heading",
          heading: "Client Success Stories",
          subheading: "Don't just take our word for it - hear what our clients have to say",
          description: ""
        }
      ]
    }
  ];

  const imageForm = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      title: "",
      altText: "",
      url: "",
    },
  });

  const textForm = useForm<z.infer<typeof textFormSchema>>({
    resolver: zodResolver(textFormSchema),
    defaultValues: {
      heading: "",
      subheading: "",
      description: "",
    },
  });

  const currentSection = websiteSections.find(section => section.id === activeTab);

  async function onSubmitImage(values: z.infer<typeof imageFormSchema>) {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Image updated",
        description: "Image changes have been saved successfully.",
      });
      imageForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update image.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmitText(values: z.infer<typeof textFormSchema>) {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Text updated",
        description: "Text changes have been saved successfully.",
      });
      textForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update text.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handlePreview = (type: 'image' | 'text', data: any) => {
    setPreviewData({ type, data });
    toast({
      title: "Preview Ready",
      description: "Content is ready for preview.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold">Website Content Management</h1>
        <p className="text-muted-foreground">
          Manage all images and text content across your entire website.
        </p>
      </div>

      <Tabs defaultValue="hero" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap gap-2">
          {websiteSections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {websiteSections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* إدارة الصور */}
              <Card>
                <CardHeader>
                  <CardTitle>Images Management</CardTitle>
                  <CardDescription>
                    Manage images for the {section.title.toLowerCase()}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Form {...imageForm}>
                    <form onSubmit={imageForm.handleSubmit(onSubmitImage)} className="space-y-4">
                      <FormField
                        control={imageForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter image title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={imageForm.control}
                        name="altText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alt Text</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter alt text" {...field} />
                            </FormControl>
                            <FormDescription>
                              Describe the image for accessibility and SEO.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={imageForm.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter image URL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-3">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          <Save className="mr-2 h-4 w-4" />
                          Save Image
                        </Button>
                        <Button 
                          type="button" 
                          variant="secondary"
                          onClick={() => handlePreview('image', imageForm.getValues())}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </div>
                    </form>
                  </Form>

                  <div className="grid grid-cols-1 gap-4 mt-6">
                    {section.images.map((image) => (
                      <div key={image.id} className="relative group rounded-lg overflow-hidden border p-3">
                        <div className="flex gap-4">
                          <div className="relative w-20 h-20 rounded-md overflow-hidden">
                            <Image
                              src={image.url}
                              alt={image.altText}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{image.title}</h4>
                            <p className="text-sm text-muted-foreground">{image.altText}</p>
                            <p className="text-xs text-muted-foreground truncate">{image.url}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="icon" variant="outline">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* إدارة النصوص */}
              <Card>
                <CardHeader>
                  <CardTitle>Text Content</CardTitle>
                  <CardDescription>
                    Manage text content for the {section.title.toLowerCase()}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Form {...textForm}>
                    <form onSubmit={textForm.handleSubmit(onSubmitText)} className="space-y-4">
                      <FormField
                        control={textForm.control}
                        name="heading"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Heading</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter heading" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={textForm.control}
                        name="subheading"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subheading</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter subheading" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={textForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter description" 
                                rows={4}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-3">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          <Save className="mr-2 h-4 w-4" />
                          Save Text
                        </Button>
                        <Button 
                          type="button" 
                          variant="secondary"
                          onClick={() => handlePreview('text', textForm.getValues())}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                      </div>
                    </form>
                  </Form>

                  <div className="space-y-4 mt-6">
                    {section.texts.map((text) => (
                      <div key={text.id} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{text.heading}</h4>
                        {text.subheading && (
                          <p className="text-sm text-muted-foreground mb-2">{text.subheading}</p>
                        )}
                        {text.description && (
                          <p className="text-sm">{text.description}</p>
                        )}
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Pencil className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* المعاينة */}
            {previewData && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    Preview of your changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {previewData.type === 'image' ? (
                    <div className="space-y-4">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image
                          src={previewData.data.url}
                          alt={previewData.data.altText}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{previewData.data.title}</h4>
                        <p className="text-sm text-muted-foreground">{previewData.data.altText}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold">{previewData.data.heading}</h3>
                      {previewData.data.subheading && (
                        <p className="text-lg text-muted-foreground">{previewData.data.subheading}</p>
                      )}
                      {previewData.data.description && (
                        <p className="text-gray-700">{previewData.data.description}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* زر المعاينة على الموقع */}
            <div className="mt-6">
              <Button asChild variant="outline">
                <a href={`/#${section.id}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Website
                </a>
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* إحصائيات سريعة */}
      <Card>
        <CardHeader>
          <CardTitle>Content Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{websiteSections.length}</div>
              <div className="text-sm text-muted-foreground">Sections</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">
                {websiteSections.reduce((total, section) => total + section.images.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Images</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">
                {websiteSections.reduce((total, section) => total + section.texts.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Text Blocks</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">
                {websiteSections.reduce((total, section) => total + section.images.length + section.texts.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}