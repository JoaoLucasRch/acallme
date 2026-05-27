import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Sparkles, 
  Sliders, 
  Calendar, 
  ChevronDown, 
  CheckCircle, 
  FileText, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  Upload, 
  X, 
  Activity, 
  Video, 
  VideoOff,
  Info,
  Mic,
  MicOff,
  Monitor,
  PhoneOff,
  ChevronRight,
  Minimize2,
  Maximize2
} from 'lucide-react';

// Decorative fluid breathing wave element
const BreathingWaves = ({ className = "" }) => (
  <div className={`overflow-hidden pointer-events-none select-none h-6 ${className}`}>
    <svg className="w-full h-full text-brand-softGray/50" viewBox="0 0 100 20" preserveAspectRatio="none">
      <path d="M0,10 C20,15 40,5 60,10 C80,15 90,5 100,10" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <path d="M0,13 C20,18 40,8 60,13 C80,18 90,8 100,13" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
      <path d="M0,16 C20,21 40,11 60,16 C80,21 90,11 100,16" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
    </svg>
  </div>
);

function App() {
  // Navigation State
  const [activeProcess, setActiveProcess] = useState('processo1'); // 'processo1' | 'processo2'
  
  // View 1 States (Triagem & Recomendação)
  const [selectedDemanda, setSelectedDemanda] = useState('Ansiedade');
  const [selectedSintomas, setSelectedSintomas] = useState(['Insônia', 'Estresse']);
  const [budgetLimit, setBudgetLimit] = useState(300);
  const [selectedEspecialidade, setSelectedEspecialidade] = useState('Todos');
  const [bookingState, setBookingState] = useState({
    'dr-lucas': 'idle', 'dra-beatriz': 'idle', 'terapeuta-mariana': 'idle',
    'dr-carlos': 'idle', 'dra-helena': 'idle', 'dr-felipe': 'idle',
    'dra-patricia': 'idle', 'dr-gustavo': 'idle', 'dra-sofia': 'idle',
    'dra-carolina': 'idle'
  });

  // View 2 States (Atendimento & Prontuário)
  const [timerSeconds, setTimerSeconds] = useState(900); // 15:00 active (900s)
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [selectedTimelineSession, setSelectedTimelineSession] = useState(null);
  const [viewModeProcesso2, setViewModeProcesso2] = useState('atendimento'); // 'atendimento' | 'relatorio_expandido'
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Jitsi Meet Simulated Control States
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(true);

  // Text area inputs
  const [sessionNotes, setSessionNotes] = useState(
    "Paciente Mariana relata episódios recorrentes de ansiedade antecipatória associada à carga de trabalho no final do trimestre. Apresenta melhora parcial na qualidade do sono..."
  );
  const [privateNotes, setPrivateNotes] = useState(
    "Observar respostas somáticas a estressores na próxima semana. Avaliar se há indicação para intervenção psiquiátrica adjuvante."
  );
  
  // Custom interactive simulations
  const [isTypingSimulating, setIsTypingSimulating] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveSuccessState, setSaveSuccessState] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Decision Matrix outcomes
  const [treatmentState, setTreatmentState] = useState('Manter Atual'); 
  const [showFreqDropdown, setShowFreqDropdown] = useState(false);
  const [showEncaminharDropdown, setShowEncaminharDropdown] = useState(false);
  const [freqLabel, setFreqLabel] = useState('Semanal');
  const [clinicalFeedbackMessage, setClinicalFeedbackMessage] = useState('');

  // Auto-scrolling ref for simulated typing
  const textareaRef = useRef(null);

  // Clinical Symptoms database
  const allSintomas = [
    { id: 'Insônia', label: 'Insônia' },
    { id: 'Estresse', label: 'Estresse' },
    { id: 'Fadiga Crônica', label: 'Fadiga Crônica' },
    { id: 'Aperto no Peito', label: 'Aperto no Peito' },
    { id: 'Irritabilidade', label: 'Irritabilidade' },
    { id: 'Dificuldade de Foco', label: 'Dificuldade de Foco' },
    { id: 'Procrastinação', label: 'Procrastinação Freq.' },
    { id: 'Insegurança', label: 'Insegurança Social' }
  ];

  // Session timer countdown effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format countdown timer helper
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Toggle symptom badge selection
  const handleToggleSintoma = (id) => {
    if (selectedSintomas.includes(id)) {
      setSelectedSintomas(selectedSintomas.filter(item => item !== id));
    } else {
      setSelectedSintomas([...selectedSintomas, id]);
    }
  };

  // Trigger automated clinical note typing simulator
  const handleSimulateTyping = () => {
    if (isTypingSimulating) return;
    setIsTypingSimulating(true);
    
    const clinicalText = `\n\n[Evolução Clínica Dinâmica - ${new Date().toLocaleDateString('pt-BR')}]\nO paciente expressa maior controle sobre os picos de estresse agudo identificados no trabalho. Sintomas de ${selectedSintomas.join(', ') || 'ansiedade leve'} foram atenuados através de exercícios de regulação emocional focados na demanda principal (${selectedDemanda}). A qualidade de repouso noturno aumentou gradativamente de 5/10 para 7/10. Conduta terapêutica mantida.`;
    
    let index = 0;
    setSessionNotes(prev => prev + " ");
    
    const typingInterval = setInterval(() => {
      if (index < clinicalText.length) {
        setSessionNotes((prev) => prev + clinicalText.charAt(index));
        index++;
        if (textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      } else {
        clearInterval(typingInterval);
        setIsTypingSimulating(false);
        triggerFeedback('Nota clínica gerada automaticamente via inteligência de prontuário.');
      }
    }, 15);
  };

  // Display temporary feedback message
  const triggerFeedback = (msg) => {
    setClinicalFeedbackMessage(msg);
    setTimeout(() => {
      setClinicalFeedbackMessage('');
    }, 4500);
  };

  // File uploading mock simulation
  const handleMockUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setAttachedFiles(old => [...old, file.name]);
            triggerFeedback(`Documento "${file.name}" anexado ao prontuário.`);
          }, 300);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  // Confirm booking mock handler
  const handleConfirmBooking = (doctorId) => {
    setBookingState(prev => ({ ...prev, [doctorId]: 'booking' }));
    setTimeout(() => {
      setBookingState(prev => ({ ...prev, [doctorId]: 'booked' }));
      triggerFeedback('Agendamento realizado! Confirmação enviada por e-mail.');
    }, 1200);
  };

  // Reset booking mock handler
  const handleResetBooking = (doctorId) => {
    setBookingState(prev => ({ ...prev, [doctorId]: 'idle' }));
  };

  // View past sessions mock loader
  const loadPastSession = (session) => {
    setSelectedTimelineSession(session);
    setSessionNotes(session.notes);
    setPrivateNotes(session.privateNotes);
    triggerFeedback(`Sessão de ${session.date} carregada no editor.`);
  };

  // Mock past session data
  const pastSessions = [
    {
      date: '20 Mai 2026',
      focus: 'Trabalho focado na regulação de respostas corporais frente a gatilhos.',
      notes: "Paciente relatou melhora nos picos de estresse no ambiente de trabalho. Aplicamos exercícios de respiração diafragmática ativa. Queixa remanescente de insônia de conciliação moderada. Combinou-se protocolo de restrição cognitiva à noite.",
      privateNotes: "Verificar aderência ao diário do sono. Nível de resistência à mudança está diminuindo."
    },
    {
      date: '13 Mai 2026',
      focus: 'Mapeamento de padrões de procrastinação ativa e autoexigência.',
      notes: "Foco na quebra de tarefas complexas em etapas menores para mitigar procrastinação reflexiva decorrente de ansiedade de desempenho. Paciente demonstrou excelente recepção à técnica Pomodoro customizada.",
      privateNotes: "Forte traço perfeccionista. Desafiar cognições do tipo 'tudo ou nada'."
    },
    {
      date: '06 Mai 2026',
      focus: 'Sessão inicial de acolhimento e escuta diagnóstica.',
      notes: "Consulta de triagem inicial e alinhamento de expectativas. Mariana relata altos índices de fadiga durante o período da tarde e episódios de taquicardia situacional. Iniciou-se mapeamento comportamental.",
      privateNotes: "Possível quadro subclínico de Burnout. Manter avaliação diagnóstica contínua."
    }
  ];

  // Expanded database with 10 detailed professional therapist cards (Unsplash Headshots)
  // Structured and mapped with pricing categories:
  // - Psicólogos: R$ 65 a R$ 330
  // - Psiquiatras: R$ 165 a R$ 405
  // - Terapeutas: R$ 85 a R$ 265
  // Specialities matching drop-down filters ("Ansiedade", "Burnout", "Luto", "Procrastinação")
  const matchedProfessionals = [
    {
      id: 'dr-lucas',
      name: 'Dr. Lucas Nogueira',
      role: 'Psicólogo Clínico',
      registry: 'CRP 06/987123',
      price: 180, // Psicólogo R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 98,
      pills: ['TCC', 'Burnout', 'Ansiedade'],
      specialties: ['Ansiedade', 'Burnout'],
      getBio: (demanda, sintomas) => {
        const sintomaList = sintomas.length > 0 ? sintomas.slice(0, 2).join(' e ') : 'estresse';
        return `Especialista em TCC. Abordagem estruturada para reconfigurar padrões de ${demanda.toLowerCase()}. Focado na remissão de sintomas como ${sintomaList}.`;
      }
    },
    {
      id: 'dra-beatriz',
      name: 'Dra. Beatriz Costa',
      role: 'Médica Psiquiatra',
      registry: 'CRM-SP 148902',
      price: 320, // Psiquiatra R$ 165 - 405
      unsplashUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 97,
      pills: ['Psiquiatria', 'Burnout', 'Sono'],
      specialties: ['Ansiedade', 'Burnout'],
      getBio: (demanda, sintomas) => {
        const sintomaList = sintomas.length > 0 ? sintomas.slice(0, 2).join(' e ') : 'insônia';
        return `Psiquiatra integrativa. Suporte farmacológico e regulação do ritmo de sono para quadros de ${demanda.toLowerCase()} e ${sintomaList}.`;
      }
    },
    {
      id: 'terapeuta-mariana',
      name: 'Mariana Alencar',
      role: 'Terapeuta Integrativa',
      registry: 'CRT 04/87123',
      price: 140, // Terapeuta R$ 85 - 265
      unsplashUrl: 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 89,
      pills: ['Mindfulness', 'Luto', 'Presença'],
      specialties: ['Luto', 'Burnout'],
      getBio: (demanda, sintomas) => {
        const sintomaList = sintomas.length > 0 ? sintomas.slice(0, 2).join(' e ') : 'fadiga';
        return `Especialista em práticas de Mindfulness. Regulação e redução de estresse cotidiano para quadros de ${demanda.toLowerCase()} e ${sintomaList}.`;
      }
    },
    {
      id: 'dr-carlos',
      name: 'Dr. Carlos Eduardo',
      role: 'Psicólogo Clínico',
      registry: 'CRP 05/456123',
      price: 220, // Psicólogo R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 96,
      pills: ['TCC', 'TOC', 'Fobia Social'],
      specialties: ['Ansiedade', 'Procrastinação'],
      getBio: (demanda) => `Tratamento estruturado de fobias e comportamentos compulsivos ligados à demanda de ${demanda.toLowerCase()}. Foco na superação prática e reabilitação integradora.`
    },
    {
      id: 'dra-helena',
      name: 'Dra. Helena Souza',
      role: 'Psicóloga Cognitiva',
      registry: 'CRP 06/789456',
      price: 210, // Psicólogo R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 94,
      pills: ['TCC', 'Psicoterapia Familiar', 'Luto'],
      specialties: ['Luto', 'Ansiedade'],
      getBio: (demanda) => `Suporte empático focado em reestruturação cognitiva. Condução experiente em processos de perda, luto e estresse pós-traumático decorrente de ${demanda.toLowerCase()}.`
    },
    {
      id: 'dr-felipe',
      name: 'Dr. Felipe Rocha',
      role: 'Médico Psiquiatra',
      registry: 'CRM-SP 210456',
      price: 390, // Psiquiatra R$ 165 - 405
      unsplashUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 92,
      pills: ['Psiquiatria', 'Farmacologia', 'TDAH'],
      specialties: ['Burnout', 'Ansiedade'],
      getBio: (demanda) => `Avaliação neuropsiquiátrica focada em diagnóstico diferencial e otimização neuroquímica de sintomas de ansiedade, Burnout e déficit de foco crônico.`
    },
    {
      id: 'dra-patricia',
      name: 'Dra. Patrícia Lima',
      role: 'Psicóloga Humanista',
      registry: 'CRP 08/456789',
      price: 150, // Psicólogo R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1598252573102-09d7502046ac?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 91,
      pills: ['Fenomenologia', 'Acolhimento', 'Autoconhecimento'],
      specialties: ['Luto', 'Burnout'],
      getBio: (demanda) => `Abordagem centrada na pessoa. Espaço seguro e acolhedor para explorar conflitos existenciais, regulação de estresse e suporte em demandas de ${demanda.toLowerCase()}.`
    },
    {
      id: 'dr-gustavo',
      name: 'Dr. Gustavo Mendes',
      role: 'Psicólogo Analítico',
      registry: 'CRP 06/112233',
      price: 190, // Psicólogo R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 87,
      pills: ['Jungiana', 'Sonhos', 'Autoconhecimento'],
      specialties: ['Ansiedade', 'Procrastinação'],
      getBio: (demanda) => `Psicoterapia de orientação analítica jungiana. Investigação de processos inconscientes que retroalimentam a ansiedade crônica e as perdas de energia psíquica.`
    },
    {
      id: 'dra-sofia',
      name: 'Dra. Sofia Ribeiro',
      role: 'Psicóloga Sistêmica',
      registry: 'CRP 05/667788',
      price: 175, // Psicólogo R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 88,
      pills: ['Sistêmica', 'Família', 'Burnout'],
      specialties: ['Burnout', 'Luto'],
      getBio: (demanda) => `Tratamento com foco nas relações e sistemas dinâmicos. Excelente abordagem para gerenciar estresse corporativo ligado a quadros de ${demanda.toLowerCase()}.`
    },
    {
      id: 'dra-carolina',
      name: 'Dra. Carolina Dias',
      role: 'Terapeuta Humanista',
      registry: 'CRT 06/900100',
      price: 95, // Terapeuta R$ 85 - 265
      unsplashUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 86,
      pills: ['Gestalt-terapia', 'Expressividade', 'Luto'],
      specialties: ['Luto', 'Procrastinação'],
      getBio: (demanda) => `Abordagem gestáltica focada na experiência do momento presente. Integração mente-corpo para alívio de sintomas de ansiedade e luto agudo.`
    }
  ];

  // Dynamic real-time filter logic for matched professionals list
  const filteredProfessionals = matchedProfessionals.filter(p => {
    // 1. Price Limit Slider Filter
    if (p.price > budgetLimit) return false;
    
    // 2. Demand Category Filter
    if (selectedDemanda && !p.specialties.includes(selectedDemanda)) return false;
    
    // 3. Speciality Category Filter (Psicólogo, Psiquiatra, Terapeuta)
    if (selectedEspecialidade !== 'Todos') {
      if (selectedEspecialidade === 'Psicólogo' && p.role.indexOf('Psicólog') === -1) return false;
      if (selectedEspecialidade === 'Psiquiatra' && p.role.indexOf('Psiquiatr') === -1) return false;
      if (selectedEspecialidade === 'Terapeuta' && p.role.indexOf('Terapeuta') === -1) return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#e6f2fc]">
      
      {/* 1. HEADER & OFFICIAL FRAME 10 (1).SVG LOGO */}
      <header className="border-b-[0.5px] border-[#b8cce4] px-8 py-4 sticky top-0 bg-white/95 backdrop-blur-md z-45 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Brand Space */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-[0.5px] border-[#b8cce4] flex items-center justify-center bg-white shadow-sm overflow-hidden select-none">
              <img 
                src="/Frame 10 (1).svg" 
                alt="acallme logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1">
                <span className="font-display font-semibold text-2xl tracking-tight text-slate-800 lowercase">acallme</span>
              </div>
              <span className="text-[10px] block text-[#8196b1] font-sans font-normal tracking-wide lowercase italic -mt-1.5">
                a gente liga pro que você sente.
              </span>
            </div>
          </div>

          {/* Screen Controller Nav Tab Bar */}
          <nav className="flex items-center space-x-1.5 bg-white p-1 rounded-lg border-[0.5px] border-[#b8cce4]">
            <button
              onClick={() => setActiveProcess('processo1')}
              className={`px-4 py-2.5 text-xs font-display font-semibold tracking-wide rounded-md transition-all duration-300 ${
                activeProcess === 'processo1' 
                  ? 'bg-[#e6f2fc] text-slate-800' 
                  : 'text-[#8196b1] hover:text-slate-800'
              }`}
            >
              [ Processo 1: Triagem & Recomendação ]
            </button>
            <div className="h-4 w-[1px] bg-[#b8cce4]"></div>
            <button
              onClick={() => setActiveProcess('processo2')}
              className={`px-4 py-2.5 text-xs font-display font-semibold tracking-wide rounded-md transition-all duration-300 ${
                activeProcess === 'processo2' 
                  ? 'bg-[#e6f2fc] text-slate-800' 
                  : 'text-[#8196b1] hover:text-slate-800'
              }`}
            >
              [ Processo 2: Atendimento & Prontuário ]
            </button>
          </nav>
        </div>
      </header>

      {/* BREATHING WAVE DECORATOR SENSORY ELEMENT */}
      <BreathingWaves className="max-w-7xl mx-auto w-full px-6 mt-4" />

      {/* GLOBAL TOAST/FEEDBACK ALERTS */}
      {clinicalFeedbackMessage && (
        <div className="fixed top-24 right-8 bg-[#e6f2fc] text-slate-800 border-[0.5px] border-[#b8cce4] px-4 py-3 rounded-lg shadow-sm flex items-center gap-3 z-50 text-xs font-sans font-normal animate-fadeIn transition-all">
          <Activity className="w-4 h-4 text-[#6AD8FF] animate-pulse" />
          <span>{clinicalFeedbackMessage}</span>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-4 md:py-6">
        
        {/* VIEW 1: INTENTIONAL TRIAGE & MATCHING SYSTEM (PROCESSO 1) */}
        {activeProcess === 'processo1' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 animate-fadeIn">
            
            {/* Left Panel - Minimal Intake Form */}
            <section className="lg:col-span-5 space-y-6 lg:pr-8 lg:border-r-[0.5px] lg:border-[#b8cce4] bg-white">
              <div>
                <span className="text-[10px] font-display font-semibold tracking-widest text-[#6AD8FF] uppercase">Triagem Acolhedora</span>
                <h1 className="text-3xl font-display font-semibold text-slate-800 tracking-tight mt-1 leading-snug">Como você está hoje?</h1>
                <p className="text-xs text-[#8196b1] mt-2 font-sans font-normal leading-relaxed">
                  A triagem detalhada evita repetição de dados em consultas futuras. Nos conte seu momento para desenharmos uma conexão precisa.
                </p>
              </div>

              {/* Demanda Principal Dropdown */}
              <div className="space-y-2">
                <label className="block text-[11px] font-display font-semibold text-[#8196b1] uppercase tracking-wider">
                  Demanda Principal
                </label>
                <div className="relative">
                  <select 
                    value={selectedDemanda}
                    onChange={(e) => {
                      setSelectedDemanda(e.target.value);
                      triggerFeedback(`Filtrando terapeutas especialistas em ${e.target.value}...`);
                    }}
                    className="w-full bg-white border-[0.5px] border-[#b8cce4] rounded-lg px-4 py-3 text-xs text-slate-700 font-sans font-normal focus:outline-none focus:ring-1 focus:ring-[#8fbdf1] appearance-none transition-colors cursor-pointer"
                  >
                    <option value="Ansiedade">Ansiedade</option>
                    <option value="Burnout">Burnout</option>
                    <option value="Luto">Luto</option>
                    <option value="Procrastinação">Procrastinação</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8196b1] absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Sintomas Atuais Check Grid */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-display font-semibold text-[#8196b1] uppercase tracking-wider">
                    Sintomas Atuais
                  </label>
                  <span className="text-[10px] text-[#8196b1] font-sans font-normal">
                    {selectedSintomas.length} mapeados
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {allSintomas.map((sintoma) => {
                    const isSelected = selectedSintomas.includes(sintoma.id);
                    return (
                      <button
                        key={sintoma.id}
                        onClick={() => handleToggleSintoma(sintoma.id)}
                        className={`text-left px-3 py-2.5 rounded-lg text-xs font-sans font-normal transition-all duration-300 border-[0.5px] ${
                          isSelected 
                            ? 'bg-[#e6f2fc] text-slate-800 border-[#8196b1]/40' 
                            : 'bg-white text-slate-600 border-[#b8cce4]/70 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{sintoma.label}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#6AD8FF]"></span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filtros de Preferência */}
              <div className="space-y-5 pt-4 border-t-[0.5px] border-[#b8cce4]/65">
                
                {/* Specialization selector */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-[#8196b1] font-display font-semibold uppercase tracking-wider">Especialização Recomendada</span>
                  <div className="grid grid-cols-4 gap-1 p-0.5 bg-[#e6f2fc]/30 rounded-lg border-[0.5px] border-[#b8cce4]/50">
                    {['Todos', 'Psicólogo', 'Psiquiatra', 'Terapeuta'].map((esp) => (
                      <button
                        key={esp}
                        onClick={() => setSelectedEspecialidade(esp)}
                        className={`py-1.5 text-[10px] font-sans font-normal rounded transition-all duration-200 ${
                          selectedEspecialidade === esp 
                            ? 'bg-white text-slate-800 border-[0.5px] border-[#b8cce4] shadow-[0_1px_2px_rgba(0,0,0,0.01)]' 
                            : 'text-[#8196b1] hover:text-slate-700'
                        }`}
                      >
                        {esp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[10px] text-[#8196b1] font-sans">
                    <span>Preço Máximo de Consulta:</span>
                    <span className="font-display font-semibold text-slate-700">Até R$ {budgetLimit}</span>
                  </div>
                  <input 
                    type="range" 
                    min="65" 
                    max="405" 
                    step="5"
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(Number(e.target.value))}
                    className="w-full h-1 bg-[#e6f2fc] rounded-lg appearance-none cursor-pointer accent-[#8fbdf1]" 
                  />
                  <div className="flex justify-between text-[8px] text-[#8196b1] font-sans">
                    <span>R$ 65</span>
                    <span>R$ 405</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Panel - Dynamic Scrollable matched list of 10 professionals */}
            <section className="lg:col-span-7 space-y-6 bg-white flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-display font-semibold tracking-widest text-[#6AD8FF] uppercase">Match Terapêutico</span>
                  <h2 className="text-xl font-display font-semibold text-slate-800 tracking-tight mt-0.5">Profissionais Compatíveis com seu Diagnóstico</h2>
                </div>
                <div className="bg-[#e6f2fc]/50 border-[0.5px] border-[#b8cce4] text-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-sans font-normal flex items-center gap-1.5 self-start sm:self-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6AD8FF] animate-pulse"></span>
                  <span>{filteredProfessionals.length} profissionais disponíveis</span>
                </div>
              </div>

              {/* Scrollable list frame */}
              <div className="space-y-4 max-h-[660px] overflow-y-auto pr-2.5 scroll-smooth">
                {filteredProfessionals.length > 0 ? (
                  filteredProfessionals.map((prof) => {
                    const status = bookingState[prof.id];
                    return (
                      <div 
                        key={prof.id}
                        className={`group border-[0.5px] border-[#b8cce4] bg-white rounded-xl p-4 transition-all duration-300 ${
                          status === 'booked' ? 'bg-[#e6f2fc]/20 border-[#8fbdf1]' : 'hover:shadow-[0_4px_16px_rgba(230,242,252,0.6)]'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                          
                          {/* Unsplash Profile Photo */}
                          <div className="w-12 h-12 rounded-full flex-shrink-0 border-[0.5px] border-[#b8cce4] overflow-hidden shadow-sm bg-slate-50">
                            <img 
                              src={prof.unsplashUrl} 
                              alt={prof.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Profile Data */}
                          <div className="flex-1 space-y-2 w-full">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <h3 className="font-display font-semibold text-slate-800 text-xs tracking-tight group-hover:text-[#8fbdf1] transition-colors">
                                  {prof.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] text-[#8196b1] font-sans font-normal">
                                  <span>{prof.role}</span>
                                  <span className="w-1 h-1 rounded-full bg-[#b8cce4]"></span>
                                  <span className="font-mono text-[#8196b1] font-semibold">{prof.registry}</span>
                                  <span className="w-1 h-1 rounded-full bg-[#b8cce4]"></span>
                                  <span className="font-semibold text-slate-700">R$ {prof.price} / consulta</span>
                                </div>
                              </div>
                              
                              {/* Compatibility score marker */}
                              <div className="bg-[#e6f2fc] border-[0.5px] border-[#b8cce4] px-2 py-0.5 rounded-full flex items-center gap-1">
                                <span className="text-[#6AD8FF] font-display font-semibold text-[11px]">{prof.compatibility}%</span>
                                <span className="text-slate-500 text-[8.5px] font-sans font-normal">Compatível</span>
                              </div>
                            </div>

                            {/* Bio */}
                            <p className="text-[11px] text-[#8196b1] font-sans font-normal leading-relaxed">
                              {prof.getBio ? prof.getBio(selectedDemanda, selectedSintomas) : `Atendimento especializado voltado a reabilitação terapêutica e apoio contínuo em demandas de ${selectedDemanda.toLowerCase()}.`}
                            </p>

                            {/* Pill Tags */}
                            <div className="flex flex-wrap gap-1">
                              {prof.pills.map((pill) => (
                                <span key={pill} className="text-[8.5px] bg-[#e6f2fc]/50 text-slate-700 border-[0.5px] border-[#b8cce4]/40 px-2 py-0.5 rounded-full font-sans font-normal">
                                  {pill}
                                </span>
                              ))}
                            </div>

                            {/* Booking Action */}
                            <div className="pt-1 flex justify-end">
                              {status === 'idle' && (
                                <button
                                  onClick={() => handleConfirmBooking(prof.id)}
                                  className="bg-[#8fbdf1] text-white hover:bg-[#8fbdf1]/90 text-[10px] font-display font-semibold px-4 py-2 rounded-lg border-[0.5px] border-[#8fbdf1] transition-all shadow-sm"
                                >
                                  Confirmar Agendamento
                                </button>
                              )}
                              {status === 'booking' && (
                                <button
                                  disabled
                                  className="bg-[#e6f2fc] text-slate-400 border-[0.5px] border-[#b8cce4] text-[10px] font-sans font-normal px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-not-allowed"
                                >
                                  <span className="w-2.5 h-2.5 border-2 border-slate-300 border-t-[#8fbdf1] rounded-full animate-spin"></span>
                                  Agendando...
                                </button>
                              )}
                              {status === 'booked' && (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleResetBooking(prof.id)}
                                    className="text-[9px] text-[#8196b1] hover:text-slate-800 transition-colors mr-1 font-sans font-normal"
                                  >
                                    Desfazer
                                  </button>
                                  <span className="bg-emerald-50 border-[0.5px] border-emerald-300 text-emerald-700 text-[10px] font-display font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 animate-fadeIn shadow-xs">
                                    <Check className="w-2.5 h-2.5" />
                                    Agendado!
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="border-[0.5px] border-dashed border-[#b8cce4] rounded-xl p-10 text-center space-y-3 bg-white">
                    <Info className="w-6 h-6 text-[#8196b1]/50 mx-auto" />
                    <p className="text-xs text-[#8196b1] font-sans font-normal">Nenhum clínico encontrado nesta faixa de preço para a demanda de {selectedDemanda}.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: UNIFIED DIGITAL MEDICAL RECORD & EVOLUTION WORKSPACE (PROCESSO 2) */}
        {activeProcess === 'processo2' && (
          <div className="animate-fadeIn">
            
            {/* VIEW MODE 1: STANDARD ATTENDANCE DASHBOARD (ASYMMETRICAL 65% / 35% GRID) */}
            {viewModeProcesso2 === 'atendimento' && (
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                
                {/* LEFT COLUMN: Chamada em Destaque (65% width = lg:col-span-6.5 -> we use col-span-6) */}
                <div className="lg:col-span-6 space-y-5">
                  
                  {/* Aspect-ratio expanded video container 16:9 */}
                  <div className={isFullscreen ? "fixed inset-0 w-full h-full bg-slate-950 z-50 flex flex-col justify-between p-6 md:p-8 transition-all duration-300 animate-fadeIn" : "aspect-video bg-slate-950 rounded-2xl relative overflow-hidden flex flex-col justify-between p-4 border-[0.5px] border-[#b8cce4] shadow-md z-10 transition-all duration-300"}>
                    
                    {/* Active Camera Video feed from patient Mariana Silva */}
                    <div className="absolute inset-0 z-0">
                      {isVideoActive && !isCamOff ? (
                        <img 
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=720&h=405" 
                          alt="Mariana Silva active video stream" 
                          className="w-full h-full object-cover transition-opacity duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center space-y-2 text-slate-500">
                          <VideoOff className="w-8 h-8 text-slate-600 animate-pulse" />
                          <span className="text-[10px] font-sans font-normal">Câmera indisponível</span>
                        </div>
                      )}
                    </div>

                    {/* Therapist Camera Picture-in-Picture window */}
                    <div className={`absolute rounded-xl bg-slate-800 border-[0.5px] border-white/20 overflow-hidden shadow-lg z-20 transition-all duration-300 ${
                      isFullscreen ? 'right-6 top-6 w-40 h-28' : 'right-4 top-4 w-28 h-20'
                    }`}>
                      <img 
                        src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=180&h=120" 
                        alt="Therapist Stream" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 left-2 bg-black/60 px-1 rounded text-[7px] text-white font-mono">Lucas (Você)</div>
                    </div>

                    {/* Top Row indicators */}
                    <div className="flex items-center justify-between w-full z-10 relative">
                      <div className="bg-black/50 backdrop-blur-md border-[0.5px] border-white/10 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-[8.5px] text-white font-display font-semibold tracking-wider">Conexão Criptografada</span>
                      </div>

                      <div className="bg-black/50 backdrop-blur-md border-[0.5px] border-white/10 rounded-lg px-2.5 py-1 flex items-center gap-1 text-white font-mono text-[10px] font-bold">
                        <Clock className="w-3 h-3 text-[#6AD8FF]" />
                        <span>{formatTime(timerSeconds)}</span>
                      </div>
                    </div>

                    {/* Base Row Control buttons */}
                    <div className="w-full z-10 relative flex justify-center items-center gap-2">
                      <div className="bg-black/65 backdrop-blur-md border-[0.5px] border-white/15 rounded-full px-4 py-2 flex items-center gap-4 shadow-xl">
                        
                        <button 
                          onClick={() => {
                            setIsMuted(!isMuted);
                            triggerFeedback(isMuted ? 'Áudio ativado.' : 'Áudio desativado.');
                          }}
                          className={`p-2 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'text-white hover:bg-white/20'}`}
                          title="Mutar"
                        >
                          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>

                        <button 
                          onClick={() => {
                            setIsCamOff(!isCamOff);
                            triggerFeedback(isCamOff ? 'Câmera ativada.' : 'Câmera desligada.');
                          }}
                          className={`p-2 rounded-full transition-colors ${isCamOff ? 'bg-red-500 text-white' : 'text-white hover:bg-white/20'}`}
                          title="Câmera"
                        >
                          {isCamOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                        </button>

                        <button 
                          onClick={() => {
                            setIsSharingScreen(!isSharingScreen);
                            triggerFeedback(isSharingScreen ? 'Tela suspensa.' : 'Compartilhando tela.');
                          }}
                          className={`p-2 rounded-full transition-colors ${isSharingScreen ? 'bg-[#6AD8FF] text-slate-900' : 'text-white hover:bg-white/20'}`}
                          title="Compartilhar Tela"
                        >
                          <Monitor className="w-4 h-4" />
                        </button>

                        {/* Botão de Alternância de Tela Cheia */}
                        <button 
                          onClick={() => {
                            setIsFullscreen(!isFullscreen);
                            triggerFeedback(isFullscreen ? 'Saindo do modo Tela Cheia.' : 'Modo Tela Cheia ativado.');
                          }}
                          className="p-2 rounded-full bg-[#8196b1]/50 text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
                          title={isFullscreen ? "Sair de Tela Cheia" : "Tela Cheia"}
                        >
                          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>

                        <button 
                          onClick={() => {
                            setIsVideoActive(false);
                            triggerFeedback('Teleatendimento suspenso.');
                          }}
                          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                          title="Encerrar"
                        >
                          <PhoneOff className="w-4 h-4" />
                        </button>
                        
                      </div>
                    </div>

                  </div>

                  {/* PROMINENT TOGGLE VIEW PORT BUTTON BELOW VIDEO */}
                  <div className="pt-2 flex justify-start">
                    <button
                      onClick={() => {
                        setViewModeProcesso2('relatorio_expandido');
                        triggerFeedback('Transição para Relatório Clínico Expandido (Vídeo em PiP).');
                      }}
                      className="bg-[#e6f2fc] text-slate-800 hover:bg-[#8fbdf1]/25 border-[0.5px] border-[#b8cce4] px-6 py-3 rounded-xl text-xs font-display font-semibold flex items-center gap-2 shadow-xs transition-all"
                    >
                      <Maximize2 className="w-4 h-4 text-[#8fbdf1]" />
                      Abrir Relatório Expandido de Evolução
                    </button>
                  </div>

                </div>

                {/* RIGHT COLUMN: Prontuário Rápido (35% width = lg:col-span-3.5 -> we use col-span-4) */}
                <div className="lg:col-span-4 bg-white border-[0.5px] border-[#b8cce4] rounded-2xl p-5 flex flex-col justify-between space-y-6 shadow-xs">
                  
                  {/* Patient Info Header */}
                  <div className="space-y-3 pb-4 border-b-[0.5px] border-[#b8cce4]/50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full border-[0.5px] border-[#b8cce4] overflow-hidden flex items-center justify-center bg-white shadow-xs">
                        <img 
                          src="/Frame 10 (1).svg" 
                          alt="Mariana Silva avatar" 
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-slate-800 text-xs">Mariana Silva, 28 anos</h3>
                        <span className="text-[9.5px] text-[#8196b1] font-sans font-normal block leading-none mt-0.5">Plano de Acompanhamento Ativo</span>
                      </div>
                    </div>
                  </div>

                  {/* Textarea for real-time notes */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-display font-semibold text-[#8196b1] uppercase tracking-wider block">
                        Anotações em Tempo Real da Sessão
                      </label>
                      <button
                        onClick={handleSimulateTyping}
                        disabled={isTypingSimulating}
                        className="bg-white hover:bg-[#e6f2fc] text-slate-800 border-[0.5px] border-[#b8cce4] px-2 py-0.5 rounded text-[8px] font-display font-semibold transition-colors disabled:opacity-50 flex items-center gap-1"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-[#6AD8FF]" />
                        Autopreencher
                      </button>
                    </div>
                    <textarea
                      ref={textareaRef}
                      rows="10"
                      value={sessionNotes}
                      onChange={(e) => setSessionNotes(e.target.value)}
                      placeholder="Comece a digitar aqui as observações clínicas em tempo real durante a teleconsulta..."
                      className="w-full bg-white border-b-[0.5px] border-t-0 border-x-0 border-[#b8cce4] focus:border-[#8fbdf1] text-xs text-slate-700 leading-relaxed py-2 px-1 focus:outline-none focus:ring-0 resize-none font-sans font-normal h-[240px]"
                    />
                  </div>

                  {/* Decision matrix controls in base of card */}
                  <div className="space-y-3 pt-4 border-t-[0.5px] border-[#b8cce4]/50">
                    <label className="text-[9.5px] font-display font-semibold text-[#8196b1] uppercase tracking-wider block">
                      Conduta Clínica Recomendada
                    </label>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setTreatmentState('Manter');
                          triggerFeedback('Tratamento mantido.');
                        }}
                        className={`text-[9.5px] py-2 px-2 rounded-lg font-display font-semibold border-[0.5px] transition-all ${
                          treatmentState === 'Manter' ? 'bg-[#8fbdf1] text-white border-[#8fbdf1]' : 'bg-white text-slate-700 border-[#b8cce4] hover:bg-slate-50'
                        }`}
                      >
                        Manter Tratamento
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => {
                            setTreatmentState('Frequencia');
                            setShowFreqDropdown(!showFreqDropdown);
                            setShowEncaminharDropdown(false);
                          }}
                          className={`w-full text-[9.5px] py-2 px-2 rounded-lg font-display font-semibold border-[0.5px] flex items-center justify-center gap-1 transition-all ${
                            treatmentState === 'Frequencia' ? 'bg-[#e6f2fc] text-slate-800 border-[#8fbdf1]' : 'bg-white text-slate-700 border-[#b8cce4] hover:bg-slate-50'
                          }`}
                        >
                          <span>Frequência: {freqLabel}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-[#8196b1]" />
                        </button>

                        {showFreqDropdown && (
                          <div className="absolute bottom-9 left-0 right-0 bg-white border-[0.5px] border-[#b8cce4] rounded-lg shadow-md z-30 overflow-hidden text-[9px]">
                            {['Semanal', 'Quinzenal', 'Mensal'].map((freq) => (
                              <button
                                key={freq}
                                onClick={() => {
                                  setFreqLabel(freq);
                                  setShowFreqDropdown(false);
                                  triggerFeedback(`Frequência ajustada para ${freq}.`);
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-[#e6f2fc] text-slate-700 font-sans font-normal"
                              >
                                {freq}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setTreatmentState('Encaminhar');
                          triggerFeedback('Indicação de encaminhamento psiquiátrico gerada.');
                        }}
                        className={`flex-1 text-[9.5px] py-2 px-2 rounded-lg font-display font-semibold border-[0.5px] transition-all ${
                          treatmentState === 'Encaminhar' ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-white text-slate-700 border-[#b8cce4] hover:bg-slate-50'
                        }`}
                      >
                        Encaminhar para Psiquiatria
                      </button>

                      <button 
                        onClick={() => {
                          setShowSaveModal(true);
                          setSaveSuccessState(false);
                        }}
                        className="bg-[#8fbdf1] hover:bg-[#8fbdf1]/90 text-white font-display font-semibold px-4 py-2 rounded-lg text-[9.5px] border-[0.5px] border-[#8fbdf1]"
                      >
                        Salvar e Encerrar
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* VIEW MODE 2: DETAILED CLINICAL REPORT (2-COLUMN INTEGRATED LAYOUT, NO OVERLAP) */}
            {viewModeProcesso2 === 'relatorio_expandido' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border-[0.5px] border-[#b8cce4] rounded-2xl p-6 shadow-xs animate-scaleUp">
                
                {/* Coluna da Esquerda (Fixa e Estreita - 25% da largura = lg:col-span-3) */}
                <div className="lg:col-span-3 space-y-5 lg:border-r-[0.5px] lg:border-[#b8cce4] lg:pr-6 flex flex-col justify-between h-full min-h-[480px]">
                  <div className="space-y-4">
                    <span className="text-[10px] font-display font-semibold text-[#6AD8FF] uppercase tracking-wider block">Live Feed Integrado</span>
                    
                    {/* Compact video feed (16:9 acoplado) ou Tela Cheia se ativo */}
                    <div className={isFullscreen ? "fixed inset-0 w-full h-full bg-slate-950 z-50 flex flex-col justify-between p-6 md:p-8 transition-all duration-300 animate-fadeIn" : "aspect-video bg-slate-950 rounded-xl relative overflow-hidden flex flex-col justify-between p-2 border-[0.5px] border-[#b8cce4] shadow-xs transition-all duration-300"}>
                      {!isFullscreen ? (
                        <>
                          <div className="absolute inset-0 z-0">
                            {isVideoActive && !isCamOff ? (
                              <img 
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=240&h=160" 
                                alt="Mariana Silva active video stream" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-950 flex items-center justify-center text-slate-600 text-[8px] font-sans">Câmera desativada</div>
                            )}
                          </div>
                          
                          {/* Video Stream overlay metadata */}
                          <div className="flex justify-between items-center w-full z-10 relative">
                            <span className="bg-black/60 px-1 py-0.5 rounded text-[7px] text-white font-display font-semibold flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                              Mariana
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="bg-black/60 px-1 rounded font-mono text-[8px] text-[#6AD8FF] mr-0.5">{formatTime(timerSeconds)}</span>
                              <button 
                                onClick={() => {
                                  setIsFullscreen(true);
                                  triggerFeedback('Modo Tela Cheia ativado.');
                                }}
                                className="bg-black/60 hover:bg-[#8196b1] hover:text-white p-1 rounded text-white transition-colors"
                                title="Tela Cheia"
                              >
                                <Maximize2 className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Active Camera Video feed from patient Mariana Silva */}
                          <div className="absolute inset-0 z-0">
                            {isVideoActive && !isCamOff ? (
                              <img 
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=720&h=405" 
                                alt="Mariana Silva active video stream" 
                                className="w-full h-full object-cover transition-opacity duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center space-y-2 text-slate-500">
                                <VideoOff className="w-8 h-8 text-slate-600 animate-pulse" />
                                <span className="text-[10px] font-sans font-normal">Câmera indisponível</span>
                              </div>
                            )}
                          </div>

                          {/* Therapist Camera Picture-in-Picture window */}
                          <div className="absolute rounded-xl bg-slate-800 border-[0.5px] border-white/20 overflow-hidden shadow-lg z-20 transition-all duration-300 right-6 top-6 w-40 h-28">
                            <img 
                              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=180&h=120" 
                              alt="Therapist Stream" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-1 left-2 bg-black/60 px-1 rounded text-[7px] text-white font-mono">Lucas (Você)</div>
                          </div>

                          {/* Top Row indicators */}
                          <div className="flex items-center justify-between w-full z-10 relative">
                            <div className="bg-black/50 backdrop-blur-md border-[0.5px] border-white/10 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                              </span>
                              <span className="text-[8.5px] text-white font-display font-semibold tracking-wider">Conexão Criptografada</span>
                            </div>

                            <div className="bg-black/50 backdrop-blur-md border-[0.5px] border-white/10 rounded-lg px-2.5 py-1 flex items-center gap-1 text-white font-mono text-[10px] font-bold">
                              <Clock className="w-3 h-3 text-[#6AD8FF]" />
                              <span>{formatTime(timerSeconds)}</span>
                            </div>
                          </div>

                          {/* Base Row Control buttons */}
                          <div className="w-full z-10 relative flex justify-center items-center gap-2">
                            <div className="bg-black/65 backdrop-blur-md border-[0.5px] border-white/15 rounded-full px-4 py-2 flex items-center gap-4 shadow-xl">
                              
                              <button 
                                onClick={() => {
                                  setIsMuted(!isMuted);
                                  triggerFeedback(isMuted ? 'Áudio ativado.' : 'Áudio desativado.');
                                }}
                                className={`p-2 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'text-white hover:bg-white/20'}`}
                                title="Mutar"
                              >
                                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                              </button>

                              <button 
                                onClick={() => {
                                  setIsCamOff(!isCamOff);
                                  triggerFeedback(isCamOff ? 'Câmera ativada.' : 'Câmera desligada.');
                                }}
                                className={`p-2 rounded-full transition-colors ${isCamOff ? 'bg-red-500 text-white' : 'text-white hover:bg-white/20'}`}
                                title="Câmera"
                              >
                                {isCamOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                              </button>

                              <button 
                                onClick={() => {
                                  setIsSharingScreen(!isSharingScreen);
                                  triggerFeedback(isSharingScreen ? 'Tela suspensa.' : 'Compartilhando tela.');
                                }}
                                className={`p-2 rounded-full transition-colors ${isSharingScreen ? 'bg-[#6AD8FF] text-slate-900' : 'text-white hover:bg-white/20'}`}
                                title="Compartilhar Tela"
                              >
                                <Monitor className="w-4 h-4" />
                              </button>

                              {/* Botão de Alternância de Tela Cheia */}
                              <button 
                                onClick={() => {
                                  setIsFullscreen(!isFullscreen);
                                  triggerFeedback(isFullscreen ? 'Saindo do modo Tela Cheia.' : 'Modo Tela Cheia ativado.');
                                }}
                                className="p-2 rounded-full bg-[#8196b1]/50 text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
                                title={isFullscreen ? "Sair de Tela Cheia" : "Tela Cheia"}
                              >
                                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                              </button>

                              <button 
                                onClick={() => {
                                  setIsVideoActive(false);
                                  triggerFeedback('Teleatendimento suspenso.');
                                }}
                                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                                title="Encerrar"
                              >
                                <PhoneOff className="w-4 h-4" />
                              </button>
                              
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Microphone/Camera control panel below the mini-video */}
                    <div className="bg-slate-50 border-[0.5px] border-[#b8cce4]/75 rounded-xl p-3 space-y-3">
                      <span className="text-[9px] font-display font-semibold text-[#8196b1] uppercase tracking-wider block">Controles do Teleatendimento</span>
                      
                      <div className="flex items-center justify-around gap-2 bg-white border-[0.5px] border-[#b8cce4]/65 rounded-lg py-1.5 px-2">
                        <button 
                          onClick={() => {
                            setIsMuted(!isMuted);
                            triggerFeedback(isMuted ? 'Áudio ativado.' : 'Áudio mutado.');
                          }}
                          className={`p-1.5 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                          title="Microfone"
                        >
                          {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                        </button>

                        <button 
                          onClick={() => {
                            setIsCamOff(!isCamOff);
                            triggerFeedback(isCamOff ? 'Câmera ativada.' : 'Câmera desligada.');
                          }}
                          className={`p-1.5 rounded-full transition-colors ${isCamOff ? 'bg-red-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                          title="Câmera"
                        >
                          {isCamOff ? <VideoOff className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                        </button>

                        <button 
                          onClick={() => {
                            setIsSharingScreen(!isSharingScreen);
                            triggerFeedback(isSharingScreen ? 'Compartilhamento suspenso.' : 'Compartilhando tela.');
                          }}
                          className={`p-1.5 rounded-full transition-colors ${isSharingScreen ? 'bg-[#6AD8FF] text-slate-900' : 'text-slate-600 hover:bg-slate-100'}`}
                          title="Compartilhar Tela"
                        >
                          <Monitor className="w-3.5 h-3.5" />
                        </button>

                        <button 
                          onClick={() => {
                            setIsVideoActive(false);
                            triggerFeedback('Teleatendimento finalizado.');
                          }}
                          className="p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                          title="Encerrar"
                        >
                          <PhoneOff className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Return Button at the bottom of the left column */}
                  <div className="pt-4 border-t-[0.5px] border-[#b8cce4]/40">
                    <button
                      onClick={() => {
                        setViewModeProcesso2('atendimento');
                        triggerFeedback('Retornando ao Prontuário Rápido.');
                      }}
                      className="w-full bg-[#e6f2fc] text-slate-800 hover:bg-[#8fbdf1]/25 border-[0.5px] border-[#b8cce4] py-2.5 rounded-lg text-xs font-display font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    >
                      <Minimize2 className="w-3.5 h-3.5 text-[#8fbdf1]" />
                      Voltar para Prontuário Rápido
                    </button>
                  </div>
                </div>

                {/* Coluna da Direita (Ampla - 75% da largura = lg:col-span-9 com Rolagem Independente) */}
                <div className="lg:col-span-9 space-y-6 overflow-y-auto max-h-[660px] pr-2 scroll-smooth flex flex-col justify-between">
                  
                  <div className="space-y-6">
                    {/* Header layout in expanded report view */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b-[0.5px] border-[#b8cce4]/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border-[0.5px] border-[#b8cce4] overflow-hidden flex items-center justify-center bg-white shadow-xs">
                          <img 
                            src="/Frame 10 (1).svg" 
                            alt="logo" 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="font-display font-semibold text-lg text-slate-800">Relatório Clínico Expandido & Evolução</h2>
                          <p className="text-xs text-[#8196b1] font-sans font-normal mt-0.5">Mapeamento integrado de tendências psicoterapêuticas de Mariana Silva</p>
                        </div>
                      </div>
                    </div>

                    {/* Sub-grid of detailed clinical statistics */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left Side: SVG Evolution Charts in a structured display (lg:col-span-8) */}
                      <div className="lg:col-span-8 space-y-6">
                        
                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-display font-semibold text-slate-800 uppercase tracking-wider">Histórico de Indicadores Comportamentais (SVG Analytics)</h3>
                          <span className="text-[10px] text-[#6AD8FF] bg-[#e6f2fc] px-2 py-0.5 rounded font-mono font-semibold">Atualização em Tempo Real</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                          {/* Chart 1: Nível de Ansiedade */}
                          <div className="border-[0.5px] border-[#b8cce4] rounded-xl p-4 space-y-2 bg-white shadow-xs">
                            <div className="flex justify-between text-[10px] font-sans font-normal">
                              <span className="text-[#8196b1] font-semibold">Ansiedade (Hamilton)</span>
                              <span className="text-[#6AD8FF] font-bold font-mono">-35%</span>
                            </div>
                            <div className="h-24 w-full bg-slate-50/50 rounded-lg relative overflow-hidden flex items-end">
                              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                                <defs>
                                  <linearGradient id="expAnxietyGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#e6f2fc" stopOpacity="0.8"/>
                                    <stop offset="100%" stopColor="#e6f2fc" stopOpacity="0.0"/>
                                  </linearGradient>
                                </defs>
                                <path d="M 0 5 Q 25 8 50 18 T 100 24 L 100 30 L 0 30 Z" fill="url(#expAnxietyGrad)" />
                                <path d="M 0 5 Q 25 8 50 18 T 100 24" fill="none" stroke="#6AD8FF" strokeWidth="1.2" />
                                <circle cx="0" cy="5" r="1.5" fill="#6AD8FF" />
                                <circle cx="50" cy="18" r="1.5" fill="#6AD8FF" />
                                <circle cx="100" cy="24" r="1.5" fill="#6AD8FF" className="animate-pulse" />
                              </svg>
                            </div>
                            <span className="text-[9px] text-[#8196b1] block leading-tight font-sans font-normal">Queda progressiva nos picos de estresse.</span>
                          </div>

                          {/* Chart 2: Estresse */}
                          <div className="border-[0.5px] border-[#b8cce4] rounded-xl p-4 space-y-2 bg-white shadow-xs">
                            <div className="flex justify-between text-[10px] font-sans font-normal">
                              <span className="text-[#8196b1] font-semibold">Estresse Fisiológico</span>
                              <span className="text-[#6AD8FF] font-bold font-mono">Estável</span>
                            </div>
                            <div className="h-24 w-full bg-slate-50/50 rounded-lg relative overflow-hidden flex items-end">
                              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                                <path d="M 0 8 Q 20 22 40 10 T 80 18 T 100 12 L 100 30 L 0 30 Z" fill="#e6f2fc" opacity="0.4" />
                                <path d="M 0 8 Q 20 22 40 10 T 80 18 T 100 12" fill="none" stroke="#6AD8FF" strokeWidth="1.2" />
                                <circle cx="100" cy="12" r="1.5" fill="#6AD8FF" />
                              </svg>
                            </div>
                            <span className="text-[9px] text-[#8196b1] block leading-tight font-sans font-normal">Níveis indicam equilíbrio ativo.</span>
                          </div>

                          {/* Chart 3: Eficiência do Sono */}
                          <div className="border-[0.5px] border-[#b8cce4] rounded-xl p-4 space-y-2 bg-white shadow-xs">
                            <div className="flex justify-between text-[10px] font-sans font-normal">
                              <span className="text-[#8196b1] font-semibold">Qualidade do Sono</span>
                              <span className="text-emerald-600 font-bold font-mono">+18%</span>
                            </div>
                            <div className="h-24 w-full bg-slate-50/50 rounded-lg relative overflow-hidden flex items-end">
                              <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                                <path d="M 0 25 Q 30 20 60 12 T 100 6 L 100 30 L 0 30 Z" fill="#e6f2fc" opacity="0.5" />
                                <path d="M 0 25 Q 30 20 60 12 T 100 6" fill="none" stroke="#6AD8FF" strokeWidth="1.2" />
                                <circle cx="100" cy="6" r="1.5" fill="#6AD8FF" />
                              </svg>
                            </div>
                            <span className="text-[9px] text-[#8196b1] block leading-tight font-sans font-normal">Eficiência de sono em 84%.</span>
                          </div>

                        </div>

                        {/* PDF Uploader inside expanded panel */}
                        <div className="border-[0.5px] border-[#b8cce4] rounded-xl p-4 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                          <div className="space-y-0.5 text-left">
                            <span className="text-xs font-display font-semibold text-slate-800 block">Laudos e Encaminhamentos Adicionais</span>
                            <p className="text-[10px] text-[#8196b1] font-sans font-normal leading-normal">Insira e anexe arquivos em formato PDF para integrar ao prontuário eletrônico histórico.</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <input 
                              type="file" 
                              id="clinical-file-upload-pip" 
                              className="hidden" 
                              onChange={handleMockUpload} 
                              disabled={isUploading}
                            />
                            {isUploading ? (
                              <div className="w-48 bg-white border-[0.5px] border-[#b8cce4] rounded-lg p-2 text-center text-[10px] space-y-1">
                                <div className="flex justify-between text-[8px] text-[#8196b1]">
                                  <span>Processando PDF...</span>
                                  <span>{uploadProgress}%</span>
                                </div>
                                <div className="w-full bg-[#e6f2fc] h-1 rounded-full overflow-hidden">
                                  <div className="bg-[#8fbdf1] h-1 rounded-full transition-all duration-100" style={{ width: `${uploadProgress}%` }}></div>
                                </div>
                              </div>
                            ) : (
                              <label 
                                htmlFor="clinical-file-upload-pip"
                                className="bg-white hover:bg-slate-50 border-[0.5px] border-dashed border-[#b8cce4] text-slate-700 py-2.5 px-4 rounded-lg text-[10px] font-display font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                              >
                                <Upload className="w-3.5 h-3.5 text-[#8196b1]" />
                                Anexar Documento PDF
                              </label>
                            )}

                            {/* File lists */}
                            {attachedFiles.length > 0 && (
                              <span className="text-[9px] text-[#6AD8FF] bg-[#e6f2fc] px-2 py-1 rounded font-mono font-semibold">
                                {attachedFiles.length} Anexado(s)
                              </span>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Right Side: Timeline Sessions Past History (lg:col-span-4) */}
                      <div className="lg:col-span-4 space-y-4 border-l-[0.5px] border-[#b8cce4] lg:pl-6 bg-white">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-display font-semibold text-slate-800 uppercase tracking-wider">Histórico de Sessões</h3>
                          <Calendar className="w-4 h-4 text-[#8fbdf1]" />
                        </div>

                        <div className="relative pl-3 border-l-[0.5px] border-[#b8cce4] space-y-4 ml-1 pt-1 text-left">
                          {pastSessions.map((session) => {
                            const isSelected = selectedTimelineSession?.date === session.date;
                            return (
                              <div key={session.date} className="relative group">
                                <div className={`absolute -left-[16.5px] top-1.5 w-2.5 h-2.5 rounded-full border-[0.5px] transition-all ${
                                  isSelected ? 'bg-[#6AD8FF] border-[#6AD8FF] scale-110' : 'bg-white border-[#8196b1] group-hover:bg-[#8fbdf1]'
                                }`}></div>
                                
                                <div className="cursor-pointer" onClick={() => loadPastSession(session)}>
                                  <span className={`text-[10px] font-display font-semibold block ${isSelected ? 'text-[#6AD8FF]' : 'text-slate-800'}`}>
                                    {session.date}
                                  </span>
                                  <span className="text-[9px] text-[#8196b1] block leading-snug mt-0.5">
                                    {session.focus}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="bg-slate-50 border-[0.5px] border-[#b8cce4] p-3 rounded-lg text-left text-[9.5px] font-sans font-normal text-[#8196b1] space-y-1">
                          <div><strong className="text-slate-700 font-display">Identificação:</strong> Mariana Silva, 28 anos</div>
                          <div><strong className="text-slate-700 font-display">Status de Tratamento:</strong> Plano de Acompanhamento Ativo</div>
                          <div><strong className="text-slate-700 font-display">Conduta Estabelecida:</strong> {treatmentState === 'Manter' ? 'Manutenção Clínico Ativa' : treatmentState === 'Frequencia' ? `Alterada para ${freqLabel}` : 'Forward Gerado'}</div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Base Close/Save clinical options inside Expanded view */}
                  <div className="pt-5 border-t-[0.5px] border-[#b8cce4]/50 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setShowSaveModal(true);
                        setSaveSuccessState(false);
                      }}
                      className="bg-[#8fbdf1] hover:bg-[#8fbdf1]/90 text-white font-display font-semibold px-5 py-2.5 rounded-lg text-xs border-[0.5px] border-[#8fbdf1] transition-all shadow-[0_2px_4px_rgba(143,189,241,0.2)]"
                    >
                      Salvar Prontuário e Encerrar
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t-[0.5px] border-[#b8cce4] py-5 px-8 mt-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[#8196b1] text-[10px] font-sans font-normal">
          <div className="flex items-center gap-4">
            <span className="lowercase">acallme Tecnologia em Saúde Ltda.</span>
            <span>•</span>
            <a href="#privacidade" className="hover:text-slate-800 transition-colors">Privacidade</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Telepsicologia Criptografada</span>
          </div>
        </div>
      </footer>

      {/* GLASSMORPHIC COMPLETION MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border-[0.5px] border-[#b8cce4] rounded-2xl p-6 max-w-md w-full text-center space-y-5 shadow-2xl relative">
            
            {!saveSuccessState ? (
              <>
                <div className="w-10 h-10 rounded-full bg-[#e6f2fc] text-[#8fbdf1] flex items-center justify-center mx-auto border-[0.5px] border-[#b8cce4]">
                  <FileText className="w-5 h-5 text-[#8fbdf1]" />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="font-display font-semibold text-slate-800 text-sm">Salvar Atendimento Clínico?</h3>
                  <p className="text-xs text-[#8196b1] font-sans font-normal leading-relaxed">
                    Confirme o encerramento da consulta atual. O sumário de evolução será compartilhado na linha de cuidado com Mariana Silva.
                  </p>
                </div>

                <div className="bg-slate-50 border-[0.5px] border-[#b8cce4] p-3 rounded-lg text-left text-[10px] space-y-1.5 font-sans font-normal text-[#8196b1]">
                  <div><strong className="text-slate-700">Paciente:</strong> Mariana Silva</div>
                  <div><strong className="text-slate-700">Tratamento:</strong> {treatmentState === 'Manter' ? 'Manutenção do Plano' : treatmentState === 'Frequencia' ? `Ajuste para ${freqLabel}` : 'Encaminhamento Gerado'}</div>
                  <div><strong className="text-slate-700">Arquivos:</strong> {attachedFiles.length} documento(s) anexados</div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button 
                    onClick={() => setShowSaveModal(false)}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border-[0.5px] border-[#b8cce4] rounded-lg text-xs font-display font-semibold transition-colors"
                  >
                    Voltar e Editar
                  </button>
                  <button 
                    onClick={() => {
                      setSaveSuccessState(true);
                      triggerFeedback('Prontuário arquivado com sucesso.');
                    }}
                    className="px-5 py-2 bg-[#8fbdf1] hover:bg-[#8fbdf1]/90 text-white border-[0.5px] border-[#8fbdf1] rounded-lg text-xs font-display font-semibold transition-colors"
                  >
                    Confirmar Encerramento
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-5 py-3 animate-scaleUp">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-[0.5px] border-emerald-300 shadow-sm">
                  <Check className="w-6 h-6" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-semibold text-slate-800 text-sm">Atendimento Finalizado</h3>
                  <p className="text-xs text-[#8196b1] font-sans font-normal leading-relaxed font-light">
                    O prontuário criptografado foi enviado com sucesso. As recomendações foram integradas na área do paciente.
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      setShowSaveModal(false);
                      setSaveSuccessState(false);
                      setActiveProcess('processo1');
                      setAttachedFiles([]);
                      setViewModeProcesso2('atendimento');
                    }}
                    className="w-full px-5 py-2.5 bg-[#e6f2fc] text-[#8196b1] hover:text-slate-800 hover:bg-[#e6f2fc]/80 border-[0.5px] border-[#b8cce4] rounded-lg text-xs font-display font-semibold transition-all"
                  >
                    Retornar à Triagem de Pacientes
                  </button>
                </div>
              </div>
            )}

            <button 
              onClick={() => setShowSaveModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
