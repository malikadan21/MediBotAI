'use client'; // Ensure this file is treated as a Client Component

import { useState, useEffect, useMemo, useRef } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import Link from 'next/link';
import FloatingActionButton from '../components/floatingbutton'; // Adjust path as needed

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState(null);

  const chatContainerRef = useRef(null);

  const API_KEY = "AIzaSyBtNloQw2FxhRtfL_0SZz2MI9GGjE5kh-4";
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" })
          .startChat({
            generationConfig,
            safetySettings,
            history: [
              {
                role: "user",
                parts: [
                  { text: "You are an AI-powered healthcare assistant for MediBot-AI, a platform that provides support to patients and healthcare providers.\n\n1. MediBot-AI assists with scheduling appointments, answering health-related questions, and providing basic medical advice.\n2. Our platform integrates with healthcare provider systems to facilitate seamless interactions and efficient support.\n3. We cover a range of topics including symptoms, treatments, medications, and insurance inquiries.\n4. Users can access our services through the web, mobile app, or messaging platforms.\n5. If asked about medical emergencies, instruct users to contact emergency services immediately.\n6. Always maintain patient confidentiality and adhere to healthcare data privacy regulations (e.g., HIPAA).\n 8. If user asks you the number of doctor saad, then give it +92 123456789\n7. If you're unsure about any information, it's okay to say you don't know and offer to connect the user with a healthcare provider.\n\nYour goal is to provide accurate information, assist with common healthcare inquiries, and ensure a secure and positive experience for all MediBot-AI users." },
                ],
              },
              {
                role: "model",
                parts: [
                  { text: "Understood! I'm ready to assist you as a MediBot-AI healthcare assistant.\n\n**Please tell me how I can help you today. I can help you with:**\n\n* **Scheduling appointments:** Let me know what type of appointment you need, your preferred date and time, and your location.\n* **Answering health-related questions:** I can provide information about various health topics, including symptoms, treatments, medications, and insurance inquiries.\n* **Providing basic medical advice:** I can offer general health tips and guidance. However, remember, I cannot diagnose or treat medical conditions.\n* **Connecting you with a healthcare provider:** If you have a specific medical concern or need professional advice, I can connect you with a qualified healthcare provider.\n\n**Important Notes:**\n\n* **Medical emergencies:** If you are experiencing a medical emergency, please call 911 or your local emergency number immediately.\n* **Confidentiality:** Your privacy is my top priority. I will never share your personal information with anyone.\n* **Limitations:** I am an AI assistant and cannot provide medical diagnoses or treatment recommendations. If you have specific health concerns, please consult a healthcare professional.\n\n**I'm here to help! Just ask, and I'll do my best to assist you.**" },
                ],
              },
            ],
          });
        setChat(newChat);

        setMessages([
          {
            text: "Hi! I'm MediBot-AI, your AI healthcare assistant. I can help with scheduling, health questions, and basic advice. Your privacy is my priority. How can I assist you today?",
            role: "bot",
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Error initializing chat:", error);
        setError("Failed to initialize chat.");
      }
    };

    initChat();
  }, []); 
  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
  
    try {
      const userMessage = {
        text: userInput.trim(),
        role: "user",
        timestamp: new Date(),
      };
  
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setUserInput("");
  
      if (chat) {
        const result = await chat.sendMessage(userInput);
        const botMessage = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
    }
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const themeColors = useMemo(() => {
    switch (theme) {
      case "light":
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
          fab: "bg-blue-500 text-white", // color for FAB in light theme
        };
      case "dark":
        return {
          primary: "bg-gray-900",
          secondary: "bg-gray-800",
          accent: "bg-yellow-500",
          text: "text-gray-100",
          fab: "bg-yellow-500 text-gray-900", // color for FAB in dark theme
        };
      default:
        return {
          primary: "bg-white",
          secondary: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
          fab: "bg-blue-500 text-white", // color for FAB in default theme
        };
    }
  }, [theme]);

  const { primary, secondary, accent, text, fab } = themeColors;

  return (
    <div className={`flex flex-col h-screen p-4 ${primary}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-bold ${text}`}>MediBot-AI</h1>
        <div className="flex space-x-2">
          <label htmlFor="theme" className={`text-sm ${text}`}>
            Theme:
          </label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className={`flex-1 overflow-y-auto ${secondary} rounded-md p-2`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div
        ref={chatContainerRef}
        className={`flex-1 overflow-y-auto ${secondary} rounded-md p-2`}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block px-4 py-2 rounded-md ${msg.role === "user" ? accent : primary
                } ${text}`}
            >
              {msg.text}
            </div>
            <div className={`text-xs ${text}`}>
              <span>{msg.role === "user" ? "You" : "MediBot"}</span>
              <span> - </span>
              <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4 justify-end">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className={`rounded-l-md p-2 ${secondary} mr-2`}
          style={{ width: "90%" }}
        />
        <button
          onClick={handleSendMessage}
          className={`rounded-r-md px-4 py-2 ${accent} text-white`}
        >
          Send
        </button>
        <FloatingActionButton color={fab} />
      </div>
    </div>
  );
}
