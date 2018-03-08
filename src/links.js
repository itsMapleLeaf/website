const links = document.querySelectorAll("a[href]")

for (const link of links) {
  link.target = "_blank"
  link.rel = "noopener noreferrer"
}
