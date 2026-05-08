export type GeneralInfoSection = {
  heading: string;
  items: string[];
};

export type GeneralInfoStands = {
  id: string;
  title: string;
  intro: string;
  sections?: GeneralInfoSection[];
  outro?: string;
  position: [number, number, number];
  modelUrl?: string;
  image?: string;
  mapEmbedUrl?: string;
  linkLabel?: string;
  linkUrl?: string;
};

export const generalInfoStands: GeneralInfoStands[] = [
  {
    id: "how-to-use",
    title: "How to Explore the Hall",
    intro:
      "Welcome to the AAU Open Day. You can walk around the hall, visit stands, and open information to learn more about studying at AAU.",
    sections: [
      {
        heading: "Move around",
        items: [
          "Use W, A, S, D to walk.",
          "Move your mouse to look around.",
          "Walk up to a stand. When a label appears, press E to interact.",
        ],
      },
      
      {
        heading: "Helpful keys",
        items: [
          "Press H for help.",
          "Press M to open the map.",
          "Press O to change your view.",
        ],
      },
    ],
    outro:
      "Tip: Start with the general stands, then explore study areas that interest you.",
    position: [-10, 4.5, 0],
    modelUrl: "/models/HowTo.glb",
  },

  {
    id: "find-us",
    title: "Find AAU Copenhagen",
    intro:
      "AAU Copenhagen is located in Sydhavn, right by the harbor, with modern surroundings and easy access to the city center.",
    outro:
      "Use the map below or open Google Maps to find your way.",
    position: [-2, 4.5, 0],
    modelUrl: "/models/Globe.glb",
    mapEmbedUrl:
      "https://www.google.com/maps?q=A.+C.+Meyers+Vænge+15,+2450+København+SV&output=embed",
    linkLabel: "Open in Google Maps",
    linkUrl:
      "https://www.google.com/maps?q=A.+C.+Meyers+Vænge+15,+2450+København+SV",
  },

  {
    id: "admissions",
    title: "Admissions",
    intro:
      "Thinking about applying to AAU? Here you can see what you need before you apply.",
    sections: [
      {
        heading: "Before you apply",
        items: [
          "Check the requirements for your programme.",
          "Make sure you know the deadline.",
          "Prepare your documents in advance.",
        ],
      },
      {
        heading: "Good to know",
        items: [
          "Some programmes have limited places.",
          "Bachelor’s and Master’s applications are different.",
          "International students may need extra documents.",
        ],
      },
    ],
    outro:
      "Visit the admissions page for full details and how to apply.",
    position: [-23, 4.35, 0],
    modelUrl: "/models/ReceptionDesk.glb",
    linkLabel: "Visit AAU Admissions",
    linkUrl: "https://www.en.aau.dk/education/apply",
  },

  {
  id: "faculty-pbl",

  title: "Faculty and Learning Style at AAU (PBL)",

  intro:
    "At Aalborg University (AAU), students learn through Problem-Based Learning (PBL), where teamwork, projects, and real-world problem solving are central parts of the learning experience.",

  sections: [
    {
      heading: "Problem-Based Learning (PBL)",
      items: [
        "Students work in groups on semester projects.",
        "Projects focus on solving real and relevant problems.",
        "Theory from lectures is applied in practical work.",
        "PBL helps students develop teamwork and problem-solving skills.",
      ],
    },

    {
      heading: "Faculty Support and Modern Learning",
      items: [
        "Faculty members guide and support students throughout projects.",
        "Teachers act as supervisors and mentors, not only lecturers.",
        "AAU continuously updates programmes based on modern technology and industry needs.",
        "Students gain skills that prepare them for future careers and innovation.",
      ],
    },
  ],

  outro:
    "By combining Problem-Based Learning with strong faculty support, AAU creates a modern and practical learning environment for students.",

  position: [-8, 4.35, -10],

  linkLabel: "Learn more about PBL at AAU",
  linkUrl: "https://www.en.aau.dk/about-aau/profile/pbl",
}
];