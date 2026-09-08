import { NextResponse } from 'next/server';
import { jarvisProjects } from '@/data/jarvis-projects';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function extractText(payload: any): string {
  if (typeof payload?.output_text === 'string' && payload.output_text.trim()) return payload.output_text.trim();
  const chunks: string[] = [];
  for (const item of payload?.output ?? []) {
    for (const content of item?.content ?? []) {
      if (content?.type === 'output_text' && typeof content?.text === 'string') chunks.push(content.text);
      if (typeof content?.text === 'string' && !chunks.includes(content.text)) chunks.push(content.text);
    }
  }
  return chunks.join('\n').trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      answer: 'JARVIS está abierto y operativo, pero falta configurar OPENAI_API_KEY en el entorno para activar el cerebro conversacional. La interfaz, proyectos y modo aplicación ya funcionan.',
    });
  }

  try {
    const body = await request.json();
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages.slice(-14) : [];
    const projectContext = jarvisProjects.map((p) => ({
      name: p.name,
      category: p.category,
      repo: p.repo,
      url: p.url,
      priority: p.priority,
      status: p.status,
      summary: p.summary,
    }));

    const instructions = `Eres JARVIS JP, el asistente ejecutivo privado de JP. Eres el cerebro operativo central de sus proyectos y negocios. Habla en español de México con tono ejecutivo, preciso, elegante y breve. No afirmes ser el personaje de Marvel ni imites a ningún actor.\n\nReglas:\n- Distingue hechos confirmados de inferencias.\n- Nunca inventes actividad viva de GitHub, Vercel, Gmail, Calendar o Drive.\n- Cuando se te pida priorizar, devuelve máximo 5 prioridades con razón y siguiente acción.\n- Para preguntas actuales de mercado, tecnología, leyes, productos o competencia, usa búsqueda web cuando sea útil.\n- Usa el registro maestro como contexto inicial.\n- No expongas secretos, tokens ni credenciales.\n\nREGISTRO MAESTRO DE PROYECTOS:\n${JSON.stringify(projectContext)}`;

    const input = messages.map((m) => ({
      role: m.role,
      content: [{ type: 'input_text', text: m.content }],
    }));

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6',
        instructions,
        input,
        tools: [{ type: 'web_search' }],
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('JARVIS OpenAI error:', response.status, detail.slice(0, 600));
      return NextResponse.json({ error: 'El cerebro de JARVIS no pudo responder. Revisa la configuración del modelo/API.' }, { status: 502 });
    }

    const payload = await response.json();
    const answer = extractText(payload) || 'No recibí una respuesta utilizable del modelo.';
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('JARVIS chat route error:', error);
    return NextResponse.json({ error: 'No pude procesar el comando.' }, { status: 500 });
  }
}
