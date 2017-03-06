import $ from 'jquery';

class Modal {
	constructor() {
		this.openModalButton = $('.open-modal');
		this.modal = $('.modal');
		this.closeModalBtn = $('.modal__close');
		this.events();
	}

	events() {
		//Click open modal button
		this.openModalButton.click(this.openModal.bind(this));

		//Click X close modal button
		this.closeModalBtn.click(this.closeModal.bind(this));

		//Click ESC key button
		$(document).keyup(this.keyPressHandler.bind(this));
	}

	keyPressHandler(e) {
		if (e.keyCode === 27) {
			this.closeModal();
		}
	}

	openModal() {
		this.modal.addClass('modal--is-visible');
		console.log('clieked....')
		return false;
	}

	closeModal() {
		this.modal.removeClass('modal--is-visible');
	}
}

export default Modal;