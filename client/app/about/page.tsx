"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Award, Clock, Target, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Codex</h1>
            <p className="text-xl text-muted-foreground">
              We are a team of passionate developers, designers, and digital strategists dedicated to creating exceptional software solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2015, Codex began with a simple mission: to help businesses leverage technology to achieve their goals. What started as a small team of three developers has grown into a full-service digital agency with expertise across multiple domains.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Over the years, we've worked with startups, SMEs, and enterprise clients across various industries, delivering solutions that drive growth and innovation. Our approach combines technical excellence with a deep understanding of business needs.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we continue to push the boundaries of what's possible in software development, always staying ahead of the curve with emerging technologies and methodologies.
              </p>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Our team"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Our Foundation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and define who we are
            </p>
          </motion.div>

          <Tabs defaultValue="mission" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mission">Mission</TabsTrigger>
              <TabsTrigger value="vision">Vision</TabsTrigger>
              <TabsTrigger value="values">Values</TabsTrigger>
            </TabsList>
            <TabsContent value="mission" className="mt-8 p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground mb-4">
                To empower businesses through innovative technology solutions that solve real-world problems and drive sustainable growth.
              </p>
              <p className="text-lg text-muted-foreground">
                We strive to be a trusted partner for our clients, delivering high-quality software that exceeds expectations and creates lasting value.
              </p>
            </TabsContent>
            <TabsContent value="vision" className="mt-8 p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-muted-foreground mb-4">
                To be a global leader in software development, recognized for our technical excellence, innovative solutions, and exceptional client service.
              </p>
              <p className="text-lg text-muted-foreground">
                We envision a future where technology enhances human potential and creates positive impact across industries and communities.
              </p>
            </TabsContent>
            <TabsContent value="values" className="mt-8 p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-lime-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold">Excellence</h4>
                    <p className="text-muted-foreground">We strive for excellence in everything we do, from code quality to client communication.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-lime-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold">Innovation</h4>
                    <p className="text-muted-foreground">We embrace new technologies and creative approaches to solve complex problems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-lime-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold">Integrity</h4>
                    <p className="text-muted-foreground">We operate with honesty, transparency, and ethical standards in all our interactions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-lime-500 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold">Collaboration</h4>
                    <p className="text-muted-foreground">We believe in the power of teamwork and partnership to achieve exceptional results.</p>
                  </div>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Users className="h-10 w-10 text-lime-500" />,
                number: "30+",
                label: "Team Members"
              },
              {
                icon: <Award className="h-10 w-10 text-lime-500" />,
                number: "100+",
                label: "Projects Completed"
              },
              {
                icon: <Clock className="h-10 w-10 text-lime-500" />,
                number: "8+",
                label: "Years of Experience"
              },
              {
                icon: <Target className="h-10 w-10 text-lime-500" />,
                number: "50+",
                label: "Happy Clients"
              }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-muted rounded-full">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the talented individuals who drive our vision and success
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Alex Johnson",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                bio: "With over 15 years of experience in software development and business leadership, Alex founded Codex with a vision to create innovative solutions that make a difference."
              },
              {
                name: "Sarah Chen",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                bio: "Sarah leads our technical strategy and ensures we stay at the cutting edge of technology. Her background in AI and cloud architecture drives our innovation."
              },
              {
                name: "Michael Rodriguez",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                bio: "Michael brings his passion for design and user experience to every project, ensuring our solutions are not just functional but also beautiful and intuitive."
              }
            ].map((member, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-lime-500 font-medium mb-4">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}