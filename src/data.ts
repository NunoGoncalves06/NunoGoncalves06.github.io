// Everything the site says about Nuno lives here. Wording follows his CV rules:
// AWS and CEH are training, never "certified"; no team sizes where he asked for none.

export const links = {
  email: "nunogoncalves070906@gmail.com",
  linkedin: "https://www.linkedin.com/in/nunogonçalves070906",
  cv: "Nuno-Goncalves-CV.pdf",
  linkedinLabel: "www.linkedin.com/in/nunogonçalves070906",
  github: "https://github.com/NunoGoncalves06",
  credly: "https://www.credly.com/users/nuno-goncalves.ad1fc5dd",
}

export type Result = { when: string; title: string; detail: string }

// Newest first, so a recruiter reads the strongest results before the oldest one.
export const results: Result[] = [
  {
    when: "Aug 2026",
    title: "Cisco Certified Network Associate",
    detail: "I passed the CCNA exam after the three Cisco Networking Academy courses at ISEP Academy.",
  },
  {
    when: "Jul 2026",
    title: "Cybersecurity Challenge PT 2026",
    detail: "One of the 15 juniors selected for the national bootcamp run by the National Cybersecurity Centre in Rio Maior. I finished in the junior top 10.",
  },
  {
    when: "Mar 2026",
    title: "8th of more than 300 teams at upCTF 2026",
    detail: "My first CTF, played with CHAØS, ISEP's CTF team.",
  },
  { when: "2025", title: "Best Project Award, ISEP", detail: "All Aboard, the first-year integrative project, won the award for the year." },
]

// The three lines in the hero card.
export const highlights = [
  { title: "CCNA certified", detail: "Cisco, August 2026" },
  { title: "8th of 300+ teams", detail: "upCTF 2026, my first CTF" },
  { title: "Junior top 10", detail: "National bootcamp, National Cybersecurity Centre, 2026" },
]

export type Badge = { name: string; issuer: string; issued: string; image: string; url: string; skills: string[] }

// From Credly (credly.com/users/nuno-goncalves.ad1fc5dd), newest first.
export const badges: Badge[] = [
  {
    name: "CCNA",
    issuer: "Cisco",
    issued: "Aug 2026",
    image: "https://images.credly.com/images/683783d8-eaac-4c37-a14d-11bd8a36321d/ccna_600.png",
    url: "https://www.credly.com/badges/8c053a69-a852-435b-9cd2-595bfd291f4f",
    skills: ["Network fundamentals", "Network access", "IP connectivity", "IP services", "Security fundamentals", "Automation and programmability"],
  },
  {
    name: "Endpoint Security",
    issuer: "Cisco",
    issued: "Feb 2026",
    image: "https://images.credly.com/images/0ca5f542-fb5e-4a22-9b7a-c1a1ce4c3db7/EndpointSecurity.png",
    url: "https://www.credly.com/badges/4cf9c0f0-06d6-455a-8f8b-8ced3e372e78",
    skills: ["Common cyber threats", "Mitigating network attacks", "Windows security", "Linux basics", "Host-based intrusion prevention", "Securing WLANs"],
  },
  {
    name: "Enterprise Networking, Security, and Automation",
    issuer: "Cisco",
    issued: "Feb 2026",
    image: "https://images.credly.com/images/0a6d331e-8abf-4272-a949-33f754569a76/CCNAENSA__1_.png",
    url: "https://www.credly.com/badges/9c9ff08b-7e70-4876-a1cc-ab42b13ed732",
    skills: ["Dynamic routing", "NAT", "Security threat mitigation", "WANs", "QoS", "Network automation basics"],
  },
  {
    name: "Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    issued: "Jul 2025",
    image: "https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png",
    url: "https://www.credly.com/badges/26910ef2-82f2-4f2d-b236-894fa449f8b2",
    skills: ["Switching protocols", "First-hop redundancy", "Access security", "Wireless LAN controllers", "Routing"],
  },
  {
    name: "Introduction to Networks",
    issuer: "Cisco",
    issued: "May 2025",
    image: "https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png",
    url: "https://www.credly.com/badges/f02c39c7-0a97-4496-bf46-03299a53ba29",
    skills: ["IPv4 and IPv6 addressing", "IP subnetting", "Ethernet", "Switching", "Security fundamentals"],
  },
]

export const training = [
  { name: "Certified Ethical Hacker v13", detail: "Training completed at ISEP Academy, Feb to Jul 2026" },
  { name: "AWS Cloud Practitioner", detail: "Training completed at ISEP Academy, Oct 2025 to Jan 2026" },
  { name: "IELTS Academic", detail: "English at C1. Portuguese is my native language" },
]

export type Project = {
  name: string
  when: string
  stack: string[]
  summary: string
  more?: string[]
  link?: string
}

// The network project leads: it is the closest to security work, so it gets the full row.
export const featured: Project = {
  name: "Three-site enterprise network",
  when: "2025/26",
  stack: ["Cisco IOS", "OSPF", "IPsec", "ACLs", "Ansible"],
  summary:
    "The CCNA 3 final project: a company network across a headquarters and two branches, built by a team on real Cisco routers, switches and access points. It got the maximum score.",
  more: [
    "Campus: VLANs and trunks, EtherChannel, HSRP, DHCPv4 and DHCPv6, IPv4 and IPv6, a wireless controller, and switch hardening with port security, DHCP snooping, dynamic ARP inspection and BPDU guard.",
    "Between sites: IPsec VPN tunnels, OSPF, static and dynamic NAT, IP telephony, NTP, Syslog and SNMP, ACLs and Ansible configuration backups.",
    "I worked on every stage, with most of my time on the telephony and the routing.",
  ],
}

// Keep this list even: it fills a two-column grid under the full-width featured project.
export const projects: Project[] = [
  {
    name: "SpotCast",
    when: "2026",
    stack: ["Kotlin", "Jetpack Compose", "Firebase", "Ktor"],
    summary:
      "An Android app for Mobile Application Development at Aarhus University. Save outdoor spots and get a Go, Maybe or Skip for each activity from that spot's forecast, with unit tests for the rules and the API clients.",
    link: "https://github.com/NunoGoncalves06/SpotCast",
  },
  {
    name: "Wakecast",
    when: "2026",
    stack: ["Android", "Java", "On-device TTS"],
    summary:
      "An alarm that reads you a morning briefing when you dismiss it: the weather, your calendar, your to-dos and the news. It runs entirely on the phone, with no account and no tracking.",
    link: "https://github.com/NunoGoncalves06/Wakecast",
  },
  {
    name: "AISafe",
    when: "2025/26",
    stack: ["Java", "ANTLR", "C"],
    summary: "A flight control management prototype: a flight-plan language parsed with ANTLR, a simulation engine in C, and user roles with security clearances.",
  },
  {
    name: "All Aboard",
    when: "2024/25",
    stack: ["Java", "Python", "Jupyter"],
    summary: "The first-year integrative project that won ISEP's Best Project Award: a Java application built from requirements to tested code, plus data analysis in Jupyter.",
  },
  {
    name: "Sueca bot tournament",
    when: "2025",
    stack: ["Java", "Docker"],
    summary: "Bots for Sueca, the Portuguese card game, running in Docker containers against other teams at ENEI.",
  },
  {
    name: "IoT sensor node",
    when: "In progress",
    stack: ["ESP32-C6", "MQTT"],
    summary: "An ESP32-C6 board with a distance sensor publishing readings over MQTT, in its design phase with my group.",
  },
]

export const toolbox = [
  { area: "Security", items: ["Kali Linux", "Nmap", "Wireshark", "Burp Suite", "Hydra", "Ghidra", "Hashcat", "Metasploit"] },
  { area: "Networks", items: ["Cisco IOS", "VLANs and STP", "OSPF", "NAT and ACLs", "IPsec VPN", "Ansible"] },
  { area: "Code", items: ["Java", "C", "Python", "Kotlin", "C++", "C#"] },
  { area: "Platforms", items: ["Linux", "Docker", "Git and GitLab", "Android", "AWS fundamentals"] },
]

export const about = [
  { title: "CHAØS, ISEP's CTF team", text: "A member since February 2026. I play CTFs with the team regularly, mostly forensics, reverse engineering, pwn and misc." },
  {
    title: "NEI-ISEP",
    text: "On the external relations team of the informatics student association from October 2025 to July 2026. I contacted companies about sponsorships and helped run GameJam and CodeSpring.",
  },
  { title: "Teaching", text: "In high school I tutored classmates in STEM subjects, and their grades went up." },
  { title: "Scouts and volunteering", text: "A scout in Maia since 2012, and a yearly volunteer with the Portuguese League Against Cancer and the Food Bank." },
]
