//var socket = io.connect('http://192.168.1.139:3000');
var socket = io.connect('http://172.20.17.139:3000');

function createTable(){
	mytable = $('<table></table>').attr({ id: "basicTable" });
	var rows = 20;
	var cols = 20;
	var tr = [];
	for (var i = 0; i < rows; i++) {
		var row = $('<tr></tr>').attr({ id: [i].join(' ') }).appendTo(mytable);
		for (var j = 0; j < cols; j++) {
			$('<td></td>').attr({ id: [j].join(' ') }).appendTo(row);
		}

	}
	mytable.appendTo("#snake");

}

$(document).ready(function(){
    createTable();
    $("#snake").hide();

    socket.on('topTen', function (data) {
        console.log(data.u);
        for(var i = 0; i < data.u.length; ++i){
            $("#ousers").append("<li>"+data.u[i]+" punts</li>");
        }
    });


//    $("#ou").hide();
    $("form").submit(function(){
        var user = $('#user').val();

        socket.emit('reg', {u: user});
        $("#formulari").hide();
        $("#snake").show();
//        $("#ou").show();
        return false;
    });

    socket.on('pinta', function (data) {
        $('tr:nth-of-type('+(data.u.oldPos.y + 1)+') td:nth-of-type('+(data.u.oldPos.x + 1)+')').css("background-color","black");
         $('tr:nth-of-type('+(data.u.pos.y + 1)+') td:nth-of-type('+(data.u.pos.x + 1)+')').css("background-color",data.u.color);
    });

    socket.on('online', function (data) {
        console.log('CLIENT -> dades rebudes del servidor->' + data.u.nom);
        $("#onusers").append("<li id='"+data.u.nom+"'>"+data.u.nom+"</li>").css("color",data.u.color);


        $(document).keydown(function(e) {
//            console.log(data.u.index);
            switch(e.which) {
                case 37: // left
                    socket.emit('ks', {u: data.u, d: "l"});
                break;

                case 38: // up
                    socket.emit('ks', {u: data.u, d: "u"});
                break;

                case 39: // right
                    socket.emit('ks', {u: data.u, d: "r"});
                break;

                case 40: // down
                    socket.emit('ks', {u: data.u, d: "d"});
                break;

                default: return; // exit this handler for other keys

            }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });



    });
    socket.on('pinta', function (data) {
//        console.log("OLD: "+data.u.oldPos.x+" "+data.u.oldPos.y);
//        console.log("NEW: "+data.u.pos.x+" "+data.u.pos.y);


        $('tr:nth-of-type('+(data.u.oldPos.y + 1)+') td:nth-of-type('+(data.u.oldPos.x + 1)+')').css("background-color","black");
     $('tr:nth-of-type('+(data.u.pos.y + 1)+') td:nth-of-type('+(data.u.pos.x + 1)+')').css("background-color",data.u.color);


    });

    socket.on('muerte', function (data) {
//        console.log("OLD: "+data.u.oldPos.x+" "+data.u.oldPos.y);
        console.log("muerte");

     $('tr:nth-of-type('+(data.u.pos.y + 1)+') td:nth-of-type('+(data.u.pos.x + 1)+')').css("background-color","black");


    });

    socket.on('pintaManzana', function (data) {
//        console.log("NEW: "+data.u.pos.x+" "+data.u.pos.y);


     //$('tr:nth-of-type('+(data.u.pos.y + 1)+') td:nth-of-type('+(data.u.pos.x + 1)+')').css("background-color","grey");

        $('tr:nth-of-type('+(data.u.pos.y + 1)+') td:nth-of-type('+(data.u.pos.x + 1)+')').append( "<i class='fa fa-apple'></i>");

    });

    socket.on('borraManzana', function (data) {
        console.log("borrar manzana");

        $('tr:nth-of-type('+(data.u.pos.y + 1)+') td:nth-of-type('+(data.u.pos.x + 1)+')').empty();

    });

    socket.on('enviarPunt', function (data) {
        console.log("borrar manzana");

        $("#"+data.u.nom).remove();
        $("#onusers").append("<li id='"+data.u.nom+"'>"+data.u.nom+" "+data.u.punt+"</li>");

    });

    socket.on('youDied', function (data) {
//        console.log("muerte");

        location.reload();

    });

    });


//        $( "li" ).remove();
//        var u = jQuery.parseJSON(data.u);
//        console.log('CLIENT -> dades rebudes del servidor->' + u[0].nom);
//
////
//        for(var user in u){
////          $("#ousers").append('<li>'+user.nom+'</li>');
////        }
////
//        var i=0;
//        do{
//
//            $("#ousers").append('<li>'+u[i].nom+'</li>');
//        }while(u[i].nom != undefined);
//
////        for(var user = 0; user< u.lenght; ++user){
////          $("#ousers").append('<li>'+u[user].nom+'</li>');
////        }






