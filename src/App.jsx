import { useEffect, useMemo, useState } from "react";
import { Button, Icon, SectionLabel as Label } from "./components/ui.jsx";
import { catalog, programs, servers } from "./data/content.js";
import Home from "./pages/Home.jsx";
import "./App.css";
const exploreLinks = [
  ["Servers", "Live communities", "servers", "server"],
  ["Quick Join", "Play in seconds", "quick", "play"],
  ["Mods", "Change how you play", "mods", "cube"],
  ["Texture Packs", "Refresh every block", "textures", "layers"],
  ["Shaders", "Transform the light", "shaders", "spark"],
  ["Data Packs", "Expand your worlds", "datapacks", "globe"],
];
const programLinks = [
  ["Social Media Program", "Community reach"],
  ["Creator Partner Program", "Creator support"],
  ["Server Partner Program", "Server growth"],
  ["Referral Program", "Share Axiom"],
  ["Creator Revenue Pool", "Creator rewards"],
  ["Player-Hour Rewards", "Engagement rewards"],
  ["Mod Creator Program", "Publishing tools"],
  ["Community Contributor Program", "Community impact"],
  ["Beta Testing Program", "Early feedback"],
  ["Developer Program", "Build integrations"],
];
const infoLinks = [
  ["Legal", "Policies and notices", "legal"],
  ["Terms of Service", "Platform terms", "terms"],
  ["Privacy Policy", "Your data and controls", "privacy-policy"],
  ["Support", "Get help", "support"],
  ["Documentation", "Guides and references", "documentation"],
  ["Social Media", "Find Axiom online", "social-media"],
  ["Community Guidelines", "Community standards", "community-guidelines"],
  ["Status", "Service health", "status"],
  ["About", "About Axiom", "about"],
];
function Dropdown({ label, items, go, wide = false }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`navDrop ${wide ? "wide" : ""} ${open ? "open" : ""}`}>
      <button
        className="navTrigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {label}
        <span>⌄</span>
      </button>
      <div className="dropPanel">
        {items.map(([name, desc, route, icon]) => (
          <button key={name} onClick={() => go(route || "programs")}>
            {icon && (
              <i>
                <Icon name={icon} size={15} />
              </i>
            )}
            <span>
              {name}
              <small>{desc}</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
function Nav({ go, openSearch }) {
  const [m, setM] = useState(false);
  return (
    <header>
      <nav className="nav shell">
        <button
          className="brand brandWordmark"
          onClick={() => go("home")}
          aria-label="Axiom Launcher home"
        >
          Axiom Launcher
        </button>
        <div className={"links " + (m ? "open" : "")}>
          <button className="navDirect" onClick={() => go("download")}>
            Download
          </button>
          <Dropdown label="Explore" items={exploreLinks} go={go} />
          <Dropdown label="Programs" items={programLinks} go={go} wide />
          <Dropdown label="More Info" items={infoLinks} go={go} wide />
        </div>
        <div className="actions">
          <button
            className="search"
            onClick={openSearch}
            aria-label="Search Axiom"
          >
            <Icon name="search" />
            <span>Search mods, servers, packs…</span>
            <kbd>⌘ K</kbd>
          </button>
          <button className="plain loginBtn" onClick={() => go("login")}>
            Login
          </button>
          <button
            className="hamb"
            onClick={() => setM(!m)}
            aria-label="Toggle navigation"
          >
            <Icon name={m ? "close" : "menu"} />
          </button>
        </div>
      </nav>
    </header>
  );
}
function Cards({ items = catalog }) {
  return (
    <div className="cards">
      {items.map((x) => (
        <article key={x.name}>
          <div className="art" style={{ "--c": x.color }}>
            <b>{x.name[0]}</b>
            <button>
              <Icon name="heart" size={15} />
            </button>
          </div>
          <div className="info">
            <small>
              {x.type} · {x.meta}
            </small>
            <h3>{x.name}</h3>
            <p>Beautifully crafted and ready for your next instance.</p>
            <div>
              <span>↓ {x.downloads}</span>
              <span>{x.version}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
function Page({ label, title, text, children }) {
  return (
    <main className="page">
      <section className="pageHero shell">
        <Label>{label}</Label>
        <h1>{title}</h1>
        <p>{text}</p>
      </section>
      <section className="pageContent shell">{children}</section>
    </main>
  );
}
function Explore({ initialType = "All" }) {
  const [type, setType] = useState(initialType),
    [q, setQ] = useState("");
  const items = useMemo(
    () =>
      catalog.filter(
        (x) =>
          (type === "All" || x.type === type) &&
          x.name.toLowerCase().includes(q.toLowerCase()),
      ),
    [type, q],
  );
  return (
    <Page
      label="DISCOVER THE ECOSYSTEM"
      title={
        initialType === "All"
          ? "Find something remarkable."
          : `Explore ${initialType.toLowerCase()}.`
      }
      text="Mods, shaders, resource packs, and data packs—curated for the way you play."
    >
      <div className="tools">
        <label>
          <Icon name="search" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search content"
          />
        </label>
        <select>
          <option>Most popular</option>
          <option>Recently updated</option>
        </select>
      </div>
      <Chips
        vals={["All", "Mods", "Shaders", "Texture Packs", "Data Packs"]}
        value={type}
        set={setType}
      />
      <Cards items={items} />
    </Page>
  );
}
function Chips({ vals, value, set }) {
  return (
    <div className="chips">
      {vals.map((x) => (
        <button
          className={value === x ? "active" : ""}
          onClick={() => set(x)}
          key={x}
        >
          {x}
        </button>
      ))}
    </div>
  );
}
function Servers({ quick = false }) {
  const [m, setM] = useState("All");
  return (
    <Page
      label={quick ? "QUICK JOIN" : "SERVER DISCOVERY"}
      title={quick ? "Play in seconds." : "Find your people."}
      text={
        quick
          ? "Live latency. Active players. One click to join."
          : "Discover carefully listed communities, from quiet survival worlds to competitive minigames."
      }
    >
      <Chips
        vals={["All", "Survival", "Minigames", "Creative", "Adventure"]}
        value={m}
        set={setM}
      />
      <div className="serverList">
        {servers
          .filter((x) => m === "All" || x[5] === m)
          .map((x) => (
            <article key={x[0]}>
              <b style={{ background: x[7] }}>{x[0][0]}</b>
              <div>
                <h3>
                  {x[0]} <i />
                </h3>
                <p>{x[1]}</p>
                <small>
                  {x[5]}　{x[6]}　1.21.5
                </small>
              </div>
              <span>
                <strong>{x[2]}</strong>
                <small>/ {x[3]} players</small>
              </span>
              <em>● {x[4]} ms</em>
              <Button icon="arrow">Join</Button>
            </article>
          ))}
      </div>
    </Page>
  );
}
function Download() {
  return (
    <Page
      label="DOWNLOAD AXIOM"
      title="Your world is waiting."
      text="A faster, calmer way to launch Minecraft and manage everything around it."
    >
      <div className="recommended">
        <div>
          <b>⌘</b>
          <span>
            <small>RECOMMENDED FOR THIS DEVICE</small>
            <h3>macOS</h3>
            <p>For Apple silicon and Intel · macOS 12 or later</p>
          </span>
        </div>
        <Button icon="download">Download Axiom 1.4.2</Button>
      </div>
      <div className="downloads">
        {[
          ["Windows", "⊞", "Windows 10 or later · 64-bit"],
          ["Linux", "◇", "AppImage · x86_64"],
        ].map((x) => (
          <div key={x[0]}>
            <b>{x[1]}</b>
            <h3>{x[0]}</h3>
            <p>{x[2]}</p>
            <Button variant="secondary" icon="download">
              Download
            </Button>
          </div>
        ))}
      </div>
      <div className="details">
        <div>
          <h3>System requirements</h3>
          <p>
            4 GB RAM minimum
            <br />
            500 MB available storage
            <br />
            Internet connection
          </p>
        </div>
        <div>
          <h3>Release details</h3>
          <p>
            Version 1.4.2
            <br />
            Released September 18, 2026
            <br />
            <a>View changelog →</a>
          </p>
        </div>
        <div>
          <h3>Install</h3>
          <p>
            Open the downloaded file, install Axiom, then sign in and choose
            your game directory.
          </p>
        </div>
      </div>
    </Page>
  );
}
function Programs() {
  return (
    <Page
      label="COMMUNITY & PARTNERS"
      title="Build what comes next."
      text="Practical support and meaningful recognition for the people building a better game ecosystem."
    >
      <div className="notice">
        <Icon name="shield" />
        Program qualification, reward calculations, eligibility, and
        fraud-protection rules may apply. Rewards are never guaranteed.
      </div>
      <div className="programGrid">
        {programs.map((x) => (
          <article key={x[0]}>
            <Icon name={x[2]} />
            <small>COMMUNITY PROGRAM</small>
            <h3>{x[0]} Program</h3>
            <p>{x[1]}</p>
            <ul>
              {[
                "Growth and discovery tools",
                "Early product access",
                "Community support",
              ].map((y) => (
                <li key={y}>
                  <Icon name="check" size={14} />
                  {y}
                </li>
              ))}
            </ul>
            <Button variant="secondary" icon="arrow">
              Learn more
            </Button>
          </article>
        ))}
      </div>
      <div className="levels">
        <div>
          <Label>PARTNER LEVELS</Label>
          <h2>Grow at your own pace.</h2>
          <p>
            Progress reflects sustained contributions, trust, and community
            impact—not a pay-to-win ladder.
          </p>
        </div>
        <ol>
          {[
            "Member",
            "Partner",
            "Verified Partner",
            "Pro Partner",
            "Elite Partner",
          ].map((x, i) => (
            <li key={x}>
              <i>{i + 1}</i>
              <span>
                {x}
                <small>
                  {i < 2
                    ? "Join and grow in the ecosystem"
                    : "Expanded benefits and recognition"}
                </small>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Page>
  );
}
function Pricing({ go }) {
  return (
    <section className="section pricing">
      <div className="shell">
        <Label>CHOOSE YOUR EXPERIENCE</Label>
        <h2>Start free. Upgrade for focus.</h2>
        <p>
          Core launcher features stay accessible. Premium removes launcher
          advertising and adds thoughtful conveniences.
        </p>
        <div className="priceGrid">
          <Plan
            title="FREE"
            price="$0"
            items={[
              "Game launching",
              "Content discovery",
              "Server browsing",
              "Clearly labeled ads",
            ]}
            button="Download free"
            onClick={() => go?.("download")}
          />
          <Plan
            title="PREMIUM"
            price="$4"
            items={[
              "Everything in Free",
              "No launcher advertisements",
              "Premium interface themes",
              "Convenience features",
              "Possible early access",
            ]}
            button="Choose Premium"
            featured
            onClick={() => go?.("signup")}
          />
        </div>
      </div>
    </section>
  );
}
function Plan({ title, price, items, button, featured, onClick }) {
  return (
    <div className={featured ? "featured" : ""}>
      {featured && <em>MOST POPULAR</em>}
      <small>{title}</small>
      <h3>
        {price} <span>{featured ? "/ month" : "forever"}</span>
      </h3>
      <p>
        {featured
          ? "A cleaner, more personal experience."
          : "Everything you need to play."}
      </p>
      {items.map((x) => (
        <b key={x}>
          <Icon name="check" size={14} />
          {x}
        </b>
      ))}
      <Button variant={featured ? "" : "secondary"} onClick={onClick}>
        {button}
      </Button>
    </div>
  );
}
function Privacy() {
  return (
    <Page
      label="PRIVACY AT AXIOM"
      title="Control should be clear."
      text="We’re building Axiom around data minimization, understandable choices, and secure account practices."
    >
      <div className="principles">
        {[
          [
            "Collect less",
            "We aim to collect only what the service needs to function and improve.",
          ],
          [
            "Explain clearly",
            "Analytics and telemetry should have plain-language explanations.",
          ],
          [
            "Your controls",
            "Supported account data can be reviewed, exported, or deleted.",
          ],
          [
            "Never sell data",
            "Our policy is to never sell personal information.",
          ],
          [
            "Secure systems",
            "Account and infrastructure decisions are made with security in mind.",
          ],
          [
            "Honest boundaries",
            "Every claim should match how the product actually works.",
          ],
        ].map((x, i) => (
          <article key={x[0]}>
            <small>0{i + 1}</small>
            <h3>{x[0]}</h3>
            <p>{x[1]}</p>
          </article>
        ))}
      </div>
      <div className="legalNote">
        <Icon name="shield" />
        <div>
          <h3>Privacy documentation in progress</h3>
          <p>
            This product concept is not yet a live service. Final policies,
            retention windows, subprocessors, and technical guarantees require
            review before launch.
          </p>
        </div>
      </div>
    </Page>
  );
}
function Legal({ go }) {
  const docs = [
    ["Terms of Service", "terms"],
    ["Privacy Policy", "privacy-policy"],
    ["Cookie Policy", "cookie-policy"],
    ["Advertising Disclosure", "advertising-disclosure"],
    ["Partner Program Terms", "partner-terms"],
    ["Community Guidelines", "community-guidelines"],
    ["Copyright / DMCA", "dmca"],
    ["Third-Party Services", "third-party-services"],
    ["Disclaimers", "disclaimers"],
  ];
  return (
    <Page
      label="LEGAL CENTER"
      title="Clear terms, in one place."
      text="The policies and guidelines that shape your relationship with Axiom."
    >
      <div className="legalGrid">
        {docs.map(([x, route]) => (
          <button key={x} onClick={() => go(route)}>
            <span>
              {x}
              <small>Draft placeholder · Attorney review required</small>
            </span>
            <Icon name="arrow" />
          </button>
        ))}
      </div>
      <div className="legalCopy">
        <h2>Draft legal notice</h2>
        <p>
          The materials on this page are product-design placeholders and do not
          constitute final legal terms. Qualified counsel should review all
          product behavior, data practices, advertising, and user-facing
          policies before launch.
        </p>
      </div>
    </Page>
  );
}
function LegalDocument({ title }) {
  return (
    <Page
      label="LEGAL · DRAFT"
      title={title}
      text="A plain-language policy framework for the Axiom platform."
    >
      <div className="legalCopy">
        <h2>Attorney review required</h2>
        <p>
          This page is intentionally reserved for final, product-specific legal
          language. It does not currently create an agreement, guarantee, or
          policy commitment. Before launch, it must be completed and reviewed
          against Axiom’s implemented account, data, advertising, content, and
          community systems.
        </p>
        <h2>Planned coverage</h2>
        <p>
          Scope, eligibility, user responsibilities, platform rules, third-party
          services, enforcement, dispute handling, and contact processes will be
          documented here where applicable.
        </p>
      </div>
    </Page>
  );
}
function Auth({ signup, go }) {
  return (
    <main className="auth">
      <form className="glass" onSubmit={(e) => e.preventDefault()}>
        <button className="brand" type="button" onClick={() => go("home")}>
          <b>
            <Icon name="cube" />
          </b>
          Axiom
        </button>
        <h1>{signup ? "Create your account" : "Welcome back"}</h1>
        <p>
          {signup
            ? "Start building your perfect library."
            : "Sign in to continue to Axiom."}
        </p>
        {signup && <Field name="Username" type="text" />}
        <Field
          name={signup ? "Email" : "Email or username"}
          type={signup ? "email" : "text"}
        />
        <Field name="Password" type="password" />
        <>{signup && <Field name="Confirm password" type="password" />}</>
        <label className="check">
          <input type="checkbox" required={signup} />
          {signup ? "I agree to the Terms and Privacy Policy" : "Remember me"}
        </label>
        <Button type="submit">{signup ? "Create account" : "Sign in"}</Button>
        <small className="oauth">OAuth providers coming later</small>
        <p>
          {signup ? "Already have an account?" : "New to Axiom?"}{" "}
          <button type="button" onClick={() => go(signup ? "login" : "signup")}>
            {signup ? "Sign in" : "Create an account"}
          </button>
        </p>
      </form>
    </main>
  );
}
function Field({ name, type }) {
  return (
    <label>
      {name}
      <input required type={type} placeholder={name} />
    </label>
  );
}
function Search({ close, go }) {
  const [q, setQ] = useState("");
  const searchable = [
    ...catalog.map((x) => ({
      ...x,
      route:
        x.type === "Mods"
          ? "mods"
          : x.type === "Shaders"
            ? "shaders"
            : x.type === "Texture Packs"
              ? "textures"
              : "datapacks",
    })),
    ...servers.map((x) => ({
      name: x[0],
      type: "Server",
      meta: `${x[5]} · ${x[6]}`,
      color: x[7],
      route: "servers",
    })),
  ];
  const results = q
    ? searchable.filter((x) =>
        `${x.name} ${x.type} ${x.meta}`.toLowerCase().includes(q.toLowerCase()),
      )
    : [
        {
          name: "Explore content",
          type: "Mods, packs, shaders & more",
          color: "#b5c2df",
          route: "explore",
        },
        {
          name: "Quick Join servers",
          type: "Find a server fast",
          color: "#7aa",
          route: "quick",
        },
        {
          name: "Download Axiom",
          type: "Get the launcher",
          color: "#ba8",
          route: "download",
        },
      ];
  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div className="spot glass">
        <div>
          <Icon name="search" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search mods, servers, texture packs, shaders, and data packs"
          />
          <kbd onClick={close}>ESC</kbd>
        </div>
        <small>{q ? `${results.length} RESULTS` : "QUICK LINKS"}</small>
        {results.map((x) => (
          <button
            key={`${x.type}-${x.name}`}
            onClick={() => {
              go(x.route);
              close();
            }}
          >
            <b style={{ background: x.color }}>{x.name[0]}</b>
            <span>
              {x.name}
              <small>
                {x.type}
                {x.meta ? ` · ${x.meta}` : ""}
              </small>
            </span>
            <Icon name="arrow" />
          </button>
        ))}
        {q && !results.length && (
          <p className="noResults">No matching content or servers found.</p>
        )}
      </div>
    </div>
  );
}
function Footer({ go }) {
  return (
    <footer>
      <div className="shell foot">
        <div>
          <button className="brand" onClick={() => go("home")}>
            <b>
              <Icon name="cube" />
            </b>
            Axiom
          </button>
          <p>
            A thoughtful home for your games,
            <br />
            content, and communities.
          </p>
        </div>
        {[
          ["Product", "Download", "Premium"],
          ["Explore", "Mods", "Servers"],
          ["Community", "Programs", "Developers"],
          ["Company", "Privacy", "Legal"],
        ].map((x) => (
          <div key={x[0]}>
            <b>{x[0]}</b>
            {x.slice(1).map((y) => (
              <button
                key={y}
                onClick={() => go(y === "Mods" ? "explore" : y.toLowerCase())}
              >
                {y}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="shell footBottom">
        © 2026 Axiom. Product concept.{" "}
        <span>Not affiliated with Mojang or Microsoft.</span>
      </div>
    </footer>
  );
}
export default function App() {
  const route = () => location.hash.slice(1) || "home";
  const [p, setP] = useState(route),
    [search, setSearch] = useState(false);
  const go = (x) => {
    location.hash = x;
    setP(x);
    scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const keys = (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          setSearch(true);
        }
        if (e.key === "Escape") setSearch(false);
      },
      hash = () => setP(route());
    addEventListener("keydown", keys);
    addEventListener("hashchange", hash);
    return () => {
      removeEventListener("keydown", keys);
      removeEventListener("hashchange", hash);
    };
  }, []);
  const auth = p === "login" || p === "signup";
  const legalTitles = {
    terms: "Terms of Service",
    "privacy-policy": "Privacy Policy",
    "cookie-policy": "Cookie Policy",
    "advertising-disclosure": "Advertising Disclosure",
    "partner-terms": "Partner Program Terms",
    "community-guidelines": "Community Guidelines",
    dmca: "Copyright / DMCA",
    "third-party-services": "Third-Party Services",
    disclaimers: "Disclaimers",
    support: "Support",
    documentation: "Documentation",
    "social-media": "Social Media",
    status: "Service Status",
    about: "About Axiom",
  };
  const view =
    {
      home: <Home go={go} />,
      download: <Download />,
      explore: <Explore />,
      mods: <Explore initialType="Mods" />,
      textures: <Explore initialType="Texture Packs" />,
      shaders: <Explore initialType="Shaders" />,
      datapacks: <Explore initialType="Data Packs" />,
      servers: <Servers />,
      quick: <Servers quick />,
      programs: <Programs />,
      premium: <Pricing go={go} />,
      privacy: <Privacy />,
      legal: <Legal go={go} />,
      login: <Auth go={go} />,
      signup: <Auth signup go={go} />,
    }[p] ||
    (legalTitles[p] ? (
      <LegalDocument title={legalTitles[p]} />
    ) : (
      <Home go={go} />
    ));
  return (
    <>
      {!auth && <Nav go={go} openSearch={() => setSearch(true)} />} {view}{" "}
      {!auth && <Footer go={go} />}{" "}
      {search && <Search close={() => setSearch(false)} go={go} />}
    </>
  );
}
