export default async function handler(req, res) {
  const prompt = req.query.prompt || 'Hello';

  try {
    const response = await fetch(process.env.OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}
