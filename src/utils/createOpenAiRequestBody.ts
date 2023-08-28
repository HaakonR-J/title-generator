const createOpenAiRequestBody = (query: string, n = 1) => {
  const openAiRequestBody: OpenAiRequestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'assistant',
        content: query
      }
    ],
    temperature: 0.7,
    n: n
  };

  return openAiRequestBody;
};

export default createOpenAiRequestBody;