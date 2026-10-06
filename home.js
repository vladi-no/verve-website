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

if ("IntersectionObserver" in window) {
  const projectObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".project__image:not(.project__image--carousel)").forEach((image) => {
    image.classList.add("project__image--animated");
    projectObserver.observe(image);
  });
}

document.querySelectorAll(".project__image--carousel").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".project__slide"));
  const control = carousel.querySelector(".project__carousel-control");
  const counter = carousel.querySelector(".project__carousel-counter");
  const status = carousel.querySelector(".project__carousel-status");
  const pad = (number) => String(number).padStart(2, "0");
  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));

  if (slides.length < 2 || !control) return;
  if (activeIndex < 0) activeIndex = 0;

  const updateStatus = () => {
    if (counter) {
      counter.textContent = `${pad(activeIndex + 1)} / ${pad(slides.length)}`;
    }
    if (status) status.textContent = `Image ${activeIndex + 1} of ${slides.length}`;
  };

  slides.forEach((slide, index) => {
    const isActive = index === activeIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });
  updateStatus();

  const showSlide = (nextIndex) => {
    slides[activeIndex].classList.remove("is-active");
    slides[activeIndex].setAttribute("aria-hidden", "true");
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides[activeIndex].classList.add("is-active");
    slides[activeIndex].setAttribute("aria-hidden", "false");

    updateStatus();
  };

  carousel.addEventListener("click", () => showSlide(activeIndex + 1));
  control.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    }
  });
});

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
  const contactStatus = document.querySelector(".contact-form__status");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );

    const mailto = `mailto:christa@oakeyagency.com?subject=${subject}&body=${body}`;
    const mailLink = document.createElement("a");
    mailLink.href = mailto;
    mailLink.textContent = "Open the email draft";

    if (contactStatus) {
      contactStatus.replaceChildren(
        document.createTextNode("Click to open your email draft: "),
        mailLink,
        document.createTextNode(".")
      );
      contactStatus.hidden = false;
    }
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
