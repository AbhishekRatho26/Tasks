import { Profile } from '../utils/types';

export const profileData: Profile = {
  info: {
    name: "Abhishek Ratho",
    title: "Software Developer",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    about: "An Entry level developer with knowledge in the domain of AI and Frontend development with 8 months of experince working at Turing,NIT Rourkela and 2 months of intern experince as a Software Developer at Hiringhood",
    contact: {
      email: "abhishek.ratho2004@gmail.com",
      linkedin: "www.linkedin.com/in/abhishek-ratho-56a178240",
      github: "https://github.com/AbhishekRatho-2004",
      website: "abhishek.dev"
    }
  },
  skills: [
    { name: "React", level: 90, color: "#61DAFB" },
    { name: "TypeScript", level: 85, color: "#3178C6" },
    { name: "CSS/SCSS", level: 80, color: "#CC6699" },
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "Next.js", level: 75, color: "#000000" },
    { name: "Redux", level: 70, color: "#764ABC" },
    { name: "Testing", level: 65, color: "#C21325" },
    { name: "GraphQL", level: 60, color: "#E535AB" }
  ],
  experience: [
    {
      id: "exp1",
      company: "Turing",
      position: "Business Analyst",
      startDate: "2024-09",
      endDate: "2024-12",
      description: "Lead frontend development for enterprise SaaS applications. Implemented component-based architecture that reduced development time by 30%. Mentored junior developers and conducted code reviews.",
      technologies: ["AI", "LLM", "RLHF", "Data Analysis"]
    },
    {
      id: "exp2",
      company: "NIT Rourkela",
      position: "Research Analyst",
      startDate: "2024-05",
      endDate: "2024-07",
      description: "Developed responsive web applications for various clients. Created reusable component libraries and implemented state management solutions. Collaborated with designers to ensure pixel-perfect implementations.",
      technologies: ["Python", "SQL", "AIML", "REST APIs"]
    },
    {
      id: "exp3",
      company: "Digital Creatives",
      position: "Junior Web Developer",
      startDate: "2016-01",
      endDate: "2018-06",
      description: "Built and maintained client websites using modern frontend technologies. Worked on optimizing website performance and improving SEO rankings.",
      technologies: ["JavaScript", "HTML5", "CSS3", "jQuery"]
    }
  ],
  education: [
    {
      id: "edu1",
      institution: "Anil Neerukonda Institute of Technology and Sciences",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      startDate: "2021-12",
      endDate: "2025-04",
      description: "Specialized in Computer Science"
    },
    {
      id: "edu2",
      institution: "Sri Chaitanya Junior College",
      degree: "Intermediate",
      field: "PCM",
      startDate: "2019-06",
      endDate: "2021-06",
      description: "JEE Mains with 92 percentile"
    }
  ]
};