import Link from 'next/link'
import { notFound } from 'next/navigation'
import ScrollReveal from '../../../components/ScrollReveal'

const projects: Record<
  string,
  {
    title: string
    description: string
    techStack: string[]
    githubUrl?: string
    liveUrl?: string
    purpose: string
    highlights: string[]
  }
> = {
  '1': {
    title: 'Portfolio Website',
    description:
      'Full-stack portfolio site built with Next.js, Express, and PostgreSQL. Deployed on VPS with nginx. Pentested and hardened.',
    techStack: [
      'Next.js',
      'TypeScript',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Docker',
      'Nginx',
      'GitHub Actions',
    ],
    githubUrl: 'https://github.com/ogulcantekines/Portfolio',
    purpose:
      'Build a production-grade portfolio site end to end — from backend API design to VPS deployment — then pentest and harden it. The goal was to learn every layer of the stack by owning the full lifecycle.',
    highlights: [
      'REST API with Express, Prisma ORM, and PostgreSQL',
      'Monorepo with pnpm workspaces (backend, frontend, shared)',
      'CI/CD pipeline with GitHub Actions',
      'Reverse proxy with nginx and TLS termination',
      'Rate limiting, CORS, and security headers via Helmet',
      'Pentested and hardened post-deployment',
    ],
  },
  '2': {
    title: 'Network Scanner',
    description:
      'Custom network reconnaissance tool built in Python. Automates host discovery, port scanning, and service enumeration.',
    techStack: ['Python', 'Nmap', 'Linux'],
    purpose:
      'Automate the reconnaissance phase of a penetration test. Combines host discovery, port scanning, and service detection into a single workflow.',
    highlights: [
      'Host discovery across CIDR ranges',
      'Port scanning with service and version detection',
      'Output formatted as structured JSON for further processing',
    ],
  },
  '3': {
    title: 'CTF Writeups',
    description: 'Documented solutions for HackTheBox and TryHackMe challenges.',
    techStack: ['HackTheBox', 'TryHackMe', 'Burp Suite', 'Metasploit'],
    purpose:
      'Document the methodology and thought process behind CTF solutions — not just the flags, but the reasoning at each step.',
    highlights: [
      'Web exploitation — SQLi, XSS, IDOR, SSRF',
      'Privilege escalation — Linux and Windows',
      'Network-based challenges',
    ],
  },
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects[id]

  if (!project) notFound()

  return (
    <div className="bg-grid relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24">
        <ScrollReveal>
          <Link
            href="/projects"
            className="group mb-12 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-zinc-600 transition-colors hover:text-emerald-400"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            BACK TO PROJECTS
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-12">
            <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400">PROJECT</p>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">{project.title}</h1>
            <p className="text-lg leading-relaxed text-zinc-400">{project.description}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div className="mb-10 border border-zinc-800/60 bg-zinc-900/20 p-8 backdrop-blur-sm">
            <p className="mb-3 font-mono text-xs tracking-widest text-emerald-400">PURPOSE</p>
            <p className="leading-relaxed text-zinc-400">{project.purpose}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mb-10">
            <p className="mb-6 font-mono text-xs tracking-widest text-emerald-400">HIGHLIGHTS</p>
            <ul className="space-y-3">
              {project.highlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 border border-zinc-800/40 bg-zinc-900/10 px-4 py-3 text-zinc-400"
                >
                  <span className="mt-2 h-px w-4 shrink-0 bg-emerald-400/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <div className="mb-10">
            <p className="mb-4 font-mono text-xs tracking-widest text-emerald-400">STACK</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-zinc-800 bg-zinc-900/30 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-emerald-400/40 hover:text-emerald-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {(project.githubUrl || project.liveUrl) && (
          <ScrollReveal delay={300}>
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 border border-zinc-700 px-6 py-3 font-mono text-xs tracking-widest text-zinc-400 transition-all hover:border-white hover:text-white"
                >
                  GITHUB
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 border border-emerald-400 bg-emerald-400 px-6 py-3 font-mono text-xs tracking-widest text-black transition-all hover:bg-transparent hover:text-emerald-400"
                >
                  LIVE SITE
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}
