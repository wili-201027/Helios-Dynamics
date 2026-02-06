import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Sun, Satellite, Zap } from 'lucide-react';

const DysonBuilder = () => {
  const [satellites, setSatellites] = useState(5);

  const stats = useMemo(() => ({
    energy: satellites * 1.2,
    coverage: Math.min(100, satellites * 2.5),
    cost: satellites * 8.5,
  }), [satellites]);

  const orbits = useMemo(() => {
    const items: Array<{ id: number; radius: number; angle: number; orbitDuration: number; size: number }> = [];
    for (let i = 0; i < satellites; i++) {
      const ring = Math.floor(i / 8);
      const radius = 28 + ring * 14;
      const angleInRing = (i % 8) * (360 / Math.min(8, satellites - ring * 8));
      items.push({
        id: i,
        radius: Math.min(radius, 90),
        angle: angleInRing + ring * 15,
        orbitDuration: 15 + ring * 8,
        size: 3 + Math.random() * 2,
      });
    }
    return items;
  }, [satellites]);

  return (
    <div className="glass-card space-y-6">
      <h3 className="font-heading text-2xl font-bold flex items-center gap-2">
        <Satellite className="w-6 h-6 text-primary" />
        Constructor d'Eixam de Dyson
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SVG visualization */}
        <div className="flex justify-center items-center">
          <svg viewBox="0 0 200 200" className="w-full max-w-sm aspect-square">
            {/* Star glow */}
            <defs>
              <radialGradient id="starGlow">
                <stop offset="0%" stopColor="hsl(40 100% 70%)" stopOpacity="1" />
                <stop offset="40%" stopColor="hsl(25 100% 55%)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(25 100% 55%)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Orbit paths */}
            {[28, 42, 56, 70, 84].map((r, i) => (
              <circle key={i} cx="100" cy="100" r={r} fill="none" stroke="hsl(190 100% 50% / 0.1)" strokeWidth="0.5" strokeDasharray="2 4" />
            ))}

            {/* Star */}
            <circle cx="100" cy="100" r="14" fill="url(#starGlow)" />
            <circle cx="100" cy="100" r="8" fill="hsl(40 100% 75%)" />

            {/* Satellites */}
            {orbits.map(sat => (
              <g key={sat.id} style={{ transformOrigin: '100px 100px', animation: `spin-slow ${sat.orbitDuration}s linear infinite` }}>
                <circle
                  cx={100 + sat.radius}
                  cy={100}
                  r={sat.size}
                  fill="hsl(190 100% 60%)"
                  style={{ transformOrigin: '100px 100px', transform: `rotate(${sat.angle}deg)` }}
                />
                {/* Energy beam */}
                <line
                  x1={100 + sat.radius}
                  y1={100}
                  x2={100}
                  y2={100}
                  stroke="hsl(190 100% 50% / 0.15)"
                  strokeWidth="0.5"
                  style={{ transformOrigin: '100px 100px', transform: `rotate(${sat.angle}deg)` }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Controls & stats */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSatellites(Math.max(1, satellites - 1))}
              disabled={satellites <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="flex-1 text-center">
              <p className="text-4xl font-heading font-bold text-primary">{satellites}</p>
              <p className="text-xs text-muted-foreground">Satèl·lits desplegats</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSatellites(Math.min(40, satellites + 1))}
              disabled={satellites >= 40}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">Energia captada</span>
              </div>
              <p className="text-2xl font-heading font-bold text-accent">{stats.energy.toFixed(1)} GW</p>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sun className="w-4 h-4 text-fusion" />
                <span className="text-xs text-muted-foreground">Cobertura solar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${stats.coverage}%` }} />
                </div>
                <span className="text-sm font-mono font-bold">{stats.coverage.toFixed(1)}%</span>
              </div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Satellite className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Cost estimat</span>
              </div>
              <p className="text-2xl font-heading font-bold">{stats.cost.toFixed(1)} B$</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setSatellites(Math.min(40, satellites + 5))} className="flex-1" variant="outline">
              +5 Satèl·lits
            </Button>
            <Button onClick={() => setSatellites(Math.min(40, satellites + 10))} className="flex-1">
              +10 Satèl·lits
            </Button>
          </div>

          {/* Phase indicators */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Fases de desplegament:</p>
            <div className="flex gap-1">
              {[5, 10, 20, 40].map(phase => (
                <button
                  key={phase}
                  onClick={() => setSatellites(phase)}
                  className={`flex-1 h-8 rounded text-xs font-medium transition-all ${
                    satellites >= phase
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DysonBuilder;
