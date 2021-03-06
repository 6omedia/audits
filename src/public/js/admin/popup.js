class Popup {

	popUp(message, customform){

		const thisClass = this;

		let modal = $('<div>', {"class": "c_modal"});
		let box = $('<div>', {"class": "box"});
		let msg = $('<p>').html(message);

		let yesBtn = $('<button>', {"class": "yesBtn"}).html('yes').on('click', function(){
						thisClass.positiveFunc();
					});

		let noBtn = $('<button>', {"class": "noBtn"}).html('no').on('click', function(){
						thisClass.negativeFunc();
					});

		box.append(msg);

		if(customform !== undefined){

			box.append(customform);

		}else{
		
			box.append(yesBtn);
			box.append(noBtn);

		}

		modal.append(box);

		$('body').append(modal);

		
		$('.c_modal').on('click', function(e){

			if($(e.target).is('.box') || $(e.target).is('button') || $(e.target).is('input')){
	            e.preventDefault();
	            return;
	        }

			thisClass.popDown();
		});

		if(customform !== undefined){
			this.positiveFunc();
		}

	}

	popDown(){

		console.log('popdocdcsdwn');
		$('.c_modal').remove();
		$('.c_modal').off();

	}

	constructor(positiveFunc, negativeFunc){
		this.positiveFunc = positiveFunc;
		this.negativeFunc = negativeFunc;
	}

}