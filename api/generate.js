export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const ollamaUrl = process.env.OLLAMA_URL;

  if (!ollamaUrl) {
    return res.status(500).json({ error: 'OLLAMA_URL environment variable not set' });
  }

  try {
    const response = await fetch(ollamaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error from Ollama API' });
    }

    const data = await response.json();

    return res.status(200).json({ result: data });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
