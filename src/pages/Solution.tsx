import { useCMS } from '@/contexts/CMSContext';
import { motion } from 'framer-motion';
import { Atom, Rocket, Satellite } from 'lucide-react';
import FusionSimulator from '@/components/FusionSimulator';
import DysonBuilder from '@/components/DysonBuilder';

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const solutions = [
  { icon: Atom, key: 'fusion', color: 'text-primary' },
  { icon: Rocket, key: 'rockets', color: 'text-accent' },
  { icon: Satellite, key: 'dyson', color: 'text-nebula' },
];

const Solution = () => {
  const { getContent, isSectionVisible } = useCMS();

  return (
    <div className="py-20">
      {isSectionVisible('solution.intro') && (
        <section className="container mx-auto px-4 mb-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto text-center space-y-6">
            <motion.h1 variants={fade} custom={0} className="text-4xl md:text-6xl font-heading font-bold gradient-text">
              {getContent('solution.title')}
            </motion.h1>
            <motion.p variants={fade} custom={1} className="text-lg text-muted-foreground">
              {getContent('solution.subtitle')}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <motion.div key={sol.key} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={i + 2}>
                  <div className="glass-card text-center space-y-4 h-full">
                    <div className="w-16 h-16 mx-auto rounded-2xl glass flex items-center justify-center">
                      <Icon className={`w-8 h-8 ${sol.color}`} />
                    </div>
                    <h3 className="font-heading text-xl font-bold">{getContent(`solution.${sol.key}.title`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{getContent(`solution.${sol.key}.desc`)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {isSectionVisible('solution.simulator') && (
        <section className="container mx-auto px-4 mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}>
            <FusionSimulator />
          </motion.div>
        </section>
      )}

      {isSectionVisible('solution.dysonBuilder') && (
        <section className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} custom={0}>
            <DysonBuilder />
          </motion.div>
        </section>
      )}
    </div>
  );
};

export default Solution;
