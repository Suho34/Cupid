# 💘 Cupid - AI Date Planner

> **Stop arguing. Start dating.**
> Let AI plan 3 perfect date options. You vote. They vote. It's a match.

![Cupid App Preview](/cupid-preview.png)

## Overview

**Cupid** is an intelligent date planning application designed to resolve the "Where should we go?" dilemma. Built with a premium, romantic aesthetic, it uses AI to generate tailored date ideas based on your location, budget, and vibe.

## ✨ Features

-   **AI-Powered Suggestions**: tailored date itineraries generated in seconds.
-   **Collaborative Voting**: Share a link with your partner. You both vote on your favorites.
-   **Smart Matching**: The app reveals the "Winning Date" only when you both agree.
-   **Premium UI**: Glassmorphism, smooth animations (`framer-motion`), and a "Romantic Modern" theme.

## 🛠️ Tech Stack

-   **Framework**: Next.js 16 (App Router)
-   **Styling**: Tailwind CSS v4 + Oklch Colors
-   **Animations**: Framer Motion
-   **Database**: MongoDB (Mongoose)
-   **AI**: Google Generative AI (Gemini)

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/cupid-app.git
    cd cupid-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file and add your MongoDB URI and Gemini API Key:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🎨 Design System

The app uses a custom "Cupid" theme defined in `globals.css`:
-   **Fonts**: `Outfit` (Sans) & `Calistoga` (Display)
-   **Primary Color**: Vibrant Pink/Red (`oklch(0.55 0.22 340)`)
-   **Background**: Custom Mesh Gradient

---
Built with ❤️ by Suho34
