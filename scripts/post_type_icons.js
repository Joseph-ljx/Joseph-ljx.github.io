// Render the semantic `type` field from post front matter as a small Lucide
// icon. Only the three SVGs used by this site are embedded, so there is no
// client-side icon library, network request, or layout shift.

const TYPE_ICONS = {
  project: {
    name: "globe-2",
    nodes: [
      '<circle cx="12" cy="12" r="10"></circle>',
      '<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>',
      '<path d="M2 12h20"></path>',
    ],
  },
  work: {
    name: "briefcase-business",
    nodes: [
      '<path d="M12 12h.01"></path>',
      '<path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>',
      '<path d="M22 13a18.15 18.15 0 0 1-20 0"></path>',
      '<rect width="20" height="14" x="2" y="6" rx="2"></rect>',
    ],
  },
  education: {
    name: "graduation-cap",
    nodes: [
      '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.58 3.908a2 2 0 0 0 1.66 0z"></path>',
      '<path d="M22 10v6"></path>',
      '<path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>',
    ],
  },
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&#34;")
    .replace(/'/g, "&#39;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderIcon(type) {
  const icon = TYPE_ICONS[type];
  if (!icon) return "";

  return [
    `<svg class="lucide lucide-${icon.name} post-type-icon post-type-icon--${type}"`,
    ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"',
    ' fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"',
    ' stroke-linejoin="round" aria-hidden="true" focusable="false">',
    icon.nodes.join(""),
    "</svg>",
  ].join("");
}

function postList(locals) {
  const posts = locals && locals.site && locals.site.posts;
  if (!posts) return [];
  if (typeof posts.toArray === "function") return posts.toArray();
  return Array.isArray(posts.data) ? posts.data : [];
}

function injectListTitle(html, title, icon) {
  const escapedTitle = escapeHtml(title);
  const titlePattern = escapeRegExp(escapedTitle);

  // Redefine's archive/category/tag timeline.
  html = html.replace(
    new RegExp(`(<span class="article-title[^"]*">)${titlePattern}(</span>)`, "g"),
    `$1${icon}${escapedTitle}$2`,
  );

  // Redefine's standard home cards (the custom CV home can still replace them).
  html = html.replace(
    new RegExp(`(<h3 class="home-article-title">\\s*<a[^>]*>\\s*)${titlePattern}(\\s*</a>)`, "g"),
    `$1${icon}${escapedTitle}$2`,
  );

  return html;
}

hexo.extend.injector.register(
  "head_end",
  '<link rel="stylesheet" href="/css/post-type-icons.css">',
);

hexo.extend.filter.register("after_render:html", function renderPostTypeIcons(html, locals) {
  postList(locals).forEach((post) => {
    const type = String(post.type || "").toLowerCase();
    const icon = renderIcon(type);
    if (icon && post.title) {
      html = injectListTitle(html, post.title, icon);
    }
  });

  const page = locals && locals.page;
  const pageType = page && String(page.type || "").toLowerCase();
  const pageIcon = renderIcon(pageType);

  if (pageIcon && page.title) {
    const escapedTitle = escapeHtml(page.title);
    const titlePattern = escapeRegExp(escapedTitle);

    html = html.replace(
      new RegExp(`(<h1 class="article-title-(?:cover|regular)[^"]*)">${titlePattern}(</h1>)`),
      `$1 post-type-title">${pageIcon}${escapedTitle}$2`,
    );

    html = html.replace(
      new RegExp(`(<div class="page-title)(">)${titlePattern}(</div>)`),
      `$1 post-type-title$2${pageIcon}${escapedTitle}$3`,
    );
  }

  return html;
}, 20);
