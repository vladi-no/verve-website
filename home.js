const menuToggle = document.querySelector(".home-menu-toggle");
const navigation = document.querySelector(".home-nav");
const mobileLayout = window.matchMedia("(max-width: 900px)");

if (menuToggle && navigation) {
  document.documentElement.classList.add("js");

  const setMenuOpen = (open) => {
    const isOpen = mobileLayout.matches && open;
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close site menu" : "Open site menu");
    navigation.inert = mobileLayout.matches && !isOpen;
  };

  setMenuOpen(false);

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !navigation.contains(event.target) && !menuToggle.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  mobileLayout.addEventListener("change", () => {
    setMenuOpen(false);
  });
}
