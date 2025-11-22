"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Code, 
  Smartphone, 
  Palette, 
  TrendingUp, 
  Server, 
  ShieldCheck, 
  Headphones, 
  Lightbulb 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServicesPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const services = [
    {
      id: "web-development",
      icon: <Code className="h-10 w-10 text-lime-500" />,
      title: "Web Development",
      description: "We build responsive, scalable web applications using modern frameworks and technologies.",
      details: [
        "Custom website development",
        "Progressive Web Apps (PWAs)",
        "E-commerce solutions",
        "Content Management Systems",
        "API development and integration",
        "Performance optimization"
      ],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "mobile-apps",
      icon: <Smartphone className="h-10 w-10 text-lime-500" />,
      title: "Mobile Applications",
      description: "We create native and cross-platform mobile apps that deliver exceptional user experiences.",
      details: [
        "iOS app development",
        "Android app development",
        "Cross-platform solutions (React Native, Flutter)",
        "App store optimization",
        "Mobile app testing",
        "Ongoing maintenance and updates"
      ],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "ui-ux",
      icon: <Palette className="h-10 w-10 text-lime-500" />,
      title: "UI/UX Design",
      description: "We design intuitive, engaging user interfaces that enhance user satisfaction and drive conversions.",
      details: [
        "User research and personas",
        "Wireframing and prototyping",
        "Visual design and branding",
        "Interaction design",
        "Usability testing",
        "Design systems"
      ],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "digital-marketing",
      icon: <TrendingUp className="h-10 w-10 text-lime-500" />,
      title: "Digital Marketing",
      description: "We help you reach your target audience and grow your online presence through strategic digital marketing.",
      details: [
        "Search Engine Optimization (SEO)",
        "Pay-Per-Click (PPC) advertising",
        "Social media marketing",
        "Content marketing",
        "Email marketing campaigns",
        "Analytics and reporting"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cloud-services",
      icon: <Server className="h-10 w-10 text-lime-500" />,
      title: "Cloud Services",
      description: "We provide cloud solutions that optimize your infrastructure, reduce costs, and improve scalability.",
      details: [
        "Cloud migration strategies",
        "AWS, Azure, and Google Cloud solutions",
        "Serverless architecture",
        "DevOps implementation",
        "Continuous Integration/Continuous Deployment",
        "Cloud security and compliance"
      ],
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cybersecurity",
      icon: <ShieldCheck className="h-10 w-10 text-lime-500" />,
      title: "Cybersecurity",
      description: "We protect your digital assets with comprehensive security solutions and best practices.",
      details: [
        "Security audits and assessments",
        "Vulnerability testing",
        "Security architecture design",
        "Data protection strategies",
        "Compliance (GDPR, HIPAA, etc.)",
        "Security training and awareness"
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "consulting",
      icon: <Lightbulb className="h-10 w-10 text-lime-500" />,
      title: "IT Consulting",
      description: "We provide expert guidance to help you make informed technology decisions and implement effective strategies.",
      details: [
        "Technology strategy development",
        "Digital transformation",
        "IT infrastructure assessment",
        "Software selection and implementation",
        "Process optimization",
        "Technology roadmapping"
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "support",
      icon: <Headphones className="h-10 w-10 text-lime-500" />,
      title: "Technical Support",
      description: "We offer reliable technical support to ensure your systems run smoothly and efficiently.",
      details: [
        "24/7 help desk support",
        "System monitoring and maintenance",
        "Troubleshooting and issue resolution",
        "Software updates and patches",
        "Performance optimization",
        "User training and documentation"
      ],
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              We offer a comprehensive range of software development and digital services to help your business thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
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
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`#${service.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 p-3 bg-background rounded-full">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Services */}
      {services.map((service, index) => (
        <section 
          key={index} 
          id={service.id} 
          className={`py-20 ${index % 2 === 0 ? 'bg-muted/30' : ''}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className={`lg:w-1/2 ${index % 2 !== 0 ? 'order-2' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  {service.icon}
                  <h2 className="text-3xl font-bold ml-4">{service.title}</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  {service.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                      </div>
                      <span className="ml-3 text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="bg-lime-500 hover:bg-lime-600">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className={`lg:w-1/2 ${index % 2 !== 0 ? 'order-1' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-2xl shadow-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Our Development Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We follow a structured approach to ensure quality, efficiency, and successful outcomes
            </p>
          </motion.div>

          <Tabs defaultValue="discovery" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="discovery">Discovery</TabsTrigger>
              <TabsTrigger value="planning">Planning</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="launch">Launch</TabsTrigger>
            </TabsList>
            
            <TabsContent value="discovery" className="mt-8 p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">1. Discovery & Research</h3>
              <p className="text-lg text-muted-foreground mb-4">
                We begin by understanding your business goals, target audience, and project requirements. This phase includes:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Stakeholder interviews</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Market research</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Competitive analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">User research</span>
                </li>
              </ul>
              <p className="text-muted-foreground">
                This phase ensures we have a clear understanding of your needs and sets the foundation for a successful project.
              </p>
            </TabsContent>
            
            <TabsContent value="planning" className="mt-8 p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">2. Planning & Strategy</h3>
              <p className="text-lg text-muted-foreground mb-4">
                Based on our research, we develop a comprehensive project plan that outlines:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Project scope and deliverables</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Technical architecture</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Timeline and milestones</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Resource allocation</span>
                </li>
              </ul>
              <p className="text-muted-foreground">
                Our planning phase ensures alignment on project goals and creates a roadmap for successful execution.
              </p>
            </TabsContent>
            
            <TabsContent value="development" className="mt-8 p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">3. Design & Development</h3>
              <p className="text-lg text-muted-foreground mb-4">
                This is where we bring your project to life through iterative design and development:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">UI/UX design and prototyping</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Agile development sprints</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Regular progress updates</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Code reviews and quality assurance</span>
                </li>
              </ul>
              <p className="text-muted-foreground">
                We follow best practices in software development to ensure clean, maintainable, and scalable code.
              </p>
            </TabsContent>
            
            <TabsContent value="testing" className="mt-8 p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">4. Testing & Quality Assurance</h3>
              <p className="text-lg text-muted-foreground mb-4">
                We rigorously test all aspects of your project to ensure it meets the highest standards:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Functional testing</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Performance optimization</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Security testing</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Cross-browser/device compatibility</span>
                </li>
              </ul>
              <p className="text-muted-foreground">
                Our thorough testing process identifies and resolves issues before they impact your users.
              </p>
            </TabsContent>
            
            <TabsContent value="launch" className="mt-8 p-6 bg-card rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">5. Launch & Support</h3>
              <p className="text-lg text-muted-foreground mb-4">
                We ensure a smooth deployment and provide ongoing support:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Deployment planning and execution</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">User training and documentation</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Post-launch monitoring</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-lime-500/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-lime-500"></div>
                  </div>
                  <span className="ml-3 text-muted-foreground">Ongoing maintenance and support</span>
                </li>
              </ul>
              <p className="text-muted-foreground">
                We don't just deliver and disappear - we ensure your project continues to perform optimally and evolve with your needs.
              </p>
            </TabsContent>
          </Tabs>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Ready to Start Your Project?</h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project requirements and get a free consultation.
            </p>
            <Button asChild size="lg" variant="default" className="bg-black text-white hover:bg-black/80">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}