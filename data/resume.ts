import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  personal: {
    name: "Nayan Nakhwa",
    title: "QA & Electronics Engineer",
    summary: "Detail-oriented Software Test Engineer with a background in Electronics & Telecommunication. Specializing in manual & automation testing, IoT systems, and quality assurance for high-scale e-commerce platforms. Committed to engineering precision and software reliability.",
    location: "Mumbai, India",
    email: "nayan.nakhwa@example.com", // Placeholder
    socials: {
      linkedin: "https://linkedin.com/in/nayan-nakhwa",
      github: "https://github.com/nayan-nakhwa"
    }
  },
  stats: {
    yearsExperience: 3,
    bugsTracked: 450,
    projectsCompleted: 12
  },
  experience: [
    {
      id: "exp-1",
      role: "Software Test Engineer",
      company: "Globalstep",
      period: "2021 - Present",
      description: [
        "Executed comprehensive manual and automated testing strategies for e-commerce platforms.",
        "Identified, documented, and tracked over 450+ critical bugs using JIRA.",
        "Performed extensive API testing ensuring seamless 3rd party integrations.",
        "Specialized in WooCommerce plugin testing and payment gateway validation."
      ],
      skills: ["JIRA", "Selenium", "API Testing", "WooCommerce", "Agile"]
    }
  ],
  skills: [
    {
      title: "Core Technical",
      skills: ["Manual Testing", "Automation Testing", "IoT Systems", "Network Security"]
    },
    {
      title: "Languages & Tools",
      skills: ["Python", "Java", "SQL", "HTML/CSS", "Selenium WebDriver", "Postman", "JIRA"]
    },
    {
      title: "Domains",
      skills: ["E-commerce", "Telecommunication", "Embedded Systems"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Wireless Anti-Poaching System",
      description: "Designed and implemented an IoT-based wireless sensor network to detect unauthorized human activity in protected forest areas. utilized Zigbee modules for long-range low-power communication.",
      techStack: ["IoT", "Zigbee", "Embedded C", "Sensors"],
      type: "IoT"
    },
    {
      id: "proj-2",
      title: "E-commerce Automation Suite",
      description: "Developed a Python-Selenium automation framework to regression test critical checkout flows, reducing manual testing time by 40%.",
      techStack: ["Python", "Selenium", "Jenkins"],
      type: "Automation"
    }
  ],
  certifications: [
    { id: "cert-1", name: "Google Cloud Fundamentals", issuer: "Google", date: "2023" },
    { id: "cert-2", name: "AWS Certified Practitioner", issuer: "AWS", date: "2022" },
    { id: "cert-3", name: "HCIA - Routing & Switching", issuer: "Huawei", date: "2021" },
    { id: "cert-4", name: "Python for Data Science", issuer: "Coursera", date: "2021" },
    { id: "cert-5", name: "Software Testing Life Cycle", issuer: "Udemy", date: "2020" }
  ]
};