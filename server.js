// server.js
const { createServer } = require('vite');

async function start() {
  const port = process.env.PORT || 4173;

  const server = await createServer({
    preview: {
      port,
      host: '0.0.0.0',
    },
  });

  await server.listen();
  console.log(`Server running at http://0.0.0.0:${port}`);
}

start();
