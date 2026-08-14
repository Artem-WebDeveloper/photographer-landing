class ScrollButton {
  constructor() {
    const scrollBtn = document.querySelector('.intro__btn');
    if (!scrollBtn) return;
    scrollBtn.addEventListener('click', () => {
      document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

export default ScrollButton;
