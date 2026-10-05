const menuToggle = document.querySelector(".home-menu-toggle");
const navigation = document.querySelector(".home-nav");
const mobileLayout = window.matchMedia("(max-width: 900px)");

const pageNavigation = performance.getEntriesByType("navigation")[0];

if (pageNavigation?.type === "reload" && window.location.hash === "#top") {
  // Prevent restored scroll positions from overriding the top anchor on reload.
  const previousScrollRestoration = window.history.scrollRestoration;
  window.history.scrollRestoration = "manual";

  window.addEventListener("pageshow", () => {
    window.requestAnimationFrame(() => {
      if (window.location.hash === "#top") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      window.history.scrollRestoration = previousScrollRestoration;
    });
  }, { once: true });
}

const pressTrack = document.querySelector(".press-carousel__track");
const previousRelease = document.querySelector(".press-carousel__arrow--previous");
const nextRelease = document.querySelector(".press-carousel__arrow--next");

if (pressTrack && previousRelease && nextRelease) {
  const releases = Array.from(pressTrack.querySelectorAll(".press-release"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const releasePositions = () => {
    const trackLeft = pressTrack.getBoundingClientRect().left;
    return releases.map((release) => (
      release.getBoundingClientRect().left - trackLeft + pressTrack.scrollLeft
    ));
  };

  const updateArrows = () => {
    const lastPosition = pressTrack.scrollWidth - pressTrack.clientWidth;
    previousRelease.disabled = pressTrack.scrollLeft <= 1;
    nextRelease.disabled = pressTrack.scrollLeft >= lastPosition - 1;
  };

  const scrollRelease = (direction) => {
    const positions = releasePositions();
    const currentPosition = pressTrack.scrollLeft;
    const target = direction > 0
      ? positions.find((position) => position > currentPosition + 2)
      : positions.slice().reverse().find((position) => position < currentPosition - 2);

    pressTrack.scrollTo({
      left: target ?? (direction > 0 ? pressTrack.scrollWidth : 0),
      behavior: reducedMotion.matches ? "instant" : "smooth",
    });
  };

  previousRelease.hidden = false;
  nextRelease.hidden = false;
  previousRelease.addEventListener("click", () => scrollRelease(-1));
  nextRelease.addEventListener("click", () => scrollRelease(1));
  pressTrack.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  // Keep submissions local until a form service is connected.
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

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
