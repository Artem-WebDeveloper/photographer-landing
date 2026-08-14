class Accordion {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      const savedIndex = localStorage.getItem('curAccordEl');
      if (savedIndex === 'closeAll') {
        this._closeAll();
      } else if (savedIndex === null) {
        const firstItem = document.querySelector('.accordion__item');
        if (firstItem) firstItem.classList.add('accordion__item--open');
      } else {
        this._toggleItem(+savedIndex);
      }
    });

    document.querySelectorAll('.accordion__heading').forEach((heading, i) => {
      heading.addEventListener('click', () => this._toggleItem(i));
    });
  }
  _toggleItem(index) {
    let isOpen = false;
    const items = document.querySelectorAll('.accordion__item');

    items.forEach((item, i) => {
      if (index === i) {
        item.classList.toggle('accordion__item--open');
        if (item.classList.contains('accordion__item--open')) {
          isOpen = true;
        } else isOpen = false;
      } else item.classList.remove('accordion__item--open');
    });

    if (isOpen) localStorage.setItem('curAccordEl', index);
    else localStorage.setItem('curAccordEl', 'closeAll');
  }

  _closeAll() {
    const items = document.querySelectorAll('.accordion__item');
    items.forEach(item => item.classList.remove('accordion__item--open'));
  }
}

export default Accordion;
