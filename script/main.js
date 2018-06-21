$(document).ready(function(){
    $('#hui').remove();
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

    

    $('.editGame').click(function(){
        $(".hide").css({"display":"block"});
        $("#game").css({"display":"block"});
        $("#new").css({"display":"none"});
        $("#gameAdd").css({"display":"none"});
        getGame(this);
    });

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
        var file = $('#newsFile')[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            $.ajax({
                url:'/newsAdd',
                type:'POST',
                data:{
                    newsContent: $('#newsContent').val(),
                    newsLowContent: $('#newsLowContent').val(),
                    newsTitle: $('#newsTitle').val(),
                    newsImgName:file.name,
                    date:formatDate(),
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

    function getGame(arg){
        var id = $(arg).attr('data-id');
        $('#gameUpdate').attr('data-id',id);
        $.ajax({
            url:'/getOneGame',
            type:'POST',
            data:{id:id}
        }).done(function(res){
            var editor = $('#gameDescr').val();
            if(res){
                $('#gameDescr').val(res.descr);
                $('#linkStore').val(res.link);
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

    $('#gameUpdate').click(function(){
        var id = $(this).attr('data-id');
        console.log(id)
        var file = $('#gameFile')[0].files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function(){
            $.ajax({
                url:'/gameUpdate',
                type:'POST',
                data:{
                    id:id,
                    descr:$('#gameDescr').val(),
                    link:$('#linkStore').val(),
                    gamesImgName:file.name,
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

        $("#password").keyup(function(event){
            if(event.keyCode == 13){
                sendLogin();
            }
        });
    }
    $(".btn.del").click(function(){
        var id = $(this).attr('data-id');
        $.ajax({
            url:'/newsDell',
            type:'POST',
            data:{id:id}
        }).done(function(res){
            if(res)
                document.location='/news';
        }).fail(function(err){
            alert("Server error");
        })
    })

    $('.btn.dellGame').click(function(){
        var id = $(this).attr('data-id');
        $.ajax({
            url:'/gameDell',
            type:'POST',
            data:{
                id:id
            }
        }).done(function(res){
            if(res)
                location.reload();
        })
    })

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

    $('.bayan').click(function(){
        $('.menu').find('a').toggleClass("show");
    })

    function formatDate() {
        var date = new Date();
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        var yy = date.getFullYear() % 100;
        yy = '20' + yy;
        return  time = dd + '.' + mm + '.' + yy;
      }
});


