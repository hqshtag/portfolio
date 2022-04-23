const elementInView = (el, scrollOffset = 0) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) - scrollOffset
  );
};
const showElement = (element) => {
  element.classList.add("showup");
};

const hideElement = (element) => {
  element.classList.remove("showup");
};

/* const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 100)) {
      showElement(el);
    } else {
      hideElement(el);
    }
  });
}; */
/* 
window.addEventListener("scroll", () => {
  handleScrollAnimation();
}); */
