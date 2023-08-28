import { FC, ReactNode, createContext, useContext, useState } from 'react';

type GptResultsContextType = {
  gptResults: GptResult[];
  addGptResult: (gptResponse: GptResult) => void;
};

const GptResultsContext = createContext<GptResultsContextType | undefined>(undefined);

export const useGptResults = () => {
  const context = useContext(GptResultsContext);
  if (!context) {
    throw new Error('useGptResults must be used within a GptResultsProvider');
  }
  return context;
};

export const GptResultsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [gptResults, setGptResults] = useState<GptResult[]>([]);

  const addGptResult = (gptResponse: GptResult) => {
    setGptResults([...gptResults, gptResponse]);
  };

  return (
    <GptResultsContext.Provider value={{ gptResults, addGptResult }}>
      {children}
    </GptResultsContext.Provider>
  );
};
