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
  Maximize2,
  Search,
  Sun,
  Bell,
  Home,
  TrendingUp,
  TrendingDown
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

// Unified premium inline vector logo component (never breaks or fails to resolve)
const AcallmeLogo = ({ className = "w-10 h-10" }) => (
  <svg 
    viewBox="0 0 721 647" 
    className={`${className} select-none`}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M307.472 69.4066C237.566 82.8436 178.107 122.561 138.452 182.31C78.6943 272.35 84.0529 391.802 151.253 467.594C158.498 475.766 164.403 485.104 164.374 488.345C164.345 491.588 160.758 499.988 156.402 507.011C139.806 533.784 137.797 540.265 143.435 548.817C149.398 557.85 149.819 557.868 206.215 551.632C265.388 545.091 318.816 530.054 350.868 510.925C386.916 489.411 438.22 443.123 464.354 408.534C489.701 374.984 499.829 349.872 499.964 320.253C500.08 293.934 494.728 278.901 479.951 264.066C452.557 236.557 398.54 236.528 369.127 264.008L360.059 272.478L346.763 261.177C324.676 242.399 289.709 235.624 263.266 244.997C231.734 256.171 212.731 283.923 212.676 318.874C212.605 361.135 229.144 390.346 286.234 448.797C306.408 469.452 322.304 486.959 321.558 487.703C320.809 488.443 313.168 492.044 304.576 495.703C280.502 505.951 242.606 515.001 214.511 517.211C190.325 519.113 189.184 518.909 191.589 513.112C197.404 499.107 200.396 482.723 198.506 475.243C197.394 470.847 188.55 458.418 178.852 447.625C144.544 409.44 130.644 368.414 133.017 312.333C137.485 206.669 207.471 127.353 316.682 104.191C347.776 97.5958 402.548 100.201 431.231 109.644C507.631 134.791 561.329 190.869 582.543 267.667C592.435 303.47 590.438 359.178 577.989 394.902C566.899 426.714 547.012 457.123 521.81 480.814C486.955 513.574 458.108 520.358 423.266 503.991C404.715 495.275 400.269 495.703 391.902 507.011C383.226 518.74 397.459 535.643 422.813 543.714C440.451 549.33 480.549 546.196 499.167 537.746C533.341 522.232 570.283 488.026 590.975 452.74C614.019 413.437 623.986 373.928 624 321.849C624.014 252.228 601.247 193.5 555.624 145.508C524.803 113.086 476.881 84.609 432.839 72.5479C406.907 65.4448 337.177 63.6985 307.472 69.4066ZM318.816 282.742C332.465 289.593 335.634 293.529 345.162 315.464C352.736 332.901 373.678 327.883 378.176 307.553C384.601 278.499 434.022 266.227 455.392 288.383C465.997 299.374 469.78 324.923 463.573 343.609C454.495 370.926 419.492 412.498 374.627 449.25L352.704 467.211L322.625 437.629C255.017 371.128 235.492 334.063 250.421 300.549C261.321 276.076 290.432 268.497 318.816 282.742Z" 
      fill="#8fbdf1"
    />
  </svg>
);

// Helper for SVG smooth Bezier curve calculation
const getCurvePath = (data, maxVal, minVal = 0) => {
  if (!data || data.length === 0) return '';
  const W = 420;
  const H = 140;
  const paddingLeft = 50;
  const paddingTop = 20;
  const points = data.map((v, i) => {
    const x = paddingLeft + i * 70;
    const range = maxVal - minVal;
    const y = (220 - 40) - ((v - minVal) / range) * H;
    return { x, y };
  });
  
  // Build path using cubic bezier approximation
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i+1];
    const cpX1 = p0.x + 35;
    const cpY1 = p0.y;
    const cpX2 = p1.x - 35;
    const cpY2 = p1.y;
    path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }
  return path;
};

// Helper for SVG smooth Bezier hourly curve calculation (8 points)
const getHourlyCurvePath = (data, maxVal, minVal = 0) => {
  if (!data || data.length === 0) return '';
  const W = 350; // width of chart area
  const H = 120; // height of chart area
  const paddingLeft = 40;
  const stepX = 50; // 8 points from 0 to 7 -> 7 * 50 = 350 width
  const points = data.map((v, i) => {
    const x = paddingLeft + i * stepX;
    const range = maxVal - minVal;
    const y = 150 - ((v - minVal) / range) * H; // 150 is the baseline of y
    return { x, y };
  });
  
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i+1];
    const cpX1 = p0.x + stepX / 2;
    const cpY1 = p0.y;
    const cpX2 = p1.x - stepX / 2;
    const cpY2 = p1.y;
    path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
  }
  return path;
};

function App() {
  // Navigation State
  const [activeProcess, setActiveProcess] = useState('processo1'); // 'processo1' | 'processo2'
  
  // View 1 States (Triagem & Recomendação)
  const [selectedDemanda, setSelectedDemanda] = useState('Ansiedade');
  const [selectedSintomas, setSelectedSintomas] = useState(['Insônia', 'Estresse']);
  const [budgetLimit, setBudgetLimit] = useState(405);
  const [isAnyPrice, setIsAnyPrice] = useState(true);
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
  
  // View 3 States (Painel Administrativo / Dashboard)
  const [activeDashboardTab, setActiveDashboardTab] = useState('users'); // 'users' | 'projects' | 'status'
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState(null);
  const [donutFocus, setDonutFocus] = useState(null); // null | 'PLANTÃO' | 'RODAS' | 'AGENDA'
  const [hoveredOnlineHour, setHoveredOnlineHour] = useState(null);
  const [hoveredPlantaoHour, setHoveredPlantaoHour] = useState(null);
  
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
    { id: 'Estresse', label: 'Estresse', type: 'cognitive' },
    { id: 'Irritabilidade', label: 'Irritabilidade', type: 'cognitive' },
    { id: 'Dificuldade de Foco', label: 'Dificuldade de Foco', type: 'cognitive' },
    { id: 'Procrastinação', label: 'Procrastinação Freq.', type: 'cognitive' },
    { id: 'Insegurança', label: 'Insegurança Social', type: 'cognitive' },
    { id: 'Fadiga Crônica', label: 'Fadiga Crônica', type: 'cognitive' },
    { id: 'Aperto no Peito', label: 'Aperto no Peito', type: 'cognitive' },
    // Sintomas Físicos
    { id: 'Tensão Muscular', label: 'Tensão Muscular', type: 'physical' },
    { id: 'Palpitações Cardíacas', label: 'Palpitações Cardíacas', type: 'physical' },
    { id: 'Falta de Ar', label: 'Falta de Ar', type: 'physical' },
    { id: 'Dores de Estômago', label: 'Dores de Estômago', type: 'physical' },
    { id: 'Insônia', label: 'Insônia', type: 'physical' },
    { id: 'Sudorese Excessiva', label: 'Sudorese Excessiva', type: 'physical' },
    { id: 'Fadiga Constante', label: 'Fadiga Constante', type: 'physical' },
    { id: 'Ondas de Calor/Frio', label: 'Ondas de Calor/Frio', type: 'physical' },
    { id: 'Alterações de Sono/Apetite', label: 'Alt. de Sono/Apetite', type: 'physical' }
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

  // Reset all filters helper for demo convenience
  const handleResetAllFilters = () => {
    setSelectedDemanda('Ansiedade');
    setSelectedSintomas([]);
    setBudgetLimit(405);
    setIsAnyPrice(true);
    setSelectedEspecialidade('Todos');
    triggerFeedback('Filtros redefinidos para os padrões da demonstração.');
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
      sintomasTratados: ['Estresse', 'Irritabilidade', 'Dificuldade de Foco', 'Procrastinação', 'Insegurança', 'Tensão Muscular', 'Fadiga Constante', 'Alterações de Sono/Apetite', 'Insônia'],
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
      sintomasTratados: ['Insônia', 'Estresse', 'Palpitações Cardíacas', 'Falta de Ar', 'Ondas de Calor/Frio', 'Sudorese Excessiva', 'Fadiga Crônica', 'Alterações de Sono/Apetite'],
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
      sintomasTratados: ['Estresse', 'Irritabilidade', 'Fadiga Crônica', 'Aperto no Peito', 'Tensão Muscular', 'Falta de Ar', 'Fadiga Constante', 'Ondas de Calor/Frio'],
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
      sintomasTratados: ['Insegurança', 'Procrastinação', 'Dificuldade de Foco', 'Estresse', 'Irritabilidade', 'Palpitações Cardíacas', 'Sudorese Excessiva'],
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
      sintomasTratados: ['Aperto no Peito', 'Estresse', 'Irritabilidade', 'Insegurança', 'Tensão Muscular', 'Dores de Estômago', 'Alterações de Sono/Apetite'],
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
      sintomasTratados: ['Dificuldade de Foco', 'Procrastinação', 'Estresse', 'Fadiga Crônica', 'Palpitações Cardíacas', 'Falta de Ar', 'Sudorese Excessiva', 'Insônia'],
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
      sintomasTratados: ['Estresse', 'Irritabilidade', 'Insegurança', 'Fadiga Crônica', 'Tensão Muscular', 'Dores de Estômago'],
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
      sintomasTratados: ['Estresse', 'Insegurança', 'Insônia', 'Procrastinação', 'Dificuldade de Foco', 'Alterações de Sono/Apetite'],
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
      sintomasTratados: ['Estresse', 'Fadiga Crônica', 'Fadiga Constante', 'Tensão Muscular', 'Dores de Estômago', 'Ondas de Calor/Frio'],
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
      sintomasTratados: ['Aperto no Peito', 'Estresse', 'Irritabilidade', 'Falta de Ar', 'Tensão Muscular', 'Ondas de Calor/Frio'],
      getBio: (demanda) => `Abordagem gestáltica focada na experiência do momento presente. Integração mente-corpo para alívio de sintomas de ansiedade e luto agudo.`
    },
    {
      id: 'dra-renata',
      name: 'Dra. Renata Vasconcelos',
      role: 'Psicóloga Social',
      registry: 'CRP 06/154920',
      price: 65, // Psicóloga R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 95,
      pills: ['Social', 'Acolhimento', 'Breve'],
      specialties: ['Ansiedade', 'Procrastinação'],
      sintomasTratados: ['Estresse', 'Insegurança', 'Procrastinação', 'Tensão Muscular', 'Insônia', 'Alterações de Sono/Apetite'],
      getBio: (demanda) => `Psicoterapia de abordagem humanista focada em acessibilidade social. Foco no manejo de ansiedade cotidiana, estresse ocupacional e regulação da procrastinação.`
    },
    {
      id: 'terapeuta-tiago',
      name: 'Tiago Mendes',
      role: 'Terapeuta Corporal',
      registry: 'CRT 05/88122',
      price: 80, // Terapeuta R$ 85 - 265
      unsplashUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 91,
      pills: ['Bioenergética', 'Somatic', 'Relaxamento'],
      specialties: ['Burnout', 'Ansiedade'],
      sintomasTratados: ['Tensão Muscular', 'Estresse', 'Palpitações Cardíacas', 'Sudorese Excessiva', 'Fadiga Constante', 'Ondas de Calor/Frio'],
      getBio: (demanda) => `Práticas corporais integrativas focadas na liberação de tensões somáticas e estresse crônico. Suporte físico a sintomas associados à exaustão e ansiedade.`
    },
    {
      id: 'dra-aline',
      name: 'Dra. Aline Moreira',
      role: 'Psicóloga Cognitiva',
      registry: 'CRP 06/123490',
      price: 110, // Psicóloga R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 93,
      pills: ['TCC', 'Hábitos', 'Produtividade'],
      specialties: ['Procrastinação', 'Ansiedade'],
      sintomasTratados: ['Dificuldade de Foco', 'Procrastinação', 'Estresse', 'Irritabilidade', 'Insônia', 'Fadiga Constante'],
      getBio: (demanda) => `Desenvolvimento de estratégias cognitivo-comportamentais para superação de procrastinação, organization de rotinas e tratamento de ansiedade moderada.`
    },
    {
      id: 'dr-arthur',
      name: 'Dr. Arthur Silva',
      role: 'Médico Psiquiatra',
      registry: 'CRM-SP 249015',
      price: 165, // Psiquiatra R$ 165 - 405
      unsplashUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 90,
      pills: ['Psiquiatria', 'Ansiedade Gen.', 'Prevenção'],
      specialties: ['Ansiedade', 'Burnout'],
      sintomasTratados: ['Insônia', 'Estresse', 'Palpitações Cardíacas', 'Falta de Ar', 'Sudorese Excessiva', 'Fadiga Crônica'],
      getBio: (demanda) => `Médico psiquiatra com foco em atendimento clínico integrativo de baixo custo. Diagnóstico precoce de estresse crônico e suporte medicamentoso seguro.`
    },
    {
      id: 'dr-marcelo',
      name: 'Dr. Marcelo Santos',
      role: 'Médico Psiquiatra',
      registry: 'CRM-SP 189234',
      price: 405, // Psiquiatra R$ 165 - 405
      unsplashUrl: 'https://images.unsplash.com/photo-1582750433449-64c3828df750?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 96,
      pills: ['Psiquiatria', 'Ansiedade Crônica', 'Especialista'],
      specialties: ['Burnout', 'Ansiedade'],
      sintomasTratados: ['Fadiga Crônica', 'Estresse', 'Palpitações Cardíacas', 'Falta de Ar', 'Insônia', 'Tensão Muscular'],
      getBio: (demanda) => `Especialista em psiquiatria intervencionista. Foco na remissão de sintomas somáticos graves associados a quadros de ${demanda.toLowerCase()}.`
    },
    {
      id: 'dra-vanessa',
      name: 'Dra. Vanessa Lima',
      role: 'Psicóloga Humanista',
      registry: 'CRP 06/182736',
      price: 75, // Psicóloga R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 92,
      pills: ['Existencial', 'Acolhimento', 'Foco no Luto'],
      specialties: ['Luto', 'Ansiedade'],
      sintomasTratados: ['Estresse', 'Dores de Estômago', 'Aperto no Peito', 'Ondas de Calor/Frio', 'Tensão Muscular', 'Alterações de Sono/Apetite'],
      getBio: (demanda) => `Abordagem fenomenológico-existencial focada na escuta atenta dos sintomas físicos e emocionais decorrentes do ${demanda.toLowerCase()}.`
    },
    {
      id: 'dra-juliana',
      name: 'Dra. Juliana Rocha',
      role: 'Psicóloga Cognitiva',
      registry: 'CRP 05/119283',
      price: 90, // Psicóloga R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 94,
      pills: ['TCC', 'Organização', 'Produtividade'],
      specialties: ['Procrastinação', 'Ansiedade'],
      sintomasTratados: ['Procrastinação', 'Dificuldade de Foco', 'Insegurança', 'Estresse', 'Insônia'],
      getBio: (demanda) => `Psicoterapia focada na quebra de ciclos de procrastinação associados a quadros de ${demanda.toLowerCase()} e estresse associado.`
    },
    {
      id: 'dr-fernando',
      name: 'Dr. Fernando Alencar',
      role: 'Terapeuta Integrativo',
      registry: 'CRT 04/99128',
      price: 130, // Terapeuta R$ 85 - 265
      unsplashUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 89,
      pills: ['Relaxamento', 'Mindfulness', 'Equilíbrio'],
      specialties: ['Burnout', 'Procrastinação'],
      sintomasTratados: ['Fadiga Constante', 'Estresse', 'Dificuldade de Foco', 'Tensão Muscular', 'Sudorese Excessiva'],
      getBio: (demanda) => `Terapias complementares e mindfulness para restabelecimento físico e mental contra o desgaste crônico e ${demanda.toLowerCase()}.`
    },
    {
      id: 'dr-ricardo',
      name: 'Dr. Ricardo Guedes',
      role: 'Psicólogo Clínico',
      registry: 'CRP 06/200394',
      price: 250, // Psicólogo R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 95,
      pills: ['Psicanálise', 'Ansiedade Crônica', 'Clínica'],
      specialties: ['Ansiedade', 'Burnout'],
      sintomasTratados: ['Tensão Muscular', 'Estresse', 'Palpitações Cardíacas', 'Insônia', 'Falta de Ar', 'Dores de Estômago'],
      getBio: (demanda) => `Atendimento clínico analítico para compreensão aprofundada dos sintomas físicos e psíquicos da ${demanda.toLowerCase()}.`
    },
    {
      id: 'dra-camila',
      name: 'Dra. Camila Naves',
      role: 'Terapeuta Corporal',
      registry: 'CRT 06/78891',
      price: 115, // Terapeuta R$ 85 - 265
      unsplashUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 91,
      pills: ['Somatic', 'Bioenergética', 'Trauma'],
      specialties: ['Luto', 'Ansiedade'],
      sintomasTratados: ['Tensão Muscular', 'Aperto no Peito', 'Falta de Ar', 'Ondas de Calor/Frio', 'Sudorese Excessiva', 'Fadiga Constante'],
      getBio: (demanda) => `Abordagem somática integrativa focada na dissolução da tensão muscular crônica decorrente de quadros de ${demanda.toLowerCase()}.`
    },
    {
      id: 'dr-henrique',
      name: 'Dr. Henrique Prado',
      role: 'Psicólogo Clínico',
      registry: 'CRP 06/90283',
      price: 310, // Psicólogo R$ 65 - 330
      unsplashUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 93,
      pills: ['TCC', 'Planejamento', 'Exaustão'],
      specialties: ['Procrastinação', 'Burnout'],
      sintomasTratados: ['Estresse', 'Dificuldade de Foco', 'Procrastinação', 'Fadiga Constante', 'Insônia', 'Alterações de Sono/Apetite'],
      getBio: (demanda) => `TCC direcionada a reabilitação de rotinas saudáveis e superação do desgaste de ${demanda.toLowerCase()}.`
    },
    {
      id: 'dra-marina',
      name: 'Dra. Marina Brandão',
      role: 'Médica Psiquiatra',
      registry: 'CRM-SP 289130',
      price: 280, // Psiquiatra R$ 165 - 405
      unsplashUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150',
      compatibility: 94,
      pills: ['Psiquiatria', 'Farmacoterapia', 'Sono'],
      specialties: ['Ansiedade', 'Luto'],
      sintomasTratados: ['Palpitações Cardíacas', 'Alterações de Sono/Apetite', 'Insônia', 'Falta de Ar', 'Sudorese Excessiva', 'Aperto no Peito'],
      getBio: (demanda) => `Suporte farmacoterápico seguro com foco em reajuste biológico para manifestações graves de ${demanda.toLowerCase()}.`
    }
  ];

  // Dynamic real-time filter logic for matched professionals list
  const filteredProfessionals = matchedProfessionals.filter(p => {
    // 1. Price Limit Slider Filter
    if (!isAnyPrice && p.price > budgetLimit) return false;
    
    // 2. Demand Category Filter
    if (selectedDemanda && !p.specialties.includes(selectedDemanda)) return false;
    
    // 3. Speciality Category Filter (Psicólogo, Psiquiatra, Terapeuta)
    if (selectedEspecialidade !== 'Todos') {
      if (selectedEspecialidade === 'Psicólogo' && p.role.indexOf('Psicólog') === -1) return false;
      if (selectedEspecialidade === 'Psiquiatra' && p.role.indexOf('Psiquiatr') === -1) return false;
      if (selectedEspecialidade === 'Terapeuta' && p.role.indexOf('Terapeuta') === -1) return false;
    }
    
    // 4. Symptoms Filter (Must match at least one selected symptom if any are selected)
    if (selectedSintomas.length > 0) {
      const matchesSymptom = p.sintomasTratados?.some(s => selectedSintomas.includes(s));
      if (!matchesSymptom) return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#e6f2fc]">
      
      {/* 1. HEADER & OFFICIAL FRAME 10 (1).SVG LOGO */}
      {activeProcess !== 'processo3' ? (
        <header className="border-b-[0.5px] border-[#b8cce4] px-8 py-4 sticky top-0 bg-white/95 backdrop-blur-md z-45 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Logo Brand Space */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-[0.5px] border-[#b8cce4] flex items-center justify-center bg-white shadow-sm overflow-hidden select-none">
                <AcallmeLogo className="w-10 h-10 object-contain" />
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
          </div>
        </header>
      ) : (
        <header className="border-b-[0.5px] border-[#b8cce4] px-8 py-4 sticky top-0 bg-white/95 backdrop-blur-md z-45 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Far Left: Logo & slogan */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-[0.5px] border-[#b8cce4] flex items-center justify-center bg-white shadow-sm overflow-hidden select-none">
                <AcallmeLogo className="w-10 h-10 object-contain" />
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

            {/* Center Navigation Grid */}
            <nav className="hidden lg:flex items-center space-x-5 text-[11px] font-display">
              <button className="flex items-center gap-1.5 bg-[#e6f2fc] text-slate-800 px-3 py-1.5 rounded-full font-semibold transition-all shadow-xs cursor-pointer">
                <Home className="w-3.5 h-3.5 text-[#8fbdf1]" />
                <span>Tops</span>
              </button>
              {['Profissionais', 'Usuários', 'Rodas de Conversa', 'Finanças', 'Suporte', 'Qualidade', 'Comunidade'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => triggerFeedback(`Acessando painel de ${item}...`)}
                  className="flex items-center gap-1 text-[#8196b1] hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <span>{item}</span>
                  <ChevronDown className="w-3 h-3 text-[#b8cce4]" />
                </button>
              ))}
            </nav>

            {/* Far Right Actions */}
            <div className="flex items-center gap-3">
              <button onClick={() => triggerFeedback('Busca global ativada...')} className="text-[#8196b1] hover:text-slate-800 transition-colors p-1.5 rounded-full hover:bg-slate-50 cursor-pointer" title="Pesquisar">
                <Search className="w-4 h-4" />
              </button>
              <button onClick={() => triggerFeedback('Alternância de tema simulada...')} className="text-[#8196b1] hover:text-slate-800 transition-colors p-1.5 rounded-full hover:bg-slate-50 cursor-pointer" title="Alternar Tema">
                <Sun className="w-4 h-4" />
              </button>
              <div className="relative">
                <button onClick={() => triggerFeedback('Notificações administrativas carregadas.')} className="text-[#8196b1] hover:text-slate-800 transition-colors p-1.5 rounded-full hover:bg-slate-50 cursor-pointer" title="Notificações">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="relative">
                <div className="w-8 h-8 rounded-full border-[0.5px] border-[#b8cce4] overflow-hidden bg-slate-100 shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Admin Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-[1.5px] border-white animate-pulse"></span>
              </div>
            </div>
          </div>
        </header>
      )}

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
              <div className="space-y-4">
                {/* Emocionais & Cognitivos */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-display font-semibold text-[#8196b1] uppercase tracking-wider">
                      Sintomas Emocionais & Cognitivos
                    </label>
                    <span className="text-[9px] text-[#8196b1] font-sans font-normal">
                      {selectedSintomas.filter(id => allSintomas.find(s => s.id === id && s.type === 'cognitive')).length} selecionados
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {allSintomas.filter(s => s.type === 'cognitive').map((sintoma) => {
                      const isSelected = selectedSintomas.includes(sintoma.id);
                      return (
                        <button
                          key={sintoma.id}
                          onClick={() => handleToggleSintoma(sintoma.id)}
                          className={`text-left px-3 py-2 rounded-lg text-xs font-sans font-normal transition-all duration-300 border-[0.5px] ${
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

                {/* Sintomas Físicos */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-display font-semibold text-[#8196b1] uppercase tracking-wider">
                      Sintomas Físicos
                    </label>
                    <span className="text-[9px] text-[#8196b1] font-sans font-normal">
                      {selectedSintomas.filter(id => allSintomas.find(s => s.id === id && s.type === 'physical')).length} selecionados
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {allSintomas.filter(s => s.type === 'physical').map((sintoma) => {
                      const isSelected = selectedSintomas.includes(sintoma.id);
                      return (
                        <button
                          key={sintoma.id}
                          onClick={() => handleToggleSintoma(sintoma.id)}
                          className={`text-left px-3 py-2 rounded-lg text-xs font-sans font-normal transition-all duration-300 border-[0.5px] ${
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
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-[10px] text-[#8196b1] font-sans">
                    <span className="font-display font-semibold uppercase tracking-wider text-[9px]">Preço Máximo de Consulta</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsAnyPrice(!isAnyPrice)}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-display font-semibold transition-all border-[0.5px] cursor-pointer ${
                          isAnyPrice 
                            ? 'bg-[#e6f2fc] text-slate-800 border-[#8fbdf1]' 
                            : 'bg-white text-[#8196b1] border-[#b8cce4]/70 hover:text-slate-700'
                        }`}
                      >
                        Qualquer valor
                      </button>
                      {!isAnyPrice && (
                        <span className="font-display font-semibold text-slate-700 bg-slate-50 border-[0.5px] border-[#b8cce4]/50 px-1.5 py-0.5 rounded">
                          Até R$ {budgetLimit}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative pt-1">
                    <input 
                      type="range" 
                      min="65" 
                      max="405" 
                      step="5"
                      disabled={isAnyPrice}
                      value={isAnyPrice ? 405 : budgetLimit}
                      onChange={(e) => {
                        setBudgetLimit(Number(e.target.value));
                        setIsAnyPrice(false);
                      }}
                      className={`w-full h-1 rounded-lg appearance-none cursor-pointer accent-[#8fbdf1] transition-all duration-300 ${
                        isAnyPrice ? 'bg-[#e6f2fc]/40 opacity-40 cursor-not-allowed' : 'bg-[#e6f2fc]'
                      }`} 
                    />
                    <div className="flex justify-between text-[8px] text-[#8196b1] font-sans mt-1">
                      <span>R$ 65</span>
                      <span>R$ 405</span>
                    </div>
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
                    const status = bookingState[prof.id] || 'idle';
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
                  <div className="border-[0.5px] border-dashed border-[#b8cce4] rounded-xl p-10 text-center space-y-4 bg-white animate-fadeIn">
                    <div className="w-10 h-10 rounded-full bg-[#e6f2fc] text-[#8fbdf1] flex items-center justify-center mx-auto border-[0.5px] border-[#b8cce4]/60 shadow-xs">
                      <Info className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-800 font-display font-semibold">Nenhum clínico encontrado</p>
                      <p className="text-[11px] text-[#8196b1] font-sans font-normal leading-relaxed max-w-xs mx-auto">
                        Não encontramos profissionais para a combinação atual de preço ({isAnyPrice ? 'Qualquer valor' : `Até R$ ${budgetLimit}`}), especialidade ({selectedEspecialidade}) ou sintomas selecionados.
                      </p>
                    </div>
                    <button
                      onClick={handleResetAllFilters}
                      className="bg-[#e6f2fc] hover:bg-[#8fbdf1]/20 text-[#8fbdf1] hover:text-slate-800 border-[0.5px] border-[#b8cce4]/70 px-4 py-2 rounded-lg text-[10px] font-display font-semibold transition-all shadow-xs cursor-pointer"
                    >
                      Limpar Filtros & Redefinir
                    </button>
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
                        <AcallmeLogo className="w-7 h-7 object-contain" />
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
                          <AcallmeLogo className="w-8 h-8 object-contain" />
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

        {/* VIEW 3: ADMINISTRATIVE CONTROL PANEL (PROCESSO 3) */}
        {activeProcess === 'processo3' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 2. Welcome & System Alerts Row (Two-Column Flex Grid) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Card - Performance Overview */}
              <div className="lg:col-span-8 border-[0.5px] border-[#b8cce4] rounded-2xl p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-xs">
                {/* Subtle background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6f2fc]/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="space-y-3 z-10 flex-1 text-left">
                  <span className="text-[10px] font-display font-semibold tracking-widest text-[#6AD8FF] uppercase">Visão de Performance</span>
                  <h2 className="text-2xl font-display font-semibold text-slate-800 tracking-tight">
                    Olá, beltrano!
                  </h2>
                  <p className="text-xs text-slate-700 font-sans font-normal leading-relaxed max-w-xl">
                    150 novos usuários cadastrados na plataforma nessa semana. Mais foco menos ansiedade. 🙏
                  </p>
                  <div className="flex gap-4 pt-1">
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-[#8196b1] block">Taxa de Conversão</span>
                      <span className="text-sm font-display font-semibold text-[#8fbdf1]">92.4%</span>
                    </div>
                    <div className="w-[1px] bg-[#b8cce4]/60"></div>
                    <div className="text-left">
                      <span className="text-[9px] uppercase tracking-wider text-[#8196b1] block">Satisfação (NPS)</span>
                      <span className="text-sm font-display font-semibold text-[#6AD8FF]">4.9 / 5.0</span>
                    </div>
                  </div>
                </div>
                
                {/* SVG Outline Illustration: Team collaborating with laptops */}
                <div className="w-full md:w-56 h-36 flex items-center justify-center z-10">
                  <svg viewBox="0 0 200 120" className="w-full h-full text-[#8196b1]">
                    {/* Table / Desk surface line */}
                    <path d="M 20 90 L 180 90" stroke="#b8cce4" strokeWidth="0.8" strokeLinecap="round" />
                    
                    {/* Center Laptop */}
                    <rect x="85" y="78" width="30" height="12" rx="1" fill="#e6f2fc" stroke="#8fbdf1" strokeWidth="0.8" />
                    <line x1="80" y1="90" x2="120" y2="90" stroke="#8fbdf1" strokeWidth="1.2" />
                    
                    {/* Left Person outline */}
                    <circle cx="60" cy="50" r="9" fill="none" stroke="#8fbdf1" strokeWidth="1" />
                    <path d="M 42 90 C 42 72 78 72 78 90 Z" fill="none" stroke="#b8cce4" strokeWidth="1" />
                    
                    {/* Right Person outline */}
                    <circle cx="140" cy="50" r="9" fill="none" stroke="#8fbdf1" strokeWidth="1" />
                    <path d="M 122 90 C 122 72 158 72 158 90 Z" fill="none" stroke="#b8cce4" strokeWidth="1" />
                    
                    {/* Connecting node points and flows */}
                    <path d="M 60 41 Q 100 20 140 41" fill="none" stroke="#b8cce4" strokeWidth="0.6" strokeDasharray="2 2" />
                    <circle cx="100" cy="30" r="3" fill="#6AD8FF" className="animate-ping" />
                    <circle cx="100" cy="30" r="2" fill="#6AD8FF" />
                    
                    {/* Small laptop lines */}
                    <path d="M 52 82 L 62 82 L 58 90 Z" fill="#e6f2fc" stroke="#6AD8FF" strokeWidth="0.8" />
                    <path d="M 148 82 L 138 82 L 142 90 Z" fill="#e6f2fc" stroke="#6AD8FF" strokeWidth="0.8" />
                  </svg>
                </div>
              </div>
              
              {/* Right Card - Red System Alert Container */}
              <div className="lg:col-span-4 border-[0.5px] border-red-200 rounded-2xl p-5 bg-red-50/10 flex flex-col justify-between shadow-xs text-left relative overflow-hidden">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <h3 className="font-display font-semibold text-red-700 text-xs uppercase tracking-wider">
                      Alerta!
                    </h3>
                  </div>
                  <p className="text-xs text-red-600 font-sans font-normal leading-relaxed">
                    Tempo médio de espera no chat de suporte técnico subiu para 12 minutos. Há 5 pacientes relatando problemas de áudio na chamada.
                  </p>
                </div>
                
                <div className="pt-4 mt-auto">
                  <button
                    onClick={() => triggerFeedback('Suporte Técnico acionado. Verificando conexões de áudio...')}
                    className="bg-[#e6f2fc] hover:bg-[#8fbdf1]/20 text-slate-800 border-[0.5px] border-[#b8cce4]/60 px-4 py-2 rounded-lg text-[10px] font-display font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    Suporte
                  </button>
                </div>
              </div>
            </div>

            {/* 2.5 SaaS Business Metrics Row (Horizontal Strip with Dividers) */}
            <div className="border-[0.5px] border-[#b8cce4] rounded-2xl bg-white shadow-xs p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#b8cce4]/50">
                
                {/* MRR */}
                <div className="text-left md:px-2 space-y-1">
                  <span className="text-[10px] text-[#8196b1] font-sans font-normal tracking-wide uppercase">
                    Receita Recorrente Mensal (MRR)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-display font-semibold text-slate-800">
                      R$ 148.500
                    </span>
                    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border-[0.5px] border-emerald-200 flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
                      +12.40%
                    </span>
                  </div>
                  <p className="text-[8px] text-[#8196b1] font-sans font-normal leading-normal">
                    Assinaturas recorrentes ativas na plataforma
                  </p>
                </div>

                {/* CAC */}
                <div className="text-left pt-4 md:pt-0 md:pl-6 space-y-1">
                  <span className="text-[10px] text-[#8196b1] font-sans font-normal tracking-wide uppercase">
                    Custo de Aquisição (CAC)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-display font-semibold text-slate-800">
                      R$ 48,50
                    </span>
                    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border-[0.5px] border-emerald-200 flex items-center gap-0.5">
                      <TrendingDown className="w-2.5 h-2.5 text-emerald-600" />
                      -6.20%
                    </span>
                  </div>
                  <p className="text-[8px] text-[#8196b1] font-sans font-normal leading-normal">
                    Média de investimento em marketing por usuário
                  </p>
                </div>

                {/* LTV */}
                <div className="text-left pt-4 md:pt-0 md:pl-6 space-y-1">
                  <span className="text-[10px] text-[#8196b1] font-sans font-normal tracking-wide uppercase">
                    Lifetime Value (LTV)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-display font-semibold text-slate-800">
                      R$ 692,00
                    </span>
                    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border-[0.5px] border-emerald-200 flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
                      +15.03%
                    </span>
                  </div>
                  <p className="text-[8px] text-[#8196b1] font-sans font-normal leading-normal">
                    Valor gerado pelo cliente ao longo da jornada
                  </p>
                </div>

                {/* Partner Churn */}
                <div className="text-left pt-4 md:pt-0 md:pl-6 space-y-1">
                  <span className="text-[10px] text-[#8196b1] font-sans font-normal tracking-wide uppercase">
                    Evasão de Parceiros (Churn)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-display font-semibold text-slate-800">
                      2,4%
                    </span>
                    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border-[0.5px] border-emerald-200 flex items-center gap-0.5">
                      <TrendingDown className="w-2.5 h-2.5 text-emerald-600" />
                      -0.45%
                    </span>
                  </div>
                  <p className="text-[8px] text-[#8196b1] font-sans font-normal leading-normal">
                    Taxa de churn de clínicas parceiras (mensal)
                  </p>
                </div>

              </div>
            </div>
            
            {/* 3. Main Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
              
              {/* Column A - User Growth Chart (50% Width = lg:col-span-2) */}
              <div className="lg:col-span-2 border-[0.5px] border-[#b8cce4] rounded-2xl p-5 bg-white flex flex-col justify-between shadow-xs">
                <div>
                  {/* Top Abas Selector */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b-[0.5px] border-[#b8cce4]/40">
                    <h3 className="text-xs font-display font-semibold text-slate-800 uppercase tracking-wider text-left">
                      Evolução de Usuários
                    </h3>
                    <div className="flex gap-1">
                      {[
                        { id: 'users', label: 'Total de Usuários' },
                        { id: 'projects', label: 'Total Projects' },
                        { id: 'status', label: 'Operating Status' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveDashboardTab(tab.id);
                            triggerFeedback(`Exibindo dados de: ${tab.label}`);
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-[9px] font-display font-semibold transition-all cursor-pointer ${
                            activeDashboardTab === tab.id
                              ? 'bg-[#e6f2fc] text-slate-800 border-[0.5px] border-[#8fbdf1]'
                              : 'text-[#8196b1] hover:text-slate-800 hover:bg-slate-50'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Chart Content Area */}
                  <div className="relative mt-6 h-60 w-full">
                    {/* Tooltip Overlay */}
                    {hoveredMonthIndex !== null && (
                      <div 
                        className="absolute bg-white border-[0.5px] border-[#b8cce4] rounded-xl p-3 shadow-lg z-30 pointer-events-none text-left space-y-1"
                        style={{
                          left: `${Math.max(10, Math.min(270, 20 + hoveredMonthIndex * 58))}px`,
                          top: '10px'
                        }}
                      >
                        <span className="text-[9px] uppercase tracking-wider text-[#8196b1] font-display font-semibold block">
                          {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'][hoveredMonthIndex]}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-4 justify-between">
                            <span className="text-[10px] text-slate-700">Ano Atual:</span>
                            <span className="text-xs font-display font-semibold text-[#8fbdf1] font-mono">
                              {activeDashboardTab === 'users' && `${(12000 + hoveredMonthIndex * 3200).toLocaleString('pt-BR')}`}
                              {activeDashboardTab === 'projects' && `${(450 + hoveredMonthIndex * 78).toLocaleString('pt-BR')}`}
                              {activeDashboardTab === 'status' && `${[98.2, 99.1, 98.9, 99.5, 99.8, 99.3, 99.9][hoveredMonthIndex]}%`}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 justify-between">
                            <span className="text-[10px] text-[#8196b1]">Ano Passado:</span>
                            <span className="text-xs font-display font-semibold text-[#b8cce4] font-mono">
                              {activeDashboardTab === 'users' && `${(9000 + hoveredMonthIndex * 2250).toLocaleString('pt-BR')}`}
                              {activeDashboardTab === 'projects' && `${(300 + hoveredMonthIndex * 63).toLocaleString('pt-BR')}`}
                              {activeDashboardTab === 'status' && `${[95.5, 96.2, 97.0, 96.8, 97.5, 98.1, 98.5][hoveredMonthIndex]}%`}
                            </span>
                          </div>
                          <div className="w-full h-[0.5px] bg-[#b8cce4]/40 my-1"></div>
                          <div className="flex items-center justify-between text-[9px]">
                            <span className="text-slate-600 font-semibold">Crescimento:</span>
                            <span className="text-emerald-600 font-bold font-mono">
                              {activeDashboardTab === 'users' && '+38.6%'}
                              {activeDashboardTab === 'projects' && '+35.3%'}
                              {activeDashboardTab === 'status' && '+1.4%'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 220" preserveAspectRatio="none">
                      {/* Grid Horizontal reference Lines */}
                      {[0, 1, 2, 3].map((tickIdx) => {
                        const y = 20 + tickIdx * 46;
                        return (
                          <g key={tickIdx}>
                            <line x1="50" y1={y} x2="470" y2={y} stroke="#b8cce4" strokeWidth="0.4" strokeDasharray="2 2" />
                            {/* Y Axis Labels */}
                            <text x="15" y={y + 3} className="text-[9px] fill-[#8196b1] font-sans font-normal text-right font-mono" textAnchor="start">
                              {activeDashboardTab === 'users' && `${(30000 - tickIdx * 10000).toLocaleString('pt-BR')}`}
                              {activeDashboardTab === 'projects' && `${1000 - tickIdx * 300}`}
                              {activeDashboardTab === 'status' && `${100 - tickIdx * 3}%`}
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* X Axis Month Labels */}
                      {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'].map((m, idx) => {
                        const x = 50 + idx * 70;
                        return (
                          <text key={m} x={x} y="205" className="text-[10px] fill-[#8196b1] font-display font-semibold" textAnchor="middle">
                            {m}
                          </text>
                        );
                      })}
                      
                      {/* Dynamic Curves representation */}
                      {(() => {
                        const currentData = {
                          users: [12000, 15000, 18500, 22000, 24000, 27500, 31200],
                          projects: [450, 520, 610, 580, 710, 850, 920],
                          status: [98.2, 99.1, 98.9, 99.5, 99.8, 99.3, 99.9]
                        }[activeDashboardTab];
                        
                        const lastData = {
                          users: [9000, 11000, 13000, 15000, 17500, 20000, 22500],
                          projects: [300, 350, 420, 490, 530, 600, 680],
                          status: [95.5, 96.2, 97.0, 96.8, 97.5, 98.1, 98.5]
                        }[activeDashboardTab];
                        
                        const maxVal = { users: 35000, projects: 1000, status: 100 }[activeDashboardTab];
                        const minVal = { users: 0, projects: 0, status: 90 }[activeDashboardTab];
                        
                        const currentPath = getCurvePath(currentData, maxVal, minVal);
                        const lastPath = getCurvePath(lastData, maxVal, minVal);
                        
                        let hoverPoints = null;
                        if (hoveredMonthIndex !== null) {
                          const range = maxVal - minVal;
                          const x = 50 + hoveredMonthIndex * 70;
                          const yCurr = 180 - ((currentData[hoveredMonthIndex] - minVal) / range) * 140;
                          const yLast = 180 - ((lastData[hoveredMonthIndex] - minVal) / range) * 140;
                          hoverPoints = { x, yCurr, yLast };
                        }
                        
                        return (
                          <>
                            <defs>
                              <linearGradient id="dashboardGradCurrent" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8fbdf1" stopOpacity="0.25"/>
                                <stop offset="100%" stopColor="#8fbdf1" stopOpacity="0.0"/>
                              </linearGradient>
                            </defs>
                            
                            {/* Current Year Filled Area */}
                            <path 
                              d={`${currentPath} L ${50 + 6 * 70} 180 L 50 180 Z`} 
                              fill="url(#dashboardGradCurrent)" 
                            />
                            
                            {/* Last Year Curve (Dashed line) */}
                            <path 
                              d={lastPath} 
                              fill="none" 
                              stroke="#b8cce4" 
                              strokeWidth="1.5" 
                              strokeDasharray="4 4" 
                            />
                            
                            {/* Current Year Curve (Solid line) */}
                            <path 
                              d={currentPath} 
                              fill="none" 
                              stroke="#8fbdf1" 
                              strokeWidth="2.5" 
                            />
                            
                            {/* Hover Dotted Guide */}
                            {hoverPoints && (
                              <line 
                                x1={hoverPoints.x} 
                                y1="20" 
                                x2={hoverPoints.x} 
                                y2="180" 
                                stroke="#8fbdf1" 
                                strokeWidth="0.8" 
                                strokeDasharray="3 3" 
                              />
                            )}
                            
                            {/* Interactive Hover Nodes */}
                            {currentData.map((v, i) => {
                              const range = maxVal - minVal;
                              const cx = 50 + i * 70;
                              const cy = 180 - ((v - minVal) / range) * 140;
                              const isHovered = hoveredMonthIndex === i;
                              return (
                                <circle 
                                  key={`c-${i}`} 
                                  cx={cx} 
                                  cy={cy} 
                                  r={isHovered ? 4.5 : 2.5} 
                                  fill="#8fbdf1" 
                                  stroke="#ffffff"
                                  strokeWidth="1"
                                />
                              );
                            })}
                            
                            {lastData.map((v, i) => {
                              const range = maxVal - minVal;
                              const cx = 50 + i * 70;
                              const cy = 180 - ((v - minVal) / range) * 140;
                              const isHovered = hoveredMonthIndex === i;
                              return (
                                <circle 
                                  key={`l-${i}`} 
                                  cx={cx} 
                                  cy={cy} 
                                  r={isHovered ? 3.5 : 1.5} 
                                  fill="#b8cce4" 
                                  stroke="#ffffff"
                                  strokeWidth="1"
                                />
                              );
                            })}
                            
                            {hoverPoints && (
                              <>
                                <circle cx={hoverPoints.x} cy={hoverPoints.yCurr} r="6" fill="#8fbdf1" opacity="0.3" className="animate-ping" />
                                <circle cx={hoverPoints.x} cy={hoverPoints.yCurr} r="4" fill="#6AD8FF" stroke="#ffffff" strokeWidth="1.5" />
                              </>
                            )}
                            
                            {/* Hover Active zones rects */}
                            {currentData.map((_, i) => {
                              const x = 50 + i * 70 - 35;
                              return (
                                <rect
                                  key={`zone-${i}`}
                                  x={x}
                                  y="10"
                                  width="70"
                                  height="180"
                                  fill="transparent"
                                  className="cursor-pointer"
                                  onMouseEnter={() => setHoveredMonthIndex(i)}
                                  onMouseLeave={() => setHoveredMonthIndex(null)}
                                />
                              );
                            })}
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
                
                {/* Legend at bottom of Growth Chart */}
                <div className="flex items-center justify-start gap-4 pt-4 border-t-[0.5px] border-[#b8cce4]/40 text-[10px] font-sans font-normal text-[#8196b1]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#8fbdf1] inline-block"></span>
                    <span className="font-semibold text-slate-800">Ano atual</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t border-dashed border-[#b8cce4] inline-block"></span>
                    <span>Ano passado</span>
                  </div>
                </div>
              </div>
              
              {/* Column B - Professional Activity (25% Width -> lg:col-span-1) */}
              <div className="lg:col-span-1 border-[0.5px] border-[#b8cce4] rounded-2xl p-5 bg-white flex flex-col justify-between shadow-xs text-left h-full">
                <div>
                  <h4 className="text-xs font-display font-semibold text-slate-800 uppercase tracking-wider">
                    Atividade dos Profissionais
                  </h4>
                  <span className="text-[10px] text-[#8196b1] font-sans font-normal block mt-1 leading-normal">
                    Fluxo de entrada e saída diário de terapeutas parceiros
                  </span>
                </div>
                
                {/* Professional Activity SVG */}
                <div className="h-44 w-full mt-6 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
                    {/* Grid Reference lines */}
                    {[0, 1, 2, 3].map((i) => (
                      <line 
                        key={i} 
                        x1="20" 
                        y1="10 + i * 26" 
                        x2="180" 
                        y2="10 + i * 26" 
                        stroke="#b8cce4" 
                        strokeWidth="0.3" 
                        strokeDasharray="2 2" 
                      />
                    ))}
                    
                    {/* Entrada Curve (Green) */}
                    <path 
                      d="M 20 40 C 47.5 15, 47.5 15, 75 15 C 102.5 15, 102.5 65, 130 65 C 157.5 65, 157.5 30, 185 30" 
                      fill="none" 
                      stroke="#10B981" 
                      strokeWidth="1.8" 
                      strokeLinecap="round"
                    />
                    
                    {/* Saída Curve (Red) */}
                    <path 
                      d="M 20 75 C 47.5 55, 47.5 55, 75 55 C 102.5 55, 102.5 25, 130 25 C 157.5 25, 157.5 60, 185 60" 
                      fill="none" 
                      stroke="#EF4444" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                    />
                    
                    {/* Highlighted marker with inline tooltip bubble value "32" at 8:00 (x=20, y=40) */}
                    <g transform="translate(20, 40)">
                      {/* Marker Dot */}
                      <circle cx="0" cy="0" r="3.5" fill="#10B981" stroke="#ffffff" strokeWidth="1.2" />
                      
                      {/* Custom bubble indicator */}
                      <polygon points="-3,-10 3,-10 0,-6" fill="#10B981" />
                      <rect x="-10" y="-23" width="20" height="13" rx="3" fill="#10B981" />
                      <text x="0" y="-14" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">32</text>
                    </g>
                    
                    {/* X-axis labels */}
                    {['8:00', '12:00', '16:00', '20:00'].map((time, idx) => (
                      <text 
                        key={time} 
                        x={20 + idx * 55} 
                        y="95" 
                        className="text-[9px] fill-[#8196b1] font-sans font-normal" 
                        textAnchor="middle"
                      >
                        {time}
                      </text>
                    ))}
                  </svg>
                </div>
                
                {/* Legend below Activity */}
                <div className="flex gap-4 pt-4 text-[10px] font-sans font-normal text-[#8196b1] border-t-[0.5px] border-[#b8cce4]/40 mt-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Entrada
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Saída
                  </span>
                </div>
              </div>
              
              {/* Column C - Services Distribution Breakdown (25% Width -> lg:col-span-1) */}
              <div className="lg:col-span-1 border-[0.5px] border-[#b8cce4] rounded-2xl p-5 bg-white flex flex-col justify-between shadow-xs">
                
                <div className="space-y-1 text-left">
                  <h4 className="text-[10px] font-display font-semibold text-slate-800 uppercase tracking-wider">
                    Serviços Usados
                  </h4>
                  <span className="text-[8px] text-[#8196b1] font-sans font-normal leading-normal block -mt-0.5">
                    Proporção de engajamento clínico
                  </span>
                </div>
                
                {/* SVG Donut Chart with Cutout */}
                <div className="relative flex items-center justify-center py-6">
                  <svg className="w-36 h-36 transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
                    {/* Background track circle */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#f1f5f9" 
                      strokeWidth="10" 
                    />
                    
                    {/* Segment AGENDA (51% dominance) - yellow */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#F4B942" 
                      strokeWidth={donutFocus === 'AGENDA' ? 13 : 10} 
                      strokeDasharray="128.18 251.33" 
                      strokeDashoffset="0"
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setDonutFocus(donutFocus === 'AGENDA' ? null : 'AGENDA');
                        triggerFeedback('Focando no segmento: AGENDA (51%)');
                      }}
                    />
                    
                    {/* Segment PLANTÃO (29%) - indigo/purple */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#6E5494" 
                      strokeWidth={donutFocus === 'PLANTÃO' ? 13 : 10} 
                      strokeDasharray="72.89 251.33" 
                      strokeDashoffset="-128.18"
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setDonutFocus(donutFocus === 'PLANTÃO' ? null : 'PLANTÃO');
                        triggerFeedback('Focando no segmento: PLANTÃO (29%)');
                      }}
                    />
                    
                    {/* Segment RODAS (20%) - red/orange */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      fill="transparent" 
                      stroke="#D95D39" 
                      strokeWidth={donutFocus === 'RODAS' ? 13 : 10} 
                      strokeDasharray="50.26 251.33" 
                      strokeDashoffset="-201.07"
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setDonutFocus(donutFocus === 'RODAS' ? null : 'RODAS');
                        triggerFeedback('Focando no segmento: RODAS (20%)');
                      }}
                    />
                  </svg>
                  
                  {/* Clean Center Cutout displaying Focused Percentage */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-display font-semibold text-slate-800 tracking-tight leading-none">
                      {donutFocus === 'PLANTÃO' && '29%'}
                      {donutFocus === 'RODAS' && '20%'}
                      {donutFocus === 'AGENDA' && '51%'}
                      {donutFocus === null && '51%'}
                    </span>
                    <span className="text-[8px] font-sans font-normal text-[#8196b1] tracking-wider uppercase mt-1">
                      {donutFocus === 'PLANTÃO' && 'PLANTÃO'}
                      {donutFocus === 'RODAS' && 'RODAS'}
                      {donutFocus === 'AGENDA' && 'AGENDA'}
                      {donutFocus === null && 'AGENDA'}
                    </span>
                  </div>
                </div>
                
                {/* Legend pills matching the colors at the base */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-4 border-t-[0.5px] border-[#b8cce4]/40">
                  {[
                    { id: 'PLANTÃO', color: 'bg-[#6E5494]', label: 'Plantão' },
                    { id: 'RODAS', color: 'bg-[#D95D39]', label: 'Rodas' },
                    { id: 'AGENDA', color: 'bg-[#F4B942]', label: 'Agenda' }
                  ].map((pill) => {
                    const focused = donutFocus === pill.id;
                    return (
                      <button
                        key={pill.id}
                        onClick={() => {
                          setDonutFocus(focused ? null : pill.id);
                          triggerFeedback(focused ? 'Removendo foco do segmento.' : `Focando em ${pill.label}`);
                        }}
                        className={`px-2 py-1 rounded-full text-[8px] font-display font-semibold flex items-center gap-1.5 transition-all cursor-pointer border-[0.5px] ${
                          focused 
                            ? 'bg-[#e6f2fc] text-slate-800 border-[#8fbdf1] scale-105 shadow-xs' 
                            : 'bg-slate-50 text-[#8196b1] border-[#b8cce4]/40 hover:bg-slate-100 hover:text-slate-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${pill.color}`}></span>
                        <span>{pill.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. Triage & Online Patients Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mt-6">
              
              {/* Card A - Online Patients Peak Hours */}
              <div className="border-[0.5px] border-[#b8cce4] rounded-2xl p-5 bg-white flex flex-col justify-between shadow-xs">
                <div>
                  <h3 className="text-xs font-display font-semibold text-slate-800 uppercase tracking-wider text-left">
                    Pacientes Online Procurando Profissional
                  </h3>
                  <span className="text-[10px] text-[#8196b1] font-sans font-normal block mt-1 leading-normal text-left">
                    Horários de pico de pacientes navegando e aplicando filtros na plataforma
                  </span>
                  
                  {/* Chart Container */}
                  <div className="relative mt-6 h-48 w-full">
                    {/* Tooltip Overlay */}
                    {hoveredOnlineHour !== null && (
                      <div 
                        className="absolute bg-white border-[0.5px] border-[#b8cce4] rounded-xl p-3 shadow-lg z-30 pointer-events-none text-left space-y-1 animate-fadeIn"
                        style={{
                          left: `${Math.max(10, Math.min(260, 10 + hoveredOnlineHour * 42))}px`,
                          top: '10px'
                        }}
                      >
                        <span className="text-[9px] uppercase tracking-wider text-[#8196b1] font-display font-semibold block">
                          {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'][hoveredOnlineHour]}
                        </span>
                        <div className="flex items-center gap-4 justify-between">
                          <span className="text-[10px] text-slate-700">Pacientes Ativos:</span>
                          <span className="text-xs font-display font-semibold text-[#8fbdf1] font-mono">
                            {[18, 35, 48, 29, 36, 52, 68, 22][hoveredOnlineHour]}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 420 180" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="onlineGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8fbdf1" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#8fbdf1" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Grid Reference lines */}
                      {[0, 1, 2, 3].map((tickIdx) => {
                        const y = 30 + tickIdx * 40;
                        return (
                          <g key={tickIdx}>
                            <line x1="40" y1={y} x2="390" y2={y} stroke="#b8cce4" strokeWidth="0.4" strokeDasharray="2 2" />
                            <text x="10" y={y + 3} className="text-[8px] fill-[#8196b1] font-sans font-normal text-right font-mono" textAnchor="start">
                              {80 - tickIdx * 20}
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* X Axis Hours Labels */}
                      {['08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'].map((h, idx) => {
                        const x = 40 + idx * 50;
                        return (
                          <text key={h} x={x} y="172" className="text-[9px] fill-[#8196b1] font-display font-semibold" textAnchor="middle">
                            {h}
                          </text>
                        );
                      })}
                      
                      {/* Curves */}
                      {(() => {
                        const onlineData = [18, 35, 48, 29, 36, 52, 68, 22];
                        const curvePath = getHourlyCurvePath(onlineData, 80);
                        
                        let hoverPoints = null;
                        if (hoveredOnlineHour !== null) {
                          const x = 40 + hoveredOnlineHour * 50;
                          const y = 150 - (onlineData[hoveredOnlineHour] / 80) * 120;
                          hoverPoints = { x, y };
                        }
                        
                        return (
                          <>
                            {/* Area Fill */}
                            <path d={`${curvePath} L 390 150 L 40 150 Z`} fill="url(#onlineGrad)" />
                            
                            {/* Line Stroke */}
                            <path d={curvePath} fill="none" stroke="#8fbdf1" strokeWidth="2.2" strokeLinecap="round" />
                            
                            {/* Dotted hover line */}
                            {hoverPoints && (
                              <line x1={hoverPoints.x} y1="30" x2={hoverPoints.x} y2="150" stroke="#8fbdf1" strokeWidth="0.8" strokeDasharray="2 2" />
                            )}
                            
                            {/* All Nodes */}
                            {onlineData.map((v, idx) => {
                              const cx = 40 + idx * 50;
                              const cy = 150 - (v / 80) * 120;
                              const isHovered = hoveredOnlineHour === idx;
                              return (
                                <circle 
                                  key={`o-${idx}`} 
                                  cx={cx} 
                                  cy={cy} 
                                  r={isHovered ? 4.5 : 2.5} 
                                  fill="#8fbdf1" 
                                  stroke="#ffffff" 
                                  strokeWidth="1" 
                                />
                              );
                            })}
                            
                            {/* Hover Ping */}
                            {hoverPoints && (
                              <>
                                <circle cx={hoverPoints.x} cy={hoverPoints.y} r="6" fill="#8fbdf1" opacity="0.3" className="animate-ping" />
                                <circle cx={hoverPoints.x} cy={hoverPoints.y} r="3.5" fill="#6AD8FF" stroke="#ffffff" strokeWidth="1.5" />
                              </>
                            )}
                            
                            {/* Transparent Clickable Hover Zones */}
                            {onlineData.map((_, idx) => {
                              const x = 40 + idx * 50 - 25;
                              return (
                                <rect
                                  key={`online-zone-${idx}`}
                                  x={x}
                                  y="20"
                                  width="50"
                                  height="130"
                                  fill="transparent"
                                  className="cursor-pointer"
                                  onMouseEnter={() => setHoveredOnlineHour(idx)}
                                  onMouseLeave={() => setHoveredOnlineHour(null)}
                                />
                              );
                            })}
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card B - Duty Queue Triage Peak Hours */}
              <div className="border-[0.5px] border-[#b8cce4] rounded-2xl p-5 bg-white flex flex-col justify-between shadow-xs">
                <div>
                  <h3 className="text-xs font-display font-semibold text-slate-800 uppercase tracking-wider text-left">
                    Pacientes querendo ser atendidos no Plantão
                  </h3>
                  <span className="text-[10px] text-[#8196b1] font-sans font-normal block mt-1 leading-normal text-left">
                    Fluxo de pacientes abrindo chamadas de triagem de urgência na fila de plantão
                  </span>
                  
                  {/* Chart Container */}
                  <div className="relative mt-6 h-48 w-full">
                    {/* Tooltip Overlay */}
                    {hoveredPlantaoHour !== null && (
                      <div 
                        className="absolute bg-white border-[0.5px] border-[#b8cce4] rounded-xl p-3 shadow-lg z-30 pointer-events-none text-left space-y-1 animate-fadeIn"
                        style={{
                          left: `${Math.max(10, Math.min(260, 10 + hoveredPlantaoHour * 42))}px`,
                          top: '10px'
                        }}
                      >
                        <span className="text-[9px] uppercase tracking-wider text-[#8196b1] font-display font-semibold block">
                          {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'][hoveredPlantaoHour]}
                        </span>
                        <div className="flex items-center gap-4 justify-between">
                          <span className="text-[10px] text-slate-700">Na Fila do Plantão:</span>
                          <span className="text-xs font-display font-semibold text-[#6E5494] font-mono">
                            {[3, 11, 24, 8, 15, 30, 42, 12][hoveredPlantaoHour]} p.
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 420 180" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="plantaoGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6E5494" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#6E5494" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Grid Reference lines */}
                      {[0, 1, 2, 3].map((tickIdx) => {
                        const y = 30 + tickIdx * 40;
                        return (
                          <g key={tickIdx}>
                            <line x1="40" y1={y} x2="390" y2={y} stroke="#b8cce4" strokeWidth="0.4" strokeDasharray="2 2" />
                            <text x="10" y={y + 3} className="text-[8px] fill-[#8196b1] font-sans font-normal text-right font-mono" textAnchor="start">
                              {50 - tickIdx * 12.5}
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* X Axis Hours Labels */}
                      {['08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'].map((h, idx) => {
                        const x = 40 + idx * 50;
                        return (
                          <text key={h} x={x} y="172" className="text-[9px] fill-[#8196b1] font-display font-semibold" textAnchor="middle">
                            {h}
                          </text>
                        );
                      })}
                      
                      {/* Curves */}
                      {(() => {
                        const plantaoData = [3, 11, 24, 8, 15, 30, 42, 12];
                        const curvePath = getHourlyCurvePath(plantaoData, 50);
                        
                        let hoverPoints = null;
                        if (hoveredPlantaoHour !== null) {
                          const x = 40 + hoveredPlantaoHour * 50;
                          const y = 150 - (plantaoData[hoveredPlantaoHour] / 50) * 120;
                          hoverPoints = { x, y };
                        }
                        
                        return (
                          <>
                            {/* Area Fill */}
                            <path d={`${curvePath} L 390 150 L 40 150 Z`} fill="url(#plantaoGrad)" />
                            
                            {/* Line Stroke */}
                            <path d={curvePath} fill="none" stroke="#6E5494" strokeWidth="2.2" strokeLinecap="round" />
                            
                            {/* Dotted hover line */}
                            {hoverPoints && (
                              <line x1={hoverPoints.x} y1="30" x2={hoverPoints.x} y2="150" stroke="#6E5494" strokeWidth="0.8" strokeDasharray="2 2" />
                            )}
                            
                            {/* All Nodes */}
                            {plantaoData.map((v, idx) => {
                              const cx = 40 + idx * 50;
                              const cy = 150 - (v / 50) * 120;
                              const isHovered = hoveredPlantaoHour === idx;
                              return (
                                <circle 
                                  key={`p-${idx}`} 
                                  cx={cx} 
                                  cy={cy} 
                                  r={isHovered ? 4.5 : 2.5} 
                                  fill="#6E5494" 
                                  stroke="#ffffff" 
                                  strokeWidth="1" 
                                />
                              );
                            })}
                            
                            {/* Hover Ping */}
                            {hoverPoints && (
                              <>
                                <circle cx={hoverPoints.x} cy={hoverPoints.y} r="6" fill="#6E5494" opacity="0.3" className="animate-ping" />
                                <circle cx={hoverPoints.x} cy={hoverPoints.y} r="3.5" fill="#6E5494" stroke="#ffffff" strokeWidth="1.5" />
                              </>
                            )}
                            
                            {/* Transparent Clickable Hover Zones */}
                            {plantaoData.map((_, idx) => {
                              const x = 40 + idx * 50 - 25;
                              return (
                                <rect
                                  key={`plantao-zone-${idx}`}
                                  x={x}
                                  y="20"
                                  width="50"
                                  height="130"
                                  fill="transparent"
                                  className="cursor-pointer"
                                  onMouseEnter={() => setHoveredPlantaoHour(idx)}
                                  onMouseLeave={() => setHoveredPlantaoHour(null)}
                                />
                              );
                            })}
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                </div>
              </div>

            </div>
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

      {/* FLOATING PROTOTYPE SWITCHER WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
        <div className="bg-white/80 backdrop-blur-md border-[0.5px] border-[#b8cce4] rounded-xl p-2 shadow-lg flex items-center gap-1">
          <div className="text-[9px] font-display font-semibold text-[#8196b1] px-2 uppercase tracking-wider select-none">
            Mockup:
          </div>
          <div className="flex gap-1">
            {[
              { id: 'processo1', label: '1. Triagem' },
              { id: 'processo2', label: '2. Teleconsulta' },
              { id: 'processo3', label: '3. Dashboard Admin' }
            ].map((p) => {
              const active = activeProcess === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveProcess(p.id);
                    triggerFeedback(`Alternando para ${p.label}`);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-[10px] font-display font-semibold transition-all cursor-pointer ${
                    active 
                      ? 'bg-[#e6f2fc] text-slate-800 border-[0.5px] border-[#8fbdf1]' 
                      : 'text-[#8196b1] hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
