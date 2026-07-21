import Link from 'next/link'
import { notFound } from 'next/navigation'
import ScrollReveal from '../../../components/ScrollReveal'

type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string | null
  liveUrl: string | null
  featured: boolean
}

async function getProject(id: string): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/projects/${id}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.data ?? null
  } catch {
    return null
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await getProject(id)

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

        <ScrollReveal delay={200}>
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
