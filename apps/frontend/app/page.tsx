import Link from 'next/link'
import ParticlesBg from '../components/ParticlesBg'
import TypingText from '../components/TypingText'
import ScrollReveal from '../components/ScrollReveal'
import ScrollDown from '../components/ScrollDown'

const skills = [
  {
    category: 'Security',
    icon: '⚔',
    items: [
      'Penetration Testing',
      'Network Security',
      'Burp Suite',
      'Nmap',
      'Metasploit',
      'Wireshark',
    ],
  },
  {
    category: 'Backend',
    icon: '⚙',
    items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST API', 'Docker'],
  },
  {
    category: 'Frontend',
    icon: '◈',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'DevOps',
    icon: '⬡',
    items: ['Linux', 'Nginx', 'CI/CD', 'GitHub Actions', 'VPS'],
  },
]

const stats = [
  { value: '1+', label: 'Years Learning' },
  { value: '3+', label: 'Projects Built' },
  { value: '10+', label: 'CTF Challenges' },
  { value: '∞', label: 'Curiosity' },
]

const experience = [
  {
    year: '2026',
    title: 'Full-Stack Developer',
    place: 'Personal Projects',
    description:
      'Built production-grade web applications end to end — backend API, frontend, deployment, and security testing.',
  },
  {
    year: '2025',
    title: 'Security Research',
    place: 'Self-Directed',
    description:
      'Focused on offensive security — CTF challenges on HackTheBox and TryHackMe, network security, and penetration testing methodology.',
  },
  {
    year: '2025',
    title: 'Computer Engineering Graduate',
    place: 'University',
    description: 'Completed degree with focus on networking and software development.',
  },
]

const certifications = [
  { name: 'eJPT', issuer: 'eLearnSecurity', status: 'Planned', year: '2026' },
  { name: 'CompTIA Security+', issuer: 'CompTIA', status: 'Planned', year: '2026' },
  { name: 'OSCP', issuer: 'Offensive Security', status: 'Goal', year: '2027' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/ogulcantekines', icon: 'GH' },
  { label: 'HackTheBox', href: 'https://hackthebox.com', icon: 'HTB' },
  { label: 'TryHackMe', href: 'https://tryhackme.com', icon: 'THM' },
]

export default function Home() {
  return (
    <div className="bg-grid noise relative min-h-screen">
      <ParticlesBg />

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-60 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/6 blur-[140px]" />
        <div className="absolute top-1/2 -right-60 h-[500px] w-[500px] rounded-full bg-emerald-500/4 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-500/4 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* ── HERO ── */}
        <section className="flex min-h-screen flex-col justify-center py-32">
          {/* Status badge */}
          <div className="animate-fade-up-1 mb-8">
            <div className="inline-flex items-center gap-3 border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-xs tracking-[0.25em] text-emerald-400">
                AVAILABLE FOR WORK
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="animate-fade-up-2 mb-6 select-none">
            <h1 className="text-7xl font-bold tracking-tight text-white sm:text-9xl">Oğulcan</h1>
            <h1
              className="shimmer text-7xl font-bold tracking-tight sm:text-9xl"
              data-text="Tekineş"
            >
              Tekineş
            </h1>
          </div>

          {/* Typing */}
          <div className="animate-fade-up-3 mb-4 h-8">
            <TypingText />
          </div>

          {/* Subtext */}
          <div className="animate-fade-up-3 mb-10">
            <p className="max-w-xl text-base leading-relaxed text-zinc-500">
              I build secure systems and break insecure ones. Full lifecycle — design, build,
              deploy, pentest, harden.
            </p>
          </div>

          {/* CTAs */}
          <div className="animate-fade-up-4 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group relative border border-emerald-500 bg-emerald-500 px-8 py-3 font-mono text-xs font-bold tracking-widest text-black transition-all duration-300 hover:bg-transparent hover:text-emerald-400"
            >
              VIEW PROJECTS
              <span className="absolute right-0 bottom-0 h-2 w-2 translate-x-1 translate-y-1 border-r border-b border-emerald-500/50 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
            </Link>
            <Link
              href="/contact"
              className="border border-zinc-700 px-8 py-3 font-mono text-xs font-bold tracking-widest text-zinc-400 transition-all duration-300 hover:border-emerald-500/50 hover:text-white"
            >
              GET IN TOUCH
            </Link>
            <a
              href="/cv.pdf"
              download
              className="border border-zinc-800 px-8 py-3 font-mono text-xs font-bold tracking-widest text-zinc-600 transition-all duration-300 hover:border-zinc-600 hover:text-zinc-400"
            >
              DOWNLOAD CV ↓
            </a>
          </div>

          {/* Scroll hint */}
          <div className="animate-fade-up-5 mt-20">
            <ScrollDown />
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="mb-40">
          <ScrollReveal>
            <div className="mb-14 flex items-center gap-4">
              <span className="font-mono text-xs tracking-widest text-emerald-400">01 /</span>
              <h2 className="text-3xl font-bold text-white">About</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal delay={100}>
              <div className="card-glow h-full border border-zinc-800/60 bg-zinc-900/20 p-8 backdrop-blur-sm">
                <p className="mb-4 font-mono text-xs text-emerald-400">{'// background'}</p>
                <p className="leading-relaxed text-zinc-400">
                  Recent graduate passionate about cybersecurity and software development. My goal
                  is to specialize in offensive security — understanding systems deeply enough to
                  find and exploit vulnerabilities, then helping organizations fix them.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="card-glow h-full border border-zinc-800/60 bg-zinc-900/20 p-8 backdrop-blur-sm">
                <p className="mb-4 font-mono text-xs text-emerald-400">{'// approach'}</p>
                <p className="leading-relaxed text-zinc-400">
                  I build full-stack web applications with modern tooling, deploy them to VPS
                  servers, and then pentest my own work. This portfolio site is itself a live
                  example — built, deployed, and security-tested end to end.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="mb-40">
          <ScrollReveal>
            <div className="mb-14 flex items-center gap-4">
              <span className="font-mono text-xs tracking-widest text-emerald-400">02 /</span>
              <h2 className="text-3xl font-bold text-white">Skills &amp; Tools</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map(({ category, icon, items }, i) => (
              <ScrollReveal key={category} delay={i * 100}>
                <div className="card-glow group border border-zinc-800/60 bg-zinc-900/20 p-6 backdrop-blur-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="font-mono text-xs tracking-widest text-emerald-400">{category}</p>
                    <span className="text-xl text-zinc-700 transition-colors group-hover:text-emerald-400/60">
                      {icon}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-zinc-500 transition-colors group-hover:text-zinc-400"
                      >
                        <span className="h-px w-3 shrink-0 bg-zinc-700 transition-colors group-hover:bg-emerald-400/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="mb-40">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(({ value, label }, i) => (
              <ScrollReveal key={label} delay={i * 80}>
                <div className="card-glow border border-zinc-800/60 bg-zinc-900/20 p-6 text-center backdrop-blur-sm">
                  <p className="mb-2 text-4xl font-bold text-emerald-400">{value}</p>
                  <p className="font-mono text-xs tracking-widest text-zinc-600">{label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="mb-40">
          <ScrollReveal>
            <div className="mb-14 flex items-center gap-4">
              <span className="font-mono text-xs tracking-widest text-emerald-400">03 /</span>
              <h2 className="text-3xl font-bold text-white">Experience</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="relative space-y-0">
            <div className="absolute top-2 bottom-2 left-[7px] w-px bg-zinc-800" />
            {experience.map(({ year, title, place, description }, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative flex gap-8 pb-10">
                  <div className="relative mt-1.5 flex-shrink-0">
                    <div className="h-3.5 w-3.5 rounded-full border border-emerald-400/50 bg-black ring-4 ring-black" />
                  </div>
                  <div className="card-glow flex-1 border border-zinc-800/60 bg-zinc-900/20 p-6 backdrop-blur-sm">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-white">{title}</h3>
                        <p className="font-mono text-xs text-emerald-400">{place}</p>
                      </div>
                      <span className="font-mono text-xs text-zinc-600">{year}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-500">{description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="mb-40">
          <ScrollReveal>
            <div className="mb-14 flex items-center gap-4">
              <span className="font-mono text-xs tracking-widest text-emerald-400">04 /</span>
              <h2 className="text-3xl font-bold text-white">Certifications</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {certifications.map(({ name, issuer, status, year }, i) => (
              <ScrollReveal key={name} delay={i * 100}>
                <div className="card-glow border border-zinc-800/60 bg-zinc-900/20 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-lg font-bold text-white">{name}</h3>
                    <span
                      className={`border px-2 py-1 font-mono text-xs ${
                        status === 'Earned'
                          ? 'border-emerald-400/40 text-emerald-400'
                          : status === 'Planned'
                            ? 'border-zinc-700 text-zinc-500'
                            : 'border-zinc-800 text-zinc-700'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <p className="mb-1 text-sm text-zinc-500">{issuer}</p>
                  <p className="font-mono text-xs text-zinc-700">{year}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── SOCIALS ── */}
        <section className="mb-40">
          <ScrollReveal>
            <div className="mb-14 flex items-center gap-4">
              <span className="font-mono text-xs tracking-widest text-emerald-400">05 /</span>
              <h2 className="text-3xl font-bold text-white">Find Me</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap gap-4">
            {socials.map(({ label, href, icon }, i) => (
              <ScrollReveal key={label} delay={i * 80}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glow group flex items-center gap-4 border border-zinc-800/60 bg-zinc-900/20 px-6 py-4 backdrop-blur-sm"
                >
                  <span className="font-mono text-xs font-bold text-emerald-400">{icon}</span>
                  <span className="text-sm text-zinc-400 transition-colors group-hover:text-white">
                    {label}
                  </span>
                  <span className="font-mono text-xs text-zinc-700 transition-colors group-hover:text-emerald-400">
                    ↗
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mb-24">
          <ScrollReveal>
            <div className="relative overflow-hidden border border-emerald-500/20 bg-emerald-500/5 p-16 text-center backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
                <div className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
                <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
              </div>
              <div className="relative">
                <p className="mb-3 font-mono text-xs tracking-[0.3em] text-emerald-400">
                  OPEN TO OPPORTUNITIES
                </p>
                <h2 className="mb-4 text-4xl font-bold text-white">Let&apos;s work together</h2>
                <p className="mb-10 text-zinc-400">
                  Looking for internships, junior roles, or freelance security projects.
                </p>
                <Link
                  href="/contact"
                  className="inline-block border border-emerald-500 bg-emerald-500 px-10 py-4 font-mono text-xs font-bold tracking-widest text-black transition-all duration-300 hover:bg-transparent hover:text-emerald-400"
                >
                  CONTACT ME
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  )
}
