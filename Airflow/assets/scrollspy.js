(() => {
  const rail = document.querySelector(".p9-rail");
  if (!rail) return;

  const links = Array.from(rail.querySelectorAll('a[href^="#p9-"]'));
  const sections = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = (section) => {
    links.forEach((link) => {
      const active = link.hash.slice(1) === section.id;
      link.classList.toggle("is-on", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  let frame = 0;
  const updateActiveSection = () => {
    frame = 0;
    const marker = Math.min(window.innerHeight * 0.36, 300);
    let current = sections[0];

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) current = section;
      else break;
    }

    const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (atPageEnd) current = sections[sections.length - 1];
    setActive(current);
  };

  const scheduleUpdate = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(updateActiveSection);
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("hashchange", scheduleUpdate);
  window.addEventListener("pageshow", scheduleUpdate);
  updateActiveSection();
})();
