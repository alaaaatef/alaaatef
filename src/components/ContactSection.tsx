import { contact } from "@/data/content";

export function ContactSection() {
  const whatsappNumber = contact.phone.replace(/[\s+]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const rows = [
    { icon: "📧", label: contact.email, href: `mailto:${contact.email}` },
    { icon: "📞", label: contact.phone, href: whatsappUrl, ext: true },
    { icon: "📍", label: contact.location },
    { icon: "💼", label: contact.linkedinLabel, href: contact.linkedin, ext: true },
    { icon: "🐙", label: contact.githubLabel, href: contact.github, ext: true },
  ];

  return (
    <section id="contact" className="relative min-h-[80vh] bg-black px-6 py-24 md:snap-start md:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-display text-5xl font-bold md:text-7xl">
          <span className="text-white">Get in </span>
          <span className="text-gradient-teal">Touch</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300">
          I'm actively looking for my next role as a Data Analyst. If you're working on something interesting — or just want to talk data — reach out.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${contact.email}`}
            className="rounded-full bg-[#00d4aa] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#00b894]"
          >
            Send Email
          </a>
          <a
            href="/Alaa CV.pdf"
            download
            className="rounded-full border border-[#00d4aa] px-6 py-3 text-sm font-bold text-[#00d4aa] transition hover:bg-[#00d4aa]/10"
          >
            Download CV
          </a>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl gap-3 text-left">
          {rows.map((r, i) => (
            <a
              key={i}
              href={r.href}
              {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition ${r.href ? "hover:border-[#00d4aa]/50" : "cursor-default"}`}
            >
              <span className="text-xl text-[#00d4aa]">{r.icon}</span>
              <span className="text-sm text-gray-300">{r.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
