import { useCMS } from '@/contexts/CMSContext';
import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Leaf, Zap, ArrowRight, TrendingUp, Globe, Factory } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const stats = [
  { icon: Users, value: '2.000M', label: 'Persones amb accés a energia neta', color: 'text-primary' },
  { icon: Leaf, value: '-85%', label: 'Reducció d\'emissions CO₂', color: 'text-green-400' },
  { icon: Zap, value: '500 GW', label: 'Energia generada per la xarxa Dyson', color: 'text-accent' },
];

const Impact = () => {
  const { getContent, isSectionVisible } = useCMS();
  const navigate = useNavigate();
  const [year, setYear] = useState(2030);
  const [scenario, setScenario] = useState<'conservative' | 'optimistic' | 'aggressive'>('optimistic');

  const orbitingSatellites = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      radius: 100 + Math.floor(i / 6) * 40,
      duration: 15 + Math.floor(i / 6) * 8,
      delay: (i % 6) * 2.5,
      size: 3 + Math.random() * 4,
      color: i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-accent' : 'bg-fusion',
      glow: i % 4 === 0,
    })),
  []);

  const impactData = useMemo(() => {
    const baseYear = 2025;
    const yearsElapsed = year - baseYear;
    const scenarioMultipliers = {
      conservative: 0.6,
      optimistic: 1.0,
      aggressive: 1.4
    };
    const multiplier = scenarioMultipliers[scenario];

    const energyAccess = Math.min(8000000000, 1000000000 + (yearsElapsed * 50000000 * multiplier));
    const co2Reduction = Math.min(95, yearsElapsed * 2.5 * multiplier);
    const energyGenerated = yearsElapsed * 50 * multiplier;
    const jobsCreated = yearsElapsed * 200000 * multiplier;
    const costSavings = yearsElapsed * 500000000000 * multiplier; // $500B per year

    return {
      energyAccess: Math.round(energyAccess / 1000000000 * 10) / 10, // Billions
      co2Reduction: Math.round(co2Reduction * 10) / 10,
      energyGenerated: Math.round(energyGenerated * 10) / 10,
      jobsCreated: Math.round(jobsCreated / 1000000 * 10) / 10, // Millions
      costSavings: Math.round(costSavings / 1000000000000 * 10) / 10, // Trillions
    };
  }, [year, scenario]);

  return (
    <div className="py-20">


      {/* Inspirational message */}
      {isSectionVisible('impact.message') && (
        <section className="py-20 container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl mx-auto text-center space-y-6">
            <motion.h2 variants={fade} custom={0} className="text-3xl md:text-5xl font-heading font-bold gradient-text leading-tight">
              {getContent('impact.title')}
            </motion.h2>
            <motion.p variants={fade} custom={1} className="text-lg text-muted-foreground leading-relaxed italic">
              "{getContent('impact.message')}"
            </motion.p>
          </motion.div>
        </section>
      )}

      {/* Interactive Impact Calculator */}
      {isSectionVisible('impact.calculator') && (
        <section className="py-16 container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}>
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">Calculadora d'Impacte Global</h3>
            <div className="glass-card max-w-4xl mx-auto space-y-8">
              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Any de projecció: {year}
                  </label>
                  <Slider
                    value={[year]}
                    onValueChange={v => setYear(v[0])}
                    min={2025}
                    max={2060}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>2025</span>
                    <span>2060</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Globe className="w-4 h-4 text-accent" />
                    Escenari de desplegament
                  </label>
                  <div className="flex gap-2">
                    {[
                      { key: 'conservative', label: 'Conservador', color: 'bg-blue-500' },
                      { key: 'optimistic', label: 'Optimista', color: 'bg-green-500' },
                      { key: 'aggressive', label: 'Agresiu', color: 'bg-orange-500' },
                    ].map(({ key, label, color }) => (
                      <button
                        key={key}
                        onClick={() => setScenario(key as any)}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                          scenario === key
                            ? `${color} text-white shadow-lg`
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Users, value: `${impactData.energyAccess}B`, label: 'Persones amb energia neta', color: 'text-primary' },
                  { icon: Leaf, value: `-${impactData.co2Reduction}%`, label: 'Reducció CO₂ global', color: 'text-green-400' },
                  { icon: Zap, value: `${impactData.energyGenerated} GW`, label: 'Energia de fusió generada', color: 'text-accent' },
                  { icon: Factory, value: `${impactData.jobsCreated}M`, label: 'Llocs de treball creats', color: 'text-blue-400' },
                  { icon: TrendingUp, value: `$${impactData.costSavings}T`, label: 'Estalvis en costos energètics', color: 'text-purple-400' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="glass rounded-xl p-4 text-center space-y-2"
                    >
                      <Icon className={`w-8 h-8 mx-auto ${item.color}`} />
                      <p className="text-2xl font-heading font-bold">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Scenario description */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  {scenario === 'conservative' && 'Desplegament gradual amb enfocament en la seguretat i estabilitat.'}
                  {scenario === 'optimistic' && 'Desplegament equilibrat amb inversions moderades en tecnologia.'}
                  {scenario === 'aggressive' && 'Desplegament accelerat amb màxima inversió en R+D i infraestructura.'}
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Static Stats */}
      {isSectionVisible('impact.stats') && (
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fade}
                  custom={i}
                >
                  <div className="glass-card text-center space-y-3">
                    <Icon className={`w-10 h-10 mx-auto ${stat.color}`} />
                    <p className="text-4xl font-heading font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      {isSectionVisible('impact.cta') && (
        <section className="py-20 container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            custom={0}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass-card space-y-6 border-primary/20">
              <h3 className="text-3xl font-heading font-bold">{getContent('impact.cta')}</h3>
              <p className="text-muted-foreground">Forma part del canvi més gran de la història de l'energia.</p>
              <Button
                size="lg"
                className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-heading animate-pulse-glow"
                onClick={() => navigate('/contacte')}
              >
                Col·labora amb nosaltres <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Impact;
