let w = $( window ).width();
let h = $( window ).height();
let Server_name = "Rebel";
let Client = "Guest";
let ritardo = 0;
let flag = 0;
let i = 1;
let go = 0;

//font-size proportion 14px : 1280 = x : actualWidth opure 14 = log10(w) * k  se w = 1280 -> k = 14/log10(1280);
//let x = (14 * w) / 1280;
let k = 14 / Math.log10(1280);
let s = Math.log10(w) * k;
document.body.style.fontSize = s.toString()+"px";


//aggiorno la data ogni secondo
d = new Date();
$( "#date" ).text( d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear() + "\xa0" + d.getHours() + ":" + d.getMinutes());
setInterval(updateClock,1000);


//creo il primo nodo per la comunicazione e quelli successivi
let elem1 = createNode("elem1", "div", "#terminal", 12);
$( elem1 ).text("<" + Server_name + ">" + "..." +"\xa0\xa0");
showText(Messages.initialize, 0, elem1, 100, Messages.initialize.length);
ritardo = ritardo + 100 * Messages.initialize.length;


setTimeout(function(){
	let elem2 = createNode("elem2", "div", "#terminal", 12);
	$( elem2 ).text("<" + Server_name + ">" + "..." +"\xa0\xa0");
	showText(Messages.mex1, 0, elem2, 50, Messages.mex1.length);}, ritardo);
ritardo = ritardo + 50 * Messages.mex1.length;


setTimeout(function(){
	let elem3 = createNode("elem3", "div", "#terminal", 12);
	$( elem3 ).text("<" + Server_name + ">" + "..." +"\xa0\xa0");
	showText(Messages.mex2, 0, elem3, 50, Messages.mex2.length);}, ritardo);
ritardo = ritardo + 50 * Messages.mex2.length;


setTimeout(function(){
	let elem4 = createNode("elem4", "div", "#terminal", 12);
	$( elem4 ).text("<" + Server_name + ">" + "..." +"\xa0\xa0");
	showText(Messages.mex3, 0, elem4, 50, Messages.mex3.length);}, ritardo);
ritardo = ritardo + 50 * Messages.mex3.length;


setTimeout(function(){
		let elem5 = createNode("elem5", "div", "#terminal", 2);
		$( elem5 ).text("<" + Client + ">" + "..." +"\xa0\xa0");
		let elem6 = document.createElement("input");
		//elem6.rows=1; //se è una textarea invece che input
		elem6.type="text"
		elem6.className = "col-xs-"+ 10 + " " + " ";
		elem6.setAttribute("id", "elem6");
		$( elem6 ).insertAfter(elem5);
		elem6.focus();
}, ritardo);




//---------------------------------------
//---------------functions---------------
//---------------------------------------

function createNode(name, node, target, xsnumber){
	let elem = document.createElement(node);
	elem.className = "col-xs-"+ xsnumber + " " + name + " ";
	$( target ).append( elem );
	return elem;
}

function updateClock(){
	let today = new Date();
	let time = today.getHours() + ":" + today.getMinutes();

	$( "#date" ).text( today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear() + "\xa0" + time);
}

function showText(data, pos, target, speed, len){
	if ( pos < len ) {
		$( target ).append(data[pos]);
		setTimeout(function(){showText(data, pos+1, target, speed, len);},speed);
	}
}

function Interaction(name, node, target, xsnumber, speed, project, id, end){ //end-> 0 or 1 boolean
	let elem = createNode(name, node, target, xsnumber);
	elem.setAttribute("id", id);
	$( elem ).text("<" + Server_name + ">" + "..." +"\xa0\xa0");
	let last = Messages[Object.keys(Messages)[Object.keys(Messages).length-1]];
	showText(last, 0, elem, speed, last.length);
	ritardo = speed * last.length;
	setTimeout(function(){
		document.getElementById(id).innerHTML += project;}, ritardo);
	ritardo = ritardo + 1;
}




//--------------------------------------------
//---------------Event Handlers---------------
//--------------------------------------------


$(document).on('keydown','#elem6', function(event) {
	console.log(event.key);
    if (event.key == 'Enter' && $("#elem6").val().toLowerCase() == 'continue'){
  		$("#elem6").prop('readonly', true);
  		console.log("great success");
  		go = 1;
  		let str = "SuperProgetto";
  		let project = str.link("https://www.google.it");
  		Interaction("elem7","div", "#terminal", 12, 50, project + "premi ok","end",0);

  		setTimeout(function(){
  			let elem8 = createNode("elem8", "div", "#terminal",2);
  			$( elem8 ).text("<" + Client + ">" + "..." +"\xa0\xa0");
  			let elem9 = document.createElement("input");
  			elem9.type="text"
			elem9.className = "col-xs-"+ 10 + " " + " ";
			elem9.setAttribute("id", "elem9");
			$( elem9 ).insertAfter(elem8);
			elem9.focus();},ritardo);
  	}

});


$(document).on('keydown','#elem9', function(event) {
	console.log(event.key);
	if (event.key == 'Enter' &&  $("#elem9").val()!= undefined && $("#elem9").val().toLowerCase() == 'ok'){

  		$("#elem9").prop('readonly', true);
  		console.log("great success");
  		go = 1;
  		let str = "SuperProgetto";
  		let project = str.link("https://www.google.it");
  		Interaction("elem10","div", "#terminal", 12, 50, project, 1);
  	}
});

$( window ).resize(function() {
  w = $( window ).width();
  h = $( window ).height();

  //x = (14 * w) / 1280;
  s = Math.log10(w) * k;
  document.body.style.fontSize = s.toString()+"px";
});