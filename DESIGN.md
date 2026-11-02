# Design: nunogoncalves06.github.io

Structure and discipline adapted from the Vercel-inspired template in `~/.claude/design-md` (precise type steps,
hairlines instead of cards, mono only for data). The identity is Nuno's own: red on near-black and the glitch title.
No Vercel colors, gradients, names or copy are used.

## Read
Personal site for security-firm recruiters. Precise, calm and credible. Dark only: the red and black identity is a
brand commitment, so there is no light theme.

## Color
| Token | Hex | Use |
|---|---|---|
| background | #0a0a0c | Page |
| panel | #111115 | Hover surfaces, the hero profile card |
| line | #24242b | Hairlines, grid gaps |
| ink | #f4f4f6 | Headings, primary text |
| body | #a8a8b2 | Paragraphs (≈8:1 on background) |
| faint | #8b8b95 | Dates, secondary meta (≥5:1 on background) |
| red | #ff2a4f | The one accent: links, focus ring, timeline marks, primary button |
| cyan | #28dceb | Only inside the glitch title's split. Nowhere else |

## Type
- **Display:** Barlow Condensed 800, uppercase. Only the h1 "Offensive security". This is where the boldness goes.
- **Text and headings:** Geist Variable. h2 is 32-40px semibold, sentence case, tracking -0.02em.
- **Mono:** JetBrains Mono, only for dates and stack tags (real data). Never as a "hacker" costume.
- Body measure ≤ 65ch.

## Shape and depth
- Radius 4px everywhere (`--radius: 0.25rem`); the profile photo is the one circle.
- No shadows. Grouping by 1px hairlines and space. No nested cards.

## Layout
- Container `max-w-6xl`, 16px gutters on mobile, 32px from md.
- Hero: split. Left: name, glitch h1, one sentence (≤ 20 words), two CTAs. Right: a quiet profile card with
  a 88px photo and three highlights. Stacks below the text under lg.
- Sections, each answering one recruiter question:
  Certifications (what is verified) → Results (what he achieved, a dated timeline) → Projects (what he built, tabs)
  → Skills (what he works with) → About and contact (who he is, how to reach him, the CV).
- Each section uses a different layout family: badge grid, vertical timeline, tabbed project grid, four-column list,
  two-column about and contact.

## Motion
- One authored moment: the glitch tears once on load and again on hover. Nothing loops.
- Timeline items fade in on scroll with an exponential ease-out. All motion is off under `prefers-reduced-motion`.

## Bans for this site
Terminal UIs, flags or puzzles, ASCII art, scanlines, eyebrow labels, section numbers, em dashes, emoji icons,
gradient text, WebGL backgrounds.
