let next_Sequence = 0;
$('#myModal').on('hidden.bs.modal', function (e) {
	let w = $( window ).width();
	let h = $( window ).height();
	let Server_name = "Server";
	let Client = "Guest";
	let ritardo = 0;
	let retard;
	let max_initial = 4;
	let max_final = 6;
	let i = 2; // perchè Tex.json ha prima initialize e info, quindi inizio da Object.values(Messages)[2] ivece che Object.values(Messages)[0]
	let authentication = "";
	let constant = 500;
	

	window.parent.postMessage("prova riuscita",'*');
	//console.log(parent.document.title);

	//font-size proportion 14px : 1280 = x : actualWidth opure 14 = log10(w) * k  se w = 1280 -> k = 14/log10(1280);
	//let x = (14 * w) / 1280; //14 per font matrix, cercare altro numero per altri font
	//provare 18 oppure 22
	let k = 22 / Math.log10(1280);
	let s = Math.log10(w) * k;
	document.body.style.fontSize = s.toString()+"px";


	//aggiorno la data ogni secondo
	let today = new Date();
	$( "#date" ).text( today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear() + "\xa0" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
	setInterval(updateClock,1000);


	//creo il primo nodo per la comunicazione e quelli successivi
	authentication = "<" + Server_name + ">" + "..." +"\xa0\xa0";

	//intro levare i commenti se serve
	/*let elem1 = domManagement("elem1", "div", "#terminal", "col-xs-12", authentication, Messages.initialize, 0, 100);
	ritardo = ritardo + 100 * Messages.initialize.length;*/

	//spiegazione
	setTimeout(function(){
		let elem2 = domManagement("elem2", "div", "#terminal", "col-xs-12", authentication, Messages.mex1, 0, 50);
		i++;}, ritardo);
	ritardo = ritardo + 50 * Messages.mex1.length+constant;


	setTimeout(function(){
		let elem3 = domManagement("elem3", "div", "#terminal", "col-xs-12", authentication, Messages.mex2, 0, 50);
		i++;}, ritardo);
	ritardo = ritardo + 50 * Messages.mex2.length+constant;


	setTimeout(function(){
		let elem4 = domManagement("elem4", "div", "#terminal", "col-xs-12", authentication, Messages.mex3, 0, 50);
		i++;}, ritardo);
	ritardo = ritardo + 50 * Messages.mex3.length+constant;


	setTimeout(function(){
		let elem5 = domManagement("elem5", "div", "#terminal", "col-xs-12", authentication, Messages.mex4, 0, 50);
		i++;}, ritardo);
	ritardo = ritardo + 50 * Messages.mex4.length+constant*2;


	setTimeout(function(){
		let elem6 = domManagement("elem6", "div", "#terminal", "col-xs-12", authentication, Messages.mex5, 0, 50);
		i++;}, ritardo);
	ritardo = ritardo + 50 * Messages.mex5.length+constant;




	// k va da 1 perchè k = è l'intro
	// se l'intro non c'è inizializzare a k = 0 
	/*let idex = 0;
	for ( index = 1; index < max_initial; index++){
		setTimeout(function(){
			let elem = domManagement("elem" + index, "div", "#terminal", "col-xs-12", authentication, Messages["mex" + index], 0, 50);
			i++;}, ritardo);
		ritardo = ritardo + 50 * Messages["mex" + index].length;
	}*/

	setTimeout(function(){
		authentication = "<" + Client + ">" + "..." +"\xa0\xa0";
		let elem7 = domManagement("elem7", "div", "#terminal", "col-xs-3 col-sm-1 ", authentication, 0, 0, 50);
		let elem8 = domManagement("elem8", "input", elem7, "col-xs-9 col-sm-11 " , 0, 0, 0, 0, "elem8");
		elem8.type="text";
		$(elem8).attr('autocomplete', 'off');
		elem8.focus();
	}, ritardo);




	//---------------------------------------
	//---------------functions---------------
	//---------------------------------------

	function createNode(name, node, target, nameClass){
		let elem = document.createElement(node);
		elem.className = nameClass + " " + name + " ";

		if (node == 'input')
			$( elem ).insertAfter( target );
		else
			$( target ).append( elem );
		
		return elem;
	}

	function updateClock(){
		today = new Date();
		let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		$( "#date" ).text( today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear() + "\xa0" + time);
	}

	function showText(data, pos, target, speed, len){
		if ( pos < len ) {
			$( target ).append(data[pos]);
			setTimeout(function(){showText(data, pos+1, target, speed, len);},speed);
		}
	}


	//aggiungere la possibilità di inserire anche input e di ritornare uno o più elementi
	function domManagement(name, node, target, nameClass, auth, data, pos, speed, id = 0){
		let elem = createNode(name, node, target, nameClass);
		
		if (auth != 0)
			$( elem ).text(auth);
		
		if (data != 0)
			showText(data, pos, elem, speed, data.length);
		
		if (id != 0)
			elem.setAttribute("id", id);

		return elem;
	}

	function startQuiz(){
	  	//alert("yolo");
	  	KlyntAPI.commands.openSequence(next_Sequence);
	  	//KlyntAPI.commands.openSequence("159CE1D0-9532-B4C5-C0CF-F0E7CE9BFB98");

	}


	//--------------------------------------------
	//---------------Event Handlers---------------
	//--------------------------------------------

	$(document).on('keydown',$('input').last()[0], function(event) {
		console.log(event.key);
	//stare attenti a quando serve [0] oppure no
		if (event.key == 'Enter' && $('input').last().val().trim().toLowerCase() == 'continua' && $('input').last()[0].readOnly == false){
			if (i <= max_final-1){
				$('input').last().prop('readonly', true);
	  			console.log("great success");
	  			/*let str = "SuperProgetto";
	  			let project = str.link("https://www.google.it");*/
	  			authentication = "<" + Server_name + ">" + "..." +"\xa0\xa0";
	  			let elem = domManagement("elem", 'div', "#terminal", "col-xs-12", authentication, Object.values(Messages)[i], 0, 50);
	  			ritardo = 50 * Object.values(Messages)[i].length;
	  			
	  			if (i != NaN){
	  				setTimeout(function() {
	  					authentication = "<" + Client + ">" + "..." +"\xa0\xa0";
	  					//same name because local variables get priority over global with same names
	  					let elem = domManagement("elem", "div", "#terminal", "col-xs-2", authentication, 0, 0, 50);
	  					let input = domManagement("elem", "input", elem, "col-xs-"+ 10 + " " + " ", 0, 0, 0, 0);
	  					input.type="text";
						input.focus();
	  					i++;},ritardo);
	  			}

	  		}

	  		else{
	  			console.log("messaggi terminati");
	  			startQuiz();
	  		}


		}

		//nel caso l'utente voglia informazioni, levare i commenti se serve
		/*if (event.key == 'Enter' && $('input').last().val().toLowerCase() == 'info' && $('input').last()[0].readOnly == false){
			$('input').last().prop('readonly', true);
	  		console.log("great success");
	  		authentication = "<" + Server_name + ">" + "..." +"\xa0\xa0";
	  		let elem = domManagement("elem", 'div', "#terminal", "col-xs-12", authentication, Messages.info, 0, 0);
	  		ritardo = 10 * Messages.info.length; //10 costante empirica (sperimentale)

	  		setTimeout(function(){
	  			authentication = "<" + Client + ">" + "..." +"\xa0\xa0";
	  			//same name because local variables get priority over global with same names
	 			let elem = domManagement("elem", "div", "#terminal", "col-xs-2", authentication, 0, 0, 50);
	  			let input = domManagement("elem", "input", elem, "col-xs-"+ 10 + " " + " ", 0, 0, 0, 0);
	  			input.type="text";
				input.focus();  
	  		},ritardo);

		}*/	
	});


	window.addEventListener("message", receiveMessage, false);

		function receiveMessage(event)
		{
			if (event.source == window.parent){
			next_Sequence = (event.data).toString();
			console.log(next_Sequence);
		}	
}


	$( window ).resize(function() {
	  w = $( window ).width();
	  h = $( window ).height();

	  //x = (14 * w) / 1280;
	  s = Math.log10(w) * k;
	  document.body.style.fontSize = s.toString()+"px";
	});
})