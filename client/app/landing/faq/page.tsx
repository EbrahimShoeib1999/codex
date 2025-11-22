"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const faqCategories = [
    {
      id: "general",
      label: "General",
      questions: [
        {
          question: "What services does Codex offer?",
          answer: "Codex offers a comprehensive range of software development services including web development, mobile app development, UI/UX design, digital marketing, cloud services, cybersecurity, IT consulting, and technical support. We provide end-to-end solutions tailored to meet the specific needs of businesses across various industries."
        },
        {
          question: "How long has Codex been in business?",
          answer: "Codex was founded in 2015 and has been providing innovative software solutions for over 8 years. During this time, we've worked with startups, SMEs, and enterprise clients across various industries, building a strong reputation for technical excellence and client satisfaction."
        },
        {
          question: "What industries do you specialize in?",
          answer: "While we have experience across many industries, we have particular expertise in healthcare, finance, e-commerce, education, and manufacturing. Our diverse team allows us to understand the unique challenges and requirements of different sectors and deliver tailored solutions."
        },
        {
          question: "Do you work with clients internationally?",
          answer: "Yes, we work with clients globally. Our team is set up to collaborate effectively across different time zones, and we have experience managing projects with international clients. We use various communication tools and methodologies to ensure smooth collaboration regardless of location."
        },
        {
          question: "What makes Codex different from other development companies?",
          answer: "What sets Codex apart is our combination of technical expertise, creative problem-solving, and client-focused approach. We don't just build software; we create solutions that address real business challenges. Our team stays at the forefront of technology trends, and we prioritize clear communication, transparency, and long-term partnerships with our clients."
        }
      ]
    },
    {
      id: "services",
      label: "Services",
      questions: [
        {
          question: "What technologies do you use for web development?",
          answer: "We use a variety of modern technologies for web development, including React, Angular, Vue.js, Node.js, Next.js, PHP/Laravel, Python/Django, and Ruby on Rails. Our technology choices are guided by project requirements, performance considerations, and long-term maintainability. We stay updated with the latest frameworks and tools to ensure we're delivering cutting-edge solutions."
        },
        {
          question: "Can you build both iOS and Android mobile apps?",
          answer: "Yes, we develop mobile applications for both iOS and Android platforms. We offer native development using Swift for iOS and Kotlin/Java for Android, as well as cross-platform solutions using React Native or Flutter. The approach we recommend depends on your specific requirements, budget, and timeline."
        },
        {
          question: "Do you provide ongoing maintenance and support after project completion?",
          answer: "Absolutely. We offer various maintenance and support packages to ensure your software continues to run smoothly after launch. These can include regular updates, security patches, performance monitoring, bug fixes, and feature enhancements. We can tailor a support plan to meet your specific needs and budget."
        },
        {
          question: "Can you help with redesigning an existing website or application?",
          answer: "Yes, we specialize in redesigning and modernizing existing digital products. Our approach includes a thorough assessment of your current solution, identifying pain points and opportunities for improvement, and developing a strategy for enhancement. We can update the visual design, improve user experience, optimize performance, and add new features while ensuring a smooth transition."
        },
        {
          question: "Do you offer digital marketing services alongside development?",
          answer: "Yes, we provide digital marketing services that complement our development work. These include search engine optimization (SEO), pay-per-click (PPC) advertising, social media marketing, content marketing, and email campaigns. Our integrated approach ensures that your digital products are not only well-built but also effectively promoted to reach your target audience."
        }
      ]
    },
    {
      id: "process",
      label: "Process",
      questions: [
        {
          question: "What is your development process?",
          answer: "Our development process follows these key stages: 1) Discovery & Research - understanding your business goals and project requirements; 2) Planning & Strategy - developing a comprehensive project plan; 3) Design & Development - bringing your project to life through iterative design and development; 4) Testing & Quality Assurance - ensuring your project meets the highest standards; 5) Launch & Support - ensuring a smooth deployment and providing ongoing support. We use agile methodologies to allow for flexibility and regular client feedback throughout the process."
        },
        {
          question: "How long does a typical project take to complete?",
          answer: "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a complex web or mobile application could take 3-6 months. During our initial consultation, we'll provide a more accurate timeline based on your specific requirements. We always aim to be transparent about timelines and keep you updated on progress throughout the project."
        },
        {
          question: "How do you handle project management and communication?",
          answer: "We use a combination of tools and methodologies to ensure effective project management and communication. This typically includes regular video meetings, project management software (like Jira or Asana), communication platforms (like Slack), and detailed documentation. We assign a dedicated project manager to each client who serves as your main point of contact and ensures the project stays on track."
        },
        {
          question: "Do you offer fixed-price contracts or hourly billing?",
          answer: "We offer both fixed-price contracts and hourly billing options, depending on the nature of your project. For well-defined projects with clear requirements, we typically recommend fixed-price contracts. For projects with evolving requirements or ongoing development, hourly billing might be more appropriate. We'll discuss the best approach for your specific needs during our initial consultation."
        },
        {
          question: "How do you ensure the quality of your deliverables?",
          answer: "Quality assurance is integrated throughout our development process. We implement code reviews, automated testing, and manual testing to ensure our deliverables meet the highest standards. Before launch, we conduct thorough testing across different devices, browsers, and scenarios to identify and resolve any issues. We also provide a warranty period after project completion to address any unforeseen issues."
        }
      ]
    },
    {
      id: "technical",
      label: "Technical",
      questions: [
        {
          question: "How do you approach responsive design?",
          answer: "We follow a mobile-first approach to responsive design, ensuring that your website or application works seamlessly across all devices and screen sizes. We use modern CSS frameworks like Tailwind CSS or Bootstrap, along with custom media queries, to create fluid layouts that adapt to different viewport sizes. We test our designs on a variety of devices to ensure consistent user experience regardless of how users access your site."
        },
        {
          question: "What measures do you take for website security?",
          answer: "Security is a top priority in all our projects. We implement industry best practices such as HTTPS encryption, secure authentication systems, input validation, protection against common vulnerabilities (like SQL injection, XSS, CSRF), and regular security updates. For e-commerce or applications handling sensitive data, we implement additional security measures and can conduct security audits to identify and address potential vulnerabilities."
        },
        {
          question: "How do you optimize website performance?",
          answer: "We optimize performance through various techniques including code minification, image optimization, lazy loading, efficient database queries, caching strategies, and CDN implementation. We also conduct performance testing using tools like Google Lighthouse to identify bottlenecks and areas for improvement. Our goal is to ensure fast load times and smooth user experience, which contributes to better user engagement and SEO rankings."
        },
        {
          question: "Can you integrate with third-party services and APIs?",
          answer: "Yes, we have extensive experience integrating with a wide range of third-party services and APIs. Whether you need payment gateway integration (Stripe, PayPal), CRM systems (Salesforce, HubSpot), marketing tools (Mailchimp, Google Analytics), social media platforms, or custom APIs, we can seamlessly connect these services with your application to extend functionality and improve workflow efficiency."
        },
        {
          question: "How do you handle database design and data migration?",
          answer: "Our approach to database design focuses on creating efficient, scalable structures that support your application's needs. We work with various database technologies (SQL and NoSQL) and design schemas that optimize for performance and data integrity. For data migration projects, we develop comprehensive migration strategies that ensure data consistency and minimize downtime. We perform thorough testing before and after migration to verify that all data has been transferred correctly."
        }
      ]
    },
    {
      id: "support",
      label: "Support & Maintenance",
      questions: [
        {
          question: "What kind of support do you offer after launch?",
          answer: "After launch, we offer various levels of support depending on your needs. This can range from basic technical support for addressing issues to comprehensive maintenance packages that include regular updates, performance monitoring, security patches, and ongoing enhancements. We can tailor a support plan that aligns with your budget and requirements."
        },
        {
          question: "How quickly do you respond to support requests?",
          answer: "Our standard response time for support requests is within 24 hours during business days. For clients with premium support packages, we offer faster response times and priority handling. For critical issues that affect system functionality, we aim to respond within a few hours and begin working on a resolution immediately."
        },
        {
          question: "Do you offer training for our team?",
          answer: "Yes, we provide comprehensive training to ensure your team can effectively use and manage the systems we develop. This can include one-on-one sessions, group workshops, and detailed documentation. We tailor the training to different user roles and technical expertise levels, ensuring everyone has the knowledge they need to succeed."
        },
        {
          question: "How do you handle future updates and feature requests?",
          answer: "We maintain a roadmap for each client's project and can incorporate new feature requests into planned update cycles. For minor updates, we can often implement these as part of your maintenance package. For more significant features or changes, we'll discuss the requirements, provide estimates, and schedule the work based on priority and resource availability."
        },
        {
          question: "What is your backup and disaster recovery strategy?",
          answer: "We implement robust backup systems for all projects, typically including automated daily backups with secure off-site storage. Our disaster recovery strategies are designed to minimize downtime and data loss in case of system failures. We can also develop custom backup and recovery plans based on your specific business continuity requirements and risk tolerance."
        }
      ]
    }
  ];

  // Filter questions based on search query
  const filteredFAQs = searchQuery
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => 
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our services, process, and technical capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {searchQuery && filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No results found for "{searchQuery}"</p>
              <p className="mt-2 text-muted-foreground">Try a different search term or browse the categories below.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <Tabs defaultValue={filteredFAQs[0]?.id || "general"} className="max-w-4xl mx-auto">
              <TabsList className="flex flex-wrap justify-center mb-8">
                {filteredFAQs.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {filteredFAQs.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`}
                        className="border rounded-lg px-6 py-2 shadow-sm"
                      >
                        <AccordionTrigger className="text-left font-medium text-lg py-4 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you couldn't find the answer you were looking for, our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-lime-500 hover:bg-lime-600">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/support">Visit Support Center</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}