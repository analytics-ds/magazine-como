// Interactions header : selecteur de langue, menus deroulants, menu mobile.
// Le CSS ouvre ces elements via les classes .is-open / .nav-open ; ce script
// se charge de poser/retirer ces classes (aucun JS n'existait auparavant).
(function () {
  "use strict";

  function closeAll(except) {
    document.querySelectorAll(".lang-switcher.is-open, .nav-dropdown.is-open").forEach(function (el) {
      if (el === except) return;
      el.classList.remove("is-open");
      var btn = el.querySelector("[aria-expanded]");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function toggle(container, trigger) {
    var willOpen = !container.classList.contains("is-open");
    closeAll(willOpen ? container : null);
    container.classList.toggle("is-open", willOpen);
    if (trigger) trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Selecteur de langue FR / EN
    document.querySelectorAll("[data-lang-switcher]").forEach(function (sw) {
      var trigger = sw.querySelector(".lang-switcher-trigger");
      if (!trigger) return;
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        toggle(sw, trigger);
      });
    });

    // Menus deroulants de navigation (mega-menu)
    document.querySelectorAll(".nav-dropdown").forEach(function (dd) {
      var trigger = dd.querySelector(".nav-link--dropdown");
      if (!trigger) return;
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        toggle(dd, trigger);
      });
    });

    // Menu mobile (hamburger)
    var toggleBtn = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".site-nav");
    if (toggleBtn && nav) {
      toggleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = nav.classList.toggle("nav-open");
        toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // Fermeture au clic exterieur
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".lang-switcher") && !e.target.closest(".nav-dropdown")) {
        closeAll(null);
      }
    });

    // Fermeture a la touche Echap
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeAll(null);
        if (nav && nav.classList.contains("nav-open")) {
          nav.classList.remove("nav-open");
          if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
        }
      }
    });
  });
})();
