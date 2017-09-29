
var tblx = $('.tbl_x');

tblx.on('click', function(){

	var leadId = $(this).parent().parent().data('leadid');

	var popup = new Popup(
		function(){

			var thisPopup = this;

			removeLead(leadId, function(leads){
				reloadLeads(leads);
				thisPopup.popDown();
			});

		},
		function(){
			this.popDown();
		}
	);

	popup.popUp('Are you sure you want to delete this lead?');

}); 

function removeLead(leadId, callback){

	$.ajax({
		url: '/admin/api/remove-lead',
		type: 'POST',
		// dataType: 'json',
		data:
		{
			leadId: leadId
		},
		success: function(data)
		{
			if(data.success == '1'){
				callback(data.leads);
			}else{
				console.log('nope');
			}
		},
		error: function(xhr, desc, err)
		{
			console.log(xhr, desc, err);
		}
	});

};

function reloadLeads(leads){

	var table = $('#leads_table');	

	var string = '';

	for(i=0; i<leads.length; i++){

		string += '<tr>';
		string += '<td>' + leads[i].company + '</td>';
		string += '<td>' + leads[i].date + '</td>';
		string += '<td>' + leads[i].view_count + '</td>';
		string += '<td>' + leads[i].duration + '</td>';
		string += '<td>'; 

		if(leads[i].contact){
			string += 'Yes'; 
		}else{
			string += 'No'; 
		}

		string += '</td>';
		string += '<td>' + leads[i].name + '</td>'; 
		string += '<td>' + leads[i].contact_method + '</td>';
		string += '<td>' + leads[i].contact_value + '</td>';
		string += '<td><span class="' + leads[i]._id + '"></span></td>';
		string += '</tr>';

	}

	$("#leads_table tr:gt(0)").remove();
	table.append(string);

}