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

  document.querySelectorAll(".fault-card__toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      var card = toggle.closest(".fault-card");
      var open = !card.classList.contains("is-open");
      card.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  var faultGrid = document.getElementById("fault-grid");
  if (faultGrid) {
    var faultSearch = document.getElementById("fault-search");
    var faultEmpty = document.getElementById("fault-empty");
    var chips = document.querySelectorAll(".fault-chip");
    var cards = faultGrid.querySelectorAll(".fault-card");
    var brandLinks = faultGrid.querySelectorAll(".fault-brandlink");
    var faultMore = document.getElementById("fault-more");
    var mobileMq = window.matchMedia("(max-width: 699px)");
    var MOBILE_LIMIT = 6;
    var showAll = false;
    var activeBrand = "Tümü";

    function norm(s) {
      return s
        .toLocaleLowerCase("tr")
        .normalize("NFD")
        .replace(/\u0307/g, "")
        .replace(/ı/g, "i");
    }

    cards.forEach(function (card) {
      card.dataset.search = norm(card.dataset.search);
    });

    function applyFaultFilter() {
      var q = faultSearch ? norm(faultSearch.value.trim()) : "";
      var visible = 0;
      var visibleBrands = {};
      var limited = 0;
      var limitOn = mobileMq.matches && !showAll && activeBrand === "Tümü" && !q;
      cards.forEach(function (card) {
        var brandOk = activeBrand === "Tümü" || card.dataset.brand === activeBrand;
        var searchOk = !q || card.dataset.search.indexOf(q) !== -1;
        var show = brandOk && searchOk;
        if (show && limitOn && visible >= MOBILE_LIMIT) {
          show = false;
          limited++;
        }
        card.hidden = !show;
        if (show) {
          visible++;
          visibleBrands[card.dataset.brand] = true;
        }
      });
      brandLinks.forEach(function (link) {
        link.hidden = !visibleBrands[link.dataset.brand];
      });
      if (faultEmpty) faultEmpty.hidden = visible > 0;
      if (faultMore) {
        faultMore.hidden = limited === 0;
        faultMore.textContent = "Tüm arıza kodlarını göster (" + limited + " kod daha)";
      }
    }

    if (faultMore) {
      faultMore.addEventListener("click", function () {
        showAll = true;
        applyFaultFilter();
      });
    }
    if (mobileMq.addEventListener) mobileMq.addEventListener("change", applyFaultFilter);
    applyFaultFilter();

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeBrand = chip.dataset.brand;
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle("is-active", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyFaultFilter();
      });
    });

    if (faultSearch) faultSearch.addEventListener("input", applyFaultFilter);
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
