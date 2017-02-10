"use strict";


var fushat = document.querySelectorAll( "input[type=text]" ); /// ruan gjithe fushat e dokumentit.

var checkboxet = document.querySelectorAll( ".cb" ); /// gjithe checkboxet e dokumentit.

var fushatAktive = []; /// fushat qe kane checkboxin e perzgjedhur.

var gabim = false; /// nese ka gabime apo jo.

var mesazhGabimi = ""; /// mesazhi qe do te shfaqet nese ka gabim.

var n = 0; /// numeron klikimet per te ngrire ose jo butonat.


/// pastron checkboxet, fushat e tekstit dhe fushen e mesazhit pas nje ngjarjeje te caktuar
function pastro()
{
	for( var i = 1; i <= LENDET.length; i++ )
	{
		var tmp1 = document.getElementById( "fusha" + i );

		tmp1.value = " ";

		tmp1.style.visibility = "hidden";
	}

	var tmp2 = document.querySelectorAll( ".cb" );

	for( var j = 0; j < tmp2.length; j++ )
		tmp2[ j ].checked = false;


	var x = document.querySelectorAll( "button" );
		for( var mn = 0; mn < x.length; mn++ )
			x[ mn ].disabled = true;


	document.getElementById( "pergjigja" ).innerHTML = "";
} /// FUND pastro



/// pastrimi i tabelave kur jepet reload faqes
addEventListener( "load", pastro );



/// kthen pozicionin e nje vlere ne vektor.
function kerko( vektor, vlera )
{
	for( var i = 0; i < vektor.length; i++ )
		if( vektor[ i ] == vlera )
			return i;

		return null;
}
			
		
/// Funksion ndihmes qe heq nje element ne pozicionin e percaktura te vektorit
function remove( array, index )
{
	return array.slice( 0, index ) + array.slice( index + 1, array.length );
}



/// shton degjuesin e ngjarjes te gjithe checkboxeve te dokumentit
for( var i = 0; i < checkboxet.length; i++ )
	checkboxet[ i ].addEventListener( "change", function( event )
	{	

		for( var l = 0; l < checkboxet.length; l++ )
			if( event.target == checkboxet[ l ]  )
			{	

				var fusha = document.getElementById( "fusha" + ( l + 1 ) );

				if( checkboxet[ l ].checked )
				{	

					fusha.style.visibility = "visible";

					fusha.focus();

					n++;

				}	
				else
				{	
					fusha.value = "";

					fusha.style.visibility = "hidden";

					for( var i = 0; i < fushatAktive.length; i++ )
						if( fushatAktive[ i ].vlera  == fusha.value )
								remove( fushatAktive, i );

					n--;
				}
			}///FUND if


		/// ngrirja e butonit te llogaritjes nese nuk ka asnje fushe aktive. . .
		if( n == 0 )
		{
			var x = document.querySelectorAll( "button" );
			for( var mn = 0; mn < x.length; mn++ )
				x[ mn ].disabled = true;
		}
		else
		{
			var x = document.querySelectorAll( "button" );
			for( var mn = 0; mn < x.length; mn++ )
				x[ mn ].disabled = false;
		}

	} ); ///FUND funksioni


				

/// Merr inputet sa here shtypet butoni llogarit
function merr()
{	
	mesazhGabimi = "";

	for( var i = 0; i < checkboxet.length; i++ )
	{
		if( checkboxet[ i ].checked )
		{
			var fusha = document.getElementById( "fusha" + ( i + 1 ) );

			if( Number( fusha.value ) && ( 1 <= Number( fusha.value ) &&  Number( fusha.value ) <= 10 ))
			{
				var tmp = { pozicioni: i, vlera: Number( fusha.value ) };

				fushatAktive.push( tmp );
			}
			else 
			{

				gabim = true;

				mesazhGabimi += "<br>Vlere e palejuar ne fushen e " + ( i + 1 );
			}
		} ///FUND if
					} ///FUND for
	} ///FUND merr

			

/// Funksioni qe kontrollon vlefshmerine e informacionit te dhene
/// dhe llogarit mesataren nese informacioni eshte i sakte
/// ne te kundert shfaq nje mesazh gabimi. . .
function llogarit()
{

	merr();

	var piket = 0;

	var shumaKrediteve = 0;

	for( var i = 0; i < fushatAktive.length; i++ )
	{	

		var kredit = LENDET[ fushatAktive[ i ].pozicioni ].kreditet;

		piket += kredit * fushatAktive[ i ].vlera;

		shumaKrediteve += kredit;

	}

	if( gabim == true )
	{

		document.getElementById( "pergjigja" ).innerHTML = mesazhGabimi;
	}
	else
	{	
		var mesatarja = piket / shumaKrediteve;

		var string = "<br>Piket: " + piket + "<br>Kreditet: " + shumaKrediteve + "<br><b>Mesatarja: " + mesatarja.toFixed( 2 ) + "</b>";

		document.getElementById( "pergjigja" ).innerHTML = string;
	}

	/// ngrirja e butonave
	document.querySelector( "button" ).disabled = true ;

	gabim = false;

	fushatAktive = [];
}///FUND llogarit
