# AAU Open Day Prototype

An immersive 3D virtual open day experience developed for Aalborg University Copenhagen.

This prototype allows users to explore study programmes, student associations, information areas, and media content inside an interactive virtual environment built with React Three Fiber.

---

# Overview

The project was developed as part of a prototype exploring how virtual and immersive environments can improve the university open-day experience.

The application combines:

- 3D navigation
- Interactive information stands
- NPC guide system
- Teleport map system
- Video/media integration
- Orbit exploration mode
- Interactive UI overlays

The goal of the prototype is to create a more engaging and accessible way for prospective students to explore university life and study opportunities.

---

# Features

## 3D First-Person Exploration

- WASD movement
- Mouse-look camera controls
- Physics-based player movement
- Interactive environment

---

## Interactive Study Stands

Users can:

- Walk up to study programme stands
- Press `E` to interact
- Open information panels
- Explore programme-specific information

---

## Student Association Areas

Interactive student-life stands provide information about:

- Student organisations
- Communities
- Campus activities
- Student experiences

---

## NPC Tour Guide System

Guide characters placed around the environment:

- Provide contextual instructions
- Explain nearby areas
- Show popup prompts when approached
- Help users navigate the experience

---

## Media Zone

Users can:

- Open video screens
- Watch university-related media
- Explore student-life content

---

## Interactive Map

Features include:

- Full environment map overlay
- Teleportation system
- Player location tracking
- Zone previews
- Locked/coming-soon areas

---

## Orbit Inspection Mode

Allows users to:

- Freely inspect the environment
- Rotate and zoom around the scene
- Explore the virtual space from different angles

---

# Technologies Used

## Frontend

- React
- Next.js
- TypeScript

## 3D & Rendering

- React Three Fiber
- Drei
- Three.js
- React Three Rapier

## Styling

- CSS
- Tailwind CSS

## Assets

- GLTF / GLB models
- Video integration
- Custom textures and UI assets

---

# Controls

| Key | Action |
|---|---|
| WASD | Move |
| Mouse | Look around |
| E | Interact |
| M | Open map |
| O | Toggle orbit mode |
| ESC | Close menus |
| H | Open help menu |

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

## Open in Browser

```txt
http://localhost:3000
```

---

# Project Structure

```txt
/components
  OpenDayScene.tsx
  Room.tsx
  PlayerInfo.tsx
  TourGuide.tsx
  MapOverlay.tsx
  OverlayUI.tsx

/data
  StudyField.ts
  GuideInfo.ts
  StandInfo.ts
  GeneralInfoStands.ts

/public
  /models
  /videos
  /pictures
```

---

# Research Purpose

This prototype was developed to investigate how immersive and interactive virtual environments can support:

- Student engagement
- Digital open-day experiences
- University information accessibility
- Exploration of campus life
- Interactive learning environments

The prototype will be evaluated through user testing and usability feedback.

---

# Future Improvements

Potential future additions include:

- Multiplayer functionality
- Voice narration
- Animated NPCs
- VR support
- AI-based virtual assistant
- Analytics and heatmaps
- Mobile optimisation

---

# Screenshots

Add screenshots of:

- Main hall
- Education programme stands
- NPC guide system
- Map overlay
- Media zone
- Orbit mode

---

# Author

Developed by:

Emma Sofie Fjørtoft Otterlei

Aalborg University Copenhagen

---

# Credits

## 3D Models

Some 3D assets used in this project were sourced from BlenderKit.

- https://www.blenderkit.com/

Models remain the property of their respective creators and are used for educational and prototype purposes only.

---

## Information & Media

Information and images used in this prototype were gathered from the official Aalborg University (AAU) website.

Videos and social media content were gathered from AAU’s official social media platforms for educational and prototype purposes.

- https://www.aau.dk/
- https://www.instagram.com/aaucph/

---

## Project Purpose

This project was developed as an educational and research prototype exploring immersive virtual open-day experiences.

---

# License

This project was developed for educational and research purposes.
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
