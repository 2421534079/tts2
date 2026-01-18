import React from 'react';
import { ExtensionConfig } from '../types';
import { Settings, User, Globe, Mic, MessageSquare } from 'lucide-react';

interface ConfigFormProps {
  config: ExtensionConfig;
  onChange: (key: keyof ExtensionConfig, value: string) => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ config, onChange }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Settings className="w-5 h-5 text-primary-500" />
        配置 (Configuration)
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Extension Name (插件名称)</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            <input
              type="text"
              value={config.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder="CosyVoice TTS"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Author (作者/GitHub用户名)</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            <input
              type="text"
              value={config.author}
              onChange={(e) => onChange('author', e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
              placeholder="YourName"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Version (版本)</label>
          <input
            type="text"
            value={config.version}
            onChange={(e) => onChange('version', e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            placeholder="1.0.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Description (描述)</label>
          <textarea
            value={config.description}
            onChange={(e) => onChange('description', e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none h-20"
            placeholder="Integrates CosyVoice TTS into SillyTavern..."
          />
        </div>

        <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-primary-500 mb-4">TTS Defaults</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">Default API URL (API地址)</label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={config.apiUrl}
                  onChange={(e) => onChange('apiUrl', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="http://127.0.0.1:9880"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                CosyVoice API 地址 (Python 脚本默认端口 9880)
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">Default Speaker Name (默认发音人)</label>
              <div className="relative">
                <Mic className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={config.defaultSpeaker}
                  onChange={(e) => onChange('defaultSpeaker', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="default"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Default Instruction (默认情感指令)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={config.defaultInstruction}
                  onChange={(e) => onChange('defaultInstruction', e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded pl-10 pr-3 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  placeholder="用开心的语气"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                对应 API 的 <code>instruct_text</code> 参数
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};