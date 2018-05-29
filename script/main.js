$(document).ready(function(){
   $(".hide").css({
       width:$("html").width(),
       height:$("html").height()
   });

    $( 'textarea.editor' ).ckeditor();

    $('.exit').click(function(){
        $('.hide').toggle();
    })

   $("#addGame").click(function(){
       $("#game").css({"display":"block"});
       $("#new").css({"display":"none"});
       $(this).toggleClass('open');
   })

   $("#addNew").click(function(){
        $("#new").css({"display":"block"});
        $("#game").css({"display":"none"});
    })
    $(".plusGame").click(function(){
        $(".hide").css({"display":"block"});
        $("#game").css({"display":"block"});
        $("#new").css({"display":"none"});
    })

    $(".plusNew").click(function(){
        $(".hide").css({"display":"block"});
        $("#new").css({"display":"block"});
        $("#game").css({"display":"none"});
    })

    $('#gameUploadImg').click(function(){
        $("#gameFile").click();
    })

    $('#newsUploadImg').click(function(){
        $("#newsFile").click();
    })

    $('.edit').click(function(){
        $(".hide").css({"display":"block"});
        $("#game").css({"display":"none"});
        $("#new").css({"display":"block"});
        $("#newsAdd").css({"display":"none"});
        $("#newsUpdate").css({"display":"block"});
        getNews(this);
    });

    $('#gameAdd').click(function(){
        var gameDescr = $('#gameDescr').val();
        var linkStore = $('#linkStore').val();
        var file = $('#gameFile')[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            $.ajax({
                url:'/gameAdd',
                type:'POST',
                data:{
                    gameDescr:gameDescr,
                    linkStore:linkStore,
                    gameImageName:file.name,
                    data:reader.result
                }
            }).done(function(res){
                if(res)
                    location.reload();
            }).fail(function(err){
                console.log(err);
            });
        }
    });

    $('#newsAdd').click(function(){
        var newsContent = $('#newsContent').val();
        var newsLowContent = $('#newsLowContent').val();
        var file = $('#newsFile')[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            $.ajax({
                url:'/newsAdd',
                type:'POST"',
                data:{
                    newsContent:newsContent,
                    newsLowContent:newsLowContent,
                    newsImgName:file.name,
                    data:reader.result
                }
            }).done(function(res){
                if(res)
                    console.log(res);
            }).fail(function(err){
                console.log(err);
            });
        }
    });

    function getNews(arg){
        var id = $(arg).attr('data-id');
        $('#newsUpdate').attr('data-id',id);
        $.ajax({
            url:'/getOneNews',
            type:'POST',
            data:{id:id}
        }).done(function(res){
            var editor = $('.editor').val();
            if(res){
                $('.editor').val(res.result.news);
                $('#newsLowContent').val(res.result.lowContent);
            }
        }).fail(function(err){
            console.log(err);
        });
    }

    $('#newsUpdate').click(function(){
        var id = $(this).attr('data-id');
        var newsContent = $('#newsContent').val();
        var newsLowContent = $('#newsLowContent').val();
        var file = $('#newsFile')[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            $.ajax({
                url:'/newsUpdate',
                type:'POST',
                data:{
                    id:id,
                    newsContent:newsContent,
                    newsLowContent:newsLowContent,
                    newsImgName:file.name,
                    data:reader.result

                }
            }).done(function(res){
                if(res)
                    location.reload();
            }).fail(function(err){
                console.log(err);
            });
        }
    })

    $('.page').click(function(){
        var page = $(this).attr('data-id');
        console.log(page);
    })

    if(location.pathname == "/login"){
        $('#log').click(sendLogin);
        if(keypress == 13){
            sendLogin();
        }
    }

    function sendLogin(){
        if($(login) && $(password)){
            var username = $('#login').val();
            var password = $('#password').val();
            $.ajax({
                url:'/login',
                type:'POST',
                data:{
                    username:username,
                    password:password
                }
            }).done(function(res){
                if(res)
                   document.location='/';
            }).fail(function(err){
                console.log(err);
            });    
        }
    }
    $('.logOut').click(function(){
        $.ajax({
            url:'/logout',
            type:'POST'
        }).done(function(res){
            if(res)
                location.reload();
        }).fail(function(err){
            alert('Server erorr');
        })
    })
});