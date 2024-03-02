const express = require('express');
const httpProxy = require('http-proxy');

const PORT = process.env.PORT || 8000;
const BASE_PATH =
  'https://vercel-bucket-output.s3.ap-south-1.amazonaws.com/__output';

const app = express();

const proxy = httpProxy.createProxy();

app.use((req, res) => {
  const hostname = req.hostname;
  const subdomain = hostname.split('.')[0];

  const resolveTo = `${BASE_PATH}/${subdomain}`;

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
