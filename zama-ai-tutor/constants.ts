import { LearningSection, CodeTheme, AIPersona } from './types';

export const THEMES: { id: CodeTheme; name: string }[] = [
  { id: 'atom-one-dark', name: 'Atom One Dark' },
  { id: 'dracula', name: 'Dracula' },
  { id: 'solarized-light', name: 'Solarized Light' },
  { id: 'monokai-sublime', name: 'Monokai Sublime' },
  { id: 'github-dark', name: 'GitHub Dark' },
];

export const PERSONAS: { id: AIPersona; name: string; description: string }[] = [
    { id: AIPersona.TUTOR, name: 'AI Tutor', description: 'A friendly, encouraging guide for structured learning.' },
    { id: AIPersona.CODE_WIZARD, name: 'Code Wizard', description: 'A technical expert for generating, debugging, and converting FHEVM code.' },
];

export const DEVELOPER_LEARNING_PATH: LearningSection[] = [
  {
    title: '1. FHEVM Foundations',
    topics: [
      { title: 'What is FHEVM?', prompt: "Explain what FHEVM is from a technical perspective. What problem does it solve for developers?" },
      { title: 'Key Concepts', prompt: "Describe the core concepts of FHEVM: encrypted data types (e.g., euint32), on-chain confidential computation, and the role of fhevmjs." },
      { title: 'Environment Setup', prompt: "Provide a step-by-step guide on how to set up a local development environment using the fhevm-hardhat-template." },
    ],
  },
  {
    title: '2. Your First dApp',
    topics: [
      { title: 'Writing the Contract', prompt: "Generate a simple 'Encrypted Counter' smart contract in Solidity using FHEVM. Explain how to use `euint32` and basic FHEVM operations." },
      { title: 'Client-Side Interaction', prompt: "Show me the JavaScript code using ethers.js and fhevmjs to interact with the 'Encrypted Counter' contract. Cover key generation, encryption, and decryption." },
      { title: 'Testing Contracts', prompt: "Explain how to write a Hardhat test for the 'Encrypted Counter' contract, including how to handle encrypted values in tests." },
    ],
  },
    {
    title: '3. Advanced Concepts',
    topics: [
      { title: 'Viewing Encrypted State', prompt: "Explain the purpose and usage of `FHE.reencrypt` with a code example. How does it allow users to view their private data?" },
      { title: 'Conditional Logic', prompt: "How do you perform conditional logic with encrypted values? Explain `FHE.cmux` (conditional multiplexer) with a practical example, like in a voting contract." },
      { title: 'Gas Optimization', prompt: "Discuss gas considerations when working with FHEVM. What are some best practices for writing gas-efficient confidential smart contracts?" },
    ],
  },
];

export const NON_TECHNICAL_LEARNING_PATH: LearningSection[] = [
    {
    title: '1. The Big Picture',
    topics: [
      { title: 'What is FHE?', prompt: "Explain Fully Homomorphic Encryption (FHE) in simple terms using an analogy, like a locked box you can work with." },
      { title: 'Why Privacy Matters', prompt: "Why is privacy important on the blockchain? What are the risks of public blockchains like Ethereum?" },
      { title: 'Introducing Zama', prompt: "What is Zama, and what is its mission? How does it plan to solve the privacy problem in blockchain and AI?" },
    ],
  },
  {
    title: '2. How FHEVM Works',
    topics: [
      { title: 'Confidential Smart Contracts', prompt: "What is a confidential smart contract? Use the example of a secret ballot or a private auction to explain the concept." },
      { title: 'The User Experience', prompt: "Walk me through how a user interacts with an FHEVM dApp. Explain the roles of their browser, their keys, and the blockchain in a simple, step-by-step way. Use the Data Flow visual." },
      { title: 'Real-World Use Cases', prompt: "What are some exciting, real-world applications that are possible with FHEVM? Give examples in gaming, DeFi, and identity management." },
    ],
  },
    {
    title: '3. The Zama Ecosystem',
    topics: [
      { title: 'FHE in AI', prompt: "Beyond blockchain, how is Zama using FHE to create private AI applications? Explain the concept of Concrete ML." },
      { title: 'Community & Bounties', prompt: "How can someone who is not a developer get involved in the Zama community? Talk about the bounty program and community forums." },
      { title: 'The Future of FHE', prompt: "What is the long-term vision for Zama and FHE technology? What new possibilities might be unlocked in the future?" },
    ],
  },
];