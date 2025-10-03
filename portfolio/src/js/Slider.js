class Slider {
  _leftZone = document.querySelector('.slider__zone--left');
  _rightZone = document.querySelector('.slider__zone--right');
  _sliderTrack = document.querySelector('.slider__track');
  _sliderZones = document.querySelector('.slider__zones');
  _max;
  _min;

  _startX;
  _currentX;
  _touchDirection;
  _touchStartPos;
  constructor() {
    this._interval = null;
    this._position = 0;

    this._updateBounds();
    this._isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!this._isTouch && window.innerWidth > 768) this._addHoverListeners();

    this._sliderZones.addEventListener('touchstart', e => {
      this._startX = e.touches[0].clientX;
      this._touchStartPos = this._position;
      this._touchDirection = 0;
    });

    this._sliderZones.addEventListener('touchmove', e => {
      e.preventDefault();
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - this._startX;

      this._position = this._touchStartPos + deltaX;

      if (this._position > this._max) this._position = this._max;
      if (this._position < this._min) this._position = this._min;

      this._sliderTrack.style.transform = `translateX(${this._position}px)`;

      this._touchDirection = deltaX > 0 ? 1 : -1;
    });

    this._sliderZones.addEventListener('touchend', this._inertMove.bind(this));

    window.addEventListener('resize', () => {
      this._updateBounds();
      if (!this._isTouch && window.innerWidth > 768 && !this._hoverAdded) {
        this._addHoverListeners();
      }
    });

    window.addEventListener('load', () => {
      this._updateBounds();
    });
  }

  _addHoverListeners() {
    this._leftZone.addEventListener('mouseenter', () => this._moveSlider(1));
    this._leftZone.addEventListener('mouseleave', () => this._stopMove());
    this._rightZone.addEventListener('mouseenter', () => this._moveSlider(-1));
    this._rightZone.addEventListener('mouseleave', () => this._stopMove());
    this._hoverAdded = true;
  }

  _getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  _updateBounds() {
    const first = this._sliderTrack.firstElementChild;
    const last = this._sliderTrack.lastElementChild;
    const viewport = window.innerWidth;

    const leftOffset = 20;
    const scrollbar = this._getScrollbarWidth();
    const rightOffset = leftOffset + scrollbar;

    const firstRect = first.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();

    this._max = this._position + (leftOffset - firstRect.left);
    this._min = this._position + (viewport - rightOffset - lastRect.right);
  }

  _moveSlider(direction) {
    if (this._interval) return;
    const speed = 10;

    this._updateBounds();

    this._interval = setInterval(() => {
      this._position += direction * speed;

      if (this._position > this._max) this._position = this._max;
      if (this._position < this._min) this._position = this._min;

      this._sliderTrack.style.transform = `translateX(${this._position}px)`;

      if (this._position === this._max || this._position === this._min)
        this._stopMove();
    }, 17);
  }

  _stopMove() {
    clearInterval(this._interval);
    this._interval = null;
  }

  _inertMove() {
    let step = 25;
    const friction = 0.9;

    const interval = setInterval(() => {
      if (step < 1) {
        clearInterval(interval);
        return;
      }

      this._position += this._touchDirection * step;

      if (this._position > this._max) this._position = this._max;
      if (this._position < this._min) this._position = this._min;

      this._sliderTrack.style.transform = `translateX(${this._position}px)`;

      step *= friction;
    }, 17);
  }
}
export default Slider;
