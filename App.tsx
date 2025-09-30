
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Message, Role, UserRole, KeyPair, LearningSection, CodeTheme, AIPersona } from './types';
import { DEVELOPER_LEARNING_PATH, NON_TECHNICAL_LEARNING_PATH } from './constants';
import { createFhevmInstance } from './services/fhevmjs-mock';
import { getSystemInstruction } from './services/geminiService';
import Header from './components/Header';
import ChatInterface from './ChatInterface';
import LearningPath from './components/LearningPath';
import Modal from './components/Modal';
import KeyManager from './components/KeyManager';
import RoleSelectionModal from './components/RoleSelectionModal';
import DeploymentGuideWelcome from './components/DeploymentGuideWelcome';
import DeploymentGuide from './components/DeploymentGuide';
import ApiKeyModal from './components/ApiKeyModal';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
  const [isKeyManagerOpen, setIsKeyManagerOpen] = useState(false);
  const [isGeneratingKeys, setIsGeneratingKeys] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<CodeTheme>('atom-one-dark');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [aiPersona, setAiPersona] = useState<AIPersona>(AIPersona.TUTOR);
  const [isDeploymentGuideActive, setIsDeploymentGuideActive] = useState(false);
  
  const [aiClient, setAiClient] = useState<GoogleGenAI | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isSavingApiKey, setIsSavingApiKey] = useState(false);

  const learningPath: LearningSection[] = userRole === UserRole.DEVELOPER
    ? DEVELOPER_LEARNING_PATH
    : NON_TECHNICAL_LEARNING_PATH;

  const handleSetTheme = useCallback((theme: CodeTheme) => {
    document.querySelectorAll<HTMLLinkElement>('link[data-theme-link]').forEach(link => {
        link.disabled = true;
    });
    const selectedLink = document.querySelector<HTMLLinkElement>(`link[title="${theme}"]`);
    if (selectedLink) {
        selectedLink.disabled = false;
        setCurrentTheme(theme);
        localStorage.setItem('codeTheme', theme);
    }
  }, []);

  const initializeApp = useCallback(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole as UserRole);
      const welcomeMessage = {
        role: Role.MODEL,
        content: storedRole === UserRole.DEVELOPER
          ? "Welcome back, Developer! Your learning path is set. Select a topic to begin, or ask me anything about FHEVM."
          : "Welcome back! Your learning path is set. Let's explore the world of FHE together. Choose a topic to start!",
      };
      setMessages([welcomeMessage]);
    }

    const storedKeys = localStorage.getItem('fhevmKeyPair');
    if (storedKeys) {
      setKeyPair(JSON.parse(storedKeys));
    }

    const storedTheme = localStorage.getItem('codeTheme');
    if (storedTheme) {
      handleSetTheme(storedTheme as CodeTheme);
    }
    
    const storedPersona = localStorage.getItem('aiPersona');
    if (storedPersona) {
        setAiPersona(storedPersona as AIPersona);
    }
  }, [handleSetTheme]);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('geminiApiKey');
    if (storedApiKey) {
        try {
            setAiClient(new GoogleGenAI({ apiKey: storedApiKey }));
        } catch (e) {
            console.error("Failed to initialize AI Client with stored key:", e);
            localStorage.removeItem('geminiApiKey');
            setIsApiKeyModalOpen(true);
        }
    } else {
        setIsApiKeyModalOpen(true);
    }
    initializeApp();
  }, [initializeApp]);

  const handleSaveApiKey = async (apiKey: string) => {
    setIsSavingApiKey(true);
    try {
        const client = new GoogleGenAI({ apiKey });
        localStorage.setItem('geminiApiKey', apiKey);
        setAiClient(client);
        setIsApiKeyModalOpen(false);
    } catch (error) {
        console.error("Error setting API key:", error);
    } finally {
        setIsSavingApiKey(false);
    }
  };

  const handleSelectRole = (role: UserRole) => {
    localStorage.setItem('userRole', role);
    setUserRole(role);
    const welcomeMessage = {
      role: Role.MODEL,
      content: role === UserRole.DEVELOPER
        ? "Welcome, Developer! I've set up a technical learning path for you. To get started, you can select a topic from the sidebar, or just ask me a question."
        : "Welcome! I've prepared a learning path to guide you through the exciting concepts of FHE and Zama. To begin, select a topic from the sidebar, or ask me anything.",
    };
    setMessages([welcomeMessage]);
  };

  const sendMessageToTutor = async (
    message: string,
    history: Message[],
    role: UserRole,
    persona: AIPersona,
  ) => {
    if (!aiClient) {
        throw new Error("AI client is not initialized.");
    }

    const modelInstruction = getSystemInstruction(persona);
    const fullHistory = [
        { role: 'user', parts: [{ text: `My role is: ${role}` }] },
        { role: 'model', parts: [{ text: "Understood. I will tailor my responses to your role." }] },
        ...history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }],
        })),
    ];
    
    const chat = aiClient.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction: modelInstruction },
        history: fullHistory,
    });
    
    const result = await chat.sendMessageStream({ message });
    return result;
  };
  
  const handleSendMessage = async (text: string, isSystemTrigger = false) => {
    if (!userRole) return;

    const newUserMessage: Message = { role: Role.USER, content: text };
    const messagesForHistory = isSystemTrigger ? messages : [...messages, newUserMessage];

    setIsLoading(true);
    if (isSystemTrigger) {
      setMessages(prev => [...prev, { role: Role.MODEL, content: '' }]);
    } else {
      setMessages(prev => [...prev, newUserMessage, { role: Role.MODEL, content: '' }]);
    }

    try {
      const history = messagesForHistory.slice(-10);
      const stream = await sendMessageToTutor(text, history, userRole, aiPersona);

      let fullResponse = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = fullResponse;
          return newMessages;
        });
      }

      if (fullResponse.includes('[DEPLOYMENT_GUIDE_UI]')) {
        setIsDeploymentGuideActive(true);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: Role.MODEL,
        content: "Sorry, I encountered an error. Please check your API key and try again.",
      };
      setMessages(prev => [...prev.slice(0,-1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDeploymentGuide = async () => {
    setMessages([]);
    await handleSendMessage('[START_DEPLOYMENT_GUIDE]', true);
  };

  const handleSelectTopic = (prompt: string) => {
    handleSendMessage(`*${prompt}*`);
  };

  const handleGenerateKeys = async () => {
    setIsGeneratingKeys(true);
    try {
      const instance = await createFhevmInstance();
      const newKeyPair = instance.generateKeypair();
      setKeyPair(newKeyPair);
      localStorage.setItem('fhevmKeyPair', JSON.stringify(newKeyPair));
    } catch (error) {
      console.error("Failed to generate keys:", error);
    } finally {
      setIsGeneratingKeys(false);
    }
  };
  
  const handleSetPersona = (persona: AIPersona) => {
      setAiPersona(persona);
      localStorage.setItem('aiPersona', persona);
  }

  const filteredPath = learningPath.map(section => ({
    ...section,
    topics: section.topics.filter(topic => 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      topic.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(section => section.topics.length > 0);

  if (!aiClient) {
    return <ApiKeyModal isOpen={isApiKeyModalOpen} isSaving={isSavingApiKey} onSave={handleSaveApiKey} />;
  }

  if (!userRole) {
    return <RoleSelectionModal onSelectRole={handleSelectRole} />;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-200 font-sans">
      <Header 
        onOpenKeyManager={() => setIsKeyManagerOpen(true)} 
        currentTheme={currentTheme}
        onSetTheme={handleSetTheme}
        currentPersona={aiPersona}
        onSetPersona={handleSetPersona}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onStartContractWizard={() => handleSendMessage("[START_CONTRACT_WIZARD]", true)}
      />
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && <LearningPath path={filteredPath} onSelectTopic={handleSelectTopic} />}
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-800/50" style={{ backgroundImage: "radial-gradient(circle at top right, rgba(49, 46, 129, 0.1), transparent 50%)"}}>
            {isDeploymentGuideActive ? (
                <DeploymentGuide 
                    messages={messages} 
                    isLoading={isLoading} 
                    onSendMessage={handleSendMessage}
                />
            ) : messages.length === 0 && !isLoading ? (
                <DeploymentGuideWelcome onStartGuide={handleStartDeploymentGuide} />
            ) : (
                <ChatInterface
                    messages={messages}
                    isLoading={isLoading}
                    onSendMessage={handleSendMessage}
                />
            )}
        </main>
      </div>

      <Modal isOpen={isKeyManagerOpen} onClose={() => setIsKeyManagerOpen(false)} title="FHE Key Manager">
        <KeyManager 
          keyPair={keyPair} 
          isLoading={isGeneratingKeys}
          onGenerateKeys={handleGenerateKeys} 
        />
      </Modal>
    </div>
  );
};

export default App;
