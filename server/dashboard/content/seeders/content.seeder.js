const { sequelize } = require("../../../config/database");
const Content = require("../models/content.model");

const seedContent = async () => {
  try {
    // حذف الجدول وإعادة إنشائه (للتطوير فقط)
    await Content.sync({ force: true });
    console.log("✅ Content table synced!");

    const sections = [
      {
        id: "home",
        title: "Welcome to Our Website",
        subtitle: "Your success starts here",
        description: "This is the home section of your website.",
      },
      {
        id: "about",
        title: "About Us",
        subtitle: "Who we are",
        description: "Learn more about our company and values.",
      },
      {
        id: "services",
        title: "Our Services",
        subtitle: "What we offer",
        description: "Explore the services we provide to our clients.",
      },
      {
        id: "portfolio",
        title: "Our Portfolio",
        subtitle: "Work we've done",
        description: "Showcase of our recent projects and achievements.",
      },
      {
        id: "pricing",
        title: "Pricing Plans",
        subtitle: "Choose your plan",
        description: "Affordable pricing options to suit your needs.",
      },
      {
        id: "support",
        title: "Support",
        subtitle: "We are here for you",
        description: "Contact our support team for assistance.",
      },
      {
        id: "faq",
        title: "FAQ",
        subtitle: "Frequently Asked Questions",
        description: "Find answers to the most common questions.",
      },
      {
        id: "contact",
        title: "Contact Us",
        subtitle: "Get in touch",
        description: "Reach out to us through our contact form.",
      },
      {
        id: "hero",
        title: "Transforming Ideas Into",
        subtitle: "Digital Excellence",
        description: "We're a team of expert developers and designers crafting innovative software solutions that drive business growth and user engagement.",
      },
    ];

    for (const section of sections) {
      await Content.create(section);
      console.log(`✅ Section ${section.id} created!`);
    }

    console.log("✅ All sections seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

// تشغ seeding فقط إذا تم استدعاء الملف مباشرة
if (require.main === module) {
  seedContent();
}

module.exports = seedContent;