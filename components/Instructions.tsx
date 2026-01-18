import React from 'react';
import { FolderGit2, UploadCloud, Terminal } from 'lucide-react';

export const Instructions: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-xl text-gray-300 overflow-y-auto h-full">
      <h2 className="text-xl font-bold text-white mb-6">发布指南 (Usage Instructions)</h2>
      
      <div className="space-y-6">
        <div className="border-l-4 border-primary-500 pl-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5" /> 1. 准备文件 (Files)
          </h3>
          <p className="mt-2 text-sm">
            你需要三个主要文件在你的文件夹中:
          </p>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-400 space-y-1">
            <li><code className="bg-gray-900 px-1 rounded text-primary-400">manifest.json</code>: 告诉 SillyTavern 插件的信息。</li>
            <li><code className="bg-gray-900 px-1 rounded text-primary-400">index.js</code>: 包含调用 CosyVoice 的代码逻辑 (已适配你的 Python API)。</li>
            <li><code className="bg-gray-900 px-1 rounded text-primary-400">README.md</code>: GitHub 项目说明文件。</li>
          </ul>
        </div>

        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <UploadCloud className="w-5 h-5" /> 2. 发布到 GitHub
          </h3>
          <p className="mt-2 text-sm">SillyTavern 需要一个 Git 仓库 URL 来安装插件。</p>
          <ol className="list-decimal ml-5 mt-2 text-sm text-gray-400 space-y-2">
            <li>登录 GitHub 并创建一个新仓库 (Create New Repository).</li>
            <li>将生成的三个文件上传到该仓库的根目录。</li>
            <li>确保仓库是 <strong>Public</strong> (公开) 的。</li>
            <li>复制仓库的 HTTPS 链接 (例如: <code>https://github.com/user/repo</code>)。</li>
          </ol>
        </div>

        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5" /> 3. 在 SillyTavern 中安装
          </h3>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-400 space-y-2">
            <li>启动 SillyTavern。</li>
            <li>点击顶部的 <span className="text-white">Extensions (积木图标)</span>。</li>
            <li>点击 <span className="text-white">Install Extension</span>。</li>
            <li>在 URL 框中粘贴你的 GitHub 仓库链接。</li>
            <li>点击 Install 并刷新页面。</li>
          </ul>
        </div>

        <div className="bg-gray-900 p-4 rounded text-xs text-gray-400">
            <strong>API 兼容性:</strong> 生成的 index.js 代码已经针对你提供的 Python API 文件进行了适配。它默认使用 <code>POST /</code> 接口，并支持从 <code>GET /speakers</code> 获取角色列表。请确保 Python 服务运行在 9880 端口（或在插件设置中修改）。
        </div>
      </div>
    </div>
  );
};