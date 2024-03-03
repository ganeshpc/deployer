import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import httpProxy from 'http-proxy';

const PORT = process.env.PORT || 8000;

const AWS_BUCKET_PATH = process.env.AWS_BUCKET_PATH;

const app = express();

const proxy = httpProxy.createProxy();

app.use((req, res) => {
  const hostname = req.hostname;

  const subdomain = hostname.split('.')[0];

  const resolveTo = `${AWS_BUCKET_PATH}/${subdomain}`;

  proxy.web(req, res, { target: resolveTo, changeOrigin: true });
});

proxy.on('proxyReq', (proxyReq, req, res) => {
  const path = req.url;
  if (path === '/') {
    proxyReq.path += 'index.html';
  }
});

app.listen(PORT, () => {
  console.log(`Reverse proxy listening on port: ${PORT}`);
});
