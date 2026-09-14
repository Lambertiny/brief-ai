import { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

const navigation = [
  "Workspace",
  "New Brief",
  "Analysis",
  "Strategy",
  "Creative Direction",
  "Website Plan",
  "History",
  "Export",
];

const demoBrief =
  "I run an independent coffee shop and want to reposition the brand for a more premium audience. We need a stronger identity, clearer website structure and a digital presence that feels contemporary but still warm and approachable.";

function App() {
  const [activePage, setActivePage] = useState("Workspace");
  const [brief, setBrief] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [documentGenerated, setDocumentGenerated] = useState(false);

  const runAnalysis = () => {
    if (!brief.trim()) return;

    setAnalyzed(true);
    setActivePage("Analysis");
  };

  const loadDemo = () => {
    setBrief(demoBrief);
    setAnalyzed(true);
    setActivePage("New Brief");
  };

  const generateDocument = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let y = 20;

    const colors = {
      ink: [23, 22, 27],
      muted: [115, 110, 120],
      purple: [113, 88, 255],
      acid: [200, 255, 54],
      line: [220, 216, 210],
    };

    const ensureSpace = (needed = 20) => {
      if (y + needed > pageHeight - 18) {
        doc.addPage();
        y = 20;
      }
    };

    const addDivider = () => {
      ensureSpace(8);

      doc.setDrawColor(...colors.line);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageWidth - margin, y);

      y += 8;
    };

    const addLabel = (text) => {
      ensureSpace(10);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...colors.purple);

      doc.text(text.toUpperCase(), margin, y);

      y += 7;
    };

    const addHeading = (text, size = 17) => {
      ensureSpace(14);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(size);
      doc.setTextColor(...colors.ink);

      const lines = doc.splitTextToSize(text, contentWidth);

      doc.text(lines, margin, y);

      y += lines.length * (size * 0.42) + 4;
    };

    const addParagraph = (text, options = {}) => {
      const width = options.width || contentWidth;
      const fontSize = options.fontSize || 10.5;
      const lineHeight = options.lineHeight || 5.3;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(fontSize);
      doc.setTextColor(...colors.muted);

      const lines = doc.splitTextToSize(text, width);

      ensureSpace(lines.length * lineHeight + 4);

      doc.text(lines, margin, y);

      y += lines.length * lineHeight + 5;
    };

    const addSection = (label, title, body) => {
      ensureSpace(35);

      addLabel(label);
      addHeading(title, 15);
      addParagraph(body);

      y += 3;
    };

    const addNumberedItem = (number, text) => {
      ensureSpace(12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...colors.purple);
      doc.text(String(number).padStart(2, "0"), margin, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(...colors.ink);

      const lines = doc.splitTextToSize(text, contentWidth - 16);

      doc.text(lines, margin + 16, y);

      y += lines.length * 5.2 + 5;
    };

    // COVER / HEADER

    doc.setFillColor(...colors.ink);
    doc.rect(0, 0, pageWidth, 63, "F");

    doc.setFillColor(...colors.acid);
    doc.roundedRect(margin, 16, 18, 18, 4, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colors.ink);
    doc.text("B//", margin + 5, 27.5);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(23);
    doc.text("BRIEF//AI", margin + 26, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(175, 170, 180);
    doc.text("CREATIVE INTELLIGENCE", margin + 26, 32);

    doc.setFontSize(8);
    doc.setTextColor(...colors.acid);
    doc.text("CREATIVE STRATEGY DOCUMENT", margin, 49);

    y = 80;

    addHeading("Creative Strategy Document", 26);

    addParagraph(
      "A structured creative direction generated from the original client brief through the BRIEF//AI strategy workflow.",
      {
        fontSize: 11,
      }
    );

    y += 4;

    addDivider();

    // RAW BRIEF

    addLabel("Original Client Input");
    addHeading("Raw Client Brief", 17);

    addParagraph(brief.trim() || demoBrief, {
      fontSize: 11,
      lineHeight: 5.7,
    });

    y += 5;

    addDivider();

    // ANALYSIS

    addLabel("01 / Analysis");
    addHeading("Strategic Signals", 21);

    addSection(
      "Business Goal",
      "Premium repositioning",
      "Elevate perceived value while preserving warmth, accessibility and the independent character of the brand."
    );

    addSection(
      "Target Audience",
      "Design-aware urban customers",
      "People who value quality, atmosphere, craft and visually considered experiences."
    );

    addSection(
      "Core Challenge",
      "Premium without becoming distant",
      "The brand needs more sophistication without losing its human, welcoming personality."
    );

    addSection(
      "Opportunity",
      "Build one coherent digital language",
      "Align identity, website and content into one recognizable system instead of treating them as separate outputs."
    );

    addDivider();

    // STRATEGY

    addLabel("02 / Strategy");
    addHeading("Brand Strategy", 21);

    addSection(
      "Positioning",
      "Contemporary craft",
      "A premium but human brand expression built around intention, quality and independent character."
    );

    addSection(
      "Personality",
      "Confident, warm and intentional",
      "The brand should feel refined without becoming cold, distant or overly corporate."
    );

    addSection(
      "Priority",
      "Strengthen perceived value",
      "Build stronger perception of quality before adding unnecessary complexity to the customer experience."
    );

    addSection(
      "Differentiator",
      "Independent point of view",
      "Create an experience with a recognizable visual language and a clear sense of authorship."
    );

    addDivider();

    // CREATIVE DIRECTION

    addLabel("03 / Creative Direction");
    addHeading("Visual Language", 21);

    addSection(
      "Typography",
      "Editorial contrast",
      "Pair a characterful editorial serif with a precise modern sans-serif to balance sophistication and clarity."
    );

    addSection(
      "Palette",
      "Warm restraint",
      "Use warm neutrals and deep ink tones supported by one expressive accent color."
    );

    addSection(
      "Imagery",
      "Tactile atmosphere",
      "Favor naturally lit photography, material details and authentic environments over generic commercial imagery."
    );

    addSection(
      "Motion",
      "Quiet confidence",
      "Use subtle transitions and controlled pacing to reinforce a considered premium experience."
    );

    addDivider();

    // WEBSITE PLAN

    addLabel("04 / Digital Experience");
    addHeading("Website Plan", 21);

    addNumberedItem(1, "Hero section with a clear positioning statement.");
    addNumberedItem(2, "Brand story and point of view.");
    addNumberedItem(3, "Products, services or primary commercial offering.");
    addNumberedItem(4, "Experience, atmosphere and supporting visual narrative.");
    addNumberedItem(5, "Social proof, contact and conversion pathway.");

    y += 5;

    addDivider();

    // NEXT STEPS

    addLabel("05 / Next Actions");
    addHeading("Recommended Next Steps", 21);

    addNumberedItem(1, "Validate positioning and project priorities with the client.");
    addNumberedItem(2, "Define visual references and creative territories.");
    addNumberedItem(3, "Establish the core brand design system.");
    addNumberedItem(4, "Create the website information architecture.");
    addNumberedItem(5, "Develop the first digital interface prototype.");
    addNumberedItem(6, "Review, test and refine the creative direction.");

    y += 10;

    ensureSpace(30);

    doc.setDrawColor(...colors.line);
    doc.line(margin, y, pageWidth - margin, y);

    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colors.ink);
    doc.text("BRIEF//AI", margin, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...colors.muted);
    doc.text("Creative Intelligence Workspace", margin, y + 5);

    doc.text(
      "Portfolio Prototype",
      pageWidth - margin,
      y,
      { align: "right" }
    );

    // PAGE NUMBERS

    const pageCount = doc.getNumberOfPages();

    for (let page = 1; page <= pageCount; page += 1) {
      doc.setPage(page);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(150, 145, 155);

      doc.text(
        `${String(page).padStart(2, "0")} / ${String(pageCount).padStart(2, "0")}`,
        pageWidth - margin,
        pageHeight - 10,
        { align: "right" }
      );
    }

    doc.save("brief-ai-creative-strategy.pdf");

    setDocumentGenerated(true);

    setTimeout(() => {
      setDocumentGenerated(false);
    }, 3000);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <span className="brand-mark">B//</span>

            <div>
              <strong>BRIEF//AI</strong>
              <small>Creative Intelligence</small>
            </div>
          </div>

          <nav className="nav">
            {navigation.map((item, index) => (
              <button
                key={item}
                className={
                  activePage === item ? "nav-item active" : "nav-item"
                }
                onClick={() => setActivePage(item)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="status-dot"></div>

          <div>
            <strong>AI Workspace</strong>
            <small>Portfolio prototype</small>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">
              BRIEF//AI / {activePage.toUpperCase()}
            </span>

            <h2>{activePage}</h2>
          </div>

          <button className="outline-button" onClick={loadDemo}>
            Load demo brief
          </button>
        </header>

        {activePage === "Workspace" && (
          <section className="workspace">
            <div className="hero">
              <span className="eyebrow">
                AI-ASSISTED CREATIVE STRATEGY
              </span>

              <h1>
                Turn messy client input
                <br />
                into <em>clear direction.</em>
              </h1>

              <p>
                Transform raw briefs into structured brand strategy,
                creative direction and digital recommendations - in one
                intelligent workspace.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => setActivePage("New Brief")}
                >
                  Start a new brief →
                </button>

                <button className="text-button" onClick={loadDemo}>
                  Explore demo
                </button>
              </div>
            </div>

            <div className="process">
              <span>RAW BRIEF</span>
              <i>→</i>
              <span>ANALYSIS</span>
              <i>→</i>
              <span>STRATEGY</span>
              <i>→</i>
              <span>CREATIVE DIRECTION</span>
            </div>

            <div className="dashboard-grid">
              <article className="feature-card large">
                <span className="card-number">01</span>

                <div>
                  <span className="eyebrow">STRUCTURE</span>
                  <h3>Brief Analysis</h3>

                  <p>
                    Extract goals, audience, constraints and opportunities
                    from unstructured client input.
                  </p>
                </div>
              </article>

              <article className="feature-card">
                <span className="card-number">02</span>

                <div>
                  <span className="eyebrow">POSITIONING</span>
                  <h3>Brand Strategy</h3>

                  <p>
                    Translate business needs into positioning and strategic
                    priorities.
                  </p>
                </div>
              </article>

              <article className="feature-card dark-card">
                <span className="card-number">03</span>

                <div>
                  <span className="eyebrow">DIRECTION</span>
                  <h3>Creative System</h3>

                  <p>
                    Build a cohesive visual and digital direction from the
                    strategic foundation.
                  </p>
                </div>
              </article>
            </div>
          </section>
        )}

        {activePage === "New Brief" && (
          <section className="page-section">
            <div className="section-heading">
              <span className="eyebrow">01 / RAW INPUT</span>
              <h1>What did the client say?</h1>

              <p>
                Paste the original message, meeting notes or unstructured
                brief. BRIEF//AI will organize the important signals.
              </p>
            </div>

            <div className="brief-editor">
              <div className="editor-header">
                <span>CLIENT INPUT</span>
                <span>{brief.length} characters</span>
              </div>

              <textarea
                value={brief}
                onChange={(event) => setBrief(event.target.value)}
                placeholder="Paste the raw client brief here..."
              />

              <div className="editor-footer">
                <button className="text-button" onClick={loadDemo}>
                  Insert example
                </button>

                <button
                  className="primary-button"
                  onClick={runAnalysis}
                  disabled={!brief.trim()}
                >
                  Analyze brief →
                </button>
              </div>
            </div>
          </section>
        )}

        {activePage === "Analysis" && (
          <section className="page-section">
            <div className="section-heading">
              <span className="eyebrow">
                02 / INTELLIGENCE LAYER
              </span>

              <h1>Brief Analysis</h1>

              <p>
                The original request has been translated into a clear
                creative foundation.
              </p>
            </div>

            {!analyzed ? (
              <div className="empty-state">
                <span>NO ANALYSIS YET</span>

                <h3>Start with a client brief.</h3>

                <button
                  className="primary-button"
                  onClick={() => setActivePage("New Brief")}
                >
                  Create brief →
                </button>
              </div>
            ) : (
              <div className="analysis-grid">
                <article className="result-card">
                  <span className="eyebrow">BUSINESS GOAL</span>
                  <h3>Premium repositioning</h3>

                  <p>
                    Elevate perceived value while preserving warmth,
                    accessibility and the independent character of the brand.
                  </p>
                </article>

                <article className="result-card">
                  <span className="eyebrow">TARGET AUDIENCE</span>
                  <h3>Design-aware urban customers</h3>

                  <p>
                    People who value quality, atmosphere, craft and visually
                    considered experiences.
                  </p>
                </article>

                <article className="result-card">
                  <span className="eyebrow">CORE CHALLENGE</span>
                  <h3>Premium without becoming distant</h3>

                  <p>
                    The brand needs more sophistication without losing its
                    human, welcoming personality.
                  </p>
                </article>

                <article className="result-card accent-card">
                  <span className="eyebrow">OPPORTUNITY</span>
                  <h3>Build one coherent digital language</h3>

                  <p>
                    Align identity, website and content into one recognizable
                    system instead of treating them as separate outputs.
                  </p>
                </article>
              </div>
            )}
          </section>
        )}

        {activePage === "Strategy" && (
          <GenericPage
            eyebrow="03 / BRAND THINKING"
            title="Strategy"
            description="Define the positioning, audience, personality and strategic priorities behind the project."
            items={[
              [
                "Positioning",
                "Contemporary craft with a premium but human tone.",
              ],
              [
                "Personality",
                "Confident, warm, intentional and detail-oriented.",
              ],
              [
                "Priority",
                "Build perception of quality before increasing complexity.",
              ],
              [
                "Differentiator",
                "An independent experience with a distinctive visual point of view.",
              ],
            ]}
          />
        )}

        {activePage === "Creative Direction" && (
          <GenericPage
            eyebrow="04 / VISUAL LANGUAGE"
            title="Creative Direction"
            description="Turn strategy into a clear design vocabulary for the brand."
            items={[
              [
                "Typography",
                "Editorial serif paired with a precise modern sans-serif.",
              ],
              [
                "Palette",
                "Warm neutrals, deep ink and one expressive accent.",
              ],
              [
                "Imagery",
                "Tactile, atmospheric and naturally lit photography.",
              ],
              [
                "Motion",
                "Subtle transitions with restrained, premium pacing.",
              ],
            ]}
          />
        )}

        {activePage === "Website Plan" && (
          <GenericPage
            eyebrow="05 / DIGITAL EXPERIENCE"
            title="Website Plan"
            description="A recommended structure for translating the brand into a focused digital experience."
            items={[
              ["01", "Hero / positioning statement"],
              ["02", "Brand story and point of view"],
              ["03", "Products or core services"],
              ["04", "Experience / atmosphere"],
              ["05", "Social proof and contact"],
            ]}
          />
        )}

        {activePage === "History" && (
          <section className="page-section">
            <div className="section-heading">
              <span className="eyebrow">ARCHIVE</span>
              <h1>Brief History</h1>

              <p>Saved creative explorations will appear here.</p>
            </div>

            <div className="history-list">
              <div>
                <span>BRF-001</span>
                <strong>Independent Coffee Brand</strong>
                <small>Brand + Website</small>
              </div>

              <div>
                <span>BRF-002</span>
                <strong>Architecture Studio</strong>
                <small>Positioning + Digital</small>
              </div>

              <div>
                <span>BRF-003</span>
                <strong>Creative Consultancy</strong>
                <small>Identity + Content</small>
              </div>
            </div>
          </section>
        )}

        {activePage === "Export" && (
          <section className="page-section">
            <div className="section-heading">
              <span className="eyebrow">FINAL OUTPUT</span>
              <h1>Export your direction.</h1>

              <p>
                Prepare a structured creative brief ready to share with a
                client or creative team.
              </p>
            </div>

            <div className="export-card">
              <span>BRIEF//AI OUTPUT</span>

              <h2>Creative Strategy Document</h2>

              <p>
                Brand overview · audience · objectives · strategy · creative
                direction · website plan
              </p>

              <button
                className="primary-button"
                onClick={generateDocument}
              >
                {documentGenerated
                  ? "PDF generated ✓"
                  : "Generate PDF →"}
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function GenericPage({
  eyebrow,
  title,
  description,
  items,
}) {
  return (
    <section className="page-section">
      <div className="section-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="strategy-list">
        {items.map(([label, text]) => (
          <article key={`${label}-${text}`}>
            <span>{label}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default App;