import express from 'express';
import { generateSlug } from 'random-word-slugs';

import dotenv from 'dotenv';
dotenv.config();

import { buildProject } from './aws';
import { initializeRedis } from './redis';

initializeRedis();

const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
  });
});

app.post('/project', async (req, res) => {
  const { gitUrl, slug } = req.body;

  const projectSlug = slug ? slug : generateSlug();

  //build the project
  await buildProject(projectSlug, gitUrl);

  return res.json({
    status: 'queued',
    data: {
      projectSlug,
      url: `http://${projectSlug}.localhost:8000`,
    },
  });
});

app.listen(PORT, () => {
  console.log(`api server listening on port: ${PORT}`);
});
