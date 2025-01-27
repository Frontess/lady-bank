import AbstractView from "./abstract-view.js";

const isValidTemplate = (isTouched, isValid) => {
  if (!isTouched) {
    return ``;
  } else if (!isValid) {
    return `login__label--error`;
  }

  return `login__label--success`;
};

const inputFieldTemplate = (field) => {
  return `
  <label class="login__label js-label ${isValidTemplate(
    field.isTouched,
    field.isValid
  )}">
    <span class="login__span">${field.title}</span>
      <input data-fieldid=${field.id} class="login__input js-input"
      value="${field.value}" type="number" placeholder="Введите ${
    field.title
  }" required data-testid="test-transaction-input" >
  </label>
  `;
};

export default class InputNumberField extends AbstractView {
  constructor(field) {
    super();

    this._field = field;
  }

  _changeHandler = (evt) => {
    evt.preventDefault();

    this._handler.change(evt.target.dataset.fieldid, evt.target.value);
  };

  getTemplate() {
    return inputFieldTemplate(this._field);
  }

  _setValid(evt) {
    evt.target.closest(`.js-label`).classList.remove(`login__label--error`);
  }

  setChangeHandler(handler) {
    this._handler.change = handler;

    this.getElement()
      .querySelector(".js-input")
      .addEventListener(`focusout`, this._changeHandler);

    this.getElement()
      .querySelector(".js-input")
      .addEventListener(`focus`, (evt) => this._setValid(evt));
  }
}
