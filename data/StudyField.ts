export type StudyField = {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  learnMoreUrl: string;
  image?: string;
  openSound?: string;
  voiceOver?: string;
  materialName?: string;
};

export const studyFields: StudyField[] = [
  {
    id: "computer-engineering",
    title: "Computer Engineering",
    description:
      "The Master's in Computer Engineering will give you insight into the theory, methods and tools of computer engineering. The programme focuses on computer systems, cloud-based technologies, advanced machine learning and generative AI, big data processing and analysis and cybersecurity. You will be part of an international educational and research environment where you will gain access to the latest knowledge and technology while working with technologies at the forefront of digital development.",
    position: [13, 1.3, -12],
    rotation: [0, 0, 0],
    learnMoreUrl: "https://www.en.aau.dk/education/master/computer-engineering-cph",
    image: "/pictures/Study/studies/computer-eng-ms.webp",
    materialName: "computer",
    voiceOver: "/audio/Computer Engineering.m4a.mp4",
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    description:
      "The current cyber threat is greater than ever before – and the threat assessment is becoming increasingly complex. The Master's in Cyber Security gives you the skills to help companies, authorities and public institutions manage and protect themselves against cyber threats. You will work with prevention, detection and management of cyber threats and attacks and be part of an inclusive and international educational and research environment.",
    position: [13, 1.3, -9],
    rotation: [0, 0, 0],
    learnMoreUrl: "https://www.en.aau.dk/education/master/cyber-security",
    image: "/pictures/Study/studies/cyber-security-ms.webp",
    materialName: "cyber",
    voiceOver: "/audio/Computer Engineering.m4a.mp4",
  },
  {
    id: "information-studies",
    title: "Information Studies (Human Centered Informatics)",
    description:
      "The Master's in Information Studies focuses on the design, development and evaluation of IT systems with an emphasis on how people interact with information, IT systems and each other. The programme takes you through the different phases of data-driven design – from user research to data analysis and visualisation to developing successful IT-based solutions.",
    position: [13, 1.3, -1.5],
    rotation: [0, 0, 0],
    learnMoreUrl: "https://www.en.aau.dk/education/master/information-studies",
    image: "/pictures/Study/studies/Infomation-studies-ms.webp",
    materialName: "Infomation",
    voiceOver: "/audio/Information Studies.m4a.mp4",
  },
  {
    id: "lighting-design",
    title: "Lighting Design, Master of Science (MSc)",
    description:
      "The Master's in Lighting Design teaches you to work with both natural and artificial light at the intersection of three scientific fields: architecture, media technology and engineering. The aim is to provide you with an academic, technical and process-related approach to designing with light in virtual and physical spaces.",
    position: [13, 1.3, 1.5],
    rotation: [0, 0, 0],
    learnMoreUrl: "https://www.en.aau.dk/education/master/lighting-design",
    image: "/pictures/Study/studies/Lighting-design-ms.webp",
    materialName: "Lighting",
    voiceOver: "/audio/Lighting Design.m4a.mp4",
  },
  {
    id: "medialogy",
    title: "Medialogy",
    description:
      "The Master's in Medialogy is for those who want to use media technologies to solve real-world user challenges. You will do hands-on work while learning about the science and technologies behind interactive digital systems such as apps, VR, computer games, Internet of Things and the physical interfaces of digital systems. You will learn to design and implement media technology solutions, often in close collaboration with companies, and you will work with user experience in professional settings.",
    position: [19, 1.3, 9],
    rotation: [0, Math.PI, 0], 
    learnMoreUrl: "https://www.en.aau.dk/education/master/medialogy-cph",
    image: "/pictures/Study/studies/medialogi-studerende-foto-1_graded.webp",
    materialName: "Medialogi",
    voiceOver: "/audio/Medialogy.m4a.mp4",
  },
  {
    id: "service-systems-design",
    title: "Service Systems Design",
    description:
      "The Master's in Service Systems Design gives you the skills to create high-quality service experiences through user participation and social innovation. You will learn how to use the latest methods in service systems, UX design, prototyping and visual thinking.",
    position: [13, 1.3, 9],
    rotation: [0, 0, 0],
    learnMoreUrl: "https://www.en.aau.dk/education/master/service-systems-design",
    image: "/pictures/Study/studies/service-systems-ms.webp",
    materialName: "Service",
    voiceOver: "/audio/Service Systems Design.m4a.mp4",
  },
  {
    id: "software-msc",
    title: "Software, Master of Science (MSc) in Engineering",
    description:
      "The Master's in Software is for those who want to work with internet development and distributed and mobile networks – both from a developer and a user perspective. The programme also lets you explore research environments working in advanced software techniques and gives you access to the latest knowledge and technology.",
    position: [13, 1.3, 12],
    rotation: [0, 0, 0],
    learnMoreUrl: "https://www.en.aau.dk/education/master/software-cph",
    image: "/pictures/Study/studies/software-ms.webp",
    materialName: "Software",
    voiceOver: "/audio/Software.m4a.mp4",
  },
  {
    id: "surveying-planning-land-management",
    title: "Surveying, Planning and Land Management",
    description:
      "In the Master's in Surveying, Planning and Land Management, you work with planning, property law and geodata in connection with technology, law and society. You will work with the green transition and the future map of Denmark. You can also choose to specialise in one of the subject areas related to surveying and mapping, land management, planning and geoinformatics.",
    position: [19, 1.3, -12],
    rotation: [0, Math.PI, 0], 
    learnMoreUrl: "https://www.en.aau.dk/education/master/surveying-planning-and-land-management-cph",
    image: "/pictures/Study/studies/Surveying-ms.webp",
    materialName: "Surveying",
    voiceOver: "/audio/Surveying, Planning and Land Management.m4a.mp4",
  },
  {
    id: "sustainable-cities",
    title: "Sustainable Cities",
    description:
      "The Master's in Sustainable Cities is about developing the cities of the future, focusing on topics such as climate change, environmental issues and urban infrastructure in cities. You will work on concrete solutions to complex problems and learn how to merge technical, environmental and social considerations into a sustainable whole.",
    position: [19, 1.3, -9],
    rotation: [0, Math.PI, 0], 
    learnMoreUrl: "https://www.en.aau.dk/education/master/sustainable-cities",
    image: "/pictures/Study/studies/sustainable-city-ms.webp",
    materialName: "SustainableCity",
    voiceOver: "/audio/Sustainable Cities.m4a.mp4",
  },
  {
    id: "sustainable-design",
    title: "Sustainable Design",
    description:
      "The Master's in Sustainable Design combines sustainable design with tools from innovation theory and user-centred design. You work with visualisation and experimentation to develop new, innovative and sustainable solutions that take both people and future challenges into account.",
    position: [19, 1.3, -1.5],
    rotation: [0, Math.PI, 0], 
    learnMoreUrl: "https://www.en.aau.dk/education/master/sustainable-design-msc-in-engineering",
    image: "/pictures/Study/studies/sustainable-ms.webp",
    materialName: "Sustainable",
    voiceOver: "/audio/Sustainable Design.m4a.mp4",
  },
  {
    id: "techno-anthropology",
    title: "Techno-Anthropology",
    description:
      "The Master's in Techno-Anthropology gives you the skills to work with assessment of technology, innovation, technology-driven change, use of technology and technology ethics. You will work with and manage complex socio-technical issues that include a number of stakeholders.",
    position: [19, 1.3, 1.5],
    rotation: [0, Math.PI, 0], 
    learnMoreUrl: "https://www.en.aau.dk/education/master/techno-anthropology-cph",
    image: "/pictures/Study/studies/Techno-ant-ms.webp",
    materialName: "Techno",
    voiceOver: "/audio/Techno-Anthropology.m4a.mp4",
  },
  {
    id: "visual-studies-art-education",
    title: "Visual Studies and Art Education",
    description:
      "The Nordic Master’s in Visual Studies and Art Education (NM NoVA) gives you solid practical and theoretical skills in art, education, digital communication and project management and prepares you to work professionally and creatively in cross-cultural and international environments.",
    position: [19, 1.3, 12],
    rotation: [0, Math.PI, 0], 
    learnMoreUrl: "https://www.en.aau.dk/education/master/visual-studies-and-art-education",
    image: "/pictures/Study/studies/visual-studies-ms.webp",
    materialName: "Visual",
    voiceOver: "/audio/Visual Studies and Art Education.m4a.mp4",
    },
];