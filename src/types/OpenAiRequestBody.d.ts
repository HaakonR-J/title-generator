type OpenAiRequestBody = {
  model: 'gpt-3.5-turbo';
  messages: {
    role: string;
    content: string;
  }[];
  temperature: number;
  n: number;
};
