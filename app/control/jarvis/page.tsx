'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  Bell,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CircleDot,
  Code2,
  Gauge,
  Github,
  LayoutDashboard,
  Mic,
  MicOff,
  Radio,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Volume2,
  Waves,
} from 'lucide-react';
import { jarvisProjects } from '@/data/jarvis-projects';
import styles from './Jarvis.module.css';

type Msg = { role: 'user' | 'assistant'; content: string };

const initialMessages: Msg[] = [
  {
    role: 'assistant',
    content:
      'Buenas noches, JP. JARVIS está en línea. Tengo acceso al registro de proyectos y puedo ayudarte a priorizar, investigar, resumir avances y convertir decisiones en próximos pasos.',
  },
];

const quickPrompts = [
  '¿Cómo vamos?',
  '¿Qué requiere mi atención?',
  'Prioriza mis proyectos',
  'Revisa RADAR',
];

export default function JarvisPage() {
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [listening, setListening] = useState(false);
  const [query, setQuery] = useState('');
  const [clock, setClock] = useState('');
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  const filteredProjects = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return jarvisProjects;
    return jarvisProjects.filter((p) => [p.name, p.category, p.summary, p.repo ?? ''].join(' ').toLowerCase().includes(text));
  }, [query]);

  const counts = useMemo(() => ({
    total: jarvisProjects.length,
    active: jarvisProjects.filter((p) => p.status === 'active').length,
    critical: jarvisProjects.filter((p) => p.priority === 'critical').length,
    watch: jarvisProjects.filter((p) => p.status === 'watch').length,
  }), []);

  function speak(text: string) {
    if (!voiceOn || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*#`]/g, ''));
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) => /Daniel|Arthur|George|Ryan|British|UK English/i.test(v.name)) || voices.find((v) => /^en-GB/i.test(v.lang)) || voices.find((v) => /^en/i.test(v.lang));
    if (preferred) utterance.voice = preferred;
    utterance.rate = 1.04;
    utterance.pitch = 0.78;
    utterance.volume = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  async function sendMessage(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    if (!text || busy) return;
    setInput('');
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setBusy(true);

    try {
      const response = await fetch('/api/control/jarvis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await response.json();
      const answer = data.answer || data.error || 'No pude completar esa consulta.';
      setMessages((current) => [...current, { role: 'assistant', content: answer }]);
      speak(answer);
    } catch {
      const answer = 'Hay un problema de comunicación con el cerebro central. El Command Center sigue operativo.';
      setMessages((current) => [...current, { role: 'assistant', content: answer }]);
      speak(answer);
    } finally {
      setBusy(false);
    }
  }

  function toggleMic() {
    if (listening) {
      recognitionRef.current?.stop?.();
      setListening(false);
      return;
    }
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      speak('El reconocimiento de voz del navegador no está disponible. Usa Chrome o el companion local de JARVIS.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-MX';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? '';
      if (transcript) sendMessage(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  }

  return (
    <main className={styles.shell}>
      <div className={styles.grid}>
        <aside className={`${styles.panel} ${styles.sidebar}`}>
          <div className={styles.brand}>
            <div className={styles.orbSmall} />
            <div className={styles.brandText}>
              <div className={styles.brandName}>JARVIS</div>
              <div className={styles.brandSub}>JP OPERATING SYSTEM</div>
            </div>
          </div>
          <nav className={styles.nav}>
            <button className={`${styles.navButton} ${styles.navActive}`}><LayoutDashboard size={16}/><span>Command Center</span></button>
            <button className={styles.navButton}><BriefcaseBusiness size={16}/><span>Proyectos</span></button>
            <button className={styles.navButton}><BrainCircuit size={16}/><span>Memoria</span></button>
            <button className={styles.navButton}><Github size={16}/><span>GitHub</span></button>
            <button className={styles.navButton}><Radio size={16}/><span>Monitores</span></button>
            <button className={styles.navButton}><TerminalSquare size={16}/><span>Acciones</span></button>
            <button className={styles.navButton}><Settings size={16}/><span>Ajustes</span></button>
          </nav>
          <div className={styles.sidebarBottom}>
            <div className={styles.statusPill}><span className={styles.statusDot}/><span>SISTEMAS EN LÍNEA</span></div>
          </div>
        </aside>

        <section className={styles.main}>
          <header className={`${styles.panel} ${styles.topbar}`}>
            <div>
              <div className={styles.eyebrow}>Personal Operating System</div>
              <div className={styles.title}>Command Center</div>
            </div>
            <div className={styles.topActions}>
              <button className={styles.iconButton} onClick={() => setVoiceOn((v) => !v)} title="Voz">
                {voiceOn ? <Volume2 size={16}/> : <MicOff size={16}/>} 
              </button>
              <button className={styles.iconButton} title="Alertas"><Bell size={16}/></button>
              <div className={styles.statusPill}><CircleDot size={13}/><span>{clock}</span></div>
            </div>
          </header>

          <section className={`${styles.panel} ${styles.hero}`}>
            <div className={styles.heroCopy}>
              <div className={styles.heroLabel}>JARVIS // SYSTEM READY</div>
              <h1><span className={styles.gradientText}>Tu operación.</span><br/>Bajo control.</h1>
              <p className={styles.lead}>Un cerebro central para seguir proyectos, detectar bloqueos, investigar, priorizar decisiones y convertir actividad dispersa en un sistema ejecutivo accionable.</p>
              <div className={styles.commandRow}>
                <button className={`${styles.primaryButton} ${listening ? styles.voiceActive : ''}`} onClick={toggleMic}>
                  {listening ? <Waves size={16}/> : <Mic size={16}/>} {listening ? 'Escuchando…' : 'Hablar con JARVIS'}
                </button>
                <button className={styles.secondaryButton} onClick={() => sendMessage('Dame un briefing ejecutivo de mis proyectos y dime qué requiere mi atención primero.')}><Sparkles size={15}/> Briefing ejecutivo</button>
              </div>
            </div>
            <div className={styles.orbWrap}>
              <div className={styles.ring3}/><div className={styles.ring}/><div className={styles.ring2}/><div className={styles.orb}/>
              <div className={styles.listening}>{listening ? 'VOICE INPUT ACTIVE' : 'AWAITING COMMAND'}</div>
            </div>
          </section>

          <section className={styles.metricGrid}>
            <div className={`${styles.panel} ${styles.metric}`}><div className={styles.metricLabel}>Proyectos registrados</div><div className={styles.metricValue}>{counts.total}</div><div className={styles.metricMeta}>ecosistema JUPAFI + proyectos personales</div></div>
            <div className={`${styles.panel} ${styles.metric}`}><div className={styles.metricLabel}>Activos</div><div className={styles.metricValue}>{counts.active}</div><div className={styles.metricMeta}>requieren seguimiento continuo</div></div>
            <div className={`${styles.panel} ${styles.metric}`}><div className={styles.metricLabel}>Prioridad crítica</div><div className={styles.metricValue}>{counts.critical}</div><div className={styles.metricMeta}>primero en el briefing ejecutivo</div></div>
            <div className={`${styles.panel} ${styles.metric}`}><div className={styles.metricLabel}>En observación</div><div className={styles.metricValue}>{counts.watch}</div><div className={styles.metricMeta}>sin intervención inmediata</div></div>
          </section>

          <section className={styles.contentGrid}>
            <div className={`${styles.panel} ${styles.section}`}>
              <div className={styles.sectionHeader}><div className={styles.sectionTitle}>Project Brain</div><div className={styles.muted}>{filteredProjects.length} proyectos</div></div>
              <input className={styles.search} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar proyecto, categoría o repositorio…" />
              <div className={styles.projectList}>
                {filteredProjects.map((project) => (
                  <article key={project.id} className={styles.projectCard} onClick={() => sendMessage(`Analiza ${project.name}. Dame estado, riesgos, próximos pasos y qué debería decidir.`)}>
                    <div className={styles.projectTop}><div className={styles.projectName}>{project.name}</div><div className={styles.badge}>{project.priority}</div></div>
                    <div className={styles.projectSummary}>{project.summary}</div>
                    <div className={styles.projectMeta}><span>{project.category}</span><span>•</span><span>{project.status}</span>{project.repo && <><span>•</span><span>{project.repo.split('/')[1]}</span></>}</div>
                  </article>
                ))}
              </div>
            </div>

            <div className={`${styles.panel} ${styles.section}`}>
              <div className={styles.sectionHeader}><div className={styles.sectionTitle}>System Intelligence</div><div className={styles.muted}>V1</div></div>
              <div className={styles.activity}>
                <div className={styles.activityItem}><div className={styles.activityIcon}><Github size={14}/></div><div><div className={styles.activityTitle}>GitHub conectado</div><div className={styles.activityText}>JARVIS ya tiene un registro inicial de tus repositorios y proyectos para poder razonar sobre el portafolio.</div></div></div>
                <div className={styles.activityItem}><div className={styles.activityIcon}><ShieldCheck size={14}/></div><div><div className={styles.activityTitle}>Panel protegido</div><div className={styles.activityText}>La ruta vive dentro de /control y hereda la autenticación privada de JUPAFI.</div></div></div>
                <div className={styles.activityItem}><div className={styles.activityIcon}><Bot size={14}/></div><div><div className={styles.activityTitle}>Cerebro conversacional</div><div className={styles.activityText}>Con OPENAI_API_KEY habilitada, la conversación usa el modelo configurado y puede recurrir a búsqueda web para información actual.</div></div></div>
                <div className={styles.activityItem}><div className={styles.activityIcon}><Activity size={14}/></div><div><div className={styles.activityTitle}>Companion local</div><div className={styles.activityText}>El módulo de Windows detecta doble aplauso localmente y abre el Command Center sin mantener audio en la nube.</div></div></div>
                <div className={styles.activityItem}><div className={styles.activityIcon}><Gauge size={14}/></div><div><div className={styles.activityTitle}>Siguiente capa</div><div className={styles.activityText}>Conectar webhooks de GitHub/Vercel, Gmail, Calendar y memoria persistente para producir briefings basados en actividad real.</div></div></div>
              </div>
            </div>
          </section>
        </section>

        <aside className={styles.right}>
          <section className={`${styles.panel} ${styles.chat}`}>
            <header className={styles.chatHeader}>
              <div><div className={styles.chatTitle}>JARVIS CORE</div><div className={styles.chatStatus}>● ONLINE</div></div>
              <BrainCircuit size={18}/>
            </header>
            <div className={styles.messages}>
              {messages.map((message, index) => <div key={index} className={message.role === 'assistant' ? styles.messageJarvis : styles.messageUser}>{message.content}</div>)}
              {busy && <div className={styles.messageJarvis}>Procesando comando…</div>}
              <div ref={messagesEndRef}/>
            </div>
            <div className={styles.quick}>{quickPrompts.map((q) => <button className={styles.chip} key={q} onClick={() => sendMessage(q)}>{q}</button>)}</div>
            <form className={styles.composer} onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ordena, pregunta o investiga…" />
              <button className={styles.send} disabled={busy} aria-label="Enviar"><Send size={15}/></button>
            </form>
            <div className={styles.footerInfo}>Voz original de asistente · no imita a ningún actor o personaje.</div>
          </section>
        </aside>
      </div>
    </main>
  );
}
