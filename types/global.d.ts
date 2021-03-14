// Declarations for global interfaces & types
interface CustomError extends Error {
  code?: number;
  additionalInfo?: unknown;
}

interface Kakao {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Channel: {
    chat: ({ channelPublicId: string }) => void;
  };
}

interface Window {
  Kakao: Kakao;
}

declare module 'shaka-player/dist/shaka-player.ui';
