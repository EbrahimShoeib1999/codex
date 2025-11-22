"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Code, 
  Smartphone, 
  Palette, 
  TrendingUp, 
  CheckCircle2, 
  Users,
  Clock,
  Target,
  Zap,
  Award,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2 mb-12 lg:mb-0"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Transforming Ideas Into <span className="text-primary">Digital Excellence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                We're a team of expert developers and designers crafting innovative software solutions that drive business growth and user engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/contact">Start Your Project</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i}`}
                        alt={`Team member ${i}`}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <strong>50+ Experts</strong>
                  <p className="text-muted-foreground">Ready to help you</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-lg aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Digital Innovation"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Trusted by 500+</div>
                      <div className="text-sm text-muted-foreground">Global clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A passionate team of developers, designers, and digital strategists dedicated to creating exceptional software solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-primary" />,
                title: "Our Mission",
                description: "To empower businesses through innovative technology solutions that solve real-world problems."
              },
              {
                icon: <Target className="h-10 w-10 text-primary" />,
                title: "Our Vision",
                description: "To be the leading force in digital transformation, setting new standards in software development."
              },
              {
                icon: <Award className="h-10 w-10 text-primary" />,
                title: "Our Values",
                description: "Excellence, innovation, and integrity in everything we do, putting our clients' success first."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive software solutions tailored to your business needs
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Code className="h-10 w-10 text-primary" />,
                title: "Web Development",
                description: "Custom websites and web applications built with cutting-edge technologies",
                features: [
                  "Responsive Design",
                  "E-commerce Solutions",
                  "CMS Integration",
                  "API Development"
                ]
              },
              {
                icon: <Smartphone className="h-10 w-10 text-primary" />,
                title: "Mobile Apps",
                description: "Native and cross-platform mobile applications for iOS and Android",
                features: [
                  "Native Development",
                  "Cross-platform Solutions",
                  "UI/UX Design",
                  "App Store Optimization"
                ]
              },
              {
                icon: <Palette className="h-10 w-10 text-primary" />,
                title: "UI/UX Design",
                description: "User-centered design that enhances engagement and satisfaction",
                features: [
                  "User Research",
                  "Wireframing",
                  "Prototyping",
                  "Visual Design"
                ]
              },
              {
                icon: <TrendingUp className="h-10 w-10 text-primary" />,
                title: "Digital Marketing",
                description: "Strategic marketing to increase your online presence",
                features: [
                  "SEO Optimization",
                  "Content Strategy",
                  "Social Media",
                  "Analytics"
                ]
              }
            ].map((service, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="link" className="mt-4 p-0">
                      <Link href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore some of our best work and success stories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "HealthTrack Pro",
                category: "Healthcare",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "A comprehensive health monitoring platform",
                stats: "50,000+ active users"
              },
              {
                title: "EcoShop",
                category: "E-commerce",
                image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Sustainable products marketplace",
                stats: "30% operational cost reduction"
              },
              {
                title: "UrbanPlanner",
                category: "Mobile App",
                image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                description: "Smart city planning solution",
                stats: "Adopted by 12 municipalities"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-sm text-primary font-medium mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{project.stats}</span>
                      <Button asChild variant="ghost" size="sm">
                        <Link href="/portfolio">View Case Study</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven process ensures successful project delivery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                step: "01",
                title: "Discovery",
                description: "We start by understanding your business goals and project requirements"
              },
              {
                icon: <Palette className="h-10 w-10 text-primary" />,
                step: "02",
                title: "Design",
                description: "Creating intuitive interfaces and user experiences"
              },
              {
                icon: <Code className="h-10 w-10 text-primary" />,
                step: "03",
                title: "Development",
                description: "Building your solution using cutting-edge technologies"
              },
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                step: "04",
                title: "Launch",
                description: "Deploying and ensuring everything runs smoothly"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="absolute top-6 right-6 text-4xl font-bold text-primary/10">
                      {step.step}
                    </div>
                    <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear what our clients have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO, TechStart",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                quote: "Working with the team was a game-changer for our business. They delivered a solution that exceeded our expectations."
              },
              {
                name: "Mark Johnson",
                role: "CTO, HealthCare Plus",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                quote: "Their technical expertise and attention to detail helped us create a platform that revolutionized our patient care system."
              },
              {
                name: "Emily Rodriguez",
                role: "Founder, EcoRetail",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
                quote: "The team's innovative approach and commitment to quality helped us achieve our business goals ahead of schedule."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
                icon: <Users className="h-10 w-10 text-primary" />,
                number: "500+",
                label: "Happy Clients"
              },
              {
                icon: <Award className="h-10 w-10 text-primary" />,
                number: "100+",
                label: "Projects Completed"
              },
              {
                icon: <Clock className="h-10 w-10 text-primary" />,
                number: "8+",
                label: "Years Experience"
              },
              {
                icon: <Target className="h-10 w-10 text-primary" />,
                number: "50+",
                label: "Team Members"
              }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-primary/10 rounded-full">
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

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about our services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="general" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="space-y-4">
                  {[
                    {
                      question: "How long does a typical project take?",
                      answer: "Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex application could take 3-6 months."
                    },
                    {
                      question: "What is your pricing model?",
                      answer: "We offer both fixed-price and time-and-materials pricing models, depending on project requirements and scope."
                    },
                    {
                      question: "Do you provide ongoing support?",
                      answer: "Yes, we offer various maintenance and support packages to ensure your solution continues to perform optimally."
                    }
                  ].map((faq, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="technical">
                <div className="space-y-4">
                  {[
                    {
                      question: "What technologies do you use?",
                      answer: "We use modern frameworks and technologies including React, Next.js, Node.js, and various cloud services."
                    },
                    {
                      question: "How do you ensure security?",
                      answer: "We follow industry best practices and implement multiple layers of security measures in all our solutions."
                    },
                    {
                      question: "Can you integrate with existing systems?",
                      answer: "Yes, we have extensive experience integrating with various third-party systems and APIs."
                    }
                  ].map((faq, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link href="/faq">View All FAQs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">Ready to Transform Your Business?</h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life with our expertise in design and development.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="default" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20">
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}