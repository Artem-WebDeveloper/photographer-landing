class MobileMenu {
  _mobileNav = document.querySelector('.mob-navigation');
  _btnNav = document.querySelector('.nav__btn');
  _iconNav = document.querySelector('.nav__icon');
  constructor() {
    this._btnNav.addEventListener('click', this._toggleMenu.bind(this));
    this._mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', this._closeMenu.bind(this));
    });
  }

  _toggleMenu() {
    const menuIsOpen = this._mobileNav.classList.contains(
      'mob-navigation--open'
    );

    if (menuIsOpen) this._closeMenu();
    else {
      this._openMenu();
    }
  }

  _openMenu() {
    this._mobileNav.classList.add('mob-navigation--open');
    this._iconNav.classList.add('open');
    document.body.classList.add('lock');
    document.documentElement.classList.add('lock');
  }
  _closeMenu() {
    this._mobileNav.classList.remove('mob-navigation--open');
    this._iconNav.classList.remove('open');
    document.body.classList.remove('lock');
    document.documentElement.classList.remove('lock');
  }
}

export default MobileMenu;
