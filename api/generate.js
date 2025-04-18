export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const structured = `
  🧠 Structured Job Offer
  ----------------------------
  Prompt: ${prompt}

  📌 Job Title: Software Developer
  🏢 Company: ExampleCorp
  🌍 Location: Remote
  💼 Type: Full-time
  💶 Salary: €50,000/year
  ✅ Requirements: Experience with JavaScript, Node.js, React
  🎯 Responsibilities: Build web apps, collaborate with team
  🎁 Benefits: Remote-friendly, health insurance, flexible hours
  `;

  res.status(200).json({ response: structured });
}
