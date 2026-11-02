import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, DownloadSimple, EnvelopeSimple, GithubLogo, LinkedinLogo, SealCheck } from "@phosphor-icons/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { about, badges, featured, highlights, links, projects, results, toolbox, training, type Project } from "@/data"

const nav = [
  ["Certifications", "#certifications"],
  ["Results", "#results"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
] as const

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:bg-red focus:px-3 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-background/90 backdrop-blur">
        <nav aria-label="Main" className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-4 md:px-8">
          <a href="#top" className="py-2 font-semibold text-ink">
            Nuno Gonçalves
          </a>
          <ul className="hidden gap-6 text-sm text-body md:flex">
            {nav.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="py-2 transition-colors hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href={links.cv} download className="inline-flex items-center gap-1.5 py-2 text-sm text-red hover:underline">
            <DownloadSimple aria-hidden /> Download CV
          </a>
        </nav>
      </header>

      <main id="main">
        <Hero />
        <Certifications />
        <Results />
        <Projects />
        <Skills />
        <AboutAndContact />
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-faint md:px-8">Nuno Gonçalves, Porto, 2026</footer>
    </div>
  )
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 md:px-8 md:py-24">
      <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-[62ch] text-body">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  )
}

function Hero() {
  return (
    <section id="top" className="border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-12 md:px-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <h1>
            <span className="block text-lg font-medium text-body md:text-xl">Nuno Gonçalves</span>
            <span
              className="glitch mt-3 font-display text-6xl font-extrabold uppercase leading-[0.9] text-ink sm:text-7xl md:text-8xl"
              data-text="Offensive security"
            >
              Offensive security
            </span>
          </h1>
          <p className="mt-6 max-w-[40ch] text-lg text-body md:text-xl">
            Informatics Engineering student at ISEP, Porto. Looking for a curricular internship from February to June 2027.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button nativeButton={false} render={<a href={`mailto:${links.email}`} />} size="lg">
              <EnvelopeSimple aria-hidden /> Email me
            </Button>
            <Button nativeButton={false} render={<a href={links.cv} download />} size="lg" variant="outline">
              <DownloadSimple aria-hidden /> Download CV
            </Button>
          </div>
        </div>

        <aside aria-label="Highlights" className="rounded-sm border border-line bg-panel p-6 md:p-8">
          <img src="nuno.webp" alt="Nuno Gonçalves" width={72} height={72} fetchPriority="high" className="size-[72px] rounded-full object-cover" />
          <ul className="mt-6 divide-y divide-line">
            {highlights.map((h) => (
              <li key={h.title} className="py-3 first:pt-0 last:pb-0">
                <p className="font-semibold text-ink">{h.title}</p>
                <p className="text-sm text-body">{h.detail}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

function Certifications() {
  return (
    <Section id="certifications" title="Certifications" intro="Verified on Credly. Each badge opens its record with the issue date and the skills it covers.">
      <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((b, i) => (
          <a
            key={b.url}
            href={b.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${b.name}, ${b.issuer}, ${b.issued}. Verify on Credly (opens in a new tab)`}
            className={`group flex min-w-0 gap-5 bg-background p-6 transition-colors hover:bg-panel ${i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:flex-col" : ""}`}
          >
            <img
              src={b.image}
              alt=""
              width={160}
              height={160}
              loading="lazy"
              // The CCNA badge is dark artwork on a transparent background, so it sits on a light disc.
              className={`shrink-0 ${i === 0 ? "size-24 rounded-full bg-ink p-2 lg:size-40 lg:p-3" : "size-20"}`}
            />
            <div className="min-w-0">
              <h3 className={`font-semibold text-ink ${i === 0 ? "text-xl lg:text-2xl" : ""}`}>{b.name}</h3>
              <p className="mt-1 text-sm text-body">
                {b.issuer}, {b.issued}
              </p>
              <p className="mt-3 text-sm text-faint">{(i === 0 ? b.skills : b.skills.slice(0, 3)).join(", ")}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm text-red">
                <SealCheck weight="fill" aria-hidden /> Verify on Credly
              </p>
            </div>
          </a>
        ))}
      </div>

      <h3 className="mt-14 text-lg font-semibold text-ink">Training and languages</h3>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {training.map((t) => (
          <li key={t.name} className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between">
            <span className="text-ink">{t.name}</span>
            <span className="text-sm text-body">{t.detail}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Results() {
  const reduce = useReducedMotion()
  return (
    <Section id="results" title="Results">
      <ol className="relative ml-2 border-l border-line">
        {results.map((r, i) => (
          <motion.li
            key={r.title}
            className="relative pb-10 pl-8 last:pb-0"
            initial={reduce ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="absolute -left-[5px] top-2 size-[9px] rounded-full bg-red" aria-hidden />
            <p className="font-mono text-sm text-red">{r.when}</p>
            <h3 className="mt-1 text-xl font-semibold text-ink md:text-2xl">{r.title}</h3>
            <p className="mt-2 max-w-[60ch] text-body">{r.detail}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}

function ProjectCard({ p, wide }: { p: Project; wide?: boolean }) {
  return (
    <article className={`flex min-w-0 flex-col bg-background p-6 ${wide ? "md:col-span-2 md:p-8" : ""}`}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className={`font-semibold text-ink ${wide ? "text-2xl" : "text-lg"}`}>{p.name}</h3>
        <span className="shrink-0 font-mono text-sm text-faint">{p.when}</span>
      </div>
      <p className="mt-3 max-w-[70ch] text-body">{p.summary}</p>
      {p.more && (
        <ul className="mt-4 max-w-[70ch] list-disc space-y-1.5 pl-5 text-sm text-body marker:text-red">
          {p.more.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
        {p.stack.map((s) => (
          <Badge key={s} variant="outline" className="font-mono font-normal">
            {s}
          </Badge>
        ))}
        {p.link && (
          <a href={p.link} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 py-1 text-sm text-red hover:underline">
            Code on GitHub <ArrowUpRight aria-hidden />
            <span className="sr-only"> for {p.name} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  )
}

function Projects() {
  return (
    <Section id="projects" title="Projects" intro="University, competition and personal work. Most university code lives in private repositories, so each entry says what it is and what I did.">
      <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
        <ProjectCard p={featured} wide />
        {projects.map((p) => (
          <ProjectCard key={p.name} p={p} />
        ))}
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {toolbox.map((g) => (
          <div key={g.area}>
            <h3 className="text-sm font-semibold text-red">{g.area}</h3>
            <ul className="mt-3 space-y-1.5 text-ink">
              {g.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

function AboutAndContact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">About me</h2>
          <p className="mt-4 max-w-[60ch] text-lg text-ink">
            Third-year BSc in Informatics Engineering at ISEP, Porto, finishing in July 2027. This autumn I am on Erasmus at Aarhus University in
            Denmark.
          </p>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {about.map((a) => (
              <div key={a.title} className="grid gap-1 py-4 md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="font-semibold text-ink">{a.title}</dt>
                <dd className="text-body">{a.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 id="contact-title" className="text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">
            Contact
          </h2>
          <p className="mt-4 text-body">Available from February 2027. Email is the fastest way to reach me.</p>
          <a href={`mailto:${links.email}`} className="mt-4 inline-block break-all py-1 text-lg text-red hover:underline md:text-xl">
            {links.email}
          </a>
          <ul className="mt-8 space-y-3 text-[15px] sm:text-base">
            <li>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-center gap-2 py-1 text-ink hover:text-red">
                <LinkedinLogo aria-hidden className="size-5 shrink-0" /> <span className="min-w-0 break-all">{links.linkedinLabel}</span>
              </a>
            </li>
            <li>
              <a href={links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 py-1 text-ink hover:text-red">
                <GithubLogo aria-hidden className="size-5" /> github.com/NunoGoncalves06
              </a>
            </li>
            <li>
              <a href={links.credly} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 py-1 text-ink hover:text-red">
                <SealCheck aria-hidden className="size-5" /> Credly badges
              </a>
            </li>
            <li>
              <a href={links.cv} download className="inline-flex items-center gap-2 py-1 text-ink hover:text-red">
                <DownloadSimple aria-hidden className="size-5" /> Download CV (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
