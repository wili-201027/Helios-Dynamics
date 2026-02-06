import { useCMS } from '@/contexts/CMSContext';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'El nom ha de tenir almenys 2 caràcters'),
  email: z.string().email('Adreça de correu no vàlida'),
  message: z.string().min(10, 'El missatge ha de tenir almenys 10 caràcters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const Contact = () => {
  const { getContent, isSectionVisible } = useCMS();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = (data: ContactForm) => {
    console.log('Form submitted:', data);
    toast.success('Missatge enviat correctament! Ens posarem en contacte aviat.');
    form.reset();
  };

  return (
    <div className="py-20 container mx-auto px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-5xl mx-auto space-y-16">
        <motion.div variants={fade} custom={0} className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text">{getContent('contact.title')}</h1>
          <p className="text-lg text-muted-foreground">Tens preguntes? Vols col·laborar? Escriu-nos!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          {isSectionVisible('contact.info') && (
            <motion.div variants={fade} custom={1} className="space-y-6">
              <div className="glass-card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telèfon</p>
                  <p className="font-heading font-semibold">{getContent('contact.phone')}</p>
                </div>
              </div>
              <div className="glass-card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Correu electrònic</p>
                  <p className="font-heading font-semibold">{getContent('contact.email')}</p>
                </div>
              </div>
              <div className="glass-card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seu central</p>
                  <p className="font-heading font-semibold">{getContent('contact.address')}</p>
                </div>
              </div>

              {/* Decorative map */}
              {isSectionVisible('contact.map') && (
                <div className="glass-card aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="w-10 h-10 text-primary mx-auto animate-float" />
                      <p className="text-sm text-muted-foreground font-heading">Barcelona, Catalunya</p>
                      <p className="text-xs text-muted-foreground">41.3874° N, 2.1686° E</p>
                    </div>
                    {/* Grid lines */}
                    <div className="absolute inset-0 opacity-10">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={`h${i}`} className="absolute w-full border-t border-primary/30" style={{ top: `${(i + 1) * 12.5}%` }} />
                      ))}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={`v${i}`} className="absolute h-full border-l border-primary/30" style={{ left: `${(i + 1) * 12.5}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Contact form */}
          {isSectionVisible('contact.form') && (
            <motion.div variants={fade} custom={2}>
              <div className="glass-card">
                <h3 className="font-heading text-xl font-bold mb-6">Envia'ns un missatge</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="El teu nom" className="glass" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correu electrònic</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="nom@exemple.cat" className="glass" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Missatge</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Escriu el teu missatge aquí..." rows={5} className="glass resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full gap-2 font-heading">
                      <Send className="w-4 h-4" /> Enviar missatge
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
