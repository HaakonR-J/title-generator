import axios, { AxiosPromise } from 'axios';
import config from '../config';
import createOpenAiRequestBody from '../utils/createOpenAiRequestBody';

const openAi = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${config.openAiApiKey}`,
    'OpenAI-Organization': config.openAiApiOrg
  }
});

const openAiService = {
  createTitle(query: string): AxiosPromise<GptApiResponse> {
    const queryWithQuestion = 'Opprett en forsidetittel for denne artikkelen: ' + query;

    return openAi.post('/chat/completions', createOpenAiRequestBody(queryWithQuestion, 2));
  },
  decreaseTitleLength(query: string): AxiosPromise<GptApiResponse> {
    const queryWithQuestion = 'Gjør denne forsidetittelen for en artikkel litt kortere: ' + query;

    return openAi.post('/chat/completions', createOpenAiRequestBody(queryWithQuestion, 1));
  },
  increaseTitleLength(query: string): AxiosPromise<GptApiResponse> {
    const queryWithQuestion = 'Gjør denne forsidetittelen for en artikkel litt lengre: ' + query;

    return openAi.post('/chat/completions', createOpenAiRequestBody(queryWithQuestion, 1));
  },
  createSeoTags(query: string): AxiosPromise<GptApiResponse> {
    const queryWithQuestion =
      'Opprett SEO-tagger for denne artikkelen. Separert med komma: ' + query;

    return openAi.post('/chat/completions', createOpenAiRequestBody(queryWithQuestion, 1));
  }
};

export default openAiService;
