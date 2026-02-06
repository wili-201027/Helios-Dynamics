import { useCMS } from '@/contexts/CMSContext';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Leaf, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const orbitingSatellites = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      radius: 120 + Math.floor(i / 4) * 50,
      duration: 20 + Math.floor(i / 4) * 10,
      delay: (i % 4) * 5,
      size: 4 + Math.random() * 3,
    })),
  []);

  return (
    <div className="py-20">
      {/* Star animation */}
      {isSectionVisible('impact.animation') && (
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Central star */}
            <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/80 to-accent animate-pulse-glow" />
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-accent/30 blur-xl animate-pulse" />

              {/* Orbiting satellites */}
              {orbitingSatellites.map(sat => (
                <div
                  key={sat.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: sat.radius * 2,
                    height: sat.radius * 2,
                    animation: `spin-slow ${sat.duration}s linear infinite`,
                    animationDelay: `${sat.delay}s`,
                  }}
                >
                  {/* Orbit path */}
                  <div
                    className="absolute inset-0 rounded-full border border-primary/10"
                  />
                  {/* Satellite */}
                  <div
                    className="absolute rounded-full bg-primary shadow-lg shadow-primary/30"
                    style={{
                      width: sat.size,
                      height: sat.size,
                      top: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Stats */}
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
