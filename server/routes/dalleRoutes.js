import express from 'express';
import * as dotenv from 'dotenv';
//import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();
/*
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  */
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  //const openai = new OpenAIApi(configuration);

  router.route('/').get((req, res) => {
    res.send('Hello from DALL-E!');
  });
  
  router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

      //  console.log(aiResponse);
        const image = aiResponse.data[0].b64_json;
        res.status(200).json({ photo: image });
    /*    if (
          aiResponse &&
          aiResponse.data &&
          aiResponse.data.data &&
          Array.isArray(aiResponse.data.data) &&
          aiResponse.data.data.length > 0 &&
          aiResponse.data.data[0].b64_json
      ) {
          const image = aiResponse.data.data[0].b64_json;
          res.status(200).json({ photo: image });
      } else {
          // Handle the case where the expected properties are not present
          res.status(500).send('Unexpected response from OpenAI API');
      }*/

    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');     
    }
});

  export default router;