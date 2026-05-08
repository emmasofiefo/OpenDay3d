export type GuideInfo = {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
  rotation?: [number, number, number];
};

export const guideInfo: GuideInfo[] = [
  {
    id: "education-guide",
    title: "Education Programmes",
    description:
      "Walk up to the education tables and press E to learn about our study programmes.",
    position: [14, 0.55, -6],
    rotation: [0, Math.PI * 1.8 , 0],
  },

  {
    id: "intro-guide",
    title: "Introduction Area",
    description:
      "Press E near the stands to begin exploring the AAU Open Day experience.",
    position: [-13, 4.5, -4],
    rotation: [0, 0, 0],
  },

  {
    id: "associations-guide",
    title: "Student Associations",
    description:
      "Walk up to the student association stands and press E to discover student life at AAU.",
    position: [6.5, 0.55, 16.5],
    rotation: [0, Math.PI / 1, 0],
  },

  {
    id: "admission-guide",
    title: "Admissions",
    description:
      "Visit the admissions stand and press E to get help with applications and requirements.",
    position: [-5.5, 4.35, -7.5],
    rotation: [0, -Math.PI / 3, 0],
  },

  {
    id: "media-zone",
    title: "Media Zone",
    description:
      "Walk closer and press E to watch videos and explore student experiences.",
    position: [2, 4.35, 8],
    rotation: [0, Math.PI * 1.3, 0],
  },
];