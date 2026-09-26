import { Button, Icon, SectionLabel } from "../components/ui.jsx";
import { catalog, programs, servers } from "../data/content.js";
import "./home.css";

const loaders = [
  ["Vanilla", "Official releases", "#b9c8e8"],
  ["Fabric", "Lightweight & fast", "#d6c7ad"],
  ["Forge", "The classic ecosystem", "#c3b3d4"],
  ["NeoForge", "Modern modding", "#91b8c5"],
  ["Quilt", "Open and flexible", "#caa3b8"],
];

function Window({ children, className = "", title = "Axiom" }) {
  return (
    <div className={`appWindow ${className}`}>
      <div className="windowBar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <small>{title}</small>
        <button>•••</button>
      </div>
      {children}
    </div>
  );
}

function LauncherHome() {
  return (
    <Window className="heroApp" title="Library">
      <div className="appShell">
        <aside>
          <strong>A</strong>
          {["play", "layers", "search", "server"].map((icon, index) => (
            <button className={index === 0 ? "selected" : ""} key={icon}>
              <Icon name={icon} size={17} />
            </button>
          ))}
          <span>AG</span>
        </aside>
        <div className="appMain">
          <div className="appTitle">
            <div>
              <small>GOOD EVENING</small>
              <h3>Choose an instance</h3>
            </div>
            <button>＋ New instance</button>
          </div>
          <div className="instanceGrid">
            <div className="instance active">
              <div className="cover overworld">
                <i />
              </div>
              <b>Evergreen</b>
              <small>Fabric 1.21.5 · 38 mods</small>
              <button>
                <Icon name="play" size={14} /> Launch
              </button>
            </div>
            <div className="instance">
              <div className="cover copper">
                <i />
              </div>
              <b>Mechanical</b>
              <small>NeoForge 1.20.1 · 112 mods</small>
            </div>
            <div className="instance">
              <div className="cover quiet">
                <i />
              </div>
              <b>Vanilla</b>
              <small>Minecraft 1.21.5</small>
            </div>
          </div>
          <div className="recent">
            <span>Recently played</span>
            <small>Evergreen · Today, 8:42 PM</small>
            <i>Ready</i>
          </div>
        </div>
      </div>
    </Window>
  );
}

function InstanceManager() {
  return (
    <Window className="instanceApp" title="Create an instance">
      <div className="instanceCreator">
        <aside>
          <h4>New instance</h4>
          {["Game", "Loader", "Details"].map((x, i) => (
            <span className={i === 1 ? "current" : ""} key={x}>
              <i>{i + 1}</i>
              {x}
            </span>
          ))}
        </aside>
        <main>
          <small>CHOOSE A LOADER</small>
          <h3>How do you want to play?</h3>
          <p>
            You can change versions later without affecting your other
            instances.
          </p>
          <div className="loaderList">
            {loaders.map((x, i) => (
              <button className={i === 1 ? "selected" : ""} key={x[0]}>
                <i style={{ "--loader": x[2] }}>{x[0][0]}</i>
                <span>
                  <b>{x[0]}</b>
                  <small>{x[1]}</small>
                </span>
                {i === 1 && <Icon name="check" size={15} />}
              </button>
            ))}
          </div>
          <div className="creatorFoot">
            <button>Back</button>
            <button>Continue</button>
          </div>
        </main>
      </div>
    </Window>
  );
}

function ExplorePreview() {
  return (
    <Window className="exploreApp" title="Explore">
      <div className="exploreTop">
        <div>
          <small>DISCOVER</small>
          <h3>Find your next favorite mod</h3>
        </div>
        <label>
          <Icon name="search" size={15} />
          Search content
        </label>
      </div>
      <div className="exploreTabs">
        <b>Featured</b>
        <span>Mods</span>
        <span>Resource packs</span>
        <span>Shaders</span>
        <span>Data packs</span>
      </div>
      <div className="featureMod">
        <div className="modScenery">
          <i />
          <b>DH</b>
        </div>
        <div>
          <small>FEATURED MOD</small>
          <h3>Distant Horizons</h3>
          <p>See farther without giving up performance.</p>
          <span>by James Seibel　·　14.9M downloads</span>
          <button>View mod</button>
        </div>
      </div>
      <div className="miniMods">
        {catalog.slice(0, 3).map((x) => (
          <div key={x.name}>
            <i style={{ background: x.color }}>{x.name[0]}</i>
            <span>
              <b>{x.name}</b>
              <small>
                {x.meta} · {x.version}
              </small>
            </span>
            <button>＋</button>
          </div>
        ))}
      </div>
    </Window>
  );
}

function ServerPreview() {
  return (
    <Window className="serverApp" title="Servers">
      <div className="serverHead">
        <div>
          <small>QUICK JOIN</small>
          <h3>Pick a world. Start playing.</h3>
        </div>
        <span>
          <i /> 24 ms nearest
        </span>
      </div>
      <div className="serverRows">
        {servers.slice(0, 3).map((x, i) => (
          <div className={i === 0 ? "featured" : ""} key={x[0]}>
            <b style={{ background: x[7] }}>{x[0][0]}</b>
            <span>
              <strong>{x[0]}</strong>
              <small>
                {x[5]} · {x[6]} · 1.21.5
              </small>
            </span>
            <em>{x[2]} online</em>
            <i>{x[4]} ms</i>
            <button>{i === 0 ? "Join" : "→"}</button>
          </div>
        ))}
      </div>
    </Window>
  );
}

function Home({ go }) {
  return (
    <main className="newHome">
      <section className="productHero shell">
        <div className="heroText">
          <SectionLabel>AXIOM LAUNCHER</SectionLabel>
          <h1>
            Your Minecraft.
            <br />
            Built your way.
          </h1>
          <p>
            Launch vanilla or modded Minecraft, manage isolated instances,
            discover content, join servers, and keep everything in one launcher.
          </p>
          <div>
            <Button onClick={() => go("download")} icon="download">
              Download
            </Button>
            <Button
              variant="secondary"
              onClick={() => go("explore")}
              icon="arrow"
            >
              Explore
            </Button>
          </div>
          <small>Available for macOS, Windows, and Linux</small>
        </div>
        <div className="heroProduct">
          <div className="softShape one" />
          <div className="softShape two" />
          <LauncherHome />
        </div>
      </section>

      <section className="productStatement">
        <div className="shell">
          <SectionLabel>ONE LAUNCHER, EVERY WORLD</SectionLabel>
          <h2>
            Built around the way
            <br />
            you actually play.
          </h2>
          <p>
            Axiom keeps the complicated parts out of your way while leaving
            every important choice in your hands.
          </p>
          <div className="capabilities">
            {[
              ["01", "Launch", "Vanilla and modded"],
              ["02", "Organize", "Independent instances"],
              ["03", "Discover", "Mods, packs, and servers"],
              ["04", "Control", "Clear privacy settings"],
            ].map((x) => (
              <div key={x[0]}>
                <small>{x[0]}</small>
                <b>{x[1]}</b>
                <span>{x[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase shell instancesSection">
        <div className="showCopy">
          <SectionLabel>INSTANCE MANAGEMENT</SectionLabel>
          <h2>A clean start for every idea.</h2>
          <p>
            Keep worlds, mods, settings, and Minecraft versions separate. Shared
            cached game files save space without making instances depend on one
            another.
          </p>
          <ul>
            <li>
              <Icon name="check" size={15} />
              Independent mods and worlds
            </li>
            <li>
              <Icon name="check" size={15} />
              Simple version management
            </li>
            <li>
              <Icon name="check" size={15} />
              Reusable cached game files
            </li>
          </ul>
        </div>
        <div className="showVisual">
          <InstanceManager />
          <div className="loaderRail">
            {loaders.map((x) => (
              <span key={x[0]}>
                <i style={{ background: x[2] }} />
                {x[0]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="moddedSection">
        <div className="shell">
          <div className="moddedArt">
            <div className="blockscape">
              <span />
              <span />
              <span />
              <i />
            </div>
            <div className="packCard">
              <small>PLAYING NOW</small>
              <b>Mechanical</b>
              <span>NeoForge 1.20.1 · 112 mods</span>
              <button>
                <Icon name="play" size={14} /> Launch instance
              </button>
            </div>
          </div>
          <div className="showCopy">
            <SectionLabel>MODDED MINECRAFT</SectionLabel>
            <h2>
              Complex packs.
              <br />
              Calm controls.
            </h2>
            <p>
              Axiom resolves the busy work around loaders, dependencies, and
              versions so you can focus on building the experience you want.
            </p>
            <button className="textLink" onClick={() => go("mods")}>
              Explore mods <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="discoverySection shell">
        <div className="sectionIntro">
          <div>
            <SectionLabel>CONTENT DISCOVERY</SectionLabel>
            <h2>Great content should feel visible.</h2>
          </div>
          <p>
            Browse trusted projects with the details that matter—loader support,
            compatibility, authorship, and update history.
          </p>
        </div>
        <ExplorePreview />
        <div className="contentRail">
          {catalog.slice(0, 5).map((x, i) => (
            <article className={i === 1 ? "tall" : ""} key={x.name}>
              <div style={{ "--card": x.color }}>
                <span>{x.name[0]}</span>
                <small>{x.type}</small>
              </div>
              <h3>{x.name}</h3>
              <p>
                {x.meta} · {x.downloads} downloads
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="showcase shell serversSection">
        <div className="showCopy">
          <SectionLabel>SERVERS & QUICK JOIN</SectionLabel>
          <h2>
            Less browsing.
            <br />
            More playing.
          </h2>
          <p>
            Compare live player counts, location, version, and ping. Join a
            community without opening five tabs first.
          </p>
          <Button variant="secondary" onClick={() => go("quick")} icon="arrow">
            Open Quick Join
          </Button>
        </div>
        <div className="showVisual">
          <ServerPreview />
        </div>
      </section>

      <section className="valuesSection shell">
        <div className="privacyEditorial">
          <div>
            <SectionLabel>PRIVACY</SectionLabel>
            <h2>Your launcher should work for you.</h2>
            <p>
              Necessary data only. Clear controls for optional analytics. No
              sale of personal information—and no vague promises beyond what the
              product can support.
            </p>
            <button className="textLink" onClick={() => go("privacy")}>
              Read our principles <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="settingsCard">
            <div>
              <b>Privacy controls</b>
              <small>Saved locally</small>
            </div>
            {[
              "Essential services",
              "Optional analytics",
              "Personalized discovery",
            ].map((x, i) => (
              <label key={x}>
                <span>
                  {x}
                  <small>{i ? "Your choice" : "Required"}</small>
                </span>
                <i className={i === 1 ? "disabled" : ""} />
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="communitySection">
        <div className="shell">
          <div className="sectionIntro">
            <div>
              <SectionLabel>THE AXIOM COMMUNITY</SectionLabel>
              <h2>Good software grows with people.</h2>
            </div>
            <p>
              Programs for creators, server owners, developers, testers, and
              contributors—built around useful tools and clear expectations.
            </p>
          </div>
          <div className="programEditorial">
            {programs.slice(0, 3).map((x, i) => (
              <article key={x[0]}>
                <small>0{i + 1}</small>
                <Icon name={x[2]} size={20} />
                <h3>{x[0]}</h3>
                <p>{x[1]}</p>
              </article>
            ))}
          </div>
          <button className="textLink" onClick={() => go("programs")}>
            View all programs <Icon name="arrow" size={15} />
          </button>
        </div>
      </section>

      <section className="premiumSection shell">
        <div>
          <SectionLabel>AXIOM PREMIUM</SectionLabel>
          <h2>A quieter launcher.</h2>
          <p>
            Remove launcher advertisements and unlock additional interface and
            convenience options. Core launching, content, and server features
            remain available for free.
          </p>
          <button className="textLink" onClick={() => go("premium")}>
            Compare plans <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="premiumCompare">
          <span>
            Free <small>All core features · Clearly labeled ads</small>
          </span>
          <i>or</i>
          <span>
            Premium <small>No launcher ads · Added conveniences</small>
          </span>
        </div>
      </section>

      <section className="finalCta">
        <div className="shell">
          <div>
            <SectionLabel>READY WHEN YOU ARE</SectionLabel>
            <h2>Your next world starts here.</h2>
            <p>Download Axiom for macOS, Windows, or Linux.</p>
          </div>
          <Button onClick={() => go("download")} icon="download">
            Download Axiom
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Home;
