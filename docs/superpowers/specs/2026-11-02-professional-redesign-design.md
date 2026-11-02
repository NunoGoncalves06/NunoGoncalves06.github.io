# Professional redesign of nunogoncalves06.github.io

## Intent
The site is read by recruiters and technical leads at security firms (Blaze, Devoteam Cyber Trust, PwC, KPMG).
Within 10 seconds they should see: Informatics Engineering student at ISEP, focused on offensive security,
CCNA certified, CTF player with results, junior and keen to learn. The tone is precise and credible, with no hype.
Every element must help a recruiter assess him. Nothing is there just to entertain.

## Goals
- A hero that introduces him seriously: name, degree, the "Offensive security" title, one line, a CTA to projects and email.
- A recruiter-first section order. Each section answers one question a recruiter has.
- Lighthouse scores: Accessibility ≥ 95, SEO ≥ 95, Performance ≥ 90. No horizontal scroll at 1440 px or 375 px.

## Non-goals and anti-goals
- No terminal, flags, flag counter, ASCII dragon, games or puzzles, and no new easter eggs.
- No WebGL or animated backgrounds, and no glitch running in a loop.
- No phone number, no claim of real vulnerabilities found, and no "certified" for CEH v13 or AWS.
- The photo stays secondary. The site must never read as self-promotion through his image.
- No push and no deploy until Nuno approves the local preview.

## Approaches considered
1. Refine in place (6 sections kept): fastest, but Results, Certifications and Beyond overlap.
2. **Recruiter-first restructure (chosen by Nuno):** fewer sections with one job each. Costs more copy work.
3. CV-style page with a sticky sidebar: very scannable, but duplicates the PDF CV and loses the red identity.

## Decided
- **Hero:** left column keeps the name, degree, "Offensive security" title with a subtler glitch (once on load, then on hover only;
  none under reduced motion), the one-line pitch and two CTAs. The right column replaces the terminal with a quiet card:
  a small photo (about 96 px) from github.com/NunoGoncalves06.png, downloaded only after Nuno approves, plus three factual lines:
  - Cisco Certified Network Associate (CCNA), Aug 2026
  - 8th of 300+ teams at upCTF 2026, my first CTF
  - Junior top 10, national bootcamp (National Cybersecurity Centre), 2026
- **Section order:** Hero, Certifications (Credly badges plus training and languages), Results (timeline), Projects (tabs kept),
  Skills, Contact. "Beyond the CV" is dropped as a section: CHAØS goes into Results or Projects, NEI-ISEP and tutoring into a short
  "About" line near Contact or into Results, Erasmus into the hero line.
- **Header:** `nuno@kali:~$` is replaced by his name. Nav links follow the new sections.
- **Identity:** red and black, Credly badges and the glitch title stay. Type, spacing and hierarchy may change.
- **SEO:** title, description, canonical, Open Graph and Twitter tags, a 1200x630 preview image, Person JSON-LD.
- **Accessibility:** contrast AA, visible keyboard focus, a skip link, reduced motion respected.

## Open for Nuno
These facts are on the current site but are not in CLAUDE.md or candidate-facts.md. The rule is zero facts outside those files:
Wakecast (the project), the European stations dataset, C# in the skills list, and the Food Bank volunteering.
Default: remove them unless Nuno confirms them (and they then get added to candidate-facts.md).

## Left to the builder
Exact type scale, spacing, the card layouts, the copy wording (it goes through humanizer, no em dashes), and the OG image design.
