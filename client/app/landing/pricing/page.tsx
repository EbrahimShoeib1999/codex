"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  
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

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses and startups",
      monthlyPrice: 1499,
      yearlyPrice: 14990,
      features: [
        "Custom website design",
        "Responsive mobile design",
        "Content Management System",
        "5 pages included",
        "Basic SEO setup",
        "Contact form integration",
        "1 month of support",
        "Hosting setup assistance"
      ],
      notIncluded: [
        "E-commerce functionality",
        "Custom animations",
        "Advanced integrations",
        "Performance optimization"
      ]
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with specific needs",
      monthlyPrice: 2999,
      yearlyPrice: 29990,
      popular: true,
      features: [
        "Everything in Starter",
        "Up to 15 pages",
        "E-commerce functionality",
        "Custom animations",
        "Advanced SEO optimization",
        "Social media integration",
        "Google Analytics setup",
        "3 months of support",
        "Performance optimization",
        "Newsletter integration"
      ],
      notIncluded: [
        "Custom app development",
        "Advanced security features",
        "Multilingual support"
      ]
    },
    {
      name: "Enterprise",
      description: "Comprehensive solution for large businesses",
      monthlyPrice: 5999,
      yearlyPrice: 59990,
      features: [
        "Everything in Professional",
        "Unlimited pages",
        "Custom app development",
        "Advanced security features",
        "Multilingual support",
        "Priority support",
        "Dedicated project manager",
        "User authentication system",
        "Custom database integration",
        "Advanced analytics dashboard",
        "12 months of support",
        "Regular performance audits"
      ],
      notIncluded: []
    }
  ];

  const customServices = [
    {
      category: "Web Development",
      services: [
        { name: "Landing Page", price: 999, description: "Custom designed, responsive landing page optimized for conversions" },
        { name: "Corporate Website", price: 2999, description: "Professional multi-page website with CMS integration" },
        { name: "E-commerce Store", price: 4999, description: "Full-featured online store with payment processing and inventory management" },
        { name: "Web Application", price: 7999, description: "Custom web application with user authentication and database integration" }
      ]
    },
    {
      category: "Mobile Development",
      services: [
        { name: "iOS App", price: 5999, description: "Native iOS application with intuitive UI and core functionality" },
        { name: "Android App", price: 5999, description: "Native Android application optimized for various devices" },
        { name: "Cross-platform App", price: 7999, description: "App that works on both iOS and Android from a single codebase" },
        { name: "App Maintenance", price: 999, description: "Monthly maintenance and updates for your mobile application" }
      ]
    },
    {
      category: "Design Services",
      services: [
        { name: "Logo Design", price: 499, description: "Professional logo design with multiple concepts and revisions" },
        { name: "Brand Identity", price: 1499, description: "Complete brand package including logo, colors, typography, and guidelines" },
        { name: "UI/UX Design", price: 2499, description: "User interface and experience design for web or mobile applications" },
        { name: "Prototype Development", price: 1999, description: "Interactive prototype to visualize your application before development" }
      ]
    },
    {
      category: "Digital Marketing",
      services: [
        { name: "SEO Package", price: 799, description: "Monthly SEO optimization to improve search engine rankings" },
        { name: "Social Media Management", price: 699, description: "Content creation and management for your social media platforms" },
        { name: "PPC Campaign", price: 999, description: "Pay-per-click advertising campaign setup and management" },
        { name: "Content Marketing", price: 899, description: "Blog posts, articles, and content strategy for your website" }
      ]
    }
  ];

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs or customize a solution specifically for your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-12">
            <span className={`mr-3 text-lg ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === "yearly"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
            />
            <span className={`ml-3 text-lg ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly <span className="text-lime-500 font-medium">(Save 17%)</span>
            </span>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {plans.map((plan, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className={`${plan.popular ? "lg:-mt-8" : ""}`}
              >
                <Card className={`h-full overflow-hidden ${plan.popular ? "border-lime-500 shadow-lg" : ""}`}>
                  {plan.popular && (
                    <div className="bg-lime-500 text-white text-center py-2 font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className={`${plan.popular ? "pb-6" : "pb-4"}`}>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">
                        {formatPrice(billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice / 12)}
                      </span>
                      <span className="text-muted-foreground ml-2">/ month</span>
                      {billingCycle === "yearly" && (
                        <div className="text-sm text-lime-500 font-medium mt-1">
                          Billed {formatPrice(plan.yearlyPrice)} yearly
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Features included:</h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-lime-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {plan.notIncluded.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 text-muted-foreground">Not included:</h4>
                        <ul className="space-y-3">
                          {plan.notIncluded.map((feature, i) => (
                            <li key={i} className="flex items-start text-muted-foreground">
                              <span className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 relative">
                                <span className="absolute inset-0 flex items-center justify-center">
                                  <span className="h-0.5 w-3 bg-muted-foreground rounded-full"></span>
                                </span>
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4 pt-4">
                    <Button 
                      asChild 
                      className={`w-full ${plan.popular ? "bg-lime-500 hover:bg-lime-600" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link href="/contact">Choose Plan</Link>
                    </Button>
                    <div className="text-sm text-center text-muted-foreground">
                      No credit card required
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Custom Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Custom Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Need something specific? Explore our à la carte services to build a custom solution.
            </p>
          </motion.div>

          <Tabs defaultValue={customServices[0].category} className="max-w-5xl mx-auto">
            <TabsList className="flex flex-wrap justify-center mb-8">
              {customServices.map((category, index) => (
                <TabsTrigger key={index} value={category.category}>
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {customServices.map((category, index) => (
              <TabsContent key={index} value={category.category}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.services.map((service, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <div className="text-xl font-bold text-lime-500">
                            {formatPrice(service.price)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{service.description}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button asChild variant="outline" size="sm">
                          <Link href="/contact">Request Quote</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-4">Pricing FAQ</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common questions about our pricing and services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Do you offer custom pricing for specific projects?",
                answer: "Yes, we understand that every project is unique. If our standard packages don't fit your needs, we're happy to provide custom quotes based on your specific requirements. Contact us to discuss your project in detail."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers. For larger projects, we can also arrange milestone-based payment schedules to align with project deliverables."
              },
              {
                question: "Is there a money-back guarantee?",
                answer: "We're confident in the quality of our work. If you're not satisfied with the initial design concepts, we offer revisions to ensure your satisfaction. For custom development work, we provide a 30-day warranty period after project completion."
              },
              {
                question: "Are there any hidden fees?",
                answer: "No, we believe in transparent pricing. The price we quote includes all the features and services outlined in your proposal. If additional requirements emerge during the project, we'll discuss any potential cost implications before proceeding."
              },
              {
                question: "Do you offer discounts for non-profits or startups?",
                answer: "Yes, we offer special pricing for non-profit organizations and early-stage startups. Please contact us with details about your organization to learn more about our discount programs."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-start">
                      <span>{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Ready to Get Started?</h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project requirements and get a personalized quote.
            </p>
            <Button asChild size="lg" variant="default" className="bg-black text-white hover:bg-black/80">
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}