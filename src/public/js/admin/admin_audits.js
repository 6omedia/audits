
const addUrl = '/admin/api/add_audit';
const updateUrl = '/admin/api/update_audit';

const formInfo = {
	sendBtn: $('#send_btn'),
	updateBtn: $('#update_btn'),
	errorBox: $('#error_box'),
	successBox: $('#successBox'),
	spinImg: $('#spin'),
	requiredFeilds: [
		{
			feildName: 'company name',
			elem: $('#q_company'),
			value: '',
			error: 'Comapany name required',
			required: true
		},
		{
			feildName: 'company slug',
			elem: $('#q_slug'),
			value: '',
			error: 'slug required',
			required: true
		},
		{
			feildName: 'company website',
			elem: $('#q_website'),
			value: '',
			error: 'Website required',
			required: true
		},
		{
			feildName: 'Featured Image',
			elem: $('#featImg_container img'),
			value: '',
			required: false
		},
		{
			feildName: 'Postcode',
			elem: $('#q_postcode'),
			value: '',
			error: 'Postcode Required',
			required: true
		}
	]
}

const auditForm = new Form(formInfo);

const auditManager = new PostManager(addUrl, updateUrl, 'Audit', auditForm, '', function(){

	const user_id = $('#datablock').data('userid');
	const user_name = $('#datablock').data('username');
	const postid = $('#datablock').data('postid');

	let feat_img = '';
	
	if($('#featImg_container img').attr('src') != undefined){
		feat_img = $('#featImg_container img').attr('src');
	}

	let paList = [];

	$('#practiceAreaList li').each(function(){
		paList.push($(this).find('p').text());
	});

	let tests = [];

	$('table tr').each(function(){
		if($(this).find('.tableCb').find('input').is(':checked')){
			tests.push('checked');
		}else{
			tests.push('');
		}
	});	

	const ajaxDataObj = {
		create: {
			company_name: auditForm.requiredFeilds[0].value,
            company_slug: auditForm.requiredFeilds[1].value,
			company_website: auditForm.requiredFeilds[2].value,
			postcode: auditForm.requiredFeilds[4].value,
			practice_areas: JSON.stringify(paList),
			screenshot: feat_img,
			tests: JSON.stringify(tests)
		},
		update: {
			company_name: auditForm.requiredFeilds[0].value,
			company_slug: auditForm.requiredFeilds[1].value,
			company_website: auditForm.requiredFeilds[2].value,
			postcode: auditForm.requiredFeilds[4].value,
			practice_areas: JSON.stringify(paList),
			screenshot: feat_img,
			tests: JSON.stringify(tests),
			postid: postid
		}
	}

	return ajaxDataObj;

});

function displayUploadedImg(imgLink){

	const imgTag = '<img src="' + imgLink + '">';
	$('#featImg_container').append(imgTag);
	$('#featImg_container > p').remove();
	$('#upload_box').hide();

}

const imgUploader = new ImageUploader($('#upload-input'), $('#upload_btn'), $('#feat_img_prog'), 'posts', useAws);

imgUploader.fileInput.on('click', function(){
	imgUploader.resetProgress();
});

imgUploader.uploadBtn.on('click', function(){

	if(imgUploader.awsObj == false){

		imgUploader.uploadLocalFiles(function(data){
			displayUploadedImg('/static/uploads/posts/' + data.filename);
		});

	}else{

		imgUploader.uploadFile(function(awsUrl, filename){
			displayUploadedImg(awsUrl);
		});

	}

});

$('#remove_img').on('click', function(){
	$(this).next().remove();
	$('#upload_box').show();
	imgUploader.resetProgress();
	$('#upload-input').val('');
});

$('#q_company').on('blur', function(){
	const slug = slugify($(this).val(), '-');
	$('#q_slug').val(slug);
});
    
// $('#q_slug').on('blur', function(){
// 	const slug = slugify($('#q_slug').val(), '-');
// 	$('#q_slug').val(slug);
// });



// // Content Type Toggle

// $('#cb_toggle').on('click', function(){

// 	if($(this).prop('checked')){
// 		$('#q_content').summernote('destroy');
// 		$('#q_content').hide();
// 		$('#cb').show();
// 	}else{
// 		$('#q_content').summernote({
// 	    	height: 300
// 	    });
// 	    $('#cb').hide();
// 	}

// });

// $('.contentBlock .remove').on('click', function(){
// 	$(this).parent().parent().remove();
// });

// $('.htmlEdit').keydown(function (e){
//     var keycode1 = (e.keyCode ? e.keyCode : e.which);
//     if (keycode1 == 0 || keycode1 == 9) {
//         e.preventDefault();
//         e.stopPropagation();
//     }
// });

// const controls = new CbControls($('#content_block_list'), $('.post_section_menu'), useAws);

// const types = [
// 	'Plain Text',
// 	'HTML',
// 	'Image',
// 	'Video'
// ];

// controls.createButtons(types);

// // Categories...

// const catsInfo = {
// 	sendBtn: $('#add_cat'),
// 	updateBtn: $('#update_cat'),
// 	errorBox: $('#cats_err'),
// 	successBox: $('#cats_success'),
// 	spinImg: $('#cats_spin'),
// 	requiredFeilds: [
// 		{
// 			feildName: 'Category title',
// 			elem: $('#q_catname'),
// 			value: '',
// 			error: 'Title required',
// 			required: true
// 		},
// 		{
// 			feildName: 'Category Description',
// 			elem: $('#q_cat_description'),
// 			value: '',
// 			required: false
// 		},
// 		{
// 			feildName: 'Category Parent',
// 			elem: $('#q_cat_parent'),
// 			value: '',
// 			required: false
// 		}
// 	]
// }

// const categoryForm = new Form(catsInfo);
// const category = new Taxonomy('Categories', categoryForm, $('#category_list'));

$('#addpa').on('click', function(){

	const practiceArea = $('#practiceAreaSelect').val();

	$('#practiceAreaList').append(`
		<li>
			<span>x</span>
			<p>${practiceArea}</p>
		</li>
	`);

});

$('#practiceAreaList').on('click', 'span', function(){
	$(this).parent().remove();
});