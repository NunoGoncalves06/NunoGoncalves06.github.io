import { useEffect, useRef, useState } from "react"
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
  const flags = useFlags()

  useEffect(() => {
    console.log("%cflag 2 of 3: flag{console_curious}", "color:#ff2a4f;font:600 14px monospace")
    console.log("Submit it in the terminal at the top of the page: flag <value>")
  }, [])

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
        <Hero addFlag={flags.add} />
        <Results />
        <Certifications />
        <Projects />
        <Toolbox />
        <Beyond />
        <Contact />
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-xs text-faint md:flex-row md:justify-between md:px-8">
        <span>Nuno Gonçalves, Porto. Built with React, Tailwind and Motion.</span>
        <span aria-live="polite">
          {flags.found.length === FLAGS.length
            ? "All 3 flags found. Thanks for digging around; email me and say hi."
            : `Flags found: ${flags.found.length} of ${FLAGS.length}. They are hidden on this site; submit them in the terminal with flag <value>.`}
        </span>
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

function Hero({ addFlag }: { addFlag: (f: string) => "new" | "again" | "wrong" }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="scanlines pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-12 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-16">
        <div className="min-w-0">
          {/* Flag 3 of 3 shows up after resting the pointer on the dragon (or focusing it) for a moment. */}
          <div tabIndex={0} aria-label="Kali dragon" className="group relative mb-6 w-fit outline-none">
            <pre aria-hidden className="font-mono text-[5px] leading-[1.05] text-red sm:text-[6px]">
              {DRAGON}
            </pre>
            <span className="pointer-events-none absolute left-full top-1/2 ml-3 whitespace-nowrap font-mono text-[11px] text-red opacity-0 transition-opacity delay-0 group-hover:opacity-100 group-hover:delay-700 group-focus:opacity-100">
              flag 3 of 3: flag{"{here_be_dragons}"}
            </span>
          </div>
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
        <Terminal addFlag={addFlag} />
      </div>
    </section>
  )
}

// The terminal escape room: a pretend home folder to explore with a few real commands.
// One file is locked; the passphrase hint sits in a hidden file. Nothing here touches a real system.
type Entry = string | { [name: string]: Entry }

const HOME: { [name: string]: Entry } = {
  "about.txt":
    "Nuno Gonçalves. Informatics Engineering student at ISEP in Porto, on Erasmus at Aarhus University this autumn.\nI play CTFs with CHAØS and I'm CCNA certified. I like finding how things break, then explaining the fix.",
  projects: {
    "ccna3-network.txt": "A three-site company network on real Cisco equipment: VLANs, HSRP, OSPF, IPsec VPN tunnels, NAT and IP telephony.\nTeam project, maximum score.",
    "wakecast.txt": "An Android alarm that reads you a morning briefing when you dismiss it.\nCode: github.com/NunoGoncalves06/Wakecast",
    "aisafe.txt": "A flight control prototype: a flight-plan language parsed with ANTLR and a simulation engine in C.",
  },
  certs: {
    "ccna.txt": "Cisco Certified Network Associate, August 2026. Verified on Credly.",
    "ceh-v13.txt": "Certified Ethical Hacker v13: training completed at ISEP Academy, 2026.",
    "aws.txt": "AWS Cloud Practitioner: training completed at ISEP Academy.",
  },
  "contact.txt": "",
  ".notes": "note to self: the passphrase for contact.txt is the name of my CTF team.\nit's somewhere on this page.",
}

const PASSPHRASES = ["chaos", "chaøs"]

// `dirs` names the folders in an ls listing, so they can be coloured the way Kali does.
type Line = { kind: "in" | "out" | "ok" | "err"; text: string; dirs?: string[] }

const CONTACT = `Email     ${links.email}\nLinkedIn  ${links.linkedinLabel}\nGitHub    github.com/NunoGoncalves06\n\nYou got in. Write to me, I'd like to hear how long it took.`

// Fixed, made-up timestamps so ls -l looks real and stays the same on every visit.
const STAMP: Record<string, string> = {
  ".": "Oct 14 10:02", "..": "Sep  2 18:40", "about.txt": "Oct  3 21:15", projects: "Oct 12 16:48", certs: "Aug  2 11:30",
  "contact.txt": "Oct 14 10:02", ".notes": "Oct 14 09:57", "ccna3-network.txt": "Feb 13 19:22", "wakecast.txt": "Sep 30 14:36",
  "aisafe.txt": "Jun 18 23:05", "ccna.txt": "Aug  2 11:30", "ceh-v13.txt": "Jul 21 17:10", "aws.txt": "Jan 27 12:44",
}

function Terminal({ addFlag }: { addFlag: (f: string) => "new" | "again" | "wrong"; }) {
  const [cwd, setCwd] = useState<string[]>([])
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [back, setBack] = useState(0)
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: "Welcome to my machine. One file in here is locked: contact.txt." },
    { kind: "out", text: "Type help to see what you can do." },
  ])
  const screen = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLInputElement>(null)

  // Scroll inside the terminal only; scrolling the page here would yank visitors down on load.
  useEffect(() => {
    if (screen.current) screen.current.scrollTop = screen.current.scrollHeight
  }, [lines])

  const prompt = `nuno@kali:~${cwd.length ? "/" + cwd.join("/") : ""}$`
  const here = () => cwd.reduce<Entry>((dir, name) => (dir as Record<string, Entry>)[name], HOME) as Record<string, Entry>

  const run = (raw: string) => {
    const [cmd = "", ...args] = raw.trim().split(/\s+/)
    const arg = args.join(" ")
    const say = (text: string, kind: Line["kind"] = "out") => out.push({ kind, text })
    const out: Line[] = [{ kind: "in", text: `${prompt} ${raw}` }]
    const dir = here()

    switch (cmd.toLowerCase()) {
      case "":
        break
      case "help":
        say("ls [-l] [-a]     list files (-a shows hidden ones, -l shows details)\ncd <folder>      open a folder (cd .. goes back)\ncat <file>       read a file\nunlock <word>    unlock contact.txt\nflag <flag>      submit a flag you found on this site\nwhoami, pwd, clear")
        break
      case "ls": {
        // Behaves like GNU ls for the options people try: -a, -l, -1, -h and any mix (-la, -al, -lah).
        const flags = args.filter((a) => a.startsWith("-") && a.length > 1).map((a) => a.slice(1)).join("")
        const bad = [...flags].find((c) => !"alh1".includes(c))
        if (bad) {
          say(`ls: invalid option -- '${bad}'\nTry 'ls --help' for more information.`, "err")
          break
        }
        const target = args.find((a) => !a.startsWith("-"))?.replace(/\/$/, "")
        let folder = dir
        let names: string[]
        if (target && target !== ".") {
          const entry = target === ".." ? (cwd.length ? HOME : undefined) : dir[target]
          if (entry === undefined) {
            say(`ls: cannot access '${target}': No such file or directory`, "err")
            break
          }
          if (typeof entry === "string") names = [target]
          else {
            folder = entry
            names = Object.keys(entry)
          }
        } else names = Object.keys(folder)
        const single = names.length === 1 && typeof folder[names[0]] === "string" && target === names[0]
        names = names.filter((n) => flags.includes("a") || single || !n.startsWith("."))
        names.sort((a, b) => a.replace(/^\./, "").localeCompare(b.replace(/^\./, "")))
        if (flags.includes("a") && !single) names = [".", "..", ...names]
        const isDir = (n: string) => n === "." || n === ".." || typeof folder[n] !== "string"
        const dirs = names.filter(isDir)

        if (!flags.includes("l")) {
          say(names.join(flags.includes("1") ? "\n" : "  "))
          out[out.length - 1].dirs = dirs
          break
        }
        const rows = names.map((n) => {
          const locked = folder === HOME && n === "contact.txt" && !unlocked
          const size = isDir(n) ? 4096 : new TextEncoder().encode(n === "contact.txt" ? CONTACT : (folder[n] as string)).length
          const mode = isDir(n) ? "drwxr-xr-x" : locked ? "-r--------" : "-rw-r--r--"
          const owner = locked ? "root root" : "nuno nuno"
          const shown = flags.includes("h") && size >= 1024 ? (size / 1024).toFixed(1).replace(/\.0$/, "") + "K" : String(size)
          return { n, mode, links: isDir(n) ? 2 : 1, owner, shown }
        })
        const width = Math.max(...rows.map((r) => r.shown.length))
        say(
          [...(single ? [] : [`total ${names.length * 4}`]), ...rows.map((r) => `${r.mode} ${r.links} ${r.owner} ${r.shown.padStart(width)} ${STAMP[r.n] ?? "Oct 14 10:02"} ${r.n}`)].join("\n"),
        )
        out[out.length - 1].dirs = dirs
        break
      }
      case "cd":
        if (!arg || arg === "~" || arg === "/") setCwd([])
        else if (arg === "..") setCwd((c) => c.slice(0, -1))
        else if (typeof dir[arg.replace(/\/$/, "")] === "object") setCwd((c) => [...c, arg.replace(/\/$/, "")])
        else say(`cd: ${arg}: no such folder`, "err")
        break
      case "cat":
        if (!arg) say("cat: which file? Try ls first.", "err")
        else if (cwd.length === 0 && arg === "contact.txt") {
          if (unlocked) say(CONTACT, "ok")
          else say("cat: contact.txt: permission denied. Try unlock <passphrase>.", "err")
        } else if (typeof dir[arg] === "string") say(dir[arg] as string)
        else if (dir[arg]) say(`cat: ${arg}: is a folder. Use cd ${arg}`, "err")
        else say(`cat: ${arg}: no such file`, "err")
        break
      case "unlock":
        if (PASSPHRASES.includes(arg.toLowerCase())) {
          setUnlocked(true)
          say("contact.txt unlocked. Now read it.", "ok")
        } else say("Wrong passphrase. Maybe someone left a note. Hidden files start with a dot.", "err")
        break
      case "flag": {
        const result = addFlag(arg)
        say(
          result === "new" ? "Correct. That flag counts; see the footer." : result === "again" ? "You already found that one." : "That's not one of the flags.",
          result === "wrong" ? "err" : "ok",
        )
        break
      }
      case "whoami":
        say("a visitor. The machine belongs to Nuno.")
        break
      case "pwd":
        say("/home/nuno" + (cwd.length ? "/" + cwd.join("/") : ""))
        break
      case "sudo":
        say("Nice try. This incident will be reported.", "err")
        break
      case "clear":
        setLines([])
        return
      default:
        say(`${cmd}: command not found. Type help.`, "err")
    }
    setLines((l) => [...l, ...out].slice(-60))
  }

  return (
    <div
      className="flex h-[26rem] min-w-0 flex-col rounded-sm border border-line bg-panel font-mono text-[12px] sm:text-[13px]"
      onClick={() => field.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2 text-xs text-faint">
        <span className="size-2.5 rounded-full bg-[#ff5f56]" />
        <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="size-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2">nuno@kali: escape room</span>
        <span className="ml-auto">{unlocked ? "contact.txt unlocked" : "goal: read contact.txt"}</span>
      </div>
      <div ref={screen} className="min-h-0 flex-1 overflow-y-auto px-4 py-3" aria-live="polite">
        {lines.map((l, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap break-words ${l.kind === "in" ? "text-ink" : l.kind === "ok" ? "text-amber" : l.kind === "err" ? "text-red" : "text-body"}`}
          >
            {l.dirs?.length
              ? l.text.split(/(\s+)/).map((part, j) => (l.dirs!.includes(part) ? <span key={j} className="font-semibold text-[#5c9cff]">{part}</span> : part))
              : l.text}
          </pre>
        ))}
      </div>
      <form
        className="flex items-center gap-2 border-t border-line px-4 py-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim()) setHistory((h) => [...h, input])
          setBack(0)
          run(input)
          setInput("")
        }}
      >
        <label htmlFor="shell" className="shrink-0 text-red">
          {prompt}
        </label>
        <input
          id="shell"
          ref={field}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return
            e.preventDefault()
            const next = Math.min(history.length, Math.max(0, back + (e.key === "ArrowUp" ? 1 : -1)))
            setBack(next)
            setInput(next ? history[history.length - next] : "")
          }}
          className="min-w-0 flex-1 bg-transparent text-ink caret-red outline-none"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal command"
        />
      </form>
    </div>
  )
}

// The easter egg hunt: three flags hidden around the site (page source, browser console,
// hovering the dragon). Visitors submit them in the terminal; the footer keeps score.
const FLAGS = ["flag{view_source}", "flag{console_curious}", "flag{here_be_dragons}"]

function useFlags() {
  const [found, setFound] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("flags-found") ?? "[]")
    } catch {
      return []
    }
  })
  const add = (raw: string): "new" | "again" | "wrong" => {
    const flag = raw.trim().toLowerCase()
    if (!FLAGS.includes(flag)) return "wrong"
    if (found.includes(flag)) return "again"
    const next = [...found, flag]
    setFound(next)
    try {
      localStorage.setItem("flags-found", JSON.stringify(next))
    } catch {
      /* private mode: the score just won't survive a reload */
    }
    return "new"
  }
  return { found, add }
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
