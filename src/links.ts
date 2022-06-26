const links = document.querySelectorAll("a[href]")

for (const link of Array.from(links)) {
  if (link instanceof HTMLAnchorElement) {
    link.target = "_blank"
    link.rel = "noopener noreferrer"
  }
}
