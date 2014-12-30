$(document).ready(function(){
	$("resultdisplay").hide();
});

oldtext = '';

function postSuccess(newtext){
	$("#resultdisplay").show();
	$("#oldtext").html(oldtext);
	$("#newtext").html(newtext);
}

$("#sendtext").click(function(){
    console.log('gettin clicked');
	oldtext = $("#textbox").val();
	$.post("/convert", {text: oldtext}, postSuccess, "text");
});

$("#sendtext").click(function(){
    console.log('gettin clicked');
	oldtext = $("#textbox").val();
	$.post("/convert", {text: oldtext}, postSuccess, "text");
});