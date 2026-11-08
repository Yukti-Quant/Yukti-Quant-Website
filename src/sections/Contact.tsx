import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { BRAND } from '@/data/content';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations';
import { cn } from '@/utils/cn';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Please enter a message (at least 10 characters).';
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    // No backend wired — this is a marketing site. Show success state.
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    },
  });

  const links = [
    { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/nageshchavan882', href: BRAND.linkedin },
  ];

  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-base-900">
      <div className="absolute inset-0 bg-grid opacity-25 mask-fade-b" />
      <div className="pointer-events-none absolute -bottom-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold-500/[0.06] blur-[130px]" />

      <div className="container-yx relative">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
            <span className="gold-line" />
            <span className="eyebrow">Contact</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="heading-lg text-gradient-silver">
            LET'S BUILD <span className="text-gradient-gold">WHAT'S NEXT.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="body-lg mt-6 max-w-2xl">
            For collaborations, engineering conversations, or technology partnerships — reach out through the form below or via the channels listed here.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Channels */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-3"
          >
            {links.map((l) => (
              <motion.a
                key={l.label}
                variants={fadeUp}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-base-850/60 p-5 transition-all duration-300 hover:border-gold-500/30 hover:bg-gold-500/[0.03]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300 transition-all duration-300 group-hover:border-gold-500/50 group-hover:bg-gold-500/15">
                  <l.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-silver-500">{l.label}</p>
                  <p className="mt-0.5 truncate text-sm text-silver-200">{l.value}</p>
                </div>
                <span className="text-silver-600 transition-colors group-hover:text-gold-400">→</span>
              </motion.a>
            ))}

          </motion.div>

          {/* Form */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            noValidate
            className="card-surface flex flex-col gap-5 p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-silver-400">
                Name
              </label>
              <input
                id="name"
                type="text"
                {...field('name')}
                className={cn(
                  'w-full rounded-lg border bg-base-950/60 px-4 py-3 text-sm text-silver-100 outline-none transition-colors placeholder:text-silver-600',
                  errors.name ? 'border-bear-500/50' : 'border-white/10 focus:border-gold-500/50'
                )}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-bear-400">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-silver-400">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...field('email')}
                className={cn(
                  'w-full rounded-lg border bg-base-950/60 px-4 py-3 text-sm text-silver-100 outline-none transition-colors placeholder:text-silver-600',
                  errors.email ? 'border-bear-500/50' : 'border-white/10 focus:border-gold-500/50'
                )}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-bear-400">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-silver-400">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...field('message')}
                className={cn(
                  'w-full resize-none rounded-lg border bg-base-950/60 px-4 py-3 text-sm text-silver-100 outline-none transition-colors placeholder:text-silver-600',
                  errors.message ? 'border-bear-500/50' : 'border-white/10 focus:border-gold-500/50'
                )}
                placeholder="Tell me about the conversation you'd like to start…"
              />
              {errors.message && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-bear-400">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn-gold w-full sm:w-auto sm:self-start">
              <Send className="h-4 w-4" />
              Send Message
            </button>

            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-lg border border-bull-500/30 bg-bull-500/10 px-4 py-3 text-sm text-bull-400"
              >
                <CheckCircle2 className="h-4 w-4" />
                Message recorded. This demo form does not transmit — connect a backend to enable delivery.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
