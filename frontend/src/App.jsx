import Navbar from "./components/NavBar";
import BirthForm from "./components/BirthForm";

const featureHighlights = [
  {
    title: "Cosmic precision",
    text: "Receive a richly detailed birth chart grounded in your exact date, time, and place.",
  },
  {
    title: "AI-powered guidance",
    text: "Turn planetary placements into clear, calming insights you can read and reflect on.",
  },
  {
    title: "Elegant experience",
    text: "A premium, responsive interface built for modern astrology lovers.",
  },
];

function App() {
  return (
    <div className="min-h-screen text-slate-100">
      <Navbar />

      <main className="mx-auto flex max-w-7xl flex-col px-4 pb-16 sm:px-6 lg:px-8">
        <section
          id="home"
          className="grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-sm font-medium text-fuchsia-200 shadow-lg shadow-fuchsia-500/10">
              ✨ Astrology, reimagined for the modern soul
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Discover your cosmic blueprint with <span className="text-fuchsia-300">AstroGPT</span>.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Create a beautifully crafted birth chart and read personalized astrology insights from the stars.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#birth-form"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 via-violet-500 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/40"
              >
                🔮 Generate Birth Chart
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-slate-200 backdrop-blur transition hover:border-fuchsia-400/40 hover:bg-white/15"
              >
                Explore the cosmos
              </a>
            </div>

            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {featureHighlights.map((feature) => (
                <div key={feature.title} className="glass-panel rounded-2xl p-4">
                  <h2 className="text-sm font-semibold text-white">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(192,132,252,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_35%)]" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Tonight’s forecast</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Your stars are aligning</h2>
                </div>
                <div className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-2 text-sm text-fuchsia-200">
                  12° Leo
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Birth chart</p>
                  <p className="mt-2 text-3xl font-semibold text-white">10 planets</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm text-slate-400">Reading style</p>
                  <p className="mt-2 text-3xl font-semibold text-white">AI guided</p>
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm leading-7 text-slate-300">
                “Your chart reveals a powerful blend of curiosity, emotional depth, and a natural ability to lead with heart.”
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">About AstroGPT</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">A refined experience for your birth story.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              AstroGPT combines a polished astrology dashboard with thoughtful AI-generated insight so your chart feels both personal and inspiring.
            </p>
          </div>

          <div className="glass-panel p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Precision</p>
                <p className="mt-2 text-xl font-semibold text-white">Date, time & place</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Clarity</p>
                <p className="mt-2 text-xl font-semibold text-white">Readable insights</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Design</p>
                <p className="mt-2 text-xl font-semibold text-white">Premium dark UI</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-sm text-slate-400">Flow</p>
                <p className="mt-2 text-xl font-semibold text-white">Smooth interactions</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">Features</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Everything you need for a premium astrology session.</h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Birth chart cards", "Explore your Sun, Moon, Mars, and more through polished, responsive cards."],
              ["Structured AI reading", "Break your astrology reading into beautiful sections instead of a single dense block."],
              ["Seamless experience", "A refined form, smooth animations, and a calming visual design throughout."],
            ].map(([title, text]) => (
              <div key={title} className="glass-panel p-6">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="birth-form" className="mt-20">
          <BirthForm />
        </section>

        <section id="contact" className="mt-20 rounded-[2rem] border border-white/10 bg-slate-900/50 p-8 text-center backdrop-blur-xl sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Ready to explore your stars?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">
            Share your birth details and let your celestial story unfold in a beautifully designed reading.
          </p>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/70 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 AstroGPT. Designed for cosmic clarity.</p>
          <p>Made with React, Tailwind, and a touch of starlight.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;