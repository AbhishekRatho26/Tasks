import { FrontendProject } from '../utils/types';

export const projectsData: FrontendProject[] = [
  {
    id: "1",
    title: "Intervuiai",
    description: "An AI-powered platform designed to simulate mock interviews, generate domain-specific questions, and provide instant feedback with 95% accuracy. It supports over 10 job domains, evaluates responses in real-time using advanced NLP, and offers personalized improvement plans. With multi-language support and a progress tracker, the platform ensures 30% faster preparation for job seekers.",
    techStack: ["Typescript", "Nextjs", "Clerk", "Chart.js","Gemini"],
    liveDemoUrl: "https://www.intrvuai.in.net/sign-in?redirect_url=https%3A%2F%2Fwww.intrvuai.in.net%2Fhome",
    githubUrl: "https://github.com/example/ecommerce-dashboard",
    features: [
      "Strong Authentication system",
      "Responsive layout for all devices",
      "Interactive sales and inventory charts",
      "Real-time mock interviews asked by ai",
      "Fine Tuning of the gemini model"
    ],
    challenges: [
      "Choosing the right algorithm for forecasting",
      "Performance optimization for large datasets",
      "Creating a consistent design system"
    ],
    screenshots: [
      "https://www.ttnews.com/sites/default/files/2023-09/iTECH-Dysart-1200.jpg",
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-02-20T00:00:00Z"
  },
  {
    id: "2",
    title: "Portfolio Media App",
    description: "An application showing the portfolio of the users and skills of the users",
    techStack: ["React", "Firebase", "Styled Components", "Redux"],
    liveDemoUrl: "https://example.com/social-app",
    githubUrl: "https://github.com/example/social-app",
    features: [
      "An interactive portfolio application like dribble",
      "Create and update Profiles",
      "User authentication and profiles",
      "Graphs for good visualizations",
      "Post commenting and reactions"
    ],
    challenges: [
      "Managing real-time data synchronization",
      "Creating an intuitive mobile-first UI",
      "Handling user authentication securely"
    ],
    screenshots: [
      "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2023-04-12T00:00:00Z"
  },
  {
    id: "3",
    title: "Task Management App",
    description: "A Kanban-style task management application with drag-and-drop functionality and team collaboration features.",
    techStack: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    liveDemoUrl: "https://example.com/task-app",
    githubUrl: "https://github.com/example/task-app",
    features: [
      "Drag-and-drop task management",
      "Customizable Kanban boards",
      "Task assignments and deadlines",
      "Team collaboration tools",
      "Progress tracking and reporting"
    ],
    challenges: [
      "Implementing smooth drag-and-drop functionality",
      "Designing an intuitive task creation flow",
      "Managing complex state between board columns"
    ],
    screenshots: [
      "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    createdAt: "2023-05-22T00:00:00Z",
    updatedAt: "2023-06-15T00:00:00Z"
  },
  {
    id: "4",
    title: "Weather Application",
    description: "Tested models included ARIMA, linear regression, xgboost, and LSTM, with xgboost showing the best performance (MSE, R²). Achieved 86% accuracy for 7-day forecasts using LSTM.",
    techStack: ["React", "OpenWeather API", "Framer Motion", "CSS Modules"],
    liveDemoUrl: "https://colab.research.google.com/drive/1nN8GjhXIB1eiq5T76wviw6CQ312Fhais",
    githubUrl: "https://github.com/example/weather-app",
    features: [
      "Current weather conditions and forecasts",
      "Location-based weather detection",
      "Beautiful weather animations and icons",
      "Historical weather data",
      "Favorite locations saving"
    ],
    challenges: [
      "Working with multiple external API endpoints",
      "Creating dynamic weather visualizations",
      "Optimizing for different devices and screen sizes"
    ],
    screenshots: [
      "https://www.benchmarklabs.com/wp-content/uploads/2021/12/IoT-Based-Weather-Monitoring-System-For-Micro-Climate-Forecasting.jpg",
      "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    createdAt: "2023-07-10T00:00:00Z",
    updatedAt: "2023-08-05T00:00:00Z"
  }
];