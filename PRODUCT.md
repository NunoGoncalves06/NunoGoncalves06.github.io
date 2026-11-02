# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Recruiters and technical leads at security firms in Portugal (offensive security consultancies such as Blaze Information Security and CyberS3c, managed security such as Devoteam Cyber Trust, Big Four cyber advisory such as PwC and KPMG). They arrive from a CV, a LinkedIn profile or an application email and decide in under a minute whether to interview him for a curricular internship.

## Product Purpose
The personal site of Nuno Alves Gonçalves, a third-year Informatics Engineering student at ISEP (Porto) who wants to work in offensive security. In about ten seconds a visitor should understand: ISEP student, offensive security focus, CCNA certified, CTF player with results, junior and eager to learn, available for a curricular internship from February to June 2027. Success is a recruiter who emails him, opens his LinkedIn or downloads his CV; all three actions must be easy.

## Positioning
A junior with verifiable results rather than claims: Credly-verified Cisco badges, 8th of 300+ teams at his first CTF (upCTF 2026), one of the 15 juniors selected for the national bootcamp run by the National Cybersecurity Centre (finished in the junior top 10), and network projects built on real Cisco hardware.

## Operating Context
Visitors read on a laptop between other candidates, or on a phone after a LinkedIn click. They scan, verify (Credly links, GitHub repos), then act. Deployed to GitHub Pages at https://nunogoncalves06.github.io by GitHub Actions on every push to main.

## Capabilities and Constraints
- Stack: Vite, React, TypeScript, Tailwind v4, shadcn/ui (base-nova), Motion. Content in `src/data.ts`.
- Facts only from the repo's CLAUDE.md and `documents/projects/candidate-facts.md`.
- CEH v13 and AWS Cloud Practitioner are "training completed", never "certified". The bootcamp is "one of the 15 juniors selected for the national bootcamp, finished in the junior top 10"; never imply Team Portugal.
- No phone number anywhere on the site, including the downloadable CV. No claim of real vulnerabilities found. No CTF writeups or blog exist.
- No games, puzzles, easter eggs, or WebGL/animated backgrounds.

## Brand Commitments
- Red on black identity, the glitch treatment on the "Offensive security" title (subtle), Credly badges.
- Voice: precise, calm, credible, first person, no hype, no em dashes.
- His GitHub profile photo, shown small and secondary. Never the LinkedIn photo.

## Evidence on Hand
- Credly badges (CCNA, Endpoint Security, Enterprise Networking Security and Automation, Switching Routing and Wireless Essentials, Introduction to Networks) in `src/data.ts`.
- Public repos: SpotCast, Wakecast (github.com/NunoGoncalves06).
- CV PDF built from `cv/main_example.tex` without the phone number.
- No testimonials, no employer references, no paid experience. Do not fabricate any.

## Product Principles
1. Every element helps a recruiter assess him; nothing is there to entertain.
2. Proof before adjectives: a verifiable link beats a claim.
3. Junior and honest: state what he achieved, never inflate.
4. Fast to scan on a phone; the three key results are visible without scrolling.

## Accessibility & Inclusion
WCAG 2.2 AA: contrast, visible keyboard focus, reduced motion respected. Lighthouse Accessibility and SEO ≥ 95, Performance ≥ 90.
