import { ResumeData } from "../types";

export const resumeData: ResumeData = {
  personal: {
    name: "Nayan Nakhwa",
    title: "Electronics & Telecommunication Engineer",
    summary: "Electronics & Telecommunication Engineer with 3+ years of professional experience in software quality assurance. Proven expertise in e-commerce testing, specifically with WooCommerce plugins and extensions. Demonstrated ability to ensure product quality by identifying and tracking hundreds of defects, conducting comprehensive test types (Manual, API, UI/UX), and collaborating effectively with development teams.",
    location: "Pune, India",
    email: "nayanknakhwa@gmail.com",
    socials: {
      linkedin: "https://linkedin.com/in/nayan-nakhwa",
      github: "https://github.com/NayanNakhwa"
    }
  },
  stats: {
    yearsExperience: 3,
    bugsTracked: 450,
    projectsCompleted: 1
  },
  experience: [
    {
      id: "exp-1",
      role: "Software Tester",
      company: "Globalstep Private Limited",
      period: "August 2021 – Present",
      description: [
        "Performed comprehensive testing (Manual, Regression, Smoke, Exploratory, Performance, API, UI/UX) on WooCommerce plugins (Payments, Stripe, Subscriptions, Square, PayPal) ensuring compatibility across multiple WordPress versions and themes.",
        "Managed defect lifecycle by identifying, documenting, and tracking 450+ bugs using GitHub, collaborating with development teams to prioritize and resolve issues before product release.",
        "Awarded 'Rising Star of the Year' (2021) for outstanding performance and contribution."
      ],
      skills: ["Manual Testing", "API Testing", "WooCommerce", "GitHub", "JIRA", "Postman", "Playwright"]
    }
  ],
  skills: [
    {
      title: "Languages",
      skills: ["Python", "HTML", "CSS", "JavaScript", "SQL", "C++"]
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "JIRA", "Postman", "Playwright", "WordPress", "Fusion 360", "VS Code", "Embedded Systems", "AWS", "Google Cloud", "Cisco Packet Tracer", "eNSP"]
    },
    {
      title: "Domains",
      skills: ["E-commerce", "Network Security", "IoT", "Testing", "Web Development", "Graphic Design"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Wireless Network System for Anti-Poaching of Trees",
      description: "Developed a multi-sensor IoT framework integrating tilt, temperature, and sound sensors with a central processing unit for environmental monitoring. Implemented system logic to detect and alert on tree felling, fire risk, and unauthorized activity, demonstrating practical security applications.",
      techStack: ["IoT", "Sensors", "Network Security", "Embedded Systems"],
      type: "IoT",
      link: ""
    }
  ],
  certifications: [
    { id: "cert-1", name: "Google IT Automation with Python", issuer: "Google", date: "Nov 2020" },
    { id: "cert-2", name: "AWS Fundamentals", issuer: "AWS", date: "Nov 2020" },
    { id: "cert-3", name: "Responsive Web Design", issuer: "University of London", date: "Nov 2020" },
    { id: "cert-4", name: "HTML, CSS, and Javascript for Web Developers", issuer: "Johns Hopkins University", date: "Oct 2020" },
    { id: "cert-5", name: "Crash Course on Python", issuer: "Google", date: "Sep 2020" },
    { id: "cert-6", name: "SQL for Data Science", issuer: "UC Davis", date: "Sep 2020" },
    { id: "cert-7", name: "HCIA Routing and Switching", issuer: "Huawei Technologies", date: "Nov 2023" },
    { id: "cert-8", name: "HCIA AI", issuer: "Huawei Technologies", date: "Nov 2023" },
    { id: "cert-9", name: "Global Navigation Satellite System", issuer: "IIRS, ISRO", date: "Sep 2020" },
    { id: "cert-10", name: "Introduction to IoT & Embedded Systems", issuer: "UC Irvine", date: "Sep 2020" },
    { id: "cert-11", name: "IoT Wireless & Cloud Computing", issuer: "Yonsei University", date: "Aug 2020" },
    { id: "cert-12", name: "Graphic Design", issuer: "University of Colorado Boulder", date: "Sep 2020" },
    { id: "cert-13", name: "Initiating and Planning Projects", issuer: "UC Irvine", date: "Aug 2020" },
    { id: "cert-14", name: "Mindshift", issuer: "McMaster University", date: "Aug 2020" },
    { id: "cert-15", name: "COVID-19 Contact Tracing", issuer: "Johns Hopkins", date: "Aug 2020" }
  ]
};