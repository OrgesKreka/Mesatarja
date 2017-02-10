function rregullo() 
{
    var gjeresia = 0;
  
    if ( window.innerHeight ) 
    {
        gjeresia = window.innerWidth;
    }
    else if ( document.documentElement && document.documentElement.clientHeight ) 
    {
        gjeresia = document.documentElement.clientWidth;
    } 
    else if ( document.body ) 
    {
        gjeresia = document.body.clientWidth;
    }


    var link = document.getElementsByTagName( "link" )[ 0 ];

    if ( gjeresia  < 600 )
    {

       link.setAttribute("href", "");
    } 
    else 
    {
        link.setAttribute("href", "_css/stili.css");
    }

}


window.onresize = function()
{	
	rregullo();
};

window.onload = function()
{
	rregullo();
};