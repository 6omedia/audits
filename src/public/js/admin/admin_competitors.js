const addUrl = '/admin/api/add_competitor';
const updateUrl = '/admin/api/update_competitor';

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
			feildName: 'company website',
			elem: $('#q_website'),
			value: '',
			error: 'Website required',
			required: true
		}
	]
}

const competitorForm = new Form(formInfo);

const competitorManager = new PostManager(addUrl, updateUrl, 'Competitor', competitorForm, '', function(){

	const user_id = $('#datablock').data('userid');
	const user_name = $('#datablock').data('username');
	const postid = $('#datablock').data('postid');

	// let kwList = [];

	// $('#keywordList li').each(function(){
	// 	kwList.push($(this).find('p').text());
	// });

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
			company_name: competitorForm.requiredFeilds[0].value,
			company_website: competitorForm.requiredFeilds[1].value,
			practice_areas: JSON.stringify(paList),
			tests: JSON.stringify(tests),
			score: $('#score').text()
		},
		update: {
			company_name: competitorForm.requiredFeilds[0].value,
			company_website: competitorForm.requiredFeilds[1].value,
			practice_areas: JSON.stringify(paList),
			tests: JSON.stringify(tests),
			score: $('#score').text(),
			postid: postid
		}
	}

	return ajaxDataObj;

});







function calculateScore(){

	let score = 0;

	$('.tableCb input').each(function(){
		if($(this).is(':checked')){
			score = score + 5;
		}
	});

	return score;

}

// $('#addpa').on('click', function(){

// 	const keyword = $('#keywordInput').val();

// 	$('#keywordList').append(`
// 		<li>
// 			<span>x</span>
// 			<p>${keyword}</p>
// 		</li>
// 	`);

// });

// $('#keywordList').on('click', 'span', function(){
// 	$(this).parent().remove();
// });


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

$('.tableCb input').on('change', function(){

	$('#score').html(calculateScore()); 

});
