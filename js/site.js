(function () {
  document.documentElement.classList.add("js");

  var btn = document.getElementById("menu-btn");
  var panel = document.getElementById("mobile-menu");
  if (btn && panel) {
    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    }

    btn.addEventListener("click", function () {
      setOpen(!panel.classList.contains("is-open"));
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ad = document.getElementById("ad").value.trim();
      var tel = document.getElementById("telefon").value.trim();
      var mesaj = document.getElementById("mesaj").value.trim();
      var body =
        "Ad Soyad: " + ad + "\nTelefon: " + tel + "\n\nMesaj:\n" + mesaj;
      window.location.href =
        "mailto:turgutlukombiservisi@gmail.com?subject=" +
        encodeURIComponent("Kombi Servisi — İletişim Formu") +
        "&body=" +
        encodeURIComponent(body);
    });
  }

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
