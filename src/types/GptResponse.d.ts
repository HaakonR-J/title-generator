type GptResult = {
  responses: GptResponse[];
  id: string;
};

type GptResponse = {
  role: string;
  text: string;
};
