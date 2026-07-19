# LaptopIQ

> **Developed for the VIT-AP Hackathon**

[![Live Demo](https://img.shields.io/badge/Live_Demo-laptopiq.vercel.app-blue?style=for-the-badge)](https://laptopiq.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

LaptopIQ is a programmatic laptop recommendation engine designed for students and professionals. The application utilizes a dynamic scoring algorithm to evaluate user requirements against a catalog of hardware specifications, delivering optimized hardware recommendations within a responsive, neo-brutalist user interface.

## Problem Statement

Navigating the laptop market in India presents significant challenges for consumers due to opaque specification sheets, biased retail environments, and inflexible e-commerce filtering systems. LaptopIQ addresses these inefficiencies by providing an automated, unbiased recommendation engine. By capturing specific user constraints—such as budget, computational workloads, and software requirements—the system programmatically identifies and ranks the most appropriate hardware configurations.

## Live Deployment

**Application Access:** [https://laptopiq.vercel.app/](https://laptopiq.vercel.app/)

## Technical Features

- **Heuristic Quiz Engine**: A sequential questionnaire designed to capture operational constraints, including budget limits, target workloads, preferred operating systems, and battery requirements.
- **Dynamic Scoring Algorithm**: A quantitative evaluation system that rates hardware from 0-100. The algorithm applies severe numerical penalties for specification mismatches (e.g., incorrect operating system) while rewarding optimal hardware configurations based on user inputs.
- **User Interface Design**: Implements a neo-brutalist design system characterized by high-contrast typography, structural borders, and functional data visualization components.
- **Retailer Query Generation**: Automatically synthesizes highly specific search queries for Amazon and Flipkart based on exact hardware specifications (Brand, CPU, RAM, Storage, GPU) to ensure accurate product retrieval.
- **Data Visualization**: Integrates Recharts to render multi-axis radar charts, quantifying laptop performance metrics across variables such as Gaming, Compilation, Media Editing, Portability, and Value.
- **Comparative Analysis**: Features a side-by-side comparison engine supporting concurrent evaluation of up to four laptop configurations.

## Local Installation

1. **Clone and Install Dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Initialize the Development Environment**

   ```bash
   npm run dev
   ```

3. Access the application via the local server address provided by Vite (default: `http://localhost:5173`).

## System Architecture

```
src/
├── data/
│   ├── laptops.js         # Serialized hardware catalog data
│   └── quizConfig.js      # Questionnaire logic and heuristic boundaries
├── lib/
│   ├── scoring.js         # Core algorithmic evaluation engine
│   ├── format.js          # Text and currency formatting utilities
│   └── links.js           # E-commerce search query synthesis
├── components/
│   ├── Home.jsx           # Landing view and primary navigation
│   ├── Quiz.jsx           # Interactive parameter collection interface
│   ├── ResultsView.jsx    # Ranked hardware presentation matrix
│   ├── DetailModal.jsx    # Comprehensive specification and analytics view
│   ├── CompareView.jsx    # Parallel evaluation matrix
│   └── ScoreDial.jsx      # Quantitative visualization components
├── App.jsx                # Global state management and routing
├── index.css              # Global stylesheets and utility classes
└── theme.css              # Design system tokens and custom properties
```

## Future Scalability

Currently, the application architecture relies on a static JSON data structure (`src/data/enriched_laptops.json`). 

To transition this system into a production-grade live platform:

1. **Backend Integration**: Replace the static data importation in `laptops.js` with asynchronous HTTP requests to a dedicated backend service.
2. **Automated Inventory Synchronization**: Integrate the backend service with the Amazon Product Advertising API or Flipkart Affiliate API via scheduled cron jobs. This will ensure automated price synchronization, removal of discontinued SKUs, and the ingestion of new hardware models as they enter the market.

## Contribution Guidelines

Contributions, bug reports, and feature requests are welcome. Please review the repository issues page prior to submitting pull requests.
