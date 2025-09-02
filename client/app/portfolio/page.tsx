"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function PortfolioPage() {
  const [filter, setFilter] = useState("all");
  
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "design", label: "UI/UX Design" },
    { id: "ecommerce", label: "E-commerce" }
  ];
  
  const projects = [
    {
      id: 1,
      title: "HealthTrack Pro",
      category: ["web", "mobile"],
      tags: ["React", "Node.js", "React Native", "MongoDB"],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A comprehensive health tracking platform with web and mobile interfaces, allowing users to monitor fitness goals, nutrition, and medical appointments.",
      challenge: "Creating a seamless experience across web and mobile platforms while ensuring sensitive health data remains secure and compliant with regulations.",
      solution: "We implemented a React-based web application and React Native mobile app sharing a common API. We used MongoDB for flexible data storage and implemented HIPAA-compliant security measures.",
      results: "The platform has over 50,000 active users and has helped healthcare providers improve patient outcomes through better monitoring and engagement.",
      link: "#"
    },
    {
      id: 2,
      title: "EcoShop",
      category: ["web", "ecommerce"],
      tags: ["Next.js", "Tailwind CSS", "Stripe", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "An e-commerce platform for eco-friendly products, featuring advanced filtering, secure payments, and a sustainable supply chain tracking system.",
      challenge: "Building a high-performance e-commerce site that could handle thousands of products while maintaining fast load times and a smooth checkout process.",
      solution: "We leveraged Next.js for server-side rendering and static generation, implemented Stripe for secure payments, and created a custom inventory management system.",
      results: "The platform processes over 1,000 orders daily with a 99.8% uptime and has helped reduce the client's operational costs by 30%.",
      link: "#"
    },
    {
      id: 3,
      title: "UrbanPlanner",
      category: ["mobile", "design"],
      tags: ["Flutter", "Firebase", "Google Maps API", "Material Design"],
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A mobile app for urban planning and community engagement, allowing citizens to participate in local development decisions and provide feedback.",
      challenge: "Creating an intuitive interface for complex urban planning concepts and ensuring real-time updates for community feedback.",
      solution: "We designed a user-friendly Flutter app with interactive maps, 3D visualizations, and real-time notifications powered by Firebase.",
      results: "The app has been adopted by 12 municipalities and has increased community participation in urban planning by 65%.",
      link: "#"
    },
    {
      id: 4,
      title: "InvestSmart",
      category: ["web", "design"],
      tags: ["Vue.js", "D3.js", "Express", "MySQL"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A financial investment platform with advanced data visualization, portfolio management, and automated investment recommendations.",
      challenge: "Presenting complex financial data in an accessible way while ensuring accurate calculations and real-time market updates.",
      solution: "We created interactive dashboards using D3.js, implemented secure authentication, and developed a sophisticated algorithm for investment recommendations.",
      results: "The platform manages over $50 million in assets and has helped users achieve an average 12% increase in portfolio performance.",
      link: "#"
    },
    {
      id: 5,
      title: "FoodDelivery Express",
      category: ["mobile", "web"],
      tags: ["React Native", "Node.js", "MongoDB", "Google Maps"],
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A food delivery platform connecting local restaurants with customers, featuring real-time order tracking and a loyalty program.",
      challenge: "Building a reliable real-time tracking system and optimizing delivery routes for efficiency.",
      solution: "We implemented WebSockets for real-time updates, integrated Google Maps for route optimization, and created a scalable microservices architecture.",
      results: "The app processes over 5,000 orders daily across 200+ restaurants and has reduced average delivery times by 15%.",
      link: "#"
    },
    {
      id: 6,
      title: "WorkspaceHub",
      category: ["web", "design"],
      tags: ["React", "GraphQL", "PostgreSQL", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A platform for booking co-working spaces and meeting rooms, with features for team collaboration and workspace management.",
      challenge: "Creating a flexible booking system that could handle complex availability rules and team permissions.",
      solution: "We developed a custom booking engine with GraphQL for efficient data fetching and implemented a role-based access control system.",
      results: "The platform is used by over 100 co-working spaces worldwide and has streamlined operations for both space owners and users.",
      link: "#"
    },
    {
      id: 7,
      title: "StyleCommerce",
      category: ["ecommerce", "design"],
      tags: ["Shopify", "Liquid", "JavaScript", "SCSS"],
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A custom Shopify theme for a high-end fashion retailer, featuring advanced product filtering, lookbooks, and a virtual try-on experience.",
      challenge: "Creating a premium shopping experience that reflected the brand's luxury positioning while ensuring fast load times and mobile responsiveness.",
      solution: "We developed a custom Shopify theme with optimized assets, implemented lazy loading, and created a unique virtual try-on feature using WebGL.",
      results: "The new site increased conversion rates by 35% and reduced bounce rates by 25%, leading to a significant boost in online sales.",
      link: "#"
    },
    {
      id: 8,
      title: "EduLearn Platform",
      category: ["web", "mobile"],
      tags: ["React", "Django", "PostgreSQL", "AWS"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "An online learning platform with interactive courses, progress tracking, and certification for students and professionals.",
      challenge: "Building a scalable platform that could handle video streaming, interactive exercises, and user progress tracking across devices.",
      solution: "We created a microservices architecture on AWS, implemented video optimization for different bandwidths, and developed a comprehensive learning management system.",
      results: "The platform hosts over 500 courses with 100,000+ active learners and maintains a 98% satisfaction rate among users.",
      link: "#"
    }
  ];
  
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category.includes(filter));
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              Explore our latest projects and see how we've helped businesses transform their digital presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                className={filter === category.id ? "bg-lime-500 hover:bg-lime-600" : ""}
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
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
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="h-full overflow-hidden cursor-pointer hover:shadow-xl transition-all">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-muted">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="secondary" className="bg-muted">
                              +{project.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                      <DialogDescription>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative h-64 md:h-full rounded-md overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-lg">Overview</h4>
                          <p className="text-muted-foreground">{project.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Challenge</h4>
                          <p className="text-muted-foreground">{project.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Solution</h4>
                          <p className="text-muted-foreground">{project.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Results</h4>
                          <p className="text-muted-foreground">{project.results}</p>
                        </div>
                        <Button asChild className="mt-4 bg-lime-500 hover:bg-lime-600">
                          <Link href={project.link} target="_blank" className="inline-flex items-center">
                            Visit Project <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how we can help bring your vision to life with our expertise in design and development.
            </p>
            <Button asChild size="lg" className="bg-lime-500 hover:bg-lime-600">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}