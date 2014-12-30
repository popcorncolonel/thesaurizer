$(document).ready(function(){
	$("#resultdisplay").hide();
});

oldtext = '';

function postSuccess(newtext){
	$("#inputform").hide();
	$("#resultdisplay").show();
	$("#oldtext").html(oldtext);
	$("#newtext").html(newtext);
}

$("#sendtext").click(function(){
    console.log('gettin clicked');
	oldtext = $("#textbox").val();
	if (oldtext === '') { // todo: don't let them enter code that will crash us 4ever
		alert("Not gonna thesaurize nothing");
	} else {
		$.post("/convert", {text: oldtext}, postSuccess, "text");
	}
});

$("#sendtext").click(function(){
    console.log('gettin clicked');
	oldtext = $("#textbox").val();
	$.post("/convert", {text: oldtext}, postSuccess, "text");
});

$("#restart").click(function(){
    $("#resultdisplay").hide();
    $("#inputform").show();
	oldtext = '';
});

$("#retry").click(function(){
	if (oldtext === '') { // todo: don't let them enter code that will crash us 4ever
		alert("Not gonna thesaurize nothing");
	} else {
		$.post("/convert", {text: oldtext}, postSuccess, "text");
	}
});