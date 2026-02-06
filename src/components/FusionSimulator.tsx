import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Flame, Gauge, Droplets, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const FusionSimulator = () => {
  const [temp, setTemp] = useState(50);
  const [pressure, setPressure] = useState(50);
  const [deuterium, setDeuterium] = useState(50);

  const results = useMemo(() => {
    const tempC = temp * 1.5; // 0–150 million °C
    const efficiency = Math.min(100, (temp * 0.4 + pressure * 0.35 + deuterium * 0.25));
    const output = (tempC * pressure * deuterium) / 10000 * 500; // MW
    const stable = temp > 20 && temp < 85 && pressure > 30 && pressure < 90;
    return { tempC, efficiency: Math.round(efficiency), output: Math.round(output), stable };
  }, [temp, pressure, deuterium]);

  return (
    <div className="glass-card space-y-6">
      <h3 className="font-heading text-2xl font-bold flex items-center gap-2">
        <Flame className="w-6 h-6 text-accent" />
        Simulador de Reactor de Fusió
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Flame className="w-4 h-4 text-fusion" /> Temperatura del Plasma
              <span className="ml-auto text-primary font-mono">{results.tempC.toFixed(0)}M °C</span>
            </label>
            <Slider value={[temp]} onValueChange={v => setTemp(v[0])} max={100} step={1} />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Gauge className="w-4 h-4 text-plasma" /> Pressió Magnètica
              <span className="ml-auto text-primary font-mono">{pressure}%</span>
            </label>
            <Slider value={[pressure]} onValueChange={v => setPressure(v[0])} max={100} step={1} />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Droplets className="w-4 h-4 text-nebula" /> Flux de Deuteri
              <span className="ml-auto text-primary font-mono">{deuterium}%</span>
            </label>
            <Slider value={[deuterium]} onValueChange={v => setDeuterium(v[0])} max={100} step={1} />
          </div>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <Zap className="w-8 h-8 text-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Sortida Energètica</p>
              <p className="text-3xl font-heading font-bold text-accent">{results.output} MW</p>
            </div>
          </div>
          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <Gauge className="w-8 h-8 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Eficiència</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${results.efficiency}%` }} />
                </div>
                <span className="text-sm font-mono font-bold">{results.efficiency}%</span>
              </div>
            </div>
          </div>
          <div className={`glass rounded-xl p-4 flex items-center gap-3 ${results.stable ? 'border-primary/30' : 'border-destructive/30'}`}>
            {results.stable ? (
              <CheckCircle className="w-8 h-8 text-primary" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-destructive" />
            )}
            <div>
              <p className="text-xs text-muted-foreground">Estat del Plasma</p>
              <p className={`text-lg font-bold ${results.stable ? 'text-primary' : 'text-destructive'}`}>
                {results.stable ? 'Estable' : 'Inestable'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual reactor */}
      <div className="flex justify-center py-4">
        <div className="relative w-40 h-40">
          <div
            className="absolute inset-0 rounded-full animate-pulse-glow transition-all duration-500"
            style={{
              background: `radial-gradient(circle, hsl(${results.stable ? '190 100% 50%' : '0 80% 50%'} / ${results.efficiency / 100}), transparent 70%)`,
            }}
          />
          <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-spin-slow" />
          <div className="absolute inset-8 rounded-full border border-accent/30" style={{ animation: 'spin-slow 30s linear infinite reverse' }} />
          <div
            className="absolute inset-12 rounded-full transition-all duration-500"
            style={{
              background: `radial-gradient(circle, hsl(${results.stable ? '190 100% 60%' : '0 80% 50%'} / 0.8), transparent)`,
              boxShadow: `0 0 ${results.output / 10}px hsl(${results.stable ? '190 100% 50%' : '0 80% 50%'} / 0.5)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FusionSimulator;
