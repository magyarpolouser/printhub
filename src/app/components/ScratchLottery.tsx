import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Copy, Check, Sparkles } from 'lucide-react';

interface LotteryTicket {
  id: number;
  discount: string;
  code: string;
  color: string;
  accentColor: string;
  scratched: boolean;
  revealed: boolean;
  scratchProgress: number;
}

const TICKETS: Omit<LotteryTicket, 'scratched' | 'revealed' | 'scratchProgress'>[] = [
  { id: 1, discount: '10% OFF', code: 'SCRATCH10', color: '#B8860B', accentColor: '#FFD700' },
  { id: 2, discount: '15% OFF', code: 'SCRATCH15', color: '#996515', accentColor: '#FFC947' },
  { id: 3, discount: '20% OFF', code: 'SCRATCH20', color: '#7B5804', accentColor: '#FFB800' },
];

const SCRATCH_THRESHOLD = 55; // percent coverage to reveal

function ScratchCard({
  ticket,
  onReveal,
}: {
  ticket: LotteryTicket;
  onReveal: (id: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [copied, setCopied] = useState(false);
  const progressRef = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Golden scratch layer
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#FFD700');
    grad.addColorStop(0.3, '#FFC200');
    grad.addColorStop(0.6, '#FFD700');
    grad.addColorStop(1, '#B8860B');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texture dots
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Scratch here text
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ SCRATCH HERE ✦', canvas.width / 2, canvas.height / 2);
  }, []);

  useEffect(() => {
    if (!ticket.revealed) initCanvas();
  }, [ticket.revealed, initCanvas]);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (ticket.revealed) return;
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e, canvas);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Check progress
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const pct = (transparent / (canvas.width * canvas.height)) * 100;
    progressRef.current = pct;

    if (pct >= SCRATCH_THRESHOLD && !ticket.revealed) {
      onReveal(ticket.id);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(ticket.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: ticket.id * 0.15, duration: 0.5 }}
      className="relative flex flex-col rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)', border: '2px solid #333' }}
    >
      {/* Ticket top strip */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ background: `linear-gradient(90deg, ${ticket.accentColor}22, ${ticket.accentColor}44)`, borderBottom: `1px solid ${ticket.accentColor}44` }}
      >
        <div className="flex items-center gap-2">
          <Ticket size={16} style={{ color: ticket.accentColor }} />
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: ticket.accentColor }}>
            Lucky Ticket #{ticket.id}
          </span>
        </div>
        <Sparkles size={14} style={{ color: ticket.accentColor, opacity: 0.7 }} />
      </div>

      {/* Prize area */}
      <div className="px-5 pt-4 pb-2 text-center">
        <p className="text-white/40 text-xs tracking-widest uppercase mb-1">You could win</p>
        <motion.p
          className="text-4xl font-black"
          style={{ color: ticket.accentColor, textShadow: `0 0 20px ${ticket.accentColor}66` }}
          animate={ticket.revealed ? { scale: [1, 1.12, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {ticket.discount}
        </motion.p>
        <p className="text-white/30 text-xs mt-1">your entire order</p>
      </div>

      {/* Scratch zone */}
      <div className="relative mx-5 mb-4 rounded-xl overflow-hidden" style={{ height: 90 }}>
        {/* Revealed layer */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1"
          style={{ background: '#111', borderRadius: 12 }}
        >
          {ticket.revealed ? (
            <AnimatePresence>
              <motion.div
                key="revealed"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xl font-black" style={{ color: ticket.accentColor }}>
                  {ticket.discount}
                </span>
                <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: '#222', border: `1px dashed ${ticket.accentColor}66` }}>
                  <span className="font-mono text-sm font-bold text-white tracking-widest">{ticket.code}</span>
                  <button onClick={copyCode} className="transition-transform active:scale-90">
                    {copied ? (
                      <Check size={14} className="text-green-400" />
                    ) : (
                      <Copy size={14} style={{ color: ticket.accentColor }} />
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <span className="text-white/20 text-xs">Prize hidden below</span>
          )}
        </div>

        {/* Canvas scratch layer */}
        {!ticket.revealed && (
          <canvas
            ref={canvasRef}
            width={400}
            height={90}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            style={{ borderRadius: 12 }}
            onMouseDown={() => { isDrawing.current = true; }}
            onMouseUp={() => { isDrawing.current = false; }}
            onMouseLeave={() => { isDrawing.current = false; }}
            onMouseMove={scratch}
            onTouchStart={(e) => { e.preventDefault(); isDrawing.current = true; }}
            onTouchEnd={() => { isDrawing.current = false; }}
            onTouchMove={(e) => { e.preventDefault(); scratch(e); }}
          />
        )}
      </div>

      {/* Bottom strip */}
      <div className="px-5 py-2.5 text-center" style={{ borderTop: `1px solid #222` }}>
        {ticket.revealed ? (
          <motion.button
            onClick={copyCode}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2 rounded-lg text-sm font-bold tracking-wide transition-all"
            style={{ background: `linear-gradient(90deg, ${ticket.color}, ${ticket.accentColor})`, color: '#000' }}
          >
            {copied ? '✓ Copied!' : 'Copy Coupon Code'}
          </motion.button>
        ) : (
          <p className="text-white/25 text-xs tracking-wide">Scratch the gold area above to reveal your prize</p>
        )}
      </div>
    </motion.div>
  );
}

export function ScratchLottery() {
  const [tickets, setTickets] = useState<LotteryTicket[]>(
    TICKETS.map((t) => ({ ...t, scratched: false, revealed: false, scratchProgress: 0 }))
  );
  const [allRevealed, setAllRevealed] = useState(false);

  const handleReveal = (id: number) => {
    setTickets((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, revealed: true, scratched: true } : t));
      if (updated.every((t) => t.revealed)) setAllRevealed(true);
      return updated;
    });
  };

  const reset = () => {
    setTickets(TICKETS.map((t) => ({ ...t, scratched: false, revealed: false, scratchProgress: 0 })));
    setAllRevealed(false);
  };

  return (
    <section className="py-20 px-4" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #111 100%)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: '#FFD70022', border: '1px solid #FFD70044', color: '#FFD700' }}>
            <Sparkles size={12} />
            Scratch & Win
            <Sparkles size={12} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Your Lucky <span style={{ color: '#FFD700' }}>Lottery</span> Tickets
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-base">
            Scratch the golden cards below to reveal your exclusive discount code. Each ticket holds a hidden prize just for you!
          </p>
        </motion.div>

        {/* Tickets grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {tickets.map((ticket) => (
            <ScratchCard key={ticket.id} ticket={ticket} onReveal={handleReveal} />
          ))}
        </div>

        {/* All revealed CTA */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-white/50 mb-4 text-sm">Want to try again?</p>
              <motion.button
                onClick={reset}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3 rounded-full text-sm font-bold tracking-wide"
                style={{ background: 'linear-gradient(90deg, #B8860B, #FFD700)', color: '#000' }}
              >
                Reset Tickets
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
