import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.project.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.skillCategory.deleteMany()
  await prisma.stat.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.social.deleteMany()
  await prisma.about.deleteMany()

  await prisma.project.createMany({
    data: [
      {
        title: 'Portfolio Website',
        description:
          'Full-stack portfolio site built with Next.js, Express, and PostgreSQL. Deployed on VPS with nginx. Pentested and hardened.',
        techStack: ['Next.js', 'Express', 'PostgreSQL', 'Docker', 'Nginx'],
        githubUrl: 'https://github.com/ogulcantekines/Portfolio_Website',
        featured: true,
        order: 1,
      },
      {
        title: 'Network Scanner',
        description:
          'Custom network reconnaissance tool built in Python. Automates host discovery, port scanning, and service enumeration.',
        techStack: ['Python', 'Nmap', 'Linux'],
        featured: true,
        order: 2,
      },
      {
        title: 'CTF Writeups',
        description:
          'Documented solutions for HackTheBox and TryHackMe challenges covering web exploitation, privilege escalation, and more.',
        techStack: ['HackTheBox', 'TryHackMe', 'Burp Suite'],
        featured: false,
        order: 3,
      },
    ],
  })

  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Pentesting My Own Portfolio Site',
        slug: 'pentesting-my-own-portfolio',
        excerpt: 'What happens when you build a web app and then try to break it yourself?',
        content:
          'Coming soon. This writeup will cover the full penetration testing methodology applied to this portfolio site — reconnaissance, vulnerability discovery, exploitation, and remediation.',
        published: true,
        publishedAt: new Date('2026-08-01'),
      },
      {
        title: 'Securing a Node.js REST API: Rate Limiting, CORS, and Headers',
        slug: 'backend-api-security',
        excerpt:
          "A practical look at the security controls added to this portfolio's Express backend.",
        content:
          'Coming soon. This post will cover the security middleware stack — Helmet, CORS configuration, rate limiting — and why each control exists.',
        published: true,
        publishedAt: new Date('2026-07-20'),
      },
    ],
  })

  await prisma.skillCategory.createMany({
    data: [
      {
        name: 'Security',
        icon: '⚔',
        items: [
          'Penetration Testing',
          'Network Security',
          'Burp Suite',
          'Nmap',
          'Metasploit',
          'Wireshark',
        ],
        order: 1,
      },
      {
        name: 'Backend',
        icon: '⚙',
        items: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST API', 'Docker'],
        order: 2,
      },
      {
        name: 'Frontend',
        icon: '◈',
        items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
        order: 3,
      },
      {
        name: 'DevOps',
        icon: '⬡',
        items: ['Linux', 'Nginx', 'CI/CD', 'GitHub Actions', 'VPS'],
        order: 4,
      },
    ],
  })

  await prisma.stat.createMany({
    data: [
      { value: '1+', label: 'Years Learning', order: 1 },
      { value: '3+', label: 'Projects Built', order: 2 },
      { value: '10+', label: 'CTF Challenges', order: 3 },
      { value: '∞', label: 'Curiosity', order: 4 },
    ],
  })

  await prisma.experience.createMany({
    data: [
      {
        year: '2026',
        title: 'Full-Stack Developer',
        place: 'Personal Projects',
        description:
          'Built production-grade web applications end to end — backend API, frontend, deployment, and security testing.',
        order: 1,
      },
      {
        year: '2025',
        title: 'Security Research',
        place: 'Self-Directed',
        description:
          'Focused on offensive security — CTF challenges on HackTheBox and TryHackMe, network security, and penetration testing methodology.',
        order: 2,
      },
      {
        year: '2025',
        title: 'Computer Engineering Graduate',
        place: 'University',
        description: 'Completed degree with focus on networking and software development.',
        order: 3,
      },
    ],
  })

  await prisma.certification.createMany({
    data: [
      { name: 'eJPT', issuer: 'eLearnSecurity', status: 'Planned', year: '2026', order: 1 },
      { name: 'CompTIA Security+', issuer: 'CompTIA', status: 'Planned', year: '2026', order: 2 },
      { name: 'OSCP', issuer: 'Offensive Security', status: 'Goal', year: '2027', order: 3 },
    ],
  })

  await prisma.social.createMany({
    data: [
      { label: 'GitHub', href: 'https://github.com/ogulcantekines', icon: 'GH', order: 1 },
      { label: 'HackTheBox', href: 'https://hackthebox.com', icon: 'HTB', order: 2 },
      { label: 'TryHackMe', href: 'https://tryhackme.com', icon: 'THM', order: 3 },
    ],
  })

  await prisma.about.createMany({
    data: [
      {
        slug: 'background',
        content:
          'Recent graduate passionate about cybersecurity and software development. My goal is to specialize in offensive security — understanding systems deeply enough to find and exploit vulnerabilities, then helping organizations fix them.',
      },
      {
        slug: 'approach',
        content:
          'I build full-stack web applications with modern tooling, deploy them to VPS servers, and then pentest my own work. This portfolio site is itself a live example — built, deployed, and security-tested end to end.',
      },
    ],
  })

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
