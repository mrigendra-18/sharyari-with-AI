## Shayari Generator using Gemini AI

A **Shayari Generator** web application that leverages Google Gemini AI to create beautiful and personalized Shayari (poetry) in Hindi based on keywords provided by the user. The app features an interactive user interface built with React and Chakra UI, as well as features like a dark/light mode toggle and animated feedback.



## Deployed Link
**[Shayari Generator using Gemini AI - Live Demo](https://ai-shayari.netlify.app/)**

---

## Table of Contents

- [Deployed Link](#deployed-link)
- [Screenshots](#screenshots)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

---

## Features

- **Generate Shayari**: Enter a keyword, and the AI will create a Shayari based on the provided input.
- **Translation**: The Shayari is generated in Hindi with an option to view its English translation.
- **Dark/Light Mode**: Toggle between dark and light mode using Chakra UI’s color mode feature.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Interactive Feedback**: Sparkling animation when generating Shayari to enhance user experience.
- **Error Handling**: Displays an appropriate message if the AI request fails, using custom icons and alerts.

---

## Technologies Used

- **Frontend**: 
  - React.js
  - Chakra UI for UI components and theming
  - Framer Motion for animations
  - Google Generative AI (Gemini) for Shayari generation
  - Vite as a build tool

- **Icons & Animations**:
  - react-icons (FaSun, FaMoon for toggle, BiErrorCircle for error display)
  - Framer Motion (for sparkling animation on button click)

---

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/shayari-generator.git
    cd shayari-generator
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the Google Generative AI API**:
    - Create a `.env` file at the root of your project.
    - Add your Google Generative AI API key:
      ```
      VITE_API_KEY=your-google-api-key
      ```

4. **Run the development server**:
    ```bash
    npm run dev
    ```

---

## Usage

1. **Navigate to the Home Page**: The Navbar will display the title "Shayari Generator using Gemini AI".
2. **Enter a Keyword**: Use the input field to enter a keyword for Shayari.
3. **Generate Shayari**: Click the "Generate" button. You will see a spinning loader while the Shayari is being generated.
4. **View Shayari**: Once generated, the Shayari will appear, along with its translation if enabled.
5. **Toggle Theme**: Use the moon/sun icon in the Navbar to switch between dark and light mode.

---



