
const addUrl = '/admin/api/add_post';
const updateUrl = '/admin/api/update_post';

const formInfo = {
	sendBtn: $('#submitBtn'),
	updateBtn: $('#update_btn'),
	errorBox: $('#error_box'),
	successBox: $('#successBox'),
	spinImg: $('#spin'),
	requiredFeilds: [
		{
			feildName: 'Short Question',
			elem: $('#q_short'),
			value: '',
			error: 'Short Question required',
			required: true
		},
		{
			feildName: 'Question',
			elem: $('#q_question'),
			value: '',
			error: 'Question required',
			required: true
		},
		{
			feildName: 'help',
			elem: $('#q_help'),
			value: '',
			error: 'Help required',
			required: true
		}
	]
}

function updateTable(tests){

	var table = $('#testTable');

	$('#testTable').find("tr:gt(1)").remove();

	$(tests).each(function(index){

		var row = `
			<tr data-postid="${this._id}">
				<td>${index + 1}</td>
				<td class="editable" contenteditable="true">${this.short}</td>
				<td class="editable" contenteditable="true">${this.question}</td>
				<td class="editable" contenteditable="true">${this.help}</td>
				<td>
					<input type="file" name="uploads[]" multiple="multiple" class="testImgInput">
					<div class="progress">
						<div class="progress-bar testProg" role="progressbar"></div>
					</div>
					<img class="editImg" src="${this.helpImg}">
				<td>
					<span class="delete delbtn" data-postid="${this._id}">Delete</span>
				</td>
			</tr>
		`;

		table.append(row);

	});

}

const testForm = new Form(formInfo);

testForm.sendBtn.on('click', function(){
	testForm.sendForm(function(){

		$.ajax({
			url: '/admin/api/add_test',
			type: 'POST',
			// dataType: 'json',
			data: {
				short: testForm.requiredFeilds[0].value, 
				question: testForm.requiredFeilds[1].value,
				help: testForm.requiredFeilds[2].value,
				helpImg: $('#testImg').attr('src')
			},
			success: function(data)
			{
				testForm.enableSubmit();
				if(data.success == '1'){

					testForm.successBox.html('New Test Created').slideDown();
					testForm.requiredFeilds[0].elem.val('');
					testForm.requiredFeilds[1].elem.val('');
					testForm.requiredFeilds[2].elem.val('');
					updateTable(data.tests);

				}else{
					if(data.error){
						// const displayError = makeErrorReadable(data.error);
						if(data.error.code == 11000){
							testForm.errorBox.html('There is already a test with that title or slug').slideDown();	
						}else{
							testForm.errorBox.html('Something went wrong, please try again later...').slideDown();
						}
						
					}else{
						testForm.errorBox.html('Something went wrong, please try again later...').slideDown();
					}
				}
			},
			error: function(xhr, desc, err)
			{
				testForm.errorBox.html('Something went wrong, please try again later...').slideDown();
				console.log(xhr, desc, err);
			}
		});

	});

});

$('#testTable').on('click', '.delete', function(){

	var testId = $(this).data('postid');

	$.ajax({
		url: '/admin/api/delete',
		type: 'POST',
		// dataType: 'json',
		data: {
			delete_item: 'test',
			itemid: testId
		},
		success: function(data)
		{
			if(data.success == '1'){	
				testForm.successBox.html('Test Deleted').slideDown();
				updateTable(data.tests);
			}else{	
				testForm.errorBox.html('Something went wrong, please try again later...').slideDown();
			}
		},
		error: function(xhr, desc, err)
		{
			testForm.errorBox.html('Something went wrong, please try again later...').slideDown();
			console.log(xhr, desc, err);
		}
	});

});

function updateTest(td){

	var testId = td.parent().data('postid');

	var short = td.parent().children()[1];
	short = $(short).text();

	var question = td.parent().children()[2];
	question = $(question).text();

	var help = td.parent().children()[3];
	help = $(help).text();
	
	var helpImg = td.parent().children()[4];
	helpImg = $(helpImg).children('img').attr('src');

	$.ajax({
		url: '/admin/api/update_test',
		type: 'POST',
		// dataType: 'json',
		data: {
			short: short,
			question: question,
			help: help,
			helpImg: helpImg,
			testId: testId
		},
		success: function(data)
		{
			if(data.success == '1'){	
				testForm.successBox.html('Test Updated').slideDown();
				updateTable(data.tests);
			}else{	
				console.log('Data: ', data);
				testForm.errorBox.html('Something went wrong, please try again later...').slideDown();
			}
		},
		error: function(xhr, desc, err)
		{
			testForm.errorBox.html('Something went wrong, please try again later...').slideDown();
			console.log(xhr, desc, err);
		}
	});

}

$('table').on('blur', '.editable', function(){

	updateTest($(this));

});

function displayUploadedImg(imgElem, imgSrc){

	imgElem.attr('src', imgSrc);

}

var imgUploader = new ImageUploader($('#upload-input'), $('#upload_btn'), $('#feat_img_prog'), 'posts', useAws);

imgUploader.fileInput.on('change', function(){
	imgUploader.resetProgress();
	imgUploader.uploadLocalFiles(function(data){
		displayUploadedImg($('#testImg'), '/static/uploads/posts/' + data.filename);
	});
});

$('table').on('change', '.testImgInput', function(){

	console.log('this: ', $(this));

	var prog = $(this).next().find('.testProg');
	var img = $(this).siblings('img');
	var td = $($(this).parent()[0]);

	var imgUp = new ImageUploader($(this), '', prog, 'posts', useAws); 

	imgUp.resetProgress();
	imgUp.uploadLocalFiles(function(data){
		// console.log(data);
		displayUploadedImg(img, '/static/uploads/posts/' + data.filename);
		updateTest(td);
	});

});


// $('.testImgInput')

// imgUploader.uploadBtn.on('click', function(){

// 	if(imgUploader.awsObj == false){

// 		imgUploader.uploadLocalFiles(function(data){
// 			displayUploadedImg('/static/uploads/posts/' + data.filename);
// 		});

// 	}else{

// 		imgUploader.uploadFile(function(awsUrl, filename){
// 			displayUploadedImg(awsUrl);
// 		});

// 	}

// });