// AuraSpeed AI Assistant (MVP) - Split Containers with Splash Screen
// Author: Built for Skylord / AuraSpeed

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AuraSpeedAssistant() {
  // Hook declarations (always at top)
  const [showSplash, setShowSplash] = useState(true);

  const [scriptInput, setScriptInput] = useState("");
  const [scriptOutput, setScriptOutput] = useState("");
  const [scriptLoading, setScriptLoading] = useState(false);

  const [titleInput, setTitleInput] = useState("");
  const [titleOutput, setTitleOutput] = useState("");
  const [titleLoading, setTitleLoading] = useState(false);

  const [ideaInput, setIdeaInput] = useState("");
  const [ideaOutput, setIdeaOutput] = useState("");
  const [ideaLoading, setIdeaLoading] = useState(false);

  const [keywordInput, setKeywordInput] = useState("");
  const [keywordOutput, setKeywordOutput] = useState("");
  const [keywordLoading, setKeywordLoading] = useState(false);

  // Splash effect
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Generic generation handler
  const handleGenerate = async (type) => {
    let input, setLoading, setOutput;
    switch (type) {
      case "script":
        input = scriptInput; setLoading = setScriptLoading; setOutput = setScriptOutput; break;
      case "title":
        input = titleInput; setLoading = setTitleLoading; setOutput = setTitleOutput; break;
      case "idea":
        input = ideaInput; setLoading = setIdeaLoading; setOutput = setIdeaOutput; break;
      case "keyword":
        input = keywordInput; setLoading = setKeywordLoading; setOutput = setKeywordOutput; break;
      default:
        return;
    }
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, input }),
      });
      const data = await res.json();
      setOutput(data.result);
    } catch (err) {
      console.error(err);
      setOutput("Error: unable to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show splash screen first
  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        {/* Replace with your SVG or PNG logo path */}
        <img
          src="/aura-logo.svg"
          alt="AuraSpeed Logo"
          className="w-32 h-32 animate-pulse"
        />
      </div>
    );
  }

  // Main dashboard UI
  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        AuraSpeed AI Assistant
      </h1>

      {/* Grid of feature boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Script Generator Box */}
        <div className="bg-zinc-900 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">✍️ Script Generator</h2>
          <Textarea
            value={scriptInput}
            onChange={(e) => setScriptInput(e.target.value)}
            placeholder="Describe your video idea..."
            rows={3}
          />
          <Button
            onClick={() => handleGenerate("script")}
            disabled={scriptLoading || !scriptInput}
            className="mt-2 bg-red-600 hover:bg-red-700"
          >
            {scriptLoading ? "Writing..." : "Generate Script"}
          </Button>
          {scriptOutput && (
            <div className="mt-3 bg-zinc-800 p-3 rounded-lg whitespace-pre-wrap text-sm">
              {scriptOutput}
            </div>
          )}
        </div>

        {/* Title Assistant Box */}
        <div className="bg-zinc-900 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">🎯 Title Assistant</h2>
          <Textarea
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Enter video topic..."
            rows={2}
          />
          <Button
            onClick={() => handleGenerate("title")}
            disabled={titleLoading || !titleInput}
            className="mt-2 bg-red-600 hover:bg-red-700"
          >
            {titleLoading ? "Suggesting..." : "Suggest Titles"}
          </Button>
          {titleOutput && (
            <div className="mt-3 bg-zinc-800 p-3 rounded-lg text-sm">
              {titleOutput}
            </div>
          )}
        </div>

        {/* Idea Generator Box */}
        <div className="bg-zinc-900 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">💡 Idea Generator</h2>
          <Textarea
            value={ideaInput}
            onChange={(e) => setIdeaInput(e.target.value)}
            placeholder="What's your niche?"
            rows={2}
          />
          <Button
            onClick={() => handleGenerate("idea")}
            disabled={ideaLoading || !ideaInput}
            className="mt-2 bg-red-600 hover:bg-red-700"
          >
            {ideaLoading ? "Generating..." : "Get Ideas"}
          </Button>
          {ideaOutput && (
            <div className="mt-3 bg-zinc-800 p-3 rounded-lg text-sm">
              {ideaOutput}
            </div>
          )}
        </div>

        {/* Keyword Finder Box */}
        <div className="bg-zinc-900 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">🔍 Keyword Finder</h2>
          <Textarea
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="Enter a topic for keywords..."
            rows={2}
          />
          <Button
            onClick={() => handleGenerate("keyword")}
            disabled={keywordLoading || !keywordInput}
            className="mt-2 bg-red-600 hover:bg-red-700"
          >
            {keywordLoading ? "Researching..." : "Find Keywords"}
          </Button>
          {keywordOutput && (
            <div className="mt-3 bg-zinc-800 p-3 rounded-lg text-sm">
              {keywordOutput}
            </div>
          )}
        </div>

        {/* AI Assistant Chat Box */}
        <div className="bg-zinc-900 p-4 rounded-xl shadow-md col-span-1 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-2">🤖 AI Assistant</h2>
          <Textarea
            placeholder="Ask me anything..."
            rows={2}
            disabled
            className="opacity-50"
          />
          <p className="mt-2 text-gray-400 text-sm">
            (Coming soon: chat-style helper to guide your requests in real time.)
          </p>
        </div>
      </div>
    </div>
  );
}
