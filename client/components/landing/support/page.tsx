"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  LifeBuoy, 
  MessageSquare, 
  FileQuestion, 
  Headphones, 
  BookOpen, 
  Send,
  ChevronRight,
  Code,
  Users,
  ShieldCheck,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const supportFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  priority: z.string().min(1, { message: "Please select a priority level." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof supportFormSchema>>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      category: "",
      priority: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof supportFormSchema>) {
    toast({
      title: "Support ticket submitted",
      description: "We'll get back to you as soon as possible.",
    });
    console.log(values);
    form.reset();
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const supportCategories = [
    {
      icon: <LifeBuoy className="h-10 w-10 text-lime-500" />,
      title: "Technical Support",
      description: "Get help with technical issues, bugs, or errors in your software.",
      link: "#technical-support"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-lime-500" />,
      title: "Account Support",
      description: "Assistance with account-related issues, billing, or subscriptions.",
      link: "#account-support"
    },
    {
      icon: <FileQuestion className="h-10 w-10 text-lime-500" />,
      title: "Documentation",
      description: "Access comprehensive guides, tutorials, and API documentation.",
      link: "/documentation"
    },
    {
      icon: <Headphones className="h-10 w-10 text-lime-500" />,
      title: "Contact Support",
      description: "Reach out to our support team directly for personalized assistance.",
      link: "#contact-support"
    }
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password. If you don't receive the email, check your spam folder or contact our support team."
    },
    {
      question: "How can I update my billing information?",
      answer: "You can update your billing information by logging into your account, navigating to 'Account Settings', and selecting the 'Billing' tab. From there, you can update your payment method, billing address, and other details."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for annual plans. For enterprise customers, we also offer invoicing options."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "To cancel your subscription, go to 'Account Settings', select the 'Subscription' tab, and click on 'Cancel Subscription'. Follow the prompts to complete the cancellation process. Please note that refunds are subject to our refund policy."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. Go to 'Account Settings', select the 'Subscription' tab, and click on 'Change Plan'. If you upgrade, you'll be charged the prorated difference. If you downgrade, the new rate will apply at the start of your next billing cycle."
    },
    {
      question: "How do I get technical support for my project?",
      answer: "You can get technical support by submitting a ticket through our support portal, using the live chat feature during business hours, or scheduling a call with our support team. For urgent issues, we recommend using the 'High Priority' option when submitting a ticket."
    }
  ];

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Center</h1>
            <p className="text-xl text-muted-foreground">
              Get the help you need with our comprehensive support resources and dedicated team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {supportCategories.map((category, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={category.link}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 p-3 bg-background rounded-full">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="technical-support" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find quick answers to common questions about our services and platform.
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No FAQs found matching your search. Try a different query or contact our support team.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support Ticket System */}
      <section id="contact-support" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Get Support</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Need more help? Submit a support ticket and our team will get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="ticket" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ticket">Submit a Ticket</TabsTrigger>
                <TabsTrigger value="contact">Contact Information</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ticket" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Support Ticket</CardTitle>
                    <CardDescription>
                      Fill out the form below to submit a support ticket. We'll respond within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your email address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Brief description of your issue" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="technical">Technical Issue</SelectItem>
                                    <SelectItem value="billing">Billing & Payments</SelectItem>
                                    <SelectItem value="account">Account Management</SelectItem>
                                    <SelectItem value="feature">Feature Request</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select priority level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your issue in detail" 
                                  className="min-h-[150px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Please provide as much detail as possible to help us resolve your issue quickly.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full bg-lime-500 hover:bg-lime-600">
                          Submit Ticket
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Reach out to us directly through any of these channels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-muted p-3 rounded-full">
                          <Headphones className="h-6 w-6 text-lime-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Phone Support</h3>
                          <p className="text-muted-foreground mb-1">Monday - Friday, 9am - 5pm EST</p>
                          <p className="font-medium">+1 (555) 123-4567</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="bg-muted p-3 rounded-full">
                          <MessageSquare className="h-6 w-6 text-lime-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Email Support</h3>
                          <p className="text-muted-foreground mb-1">24/7 response within 24 hours</p>
                          <p className="font-medium">support@codextech.com</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="text-lg font-semibold mb-4">Live Chat</h3>
                      <p className="text-muted-foreground mb-4">
                        Our live chat support is available Monday through Friday from 9am to 5pm EST. Click the button below to start a chat with our support team.
                      </p>
                      <Button className="bg-lime-500 hover:bg-lime-600">
                        <MessageSquare className="mr-2 h-4 w-4" /> Start Live Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section id="account-support" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Knowledge Base</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive guides and tutorials to find answers to your questions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Getting Started Guide",
                description: "Learn the basics of our platform and how to set up your account.",
                icon: <BookOpen className="h-6 w-6 text-lime-500" />,
                link: "/documentation/getting-started"
              },
              {
                title: "API Documentation",
                description: "Comprehensive documentation for developers integrating with our API.",
                icon: <Code className="h-6 w-6 text-lime-500" />,
                link: "/documentation/api"
              },
              {
                title: "Troubleshooting",
                description: "Common issues and their solutions to help you resolve problems quickly.",
                icon: <LifeBuoy className="h-6 w-6 text-lime-500" />,
                link: "/documentation/troubleshooting"
              },
              {
                title: "Account Management",
                description: "Learn how to manage your account, users, and billing information.",
                icon: <Users className="h-6 w-6 text-lime-500" />,
                link: "/documentation/account"
              },
              {
                title: "Security Guide",
                description: "Best practices for keeping your account and data secure.",
                icon: <ShieldCheck className="h-6 w-6 text-lime-500" />,
                link: "/documentation/security"
              },
              {
                title: "Video Tutorials",
                description: "Step-by-step video guides for using our platform's features.",
                icon: <Video className="h-6 w-6 text-lime-500" />,
                link: "/documentation/videos"
              }
            ].map((resource, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={resource.link}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-background p-2 rounded-full">
                          {resource.icon}
                        </div>
                        <CardTitle className="text-xl">{resource.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{resource.description}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="text-lime-500 font-medium flex items-center">
                        Read more <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-lime-500">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Still Need Help?</h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              Our support team is ready to assist you with any questions or issues you may have.
            </p>
            <Button asChild size="lg" variant="default" className="bg-black text-white hover:bg-black/80">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}