import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Stack,
  Typography
} from '@mui/material';
import openAiService from './services/openAi.service';
import GptResults from './components/GptResults';
import ChatBox from './components/ChatBox';
import { useGptResults } from './context/GptResultContext';
import { useState } from 'react';
import GptResult from './components/GptResult';
import GptSeoResults from './components/GptSeoResults';

function App() {
  const { addGptResult } = useGptResults();
  const [currentGptResult, setCurrentGptResult] = useState<GptResult>();
  const [currentGptSeoResult, setCurrentGptSeoResult] = useState<GptResult>();
  const [loading, setLoading] = useState<boolean>();

  const titleQuery = async (query: string) => {
    try {
      const { data } = await openAiService.createTitle(query);

      const { choices, id } = data;

      const gptResult = {
        id,
        responses: choices.map((choice) => {
          return {
            role: choice.message.role,
            text: choice.message.content
          };
        })
      };

      setCurrentGptResult(gptResult);
      addGptResult(gptResult);
    } catch (error) {
      console.log(error);
    }
  };

  const seoQuery = async (query: string) => {
    try {
      const { data } = await openAiService.createSeoTags(query);

      const { choices, id } = data;

      const gptResult = {
        id,
        responses: choices.map((choice) => {
          return {
            role: choice.message.role,
            text: choice.message.content
          };
        })
      };

      setCurrentGptSeoResult(gptResult);
      addGptResult(gptResult);
    } catch (error) {
      console.log(error);
    }
  };

  const doQueries = async (query: string) => {
    setLoading(true);

    try {
      await Promise.all([titleQuery(query), seoQuery(query)]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='App'>
      <AppBar position='static'>
        <Typography variant='h6'>Title generator</Typography>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Box
          sx={{
            maxWidth: 1000,
            margin: 'auto'
          }}
        >
          <Stack gap={2}>
            <Card>
              <CardHeader title='Actions' />
              <CardContent>
                <Stack gap={2} direction={'row'}>
                  <Box flex={1}>
                    <ChatBox onSubmit={doQueries} />
                  </Box>
                  <Box flex={1}>
                    {!loading && (
                      <Stack gap={2}>
                        <GptResult gptResult={currentGptResult} />
                        <GptSeoResults gptResult={currentGptSeoResult} />
                      </Stack>
                    )}
                    {loading && (
                      <Stack
                        direction={'row'}
                        sx={{
                          padding: 2
                        }}
                      >
                        <CircularProgress />
                      </Stack>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title='Resultater' />
              <CardContent>
                <GptResults />
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}

export default App;
