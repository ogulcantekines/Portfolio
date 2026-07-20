import Link from 'next/link'
import ScrollReveal from '../../components/ScrollReveal'

type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string | null
  liveUrl: string | null
  featured: boolean
  order: number
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${process.env.API_URL}/api/projects`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  const json = await res.json()
  return json.data ?? []
}

export default async function Projects() {
  const projects = await getProjects()
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <div className="bg-grid relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <ScrollReveal>
          <div className="mb-16">
            <p className="mb-4 font-mono text-xs tracking-[0.3em] text-emerald-400">PORTFOLIO</p>
            <h1 className="text-5xl font-bold text-white sm:text-6xl">Projects</h1>
          </div>
        </ScrollReveal>

        {/* Featured */}
        {featured.length > 0 && (
          <>
            <ScrollReveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="font-mono text-xs tracking-widest text-emerald-400">FEATURED</span>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>
            </ScrollReveal>

            <div className="mb-16 grid gap-4 sm:grid-cols-2">
              {featured.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 100}>
                  <Link
                    href={`/projects/${project.id}`}
                    className="card-glow group block border border-zinc-800/60 bg-zinc-900/20 p-8 backdrop-blur-sm"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h2 className="text-xl font-semibold text-white transition-colors group-hover:text-emerald-400">
                        {project.title}
                      </h2>
                      <span className="font-mono text-xs text-zinc-700 transition-colors group-hover:text-emerald-400">
                        →
                      </span>
                    </div>
                    <p className="mb-6 text-sm leading-relaxed text-zinc-500">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-zinc-800 px-2 py-1 font-mono text-xs text-zinc-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        {/* Other */}
        {rest.length > 0 && (
          <>
            <ScrollReveal>
              <div className="mb-8 flex items-center gap-4">
                <span className="font-mono text-xs tracking-widest text-zinc-600">OTHER</span>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
              </div>
            </ScrollReveal>

            <div className="space-y-2">
              {rest.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 80}>
                  <Link
                    href={`/projects/${project.id}`}
                    className="card-glow group flex items-center justify-between border border-zinc-800/60 bg-zinc-900/20 p-6 backdrop-blur-sm"
                  >
                    <div>
                      <h3 className="mb-1 font-semibold text-white transition-colors group-hover:text-emerald-400">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-600">{project.description}</p>
                    </div>
                    <div className="ml-8 flex shrink-0 items-center gap-4">
                      <div className="hidden flex-wrap gap-2 sm:flex">
                        {project.techStack.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="border border-zinc-800 px-2 py-1 font-mono text-xs text-zinc-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="font-mono text-xs text-zinc-700 transition-colors group-hover:text-emerald-400">
                        →
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        {projects.length === 0 && (
          <p className="font-mono text-sm text-zinc-600">No projects yet.</p>
        )}
      </div>
    </div>
  )
}
