type Config = {
  openAiApiKey: string;
  openAiApiOrg: string;
};

const config: Config = {
  openAiApiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
  openAiApiOrg: process.env.REACT_APP_ORGANIZATION_ID || ''
};

export default config;
