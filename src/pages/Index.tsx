import heroImage from "@/assets/dnd-hero.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Scroll, Swords, Calendar, Feather, Users, Mail, Dice6, Shield, Sparkles, MapPin, ChevronDown, Globe, Twitter, Linkedin, CalendarPlus } from "lucide-react";
import { useState } from "react";

const nav = [
  { id: "overview", label: "Overview" },
  { id: "goals", label: "Goals" },
  { id: "schedule", label: "Schedule" },
  { id: "cfp", label: "Call for Participation" },
  { id: "organisers", label: "Organisers" },
  { id: "contact", label: "Contact" },
];

const goals = [
  { icon: Scroll, title: "Forge Narratives", desc: "Explore collaborative storytelling techniques drawn from decades of tabletop tradition." },
  { icon: Swords, title: "Design Encounters", desc: "Learn to balance challenge, surprise, and player agency in meaningful ways." },
  { icon: Sparkles, title: "Build Worlds", desc: "Develop tools for creating immersive, lore-rich settings that breathe." },
  { icon: Shield, title: "Empower Players", desc: "Centre inclusive, safe, and player-driven game design practices." },
];

const schedule = [
  { time: "09:00", title: "Gathering at the Tavern", desc: "Welcome, coffee, and introductions around the hearth." },
  { time: "09:30", title: "Keynote — The Adventurer's Path", desc: "On the enduring craft of shared stories." },
  { time: "10:30", title: "Session I — Worldbuilding Forge", desc: "Hands-on session designing settings, factions, and mysteries." },
  { time: "12:30", title: "Feast Break", desc: "Lunch and informal discussion." },
  { time: "13:30", title: "Session II — The Encounter Crucible", desc: "Designing and playtesting one-shot encounters." },
  { time: "15:30", title: "Panel — Voices at the Table", desc: "On accessibility, safety tools, and inclusive play." },
  { time: "16:30", title: "Session III — Live One-Shot", desc: "Play a short adventure run by workshop facilitators." },
  { time: "18:30", title: "Closing Rites & Mead", desc: "Reflections, awards, and an evening reception." },
];

const organisers = [
  {
    name: "Mira Vance",
    role: "Programme Chair",
    affiliation: "University of Eldoria",
    bio: "Mira is a narrative designer and lecturer whose research traces the lineage of tabletop role-playing from wargames to modern story games. She has run organised play at conventions across three continents.",
    links: [
      { type: "website", url: "https://example.com/mira" },
      { type: "twitter", url: "https://twitter.com/miravance" },
    ],
  },
  {
    name: "Cassian Roe",
    role: "CFP Chair",
    affiliation: "Stormhaven Institute",
    bio: "Cassian designs encounter systems and writes on procedural worldbuilding. His one-shot 'The Hollow Crown' has been played at over 200 tables worldwide.",
    links: [
      { type: "website", url: "https://example.com/cassian" },
      { type: "linkedin", url: "https://linkedin.com/in/cassianroe" },
    ],
  },
  {
    name: "Lyra Sothis",
    role: "Logistics Lead",
    affiliation: "Guild of Storytellers",
    bio: "Lyra coordinates community events for the Guild and champions accessible play. She has facilitated safety-tools training for game masters since 2018.",
    links: [
      { type: "website", url: "https://example.com/lyra" },
    ],
  },
  {
    name: "Dr. Halden Brix",
    role: "Steering Committee",
    affiliation: "Highmoor College",
    bio: "Halden's scholarship explores collaborative fiction as a pedagogical tool. He edits the journal 'Shared Worlds' and convenes the annual Highmoor Salon.",
    links: [
      { type: "website", url: "https://example.com/halden" },
      { type: "twitter", url: "https://twitter.com/haldenbrix" },
    ],
  },
];

const linkIcon = (type: string) => {
  if (type === "twitter") return Twitter;
  if (type === "linkedin") return Linkedin;
  return Globe;
};

// Build an ICS file for the workshop date and trigger a download.
const downloadIcs = () => {
  const dtStart = "20261017T090000";
  const dtEnd = "20261017T193000";
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Quests and Quills//Workshop//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:quests-quills-2026@questsandquills.org`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    "SUMMARY:Quests & Quills Workshop",
    "DESCRIPTION:A one-day workshop on the craft of collaborative storytelling and tabletop role-playing. See https://questsandquills.org for the full schedule.",
    "LOCATION:The Old Library, Eldoria",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quests-and-quills-2026.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <nav className="container flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
            <Dice6 className="h-5 w-5 text-primary animate-flicker" />
            <span className="text-gradient-gold">Quests &amp; Quills</span>
          </a>
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-muted-foreground hover:text-accent transition-smooth">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild size="sm" className="bg-gradient-ember shadow-ember hover:opacity-90">
            <a href="#cfp">Submit</a>
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <img
          src={heroImage}
          alt="Ancient parchment, dragon emblem, candles and dice on a wooden table"
          width={1920}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

        <div className="container relative z-10 text-center max-w-4xl animate-fade-up">
          <p className="text-accent text-sm tracking-[0.4em] uppercase mb-6">A Workshop · Autumn 2026</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="block text-gradient-ember">Quests &amp; Quills</span>
            <span className="block text-foreground/90 text-3xl md:text-5xl mt-4 font-normal italic">
              The Art of Collaborative Storytelling
            </span>
          </h1>
          <div className="divider-rune">
            <Dice6 className="h-5 w-5 text-accent animate-flicker" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A one-day gathering for game masters, designers, scholars, and players exploring
            the craft of Dungeons &amp; Dragons as a medium for shared narrative.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-ember shadow-ember hover:opacity-90 font-display tracking-wide">
              <a href="#cfp">Answer the Call</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent/60 text-accent hover:bg-accent/10 font-display tracking-wide">
              <a href="#schedule">View the Schedule</a>
            </Button>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="py-24 container">
        <SectionHeader icon={Scroll} eyebrow="Chapter I" title="Overview" />
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="md:col-span-2 p-8 bg-gradient-parchment border-border/60 shadow-deep-card">
            <p className="text-lg leading-relaxed text-foreground/90 mb-4">
              <span className="font-display text-accent text-2xl">F</span>or over fifty years, Dungeons &amp; Dragons
              has gathered strangers around tables to weave stories together. This workshop treats that practice
              as a serious craft — one with lessons for designers, educators, writers, and researchers alike.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Across a single day, participants will engage with hands-on sessions, a community panel, and a
              live one-shot adventure designed to surface the techniques that turn rules into resonance. No prior
              experience is required — only curiosity and a willingness to roll the dice.
            </p>
          </Card>
          <div className="space-y-4">
            {[
              { icon: Calendar, label: "Date", value: "October 17, 2026" },
              { icon: MapPin, label: "Venue", value: "The Old Library, Eldoria" },
              { icon: Users, label: "Capacity", value: "60 participants" },
            ].map((item) => (
              <Card key={item.label} className="p-5 bg-card/60 border-border/60 flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-gradient-ember flex items-center justify-center shadow-ember shrink-0">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  <p className="font-display text-lg text-foreground">{item.value}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GOALS */}
      <section id="goals" className="py-24 bg-card/30 border-y border-border/40">
        <div className="container">
          <SectionHeader icon={Swords} eyebrow="Chapter II" title="Workshop Goals" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {goals.map((g) => (
              <Card key={g.title} className="group p-6 bg-gradient-parchment border-border/60 hover:border-accent/60 transition-smooth hover:-translate-y-1 hover:shadow-ember">
                <div className="h-12 w-12 rounded-md bg-gradient-ember flex items-center justify-center shadow-ember mb-5 group-hover:animate-flicker">
                  <g.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl text-accent mb-2">{g.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{g.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-24 container">
        <SectionHeader icon={Calendar} eyebrow="Chapter III" title="Schedule" />
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-[88px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent hidden sm:block" />
          <div className="space-y-4">
            {schedule.map((s, i) => (
              <div key={s.time} className="flex flex-col sm:flex-row gap-4 sm:gap-6 group">
                <div className="sm:w-20 shrink-0 text-right">
                  <span className="font-display text-accent text-lg">{s.time}</span>
                </div>
                <div className="hidden sm:flex flex-col items-center pt-2">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-ember group-hover:animate-flicker" />
                </div>
                <Card className="flex-1 p-5 bg-card/60 border-border/60 hover:border-accent/60 transition-smooth">
                  <h3 className="font-display text-lg text-foreground mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </Card>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              onClick={downloadIcs}
              size="lg"
              variant="outline"
              className="border-accent/60 text-accent hover:bg-accent/10 font-display tracking-wide"
            >
              <CalendarPlus className="h-4 w-4 mr-2" />
              Add to Calendar
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Downloads an .ics file compatible with Apple Calendar, Google Calendar, and Outlook.
            </p>
          </div>
        </div>
      </section>
      <section id="cfp" className="py-24 bg-card/30 border-y border-border/40">
        <div className="container max-w-5xl">
          <SectionHeader icon={Feather} eyebrow="Chapter IV" title="Call for Participation" />
          <Card className="p-8 md:p-12 bg-gradient-parchment border-border/60 shadow-deep-card">
            <p className="text-lg text-foreground/90 leading-relaxed mb-8">
              We invite contributions from anyone with something to share at the intersection of tabletop
              role-playing and craft — be it scholarship, design, pedagogy, or play.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-display text-xl text-accent mb-3">Submission Tracks</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {["Short papers (4 pages)", "Design provocations (2 pages)", "One-shot adventures", "Demos & playable artefacts"].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="text-accent mt-1">✦</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl text-accent mb-3">Important Dates</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><span className="text-foreground">Submissions open:</span> May 15, 2026</li>
                  <li><span className="text-foreground">Deadline:</span> July 31, 2026</li>
                  <li><span className="text-foreground">Notifications:</span> August 28, 2026</li>
                  <li><span className="text-foreground">Workshop:</span> October 17, 2026</li>
                </ul>
              </div>
            </div>
            <div className="divider-rune">
              <Feather className="h-4 w-4 text-accent" />
            </div>
            <div className="text-center">
              <Button size="lg" className="bg-gradient-ember shadow-ember hover:opacity-90 font-display tracking-wide">
                Submit Your Scroll
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* ORGANISERS */}
      <section id="organisers" className="py-24 container">
        <SectionHeader icon={Users} eyebrow="Chapter V" title="Organisers" />
        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {organisers.map((o) => (
            <OrganiserCard key={o.name} organiser={o} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-card/30 border-t border-border/40">
        <div className="container max-w-3xl text-center">
          <SectionHeader icon={Mail} eyebrow="Chapter VI" title="Contact" />
          <Card className="p-10 bg-gradient-parchment border-border/60 shadow-deep-card">
            <p className="text-muted-foreground mb-6">
              Send a raven, or — failing that — an electronic message:
            </p>
            <a
              href="mailto:hello@questsandquills.org"
              className="font-display text-2xl md:text-3xl text-gradient-gold hover:opacity-80 transition-smooth inline-block"
            >
              hello@questsandquills.org
            </a>
            <div className="divider-rune">
              <Dice6 className="h-4 w-4 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground">
              Quests &amp; Quills Workshop · The Old Library · Eldoria
            </p>
          </Card>
        </div>
      </section>

      <footer className="py-8 border-t border-border/40 text-center text-xs text-muted-foreground">
        © 2026 Quests &amp; Quills Workshop · May your rolls be ever in your favour.
      </footer>
    </div>
  );
};

const SectionHeader = ({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
}) => (
  <div className="text-center mb-14">
    <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">{eyebrow}</p>
    <div className="flex items-center justify-center gap-3 mb-2">
      <span className="h-px w-12 bg-accent/40" />
      <Icon className="h-6 w-6 text-primary" />
      <span className="h-px w-12 bg-accent/40" />
    </div>
    <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">{title}</h2>
  </div>
);

type Organiser = (typeof organisers)[number];

const OrganiserCard = ({ organiser }: { organiser: Organiser }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="p-6 bg-gradient-parchment border-border/60 hover:border-accent/60 transition-smooth">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 shrink-0 rounded-full bg-gradient-ember flex items-center justify-center shadow-ember font-display text-xl text-primary-foreground">
          {organiser.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg text-foreground">{organiser.name}</h3>
          <p className="text-accent text-sm">{organiser.role}</p>
          <p className="text-muted-foreground text-xs mt-1 italic">{organiser.affiliation}</p>
        </div>
      </div>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          <div className="pt-4 mt-4 border-t border-border/60">
            <p className="text-sm text-muted-foreground leading-relaxed">{organiser.bio}</p>
            {organiser.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {organiser.links.map((l) => {
                  const Icon = linkIcon(l.type);
                  return (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${organiser.name} on ${l.type}`}
                      className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-primary transition-smooth"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="capitalize">{l.type}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </CollapsibleContent>
        <CollapsibleTrigger asChild>
          <button
            className="mt-4 w-full inline-flex items-center justify-center gap-2 text-xs font-display tracking-widest uppercase text-accent/80 hover:text-accent transition-smooth"
          >
            {open ? "Hide bio" : "Read bio"}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
      </Collapsible>
    </Card>
  );
};

export default Index;
