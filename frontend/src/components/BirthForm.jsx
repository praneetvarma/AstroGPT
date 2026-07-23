import { useMemo, useState } from "react";
import api from "../services/api";

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];
const years = Array.from(
  { length: 100 },
  (_, index) => new Date().getFullYear() - index,
);
const hours = Array.from({ length: 12 }, (_, index) => index + 1);
const minutes = Array.from({ length: 60 }, (_, index) => index);
const periods = ["AM", "PM"];

function parseReadingSections(reading) {
  if (!reading) {
    return [];
  }

  const lines = reading
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return [];
  }

  const sections = [];
  let currentSection = null;

  lines.forEach((line) => {
    const normalized = line.replace(/^[-*•]\s*/, "").trim();
    const isHeading =
      normalized.length < 60 &&
      (/[:\-–—]$/.test(normalized) ||
        /^[A-Z][A-Za-z\s&/()]+$/.test(normalized) ||
        /^#{1,3}\s/.test(normalized));

    if (isHeading) {
      const heading = normalized
        .replace(/^#{1,3}\s*/, "")
        .replace(/[:\-–—]$/, "")
        .trim();
      currentSection = { heading: heading || "Cosmic Insight", bullets: [] };
      sections.push(currentSection);
      return;
    }

    const bulletItems = normalized
      .split(/(?<=[.!?])\s+(?=[A-Z])/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (currentSection) {
      currentSection.bullets.push(...bulletItems);
    } else {
      sections.push({ heading: "Cosmic Insight", bullets: bulletItems });
      currentSection = sections[sections.length - 1];
    }
  });

  return sections.length > 0
    ? sections
    : [{ heading: "Cosmic Insight", bullets: [reading] }];
}

function BirthForm() {
  const [formData, setFormData] = useState({
    name: "",
    place: "",
  });
  const [birthDate, setBirthDate] = useState({
    day: "15",
    month: "8",
    year: String(new Date().getFullYear() - 25),
  });
  const [birthTime, setBirthTime] = useState({
    hour: "9",
    minute: "30",
    period: "AM",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const readingSections = useMemo(() => {
    if (!result?.reading) {
      return [];
    }

    return parseReadingSections(result.reading);
  }, [result]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    const monthValue = String(birthDate.month).padStart(2, "0");
    const dayValue = String(birthDate.day).padStart(2, "0");
    const yearValue = birthDate.year;

    let hourValue = Number(birthTime.hour);
    if (birthTime.period === "PM" && hourValue < 12) {
      hourValue += 12;
    }
    if (birthTime.period === "AM" && hourValue === 12) {
      hourValue = 0;
    }

    const formattedHour = String(hourValue).padStart(2, "0");
    const formattedMinute = String(birthTime.minute).padStart(2, "0");

    const payload = {
      ...formData,
      dob: `${yearValue}-${monthValue}-${dayValue}`,
      time: `${formattedHour}:${formattedMinute}`,
    };

    try {
      const response = await api.post("/generate-reading", payload);
      setResult(response.data);
    } catch (error) {
      console.error("AstroGPT API error:", error);

      if (error.response) {
        const backendMessage =
          error.response.data?.detail ||
          error.response.data?.message ||
          "The server returned an error.";

        alert(
          `AstroGPT server error (${error.response.status})\n\n${backendMessage}`,
        );
      } else if (error.request) {
        alert(
          "Unable to connect to the AstroGPT server. The server may be waking up. Please wait about 30 seconds and try again.",
        );
      } else {
        alert(`Something went wrong: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
      <div className="glass-panel w-full overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">
              Birth details
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Build your cosmic profile.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              Enter your birthplace and precise birth timing to generate a
              premium reading.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 transition focus-within:border-fuchsia-400">
              <span className="text-xl">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                required
              />
            </label>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Day
                </label>
                <select
                  value={birthDate.day}
                  onChange={(e) =>
                    setBirthDate({ ...birthDate, day: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-sm outline-none transition focus:border-fuchsia-400"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Month
                </label>
                <select
                  value={birthDate.month}
                  onChange={(e) =>
                    setBirthDate({ ...birthDate, month: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-sm outline-none transition focus:border-fuchsia-400"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Year
                </label>
                <select
                  value={birthDate.year}
                  onChange={(e) =>
                    setBirthDate({ ...birthDate, year: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-sm outline-none transition focus:border-fuchsia-400"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_1fr_0.8fr]">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Hour
                </label>
                <select
                  value={birthTime.hour}
                  onChange={(e) =>
                    setBirthTime({ ...birthTime, hour: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-sm outline-none transition focus:border-fuchsia-400"
                >
                  {hours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  Minute
                </label>
                <select
                  value={birthTime.minute}
                  onChange={(e) =>
                    setBirthTime({ ...birthTime, minute: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-sm outline-none transition focus:border-fuchsia-400"
                >
                  {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                      {String(minute).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                <label className="mb-2 block text-sm font-medium text-slate-400">
                  AM / PM
                </label>
                <select
                  value={birthTime.period}
                  onChange={(e) =>
                    setBirthTime({ ...birthTime, period: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2.5 text-sm outline-none transition focus:border-fuchsia-400"
                >
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 transition focus-within:border-fuchsia-400">
              <span className="text-xl">📍</span>
              <input
                type="text"
                name="place"
                placeholder="Birth place"
                value={formData.place}
                onChange={handleChange}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 via-violet-500 to-sky-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/35 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Generating your reading...
                </span>
              ) : (
                "🔮 Generate Birth Chart"
              )}
            </button>
          </form>
        </div>
      </div>

      {result ? (
        <div className="mt-8 w-full rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">
                Astrology reading
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Your cosmic story
              </h3>
            </div>
            {loading ? (
              <div className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-2 text-sm text-fuchsia-200">
                Loading...
              </div>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Object.entries(result.birth_chart || {})
              .filter(
                ([name, value]) =>
                  name !== "Nakshatra" && typeof value === "object",
              )
              .map(([name, value]) => (
                <div
                  key={name}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:-translate-y-1 hover:border-fuchsia-400/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-lg font-semibold text-white">{name}</h4>
                    <span className="rounded-full bg-fuchsia-500/10 px-2.5 py-1 text-xs font-medium text-fuchsia-200">
                      {value.sign}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    Longitude:{" "}
                    <span className="text-white">
                      {value.longitude_rounded}°
                    </span>
                  </p>
                </div>
              ))}

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:-translate-y-1 hover:border-fuchsia-400/40">
              <h4 className="text-lg font-semibold text-white">Nakshatra</h4>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {result.birth_chart?.Nakshatra || "—"}
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-purple-950/40 p-6 sm:p-8">
            <div className="mb-6 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300">
                Cosmic Analysis
              </p>
              <h4 className="mt-3 text-3xl font-semibold text-white">
                Your Cosmic Profile
              </h4>
            </div>

            <div className="space-y-6">
              {readingSections.map((section, index) => (
                <section
                  key={`${section.heading}-${index}`}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                >
                  <h5 className="text-lg font-semibold text-white">
                    {section.heading}
                  </h5>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={`${section.heading}-${bulletIndex}`}
                        className="flex gap-2"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BirthForm;
