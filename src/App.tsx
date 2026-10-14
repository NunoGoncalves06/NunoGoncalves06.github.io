import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo, SealCheck } from "@phosphor-icons/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { badges, beyond, links, projects, results, toolbox, training, type Project } from "@/data"

const DRAGON = String.raw`
..............
            ..,;:ccc,.
          ......''';lxO.
.....''''..........,:ld;
           .';;;:::;,,.x,
      ..'''.            0Xxoc:,.  ...
  ....                ,ONkc;,;cokOdc',.
 .                   OMo           ':ddo.
                    dMc               :OO;
                    0M.                 .:o.
                    ;Wd
                     ;XO,
                       ,d0Odlc;,..
                           ..',;:cdOOd::,.
                                    .:d;.':;.
                                       'd,  .'
                                         ;l   ..
                                          .o
                                            c
                                            .'
                                             .`.slice(1)

const nav = [
  ["Results", "#results"],
  ["Certifications", "#certifications"],
  ["Projects", "#projects"],
  ["Beyond the CV", "#beyond"],
  ["Contact", "#contact"],
] as const

export default function App() {
  return (
    <div className="dark min-h-[100dvh] bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-line/70 bg-background/85 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
          <a href="#top" className="font-mono text-sm text-ink">
            nuno@kali<span className="text-red">:~$</span>
          </a>
          <ul className="hidden gap-6 text-sm text-body md:flex">
            {nav.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${links.email}`} className="text-sm text-red hover:underline md:hidden">
            Email me
          </a>
        </nav>
      </header>

      <main id="top">
        <Hero />
        <Results />
        <Certifications />
        <Projects />
        <Toolbox />
        <Beyond />
        <Contact />
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-xs text-faint md:px-8">
        Nuno Gonçalves, Porto. Built with React, Tailwind and Motion.
      </footer>
    </div>
  )
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:px-8 md:py-24">
      <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-ink md:text-5xl">{title}</h2>
      {intro && <p className="mt-3 max-w-[62ch] text-body">{intro}</p>}
      <div className="mt-10">{children}</div>
    </section>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-12 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-16">
        <div className="min-w-0">
          <pre aria-hidden className="mb-6 font-mono text-[5px] leading-[1.05] text-red sm:text-[6px]">
            {DRAGON}
          </pre>
          <p className="text-body">Nuno Gonçalves, Informatics Engineering at ISEP, Porto</p>
          <h1
            className="glitch mt-3 font-display text-6xl font-extrabold uppercase leading-[0.9] text-ink sm:text-7xl md:text-8xl"
            data-text="Offensive security"
          >
            Offensive security
          </h1>
          <p className="mt-6 max-w-[34ch] text-xl text-body md:text-2xl">I find how systems break, then explain how to fix them.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button render={<a href="#projects" />} size="lg">
              See my projects
            </Button>
            <Button render={<a href={`mailto:${links.email}`} />} size="lg" variant="outline">
              <EnvelopeSimple /> Email me
            </Button>
          </div>
        </div>
        <PatchDemo />
      </div>
    </section>
  )
}

// A tiny password check, as a disassembler would show it. Patching one byte flips the
// branch: the program then lets in every wrong password. This is what the work looks like.
const LISTING = [
  ["00401149", "e8 e2 fe ff ff", "call", "strcmp", ""],
  ["0040114e", "85 c0", "test", "eax, eax", "; same?"],
  ["00401150", "75 07", "jne", "0x401159", "; if not: deny"],
  ["00401152", "b8 01 00 00 00", "mov", "eax, 1", "; granted"],
  ["00401157", "eb 05", "jmp", "0x40115e", ""],
  ["00401159", "b8 00 00 00 00", "mov", "eax, 0", "; denied"],
  ["0040115e", "c3", "ret", "", ""],
] as const

const SECRET = "ccna-2026"

function PatchDemo() {
  const [patched, setPatched] = useState(false)
  const [guess, setGuess] = useState("hunter2")
  const [runs, setRuns] = useState<{ guess: string; ok: boolean; patched: boolean }[]>([])

  const run = () => {
    const equal = guess === SECRET
    // jne jumps to "denied" when the strings differ; the patched je jumps there when they match.
    const ok = patched ? !equal : equal
    setRuns((r) => [...r.slice(-2), { guess, ok, patched }])
  }

  return (
    <div className="min-w-0 rounded-sm border border-line bg-panel font-mono text-[12px] sm:text-[13px] shadow-[0_0_0_1px_rgb(255_42_79/0.06)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-faint">
        <span>check_password, disassembled</span>
        <span>{patched ? "1 byte patched" : "original"}</span>
      </div>
      <ol className="space-y-1 px-4 py-4">
        {LISTING.map(([addr, raw, op, args, note]) => {
          const isBranch = addr === "00401150"
          return (
            <li
              key={addr}
              className={`grid grid-cols-[4.75rem_2.5rem_1fr] gap-2 rounded-sm px-1 sm:grid-cols-[5.5rem_7.5rem_3rem_1fr] ${isBranch ? "bg-amber/10" : ""}`}
            >
              <span className="text-faint">{addr}</span>
              <span className="hidden text-faint/70 sm:block">{isBranch && patched ? "74 07" : raw}</span>
              <span className={isBranch ? "text-amber" : "text-red"}>{isBranch && patched ? "je" : op}</span>
              <span className="truncate text-ink">
                {args} <span className="text-faint">{isBranch && patched ? "; if same: deny" : note}</span>
              </span>
            </li>
          )
        })}
      </ol>
      <div className="border-t border-line px-4 py-4">
        <label htmlFor="guess" className="block text-xs text-body">
          Try a password
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          <input
            id="guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            className="min-w-0 flex-1 basis-40 rounded-sm border border-input bg-background px-3 py-2 text-ink placeholder:text-faint"
            spellCheck={false}
            autoComplete="off"
          />
          <Button onClick={run}>Run</Button>
          <Button variant="outline" onClick={() => setPatched((p) => !p)}>
            {patched ? "Undo patch" : "Patch the jump"}
          </Button>
        </div>
        <ul className="mt-3 min-h-[4.5rem] space-y-1 text-xs" aria-live="polite">
          {runs.length === 0 && <li className="text-faint">Run it, then patch the jump and run the same wrong password again.</li>}
          {runs.map((r, i) => (
            <li key={i} className={r.ok ? "text-amber" : "text-faint"}>
              $ ./login {r.guess || "''"} <span className="text-faint">{r.patched ? "(patched)" : ""}</span> {r.ok ? "access granted" : "access denied"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Results() {
  const reduce = useReducedMotion()
  return (
    <Section id="results" title="Results" intro="In order, from the first award to the latest certificate.">
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

function Certifications() {
  return (
    <Section
      id="certifications"
      title="Certifications"
      intro="Verified on Credly. Each badge opens its record, with the date it was issued and the skills it covers."
    >
      <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((b, i) => (
          <a
            key={b.url}
            href={b.url}
            target="_blank"
            rel="noreferrer"
            className={`group flex gap-5 bg-background p-6 transition-colors hover:bg-panel ${i === 0 ? "lg:row-span-2 lg:flex-col lg:items-start" : ""}`}
          >
            <img
              src={b.image}
              alt={`${b.name} badge`}
              className={`shrink-0 transition-transform group-hover:-rotate-3 group-hover:scale-105 ${i === 0 ? "size-24 lg:size-40" : "size-20"}`}
              loading="lazy"
            />
            <div>
              <h3 className={`font-semibold text-ink ${i === 0 ? "text-xl lg:text-3xl" : ""}`}>{b.name}</h3>
              <p className="mt-1 text-sm text-body">
                {b.issuer}, {b.issued}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {b.skills.slice(0, i === 0 ? 6 : 2).map((s) => (
                  <Badge key={s} variant="secondary" className="font-normal">
                    {s}
                  </Badge>
                ))}
                {b.skills.length > (i === 0 ? 6 : 2) && (
                  <Tooltip>
                    <TooltipTrigger className="text-xs text-faint hover:text-ink">+{b.skills.length - 2} more</TooltipTrigger>
                    <TooltipContent>{b.skills.slice(2).join(", ")}</TooltipContent>
                  </Tooltip>
                )}
              </div>
              <p className="mt-4 inline-flex items-center gap-1 text-sm text-red">
                <SealCheck weight="fill" /> Verify on Credly
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

function ProjectCard({ p, fill }: { p: Project; fill: string }) {
  return (
    <article className={`flex flex-col bg-background p-6 ${p.featured ? "md:col-span-2" : ""} ${fill}`}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className={`font-semibold text-ink ${p.featured ? "text-2xl" : "text-lg"}`}>{p.name}</h3>
        <span className="shrink-0 font-mono text-xs text-faint">{p.when}</span>
      </div>
      <p className="mt-3 max-w-[65ch] text-body">{p.summary}</p>
      {p.more && (
        <ul className="mt-4 max-w-[65ch] list-disc space-y-1.5 pl-5 text-sm text-body marker:text-red">
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
          <a href={p.link} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-sm text-red hover:underline">
            Code on GitHub <ArrowUpRight />
          </a>
        )}
      </div>
    </article>
  )
}

// Featured cards are two columns wide. Stretch the last card over whatever is left of the
// final row, so the grid never ends with an empty cell (2 columns at md, 3 at lg).
function fillLastRow(list: Project[]) {
  const used = (cols: number) => list.reduce((n, p) => n + (p.featured ? 2 : 1), 0) % cols
  const md = used(2) === 1 ? "md:col-span-2" : ""
  const lg = { 1: "lg:col-span-3", 2: "lg:col-span-2" }[used(3)] ?? "lg:col-span-1"
  return `${md} ${lg}`
}

function Projects() {
  const groups = { all: projects, networks: projects.filter((p) => p.kind === "networks"), software: projects.filter((p) => p.kind === "software") }
  return (
    <Section
      id="projects"
      title="Projects"
      intro="Most of these are university and competition work in private repositories, so this is what each one is and what I did on it."
    >
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="networks">Networks and hardware</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
        </TabsList>
        {Object.entries(groups).map(([key, list]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <div className="grid grid-flow-row-dense gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <ProjectCard key={p.name} p={p} fill={i === list.length - 1 ? fillLastRow(list) : ""} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  )
}

function Toolbox() {
  return (
    <Section id="toolbox" title="What I work with">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {toolbox.map((g) => (
          <div key={g.area}>
            <h3 className="font-mono text-sm text-red">{g.area}</h3>
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

function Beyond() {
  return (
    <Section id="beyond" title="Beyond the CV">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="text-body">
          <p className="text-lg text-ink">BSc in Informatics Engineering at ISEP, Porto, finishing in 2027.</p>
          <p className="mt-4">
            Networks, computer systems and architecture, data structures, databases, software engineering, machine learning and IoT. The last
            semester is an internship with a written report.
          </p>
          <p className="mt-4">In high school I won school awards for both academic and athletic results.</p>
        </div>
        <dl className="divide-y divide-line border-y border-line">
          {beyond.map((b) => (
            <div key={b.title} className="grid gap-1 py-5 md:grid-cols-[13rem_1fr] md:gap-6">
              <dt className="font-semibold text-ink">{b.title}</dt>
              <dd className="text-body">{b.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-24 md:px-8">
        <h2 className="font-display text-5xl font-extrabold uppercase leading-none text-ink md:text-7xl">Get in touch</h2>
        <a href={`mailto:${links.email}`} className="mt-6 inline-block break-all text-xl text-red hover:underline md:text-3xl">
          {links.email}
        </a>
        <Separator className="my-10" />
        <div className="flex flex-wrap gap-3">
          <Button render={<a href={links.linkedin} target="_blank" rel="noreferrer" />} variant="outline">
            <LinkedinLogo /> {links.linkedinLabel}
          </Button>
          <Button render={<a href={links.github} target="_blank" rel="noreferrer" />} variant="outline">
            <GithubLogo /> GitHub
          </Button>
          <Button render={<a href={links.credly} target="_blank" rel="noreferrer" />} variant="outline">
            <SealCheck /> Credly
          </Button>
        </div>
      </div>
    </section>
  )
}
