export enum Role {
  USER = 'user',
  MODEL = 'model',
}

export enum UserRole {
  DEVELOPER = 'developer',
  NON_TECHNICAL = 'non-technical',
}

export enum AIPersona {
    TUTOR = 'tutor',
    CODE_WIZARD = 'code-wizard',
}

export type CodeTheme = 'atom-one-dark' | 'dracula' | 'solarized-light' | 'monokai-sublime' | 'github-dark';

export interface Message {
  role: Role;
  content: string;
}

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export interface LearningTopic {
  title: string;
  prompt: string;
}

export interface LearningSection {
  title: string;
  topics: LearningTopic[];
}