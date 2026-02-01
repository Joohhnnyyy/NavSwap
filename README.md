# NavSwap

**The Operating System for Battery Swapping**

NavSwap is an advanced AI-powered infrastructure platform designed to optimize battery swapping networks. It functions as a comprehensive digital twin and decision engine, leveraging real-time data to predict demand, manage fleet routing, and ensure high operational uptime across distributed station networks.

[View Live Demo](https://navswap.vercel.app)

## Features

*   **Real-time Network Dashboard**: Monitor critical KPIs including station uptime, queue lengths, energy consumption, and active swaps through interactive visualizations.
*   **AI Decision Engine**: Automated logic for driver rerouting, inventory rebalancing, and predictive maintenance based on live telemetry.
*   **Digital Twin Visualization**: Granular status tracking for every station, battery, and charger in the network.
*   **Smart Fault Management**: Automated detection of hardware anomalies with integrated ticketing and technician dispatch workflows.
*   **Dynamic Theme System**: High-contrast dark and light modes designed for optimal readability in operational control center environments.

## Tech Stack

*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS, CSS Variables
*   **Animation**: Framer Motion, Motion One
*   **Data Visualization**: Recharts
*   **Maps**: React Leaflet
*   **3D Rendering**: React Three Fiber, Drei
*   **UI Components**: Radix UI, Lucide React, Sonner

## Getting Started

### Prerequisites

*   Node.js 18.17 or later
*   npm, pnpm, or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Joohhnnyyy/NavSwap.git
    cd NavSwap
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

*   `src/app`: Application routes, layouts, and page entry points.
*   `src/components`: Reusable UI components, dashboard widgets, and layout sections.
*   `src/lib`: Data models, API simulation utilities, and constant definitions.
*   `src/hooks`: Custom React hooks for state management and logic reuse.

## Deployment

The application is configured for seamless deployment on Vercel.

1.  Push your changes to the `main` branch.
2.  Import the project in Vercel.
3.  The platform will automatically detect the Next.js configuration and deploy.

## License

This project is proprietary and confidential.
