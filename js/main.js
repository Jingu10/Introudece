(() => {
  const leaflet = document.querySelector(".leaflet");
  const pageElems = document.querySelectorAll(".page");
  let pageCount = 0;
  let currentMenuList;

  leaflet.addEventListener("animationend", () => {
    leaflet.style.animation = "none";
  });

  function getTarget(elem, className) {
    while (!elem.classList.contains(className)) {
      elem = elem.parentNode;

      if (elem.nodeName === "BODY") {
        elem = null;
        return;
      }
    }

    return elem;
  }

  function closeLeaflet() {
    pageCount = 0;
    document.body.classList.remove("leaflet-opened");
    pageElems[2].classList.remove("page-flipped");
    setTimeout(() => {
      pageElems[0].classList.remove("page-flipped");
    }, 500);
  }

  function zoomIn(elem) {
    const rect = elem.getBoundingClientRect();
    const dx = window.innerWidth / 2 - (rect.x + rect.width / 2);
    let angle;

    switch (elem.parentNode.parentNode.dataset.page * 1) {
      case 1:
        angle = -30;
        break;
      case 2:
        angle = 0;
        break;
      case 3:
        angle = 30;
        break;
    }

    document.body.classList.add("zoom-in");
    leaflet.style.transform = `translate3d(${dx}px, 0px, 50vw) rotateY(${angle}deg)`;
    currentMenuList = elem;
    currentMenuList.classList.add("current-menu-list");
  }

  function zoomOut() {
    leaflet.style.transform = `translate3d(0, 0, 0)`;
    if (currentMenuList) {
      document.body.classList.remove("zoom-in");
      currentMenuList.classList.remove("current-menu-list");
      currentMenuList = null;
    }
  }

  leaflet.addEventListener("click", (e) => {
    let pageElem = getTarget(e.target, "page");
    if (pageElem) {
      pageElem.classList.add("page-flipped");
      pageCount++;

      if (pageCount == 2) {
        document.body.classList.add("leaflet-opened");
      }
    }

    let closeBtnElem = getTarget(e.target, "close-btn");
    if (closeBtnElem) {
      closeLeaflet();
      zoomOut();
      document.querySelector("h1").innerText = "Thank you!";
      document.querySelector(".message").innerText = "mm please!";
    }

    let menuListElem = getTarget(e.target, "menu-list");
    if (menuListElem) {
      if (!document.body.classList.contains("zoom-in")) {
        zoomIn(menuListElem);
      } else {
        zoomOut();
      }
    }
  });
})();
