const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-lg font-semibold text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-sky-500 text-xl shadow-lg shadow-fuchsia-500/30">
            ☾
          </span>
          AstroGPT
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          {navigation.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="transition hover:text-fuchsia-300">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;