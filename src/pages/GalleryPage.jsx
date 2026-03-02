import useApp from "../hooks/useApp";

export default function GalleryPage() {
  const { cd, bd, aL, t, SOCIALS } = useApp();

  const gallery = [
    { img: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&h=400&fit=crop", c: "Hybrid батерей засвар" },
    { img: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=600&h=400&fit=crop", c: "Мотор 1NZ-FXE" },
    { img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop", c: "Prius 30 урд гупер" },
    { img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop", c: "Явах эд анги" },
    { img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop", c: "LED фара" },
    { img: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=600&h=400&fit=crop", c: "Тоормосны систем" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{t.gallery}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((p, i) => (
          <div
            key={i}
            className={`${cd} rounded-xl border ${bd} overflow-hidden group`}
          >
            <div className={`aspect-video ${aL} overflow-hidden`}>
              <img
                src={p.img}
                alt={p.c}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="p-3 text-sm font-medium">{p.c}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6 flex flex-wrap justify-center gap-3">
        {SOCIALS.map((s) => (
          <a
            key={s.key}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium ${s.bg}`}
          >
            <s.Icon size={18} className="text-white" />
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
