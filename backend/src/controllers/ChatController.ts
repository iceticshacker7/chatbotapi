import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

const GPT_API_BASE_URL = "https://api.openai.com/v1/rgstr";
const GPT_API_COMPLETIONS_ENDPOINT = `${GPT_API_BASE_URL}/completions`;
// Use environment variable for API key
const API_KEY = "sk-proj-rSopIC8yERsM2MNJFKBCT3BlbkFJU1Z4wfTCu21F9KDomTnl";
const GPT_API_URL = `${GPT_API_COMPLETIONS_ENDPOINT}?api_key=${API_KEY}`;

@Controller('chat')
export class ChatController {
  @Post()
  async handleMessage(@Body() { message }: { message: string }): Promise<string> {
    try {
      const gptResponse = await axios.post(GPT_API_URL, {
        prompt: message, // Ensure correct payload format
      });
      return gptResponse.data.choices[0].text; // Extract the response text from the GPT API response
    } catch (error) {
      console.error('Error calling GPT API:', error);
      // Improved error handling with specific message if available
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error.message;
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException('Error processing message', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
