$(document).ready(function(){

	var burger = $('.burger');
    var mobNav = $('#top_nav');

    burger.on('click', function(){
        
        //hasClass
        if(mobNav.hasClass('menu_open')){
        	mobNav.removeClass('menu_open');
        	mobNav.slideUp();
        }else{
        	mobNav.addClass('menu_open');
        	mobNav.slideDown();
        }

    });

    // Scroll fix

    var scorePos = $('.website-summary > h3').offset().top;
    var websiteSummary = $('.website-summary');

    $(document).on('scroll', function(){

        var currentPos = $(document).scrollTop();

        if(currentPos > scorePos-90){
            websiteSummary.addClass('ws-fixed');
        }else{
            websiteSummary.removeClass('ws-fixed');
        }

    });

    // Get More Clients PopUp

    var modal = $('.su_modal');
    var btnDemo = $('.btn-demo');
    var xBtn = $('.popdownx');
    var btnPhone = $('.btnPhone');
    var btnEmail = $('.btnEmail');
    var phoneBox = $('.phoneBox');
    var emailBox = $('.emailBox');
    var inputPhone = $('.phoneBox input');
    var inputEmail = $('.emailBox input');
    var inputName = $('#q_name');
    var sendBtn = $('#send_request');
    var spin = $('.spin');
    var errorMsg = $('.errorMsg');

    btnDemo.on('click', function(e){

        e.preventDefault();

        modal.show();

    });

    modal.on('click', function(e){

        if($(e.target).is('.box') || $(e.target).is('.btn') || $(e.target).is('input') || $(e.target).is('p')){
            e.preventDefault();
            return;
        }

        $(this).hide();

    });

    btnPhone.on('click', function(){

        btnEmail.removeClass('selected_btn');
        btnPhone.addClass('selected_btn');

        emailBox.hide(200);
        phoneBox.show(200);

    });

    btnEmail.on('click', function(){

        btnPhone.removeClass('selected_btn');
        btnEmail.addClass('selected_btn');

        phoneBox.hide(200);
        emailBox.show(200);

    });

    sendBtn.on('click', function(){

        $('#q_name').removeClass('invalid');
        $('#q_phone').removeClass('invalid');
        $('#q_email').removeClass('invalid');

        var company = $(this).data('company');

        errorMsg.text('');

        var contactMethod = '';

        if(btnPhone.hasClass('selected_btn')){
            contactMethod = 'phone';
        }

        if(btnEmail.hasClass('selected_btn')){
            contactMethod = 'email';   
        }

        // phone
        if(contactMethod == 'phone'){

            if(inputName.val() == ''){

                inputName.addClass('invalid');
                errorMsg.text('Name required');

            }else if(inputPhone.val() == ''){

                inputPhone.addClass('invalid');
                errorMsg.text('Phone number required');

            }else{

                var name = inputName.val();
                var contactValue = inputPhone.val();

                sendForm(contactMethod, name, contactValue, company);

            }
        
        }

        // email
        if(contactMethod == 'email'){

            if(inputName.val() == ''){

                inputName.addClass('invalid');
                errorMsg.text('Name required');

            }else if(inputEmail.val() == ''){

                inputEmail.addClass('invalid');
                errorMsg.text('Email required');

            }else{

                var name = inputName.val();
                var contactValue = inputEmail.val();

                sendForm(contactMethod, name, contactValue, company);

            }

        }

    });

    function sendForm(contactMethod, name, contactValue, company){

        sendBtn.hide();
        spin.css('display', 'inline-block'); 

        $.ajax({
            url: '/admin/api/contact-request',
            type: 'POST',
            // dataType: 'json',
            data: {
                contactMethod: contactMethod,
                name: name, 
                contactValue: contactValue,
                company: company
            },
            success: function(data)
            {
                // console.log(data);
                if(data.success == '1'){
                    // redirect
                    window.location.href = "/thanks";
                }else{
                    spin.hide();
                    sendBtn.css('display', 'inline-block');
                    errorMsg.text(data.error);
                }
            },
            error: function(xhr, desc, err)
            {
                console.log(xhr, desc, err);
                spin.hide();
                sendBtn.css('display', 'inline-block');
                errorMsg.text('Something went wrong, please try again later');
            }
        });

    }

});