export type StandInfo = {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  learnMoreUrl: string;
  image?: string;
  openSound?: string;
  voiceOver?: string;
};

export type StudentLifeCategory = "events" | "hobbies" | "sport" | "academic";

export type StudentLifeTable = {
  id: string;
  category: StudentLifeCategory;
  title: string;
  position: [number, number, number];
  image?: string;
  stands: StandInfo[];
};

export const studentLifeTables: StudentLifeTable[] = [
  {
    id: "events-table",
    category: "events",
    title: "Events",
    position: [7, 0.55, 22],
    image: "/pictures/clubs/event.webp",
    stands: [
      {
        id: "amped",
        title: "AMPED",
        description:
          "A student organisation focused on creating and supporting social events on campus.",
        position: [7, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "puls",
        title: "PULS",
        description:
          "Provides sound and lighting for events and gives students hands-on experience with event production.",
        position: [7, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "party-committee",
        title: "The Party Committee",
        description:
          "Organises parties and social events for students across campus.",
        position: [7, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "slusen",
        title: "Slusen",
        description:
          "The Friday bar at AAU Copenhagen and a central social hub for student life.",
        position: [7, 2, 22],
        learnMoreUrl: "",
      },
    ],
  },
  {
    id: "hobbies-table",
    category: "hobbies",
    title: "Hobbies",
    position: [10, 0.55, 22],
    image: "/pictures/clubs/Social.webp",
    stands: [
      {
        id: "board-games",
        title: "AAU Board Games",
        description:
          "A social club where students meet to play board games together.",
        position: [10, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "listening-club",
        title: "AAU CPH Listening Club",
        description:
          "A community for sharing music, listening together, and exploring sound and culture.",
        position: [10, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "undertone",
        title: "underTone",
        description:
          "A creative student group focused on sound, music, and audio experiences.",
        position: [10, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "coffee-spot",
        title: "The Coffee Spot",
        description:
          "A cozy student-run café and social meeting place on campus.",
        position: [10, 2, 22],
        learnMoreUrl: "",
      },
    ],
  },
  {
    id: "sport-table",
    category: "sport",
    title: "Sport",
    position: [13, 0.55, 22],
    image: "/pictures/clubs/sport.webp",
    stands: [
      {
        id: "kayak",
        title: "AAU Kayak",
        description:
          "A student kayak club offering activities on the water in Copenhagen.",
        position: [13, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "bouldering",
        title: "Bouldering Crew",
        description:
          "A climbing community for students interested in bouldering and movement.",
        position: [13, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "swimming",
        title: "Swimming Club",
        description:
          "A swimming community for fitness, training, and social activities.",
        position: [13, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "runclub",
        title: "Syd RunClub",
        description:
          "A social running club that brings students together through group runs.",
        position: [13, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "football",
        title: "Sydhavn FF",
        description:
          "A student football club open to different skill levels and study programmes.",
        position: [13, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "padel",
        title: "Sydhavn Padel",
        description:
          "A student padel club for casual games and competitive matches.",
        position: [13, 2, 22],
        learnMoreUrl: "",
      },
    ],
  },
  {
    id: "academic-table",
    category: "academic",
    
    title: "Academic",
    position: [16, 0.55, 22],
    image: "/pictures/clubs/academic.webp",
    stands: [
      {
        id: "bdsd",
        title: "BD/SD Student Organization",
        description:
          "A student organisation connected to Business Development and Service Design.",
        position: [16, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "digital-arts",
        title: "Digital Arts",
        description:
          "An academic and creative community focused on digital art and design.",
        position: [16, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "m3",
        title: "M3",
        description:
          "An academic student initiative connected to projects, events, and student engagement.",
        position: [16, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "peas",
        title: "PEAS",
        description:
          "A student association connecting academic life with networking and professional activities.",
        position: [16, 2, 22],
        learnMoreUrl: "",
      },
      {
        id: "tekanden",
        title: "Tekanden – Teknoantropologisk café",
        description:
          "A techno-anthropology café that combines academic and social student activities.",
        position: [16, 2, 22],
        learnMoreUrl: "",
      },
    ],
  },
];