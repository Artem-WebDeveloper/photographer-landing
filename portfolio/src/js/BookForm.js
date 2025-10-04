class BookForm {
  _popup = document.querySelector('.popup-book');
  _btnClose = document.querySelector('.close-btn');

  constructor() {
    this._modalForm = this._popup.querySelector('.form');
    this._pageForm = document.querySelector('.cta__form .form');
    this._isInsideForm = false;
    document.querySelectorAll('.book-btn').forEach(btn => {
      btn.addEventListener('click', this._openModal.bind(this));
    });

    this._popup.addEventListener('mouseup', e => {
      if (!this._isInsideForm && e.target === this._popup) {
        this._closeModal();
      }
      this._isInsideForm = false;
    });
    this._modalForm.addEventListener('mousedown', () => {
      this._isInsideForm = true;
    });
    this._btnClose.addEventListener('click', this._closeModal.bind(this));
  }

  _openModal(e) {
    e.preventDefault();

    this._transferFormData(this._pageForm, this._modalForm);
    this._toggleModal();
  }

  _closeModal() {
    this._transferFormData(this._modalForm, this._pageForm);
    this._toggleModal();
  }

  _toggleModal() {
    this._popup.classList.toggle('popup-book--open');
    document.body.classList.toggle('lock-modal');
    document.documentElement.classList.toggle('lock-modal');
  }

  _transferFormData(fromForm, toForm) {
    fromForm.querySelectorAll('input').forEach(input => {
      const toInput = toForm.querySelector(`[name="${input.name}"]`);
      if (toInput) toInput.value = input.value;
    });
  }
}

export default BookForm;
