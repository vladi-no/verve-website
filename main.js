const page = document.querySelector(".page");
const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");

if (page && menuToggle && menuPanel) {
  const closeMenu = () => {
    page.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open site menu");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = page.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close site menu" : "Open site menu"
    );
  });

  document.addEventListener("click", (event) => {
    if (!page.classList.contains("menu-open")) {
      return;
    }

    if (
      event.target instanceof Node &&
      !menuPanel.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
