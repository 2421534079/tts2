import React, { useState, useMemo } from 'react';
import { ExtensionConfig, GeneratedFile } from './types';
import { generateManifest, generateIndexJs, generateReadme, generateStyleCss } from './services/templates';
import { ConfigForm } from './components/ConfigForm';
import { CodePreview } from './components/CodePreview';
import { Instructions } from './components/Instructions';
import { Code2, Github, LayoutTemplate } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<ExtensionConfig>({
    name: 'CosyVoice Adapter',
    version: '1.0.0',
    author: 'MyUser',
    description: 'Connects SillyTavern to a local CosyVoice API.',
    apiUrl: 'http://127.0.0.1:9880',
    defaultSpeaker: 'default',
    defaultInstruction: ''
  });

  const [activeTab, setActiveTab] = useState<'preview' | 'instructions'>('preview');

  const handleConfigChange = (key: keyof ExtensionConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const files: GeneratedFile[] = useMemo(() => [
    {
      name: 'manifest.json',
      content: generateManifest(config),
      language: 'json'
    },
    {
      name: 'index.js',
      content: generateIndexJs(config),
      language: 'javascript'
    },
    {
      name: 'style.css',
      content: generateStyleCss(config),
      language: 'css'
    },
    {
      name: 'README.md',
      content: generateReadme(config),
      language: 'markdown'
    }
  ], [config]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Code2 className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-tight">ST Extension Gen</h1>
              <p className="text-xs text-gray-400">for CosyVoice TTS</p>
            </div>
          </div>
          <div className="flex gap-4">
             <a href="https://docs.sillytavern.app/extensions/create/" target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                <LayoutTemplate className="w-4 h-4" /> ST Docs
             </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-80px)]">
        
        {/* Left Col: Config */}
        <div className="lg:col-span-4 h-full flex flex-col min-h-0">
          <ConfigForm config={config} onChange={handleConfigChange} />
        </div>

        {/* Right Col: Preview & Guide */}
        <div className="lg:col-span-8 h-full flex flex-col min-h-0">
            {/* Tabs */}
            <div className="flex gap-4 mb-4 border-b border-gray-800 pb-1">
                <button 
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${activeTab === 'preview' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-400 hover:text-white'}`}
                >
                    <Code2 className="w-4 h-4" /> Code Preview
                </button>
                <button 
                    onClick={() => setActiveTab('instructions')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${activeTab === 'instructions' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-400 hover:text-white'}`}
                >
                    <Github className="w-4 h-4" /> GitHub Guide
                </button>
            </div>

            <div className="flex-1 min-h-0">
                {activeTab === 'preview' ? (
                    <CodePreview files={files} />
                ) : (
                    <Instructions />
                )}
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;