const SITE = {
  name: "Bryan Booij",
  email: "1025561@hr.nl",
  linkedin: "https://www.linkedin.com/in/bryanbooij/",
  github: "https://github.com/BryanBooij",
  cv: "CV.pdf",
};

const PROJECTS = [
  {
    file: "project-1.html",
    title: "2D mobiele game",
    summary: "Een Unity-game voor mobiel, gemaakt in een team, met een verhaalmodus, dialogen en een eindbaas.",
    tags: ["Unity", "C#", "Teamproject"],
    cover: "images/2d game/Banner_2.0.png",
  },
  {
    file: "project-2.html",
    title: "Social Networking app for international students",
    summary: "An international student networking platform that helps students connect, meet new people, and build a community.",
    tags: ["Javascript", "CSS", "HTML"],
    cover: "images/Global-to-social/banner.png",
  },
];

const PLACEHOLDER = "images/placeholder.svg";

function h(tag, attrs = {}, ...kids) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === false || value == null) continue;
    if (key === "class") node.className = value;
    else node.setAttribute(key, value === true ? "" : value);
  }
  for (const kid of kids.flat()) node.append(kid);
  return node;
}

function useFallback(img) {
  if (img.dataset.fallback) return;
  img.dataset.fallback = "1";
  img.src = PLACEHOLDER;
}

document.addEventListener(
  "error",
  (event) => {
    if (event.target instanceof HTMLImageElement) useFallback(event.target);
  },
  true
);

function buildHeader() {
  const host = document.getElementById("site-header");
  if (!host) return;

  const current = document.body.dataset.page || "index.html";
  host.className = "bar";

  const label = h("span", { class: "menu-label" }, "Menu");
  const burger = h("span", { class: "burger", "aria-hidden": "true" }, h("span"), h("span"), h("span"));
  const button = h(
    "button",
    { class: "menu-btn", type: "button", "aria-expanded": "false", "aria-controls": "menu" },
    label,
    burger
  );
  host.append(h("a", { class: "brand", href: "index.html" }, SITE.name), button);

  const projectLinks = PROJECTS.map((p) =>
    h("li", {}, h("a", { href: p.file, "aria-current": p.file === current ? "page" : false }, p.title))
  );

  const menu = h(
    "nav",
    { id: "menu", class: "menu", "aria-label": "Hoofdmenu" },
    h(
      "ul",
      { class: "menu-main" },
      h("li", {}, h("a", { href: "index.html#About me" }, "About me")),
      h("li", {}, h("a", { href: "index.html#Languages" }, "Languages and frameworks")),
      h(
        "li",
        {},
        h("a", { href: "index.html#Projects" }, "Projects"),
        h("ul", { class: "menu-sub" }, projectLinks)
      ),
      h("li", {}, h("a", { href: "index.html#contact" }, "Contact"))
    )
  );
  host.after(menu);

  const isOpen = () => document.body.classList.contains("menu-open");

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    button.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Sluiten" : "Menu";
    document.querySelectorAll("main, footer").forEach((node) => {
      node.inert = open;
    });
  }

  button.addEventListener("click", () => setMenu(!isOpen()));

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setMenu(false);
      button.focus();
    }
  });
}

function buildFooter() {
  const host = document.getElementById("site-footer");
  if (!host) return;
  host.className = "footer";
  host.append(h("div", { class: "wrap" }, `© ${new Date().getFullYear()} ${SITE.name}`));
}

function buildProjectList() {
  const list = document.getElementById("project-list");
  if (!list) return;

  for (const p of PROJECTS) {
    list.append(
      h(
        "li",
        { class: "project-row" },
        h("img", { src: p.cover, alt: "", width: "600", height: "400", loading: "lazy" }),
        h(
          "div",
          {},
          h("h3", {}, h("a", { href: p.file }, p.title)),
          h("p", {}, p.summary),
          h("ul", { class: "tags" }, p.tags.map((tag) => h("li", {}, tag)))
        )
      )
    );
  }
}

function buildProjectNav() {
  const nav = document.getElementById("project-nav");
  if (!nav) return;

  const total = PROJECTS.length;
  const index = PROJECTS.findIndex((p) => p.file === document.body.dataset.page);
  if (index < 0 || total < 2) {
    nav.hidden = true;
    return;
  }

  const prev = PROJECTS[(index - 1 + total) % total];
  const next = PROJECTS[(index + 1) % total];

  if (total > 2) {
    nav.append(h("a", { class: "prev", href: prev.file }, h("small", {}, "Vorig project"), h("span", {}, prev.title)));
  }
  nav.append(h("a", { class: "next", href: next.file }, h("small", {}, "Volgend project"), h("span", {}, next.title)));
}

function bindSiteData() {
  document.querySelectorAll("[data-site]").forEach((node) => {
    node.textContent = SITE[node.dataset.site];
  });

  document.querySelectorAll("[data-site-link]").forEach((link) => {
    const key = link.dataset.siteLink;
    link.href = key === "email" ? `mailto:${SITE.email}` : SITE[key];
  });
}

function init() {
  buildHeader();
  buildFooter();
  buildProjectList();
  buildProjectNav();
  bindSiteData();

  document.querySelectorAll("img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) useFallback(img);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
