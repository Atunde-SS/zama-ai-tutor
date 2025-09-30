# Zama AI Tutor

Welcome to the Zama AI Tutor! This is an interactive, AI-powered guide designed to help both developers and non-technical users learn about the Zama protocol, Fully Homomorphic Encryption (FHE), and the FHEVM.

This application provides a structured, hands-on learning path, allowing you to explore everything from the fundamental concepts of FHE to building and deploying your first confidential dApp.

## Features

*   **Personalized Learning Paths:** Choose between a developer or non-technical track for a curated learning experience tailored to your background.
*   **Interactive AI Tutor:** Ask any question about FHE, FHEVM, Concrete ML, or the Zama ecosystem and get clear, expert answers.
*   **Code Wizard Persona:** Switch to a specialized AI mode focused on generating, debugging, and explaining FHEVM smart contracts in Solidity.
*   **Interactive Deployment Guide:** A step-by-step, in-app walkthrough to deploy your very first confidential smart contract.
*   **FHE Key Management:** Generate and view a mock FHEVM key pair directly in the browser to understand the user-side components.
*   **Customizable UI:** Choose your favorite syntax highlighting theme for code blocks.
*   **Easy Setup:** No complex backend needed. Run the entire application locally in your browser with just your own Gemini API key.

## How to Use

Follow these instructions to get the Zama AI Tutor running on your local machine.

### Prerequisites

*   A modern web browser (Chrome, Firefox, Safari, Edge).
*   [Git](https://git-scm.com/) installed on your machine.
*   A code editor like [Visual Studio Code](https://code.visualstudio.com/).
*   The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code is recommended for the easiest setup.

### Step 1: Get Your Google Gemini API Key

This application uses the Google Gemini API to power its AI features. You will need your own free API key to use it.

1.  Visit the **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2.  Click **"Get API key"** and sign in with your Google account.
3.  Click **"Create API key in new project"**.
4.  Copy your generated API key. Keep it safe and private.

### Step 2: Clone the Repository

Open your terminal or command prompt and run the following command to clone the project to your computer:

```bash
git clone <repository_url>
cd zama-ai-tutor
```
*(Note: Replace `<repository_url>` with the actual URL of the repository)*

### Step 3: Run the Application

This project is a pure frontend application and can be run with any simple local web server. The easiest way is using the **Live Server** extension in VS Code.

1.  Open the cloned `zama-ai-tutor` folder in VS Code.
2.  Right-click on the `index.html` file in the file explorer.
3.  Select **"Open with Live Server"**.
4.  A new browser tab will open with the application running.

### Step 4: Enter Your API Key

On the first launch, the application will prompt you to enter the Gemini API key you obtained in Step 1.

1.  Paste your key into the input field.
2.  Click "Save Key".

The key will be stored securely in your browser's local storage, so you won't need to enter it again on the same device and browser. You are now ready to start learning!

## Deploy to Vercel

You can easily deploy your own version of the Zama AI Tutor to Vercel.

1.  Fork this repository to your own GitHub account.
2.  Go to [Vercel](https://vercel.com/new) and sign up with your GitHub account.
3.  Click **"Add New... > Project"**.
4.  Import the forked repository from your GitHub.
5.  Vercel will automatically detect the project type. You don't need to configure anything.
6.  Click **"Deploy"**.

Once deployed, you can access your personal AI tutor from anywhere and share the link with others. The app will ask for a Gemini API key on the first visit, just like it does locally.

## Technology Stack

*   **Frontend:** React, TypeScript
*   **Styling:** Tailwind CSS
*   **AI:** Google Gemini API (`@google/genai`)
*   **Code Highlighting:** highlight.js
