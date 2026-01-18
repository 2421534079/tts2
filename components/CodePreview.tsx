import React, { useState } from 'react';
import { GeneratedFile } from '../types';
import { Copy, Check } from 'lucide-react';

interface CodePreviewProps {
  files: GeneratedFile[];
}

export const CodePreview: React.FC<CodePreviewProps> = ({ files }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(files[activeTab].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex gap-2">
          {files.map((file, index) => (
            <button
              key={file.name}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-1.5 text-sm rounded-t-md transition-colors ${
                activeTab === index
                  ? 'bg-gray-800 text-primary-500 border-t border-l border-r border-gray-700 font-medium'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="relative flex-1 bg-[#1e1e1e] overflow-auto">
        <pre className="p-4 text-sm font-mono text-gray-300">
          <code>{files[activeTab].content}</code>
        </pre>
      </div>
    </div>
  );
};