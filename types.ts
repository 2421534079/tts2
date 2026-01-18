export interface ExtensionConfig {
  name: string;
  version: string;
  author: string;
  description: string;
  apiUrl: string;
  defaultSpeaker: string;
  defaultInstruction: string;
}

export type FileType = 'manifest' | 'index' | 'readme';

export interface GeneratedFile {
  name: string;
  content: string;
  language: string;
}