jQuery(function($){
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: '<Préc',
		nextText: 'Suiv>',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
		'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
		monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
		'Jul','Aou','Sep','Oct','Nov','Dec'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'DD, d MM, yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: '',
		numberOfMonths: 1,
		showButtonPanel: true,
		showAnim: 'fold',
		showOn: "button",
      buttonImage: "../css/images/calendar.gif",
      buttonImageOnly: true,
      buttonText: "Select date",
	yearRange: '-100:+0',
		changeMonth: true,
		changeYear: true,
		};
	$.datepicker.setDefaults($.datepicker.regional['fr']);
	
});//fin datepicker regional


 /***********************************************************************************************************/

 
$(function(){ 

$( "#datepicker" ).datepicker();
 
 /***********************************************************************************************************/
	
	
	var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
	
	
    /*$( "#tags" ).autocomplete({
      source: availableTags
    });*/
	
	$( "#tags" ).autocomplete({
  source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( availableTags, function( item ){
              return matcher.test( item );
          }) );
      }
});//on cherche que à partir de la premiere lettre, si on veut toutes les lettres des noms etc il faut enlever ce morceaux de codes
	
	
/*******************************************************************************************/
	
		$.ajax(  {
		
		url:'./json/cities.json',
		method:"GET",
		dataType:"json",
		success:function(monObjet){
			
			
			
			
			//console.log(monObjet);
			var i = 0;
			
			var villes = [];
			//villes.push("brux");
			
			for(i=0; i<monObjet.length; i++)
				
				
				{
					
					var obj = {};
				
				
				obj["value"] = monObjet[i].zip;
				obj["label"] = monObjet[i].zip+" "+monObjet[i].name;
				obj["ville"] = monObjet[i].name;

			villes.push(obj);
					
				}//for
			
			console.log(villes);
			
			$("#cp").autocomplete({
				source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( villes, function( item ){
              return matcher.test( item.label );
          }) );
      }
,
				minLength:1,
				
	select: function(event, ui){
		
		
		$("#ville").val(ui.item.ville);
	}
			});
			
			
			
		
			
			
			
		}//success function
		
		
		
		
		
		
	});//ajax
	
	
	
 /***********************************************************************************************************/	
	
	

	// INSCRIPTION //
$('#inscription').validetta({
  onValid : function( event ) {
    event.preventDefault(); // Will prevent the submission of the form
   
   //alert( 'Nice, Form is valid.' );
 
 // ici faire la requête ajax
 
	  
	  
	  var email = $("#email").val();
      var nom = $("#nom").val();
      var prenom = $("#prenom").val();
      var chiffre = $("#cp").val();
      var commune = $("#ville").val();
      var date = $("#datepicker").val();
	  
	$.ajax({
		// 1) on définit le fichier vers lequel on envoye la requête POST
		url: 'php.php',
		// 2/ on spécifie la méthode  
		type:'POST',
		// 3) on définit les variables POST qui sont ennvoyées au fichier .php
		data : email,
        
		 // 4) format de retour du fichier php dans "data"
		dataType: 'html',
		// 5) fonction à effectuer en cas de succès
		success : function(data){
			//$("#form").hide; si on veut faire disparaitre le formulaire
			$("#contenu").html(data);
			
		}//success
		
		
		
		
		
	})  //ajax fonction
	  
	  
	  
	  
	  
	  
	  
 
 }, // valid
  onError : function( event ){
    //alert( 'Stop bro !! There are some errors.');
  
  
  }, // error
  
  
  display : 'bubble',//position de la bulle d'erreur
  errorClass : 'validetta-error',
  /** Same for valid validation */
  validClass : 'validetta-valid', // Same for valid validation
  bubblePosition: 'right', // Bubble position // right / bottom
  bubbleGapLeft: 15, // Right gap of bubble (px unit)
  bubbleGapTop: 0, // Top gap of bubble (px unit)
  /* To enable real-time form control, set this option true. */
  realTime : true
  
});//validetta	
	
// CONNECTION //
$('#connection').validetta({
  onValid : function( event ) {
    event.preventDefault(); // Will prevent the submission of the form
   
   //alert( 'Nice, Form is valid.' );
 
 // ici faire la requête ajax
 
	  
	  
	 var email = $("#identifiant").val();
	  
	$.ajax({
		// 1) on définit le fichier vers lequel on envoye la requête POST
		url: 'php.php',
		// 2/ on spécifie la méthode  
		type:'POST',
		// 3) on définit les variables POST qui sont ennvoyées au fichier .php
		data : email,
		 // 4) format de retour du fichier php dans "data"
		dataType: 'html',
		// 5) fonction à effectuer en cas de succès
		success : function(data){
		//$("#form").hide; si on veut faire disparaitre le formulaire
		$("#contenu2").html(data);
			
		}//success
		
		
		
		
		
	});  //ajax fonction
	  
	  
	  
	  
	  
	  
	  
 
 }, // valid
  onError : function( event ){
    //alert( 'Stop bro !! There are some errors.');
  
  
  }, // error
  
  
  display : 'bubble',//position de la bulle d'erreur
  errorClass : 'validetta-error',
  /** Same for valid validation */
  validClass : 'validetta-valid', // Same for valid validation
  bubblePosition: 'right', // Bubble position // right / bottom
  bubbleGapLeft: 15, // Right gap of bubble (px unit)
  bubbleGapTop: 0, // Top gap of bubble (px unit)
  /* To enable real-time form control, set this option true. */
  realTime : true
  
});//validetta	
		
	
	
	
	
/*	CACHER LE MDP*/
	

	
/*	CACHER LE MDP*/
	
/*SLIDE FORM*/
	
	  $('#goRight').on('click', function(){
    $('#slideBox').animate({
      'marginLeft' : '0'
    });
    $('.topLayer').animate({
      'marginLeft' : '100%'
    });
  });
  $('#goLeft').on('click', function(){
    $('#slideBox').animate({
      'marginLeft' : '50%'
    });
    $('.topLayer').animate({
      'marginLeft': '0'
    });
  });
	
/*SLIDE FORM*/
	
	
	
	
/*ANIMATE INPUT*/
	
	$(".ly-input").focus(function(){
  $(this).parent().addClass("is-active is-completed");
});

$(".ly-input").focusout(function(){
  if($(this).val() === "")
    $(this).parent().removeClass("is-completed");
  $(this).parent().removeClass("is-active");
});


/*ANIMATE INPUT*/







 });//ready