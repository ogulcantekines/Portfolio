import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.project.deleteMany()
  await prisma.blogPost.deleteMany()

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

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
