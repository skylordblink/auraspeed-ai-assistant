// File: pages/index.js
// Entry point for AuraSpeed AI Assistant dashboard
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AuraSpeedAssistant() {
  const [showSplash, setShowSplash] = useState(true);

  // Inputs & outputs for each module
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

  // Splash screen effect
  useEffect(() => {
    const id = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(id);
  }, []);

  // Handler to call API
  const handleGenerate = async (type) => {
    const map = {
      script: [scriptInput, setScriptLoading, setScriptOutput],
      title: [titleInput, setTitleLoading, setTitleOutput],
      idea: [ideaInput, setIdeaLoading, setIdeaOutput],
      keyword: [keywordInput, setKeywordLoading, setKeywordOutput],
    };
    const [input, setLoading, setOutput] = map[type] || [];
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, input }),
      });
      const json = await res.json();
      setOutput(json.result);
    } catch (e) {
      setOutput('Error generating content');
    } finally {
      setLoading(false);
    }
  };

  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <img src="/aura-logo.svg" alt="AuraSpeed Logo" className="w-32 h-32 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <h1 className="text-3xl font-bold text-red-500 mb-6">AuraSpeed AI Assistant</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Script Generator */}
        <Module
          title="✍️ Script Generator"
          input={scriptInput}
          onInputChange={setScriptInput}
          loading={scriptLoading}
          output={scriptOutput}
          buttonText="Generate Script"
          onGenerate={() => handleGenerate('script')}
          placeholder="Describe your video idea..."
        />
        {/* Title Assistant */}
        <Module
          title="🎯 Title Assistant"
          input={titleInput}
          onInputChange={setTitleInput}
          loading={titleLoading}
          output={titleOutput}
          buttonText="Suggest Titles"
          onGenerate={() => handleGenerate('title')}
          placeholder="Enter video topic..."
        />
        {/* Idea Generator */}
        <Module
          title="💡 Idea Generator"
          input={ideaInput}
          onInputChange={setIdeaInput}
          loading={ideaLoading}
          output={ideaOutput}
          buttonText="Get Ideas"
          onGenerate={() => handleGenerate('idea')}
          placeholder="What's your niche?"
        />
        {/* Keyword Finder */}
        <Module
          title="🔍 Keyword Finder"
          input={keywordInput}
          onInputChange={setKeywordInput}
          loading={keywordLoading}
          output={keywordOutput}
          buttonText="Find Keywords"
          onGenerate={() => handleGenerate('keyword')}
          placeholder="Enter a topic for keywords..."
        />
        {/* AI Chat Placeholder */}
        <div className="bg-zinc-900 p-4 rounded-xl shadow-md col-span-1 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-2">🤖 AI Assistant</h2>
          <Textarea placeholder="Coming soon: chat helper" rows={2} disabled />
        </div>
      </div>
    </div>
  );
}

function Module({ title, input, onInputChange, loading, output, buttonText, onGenerate, placeholder }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <Textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="mb-2"
      />
      <Button onClick={onGenerate} disabled={loading || !input} className="bg-red-600 hover:bg-red-700 mb-2">
        {loading ? 'Running...' : buttonText}
      </Button>
      {output && <div className="bg-zinc-800 p-3 rounded-lg text-sm whitespace-pre-wrap">{output}</div>}
    </div>
  );
}
