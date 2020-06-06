/*
========== Source du code ========================================================================
https://openclassrooms.com/fr/courses/411578-les-deplacements-de-la-souris/411406-les-cibles
========== Source du code ========================================================================
*/


(function () { //Début du cloisonnement
  
  //Code invisible de l'extérieur
 


var dragged = null; //L'élément en cours de drag
//Lorsque dragged = null, il n'y a rien en cours de déplacement


//Partie du code ayant changé
var dX, dY;


/*
====================   start_drag  ====================
*/
function start_drag(objet,event)
{
  console.log("start_drag deut")
  dragged = objet;

  event.returnValue = false;
  if( event.preventDefault ) event.preventDefault();
        
  //Coordonnées de la souris
  var x = event.clientX + (document.documentElement.scrollLeft + document.body.scrollLeft);
  var y = event.clientY + (document.documentElement.scrollTop + document.body.scrollTop);
        

  //Coordonnées de l'élément
  var eX = 0;
  var eY = 0;
  var element = objet;
  do
  {
    eX += element.offsetLeft;
    eY += element.offsetTop;
    element = element.offsetParent;
  } while( element && element.style.position != 'absolute');

  //Calcul du décallage
  dX = x - eX;
  dY = y - eY;
		console.log("start_drag fin")
}

/*
====================   drag_onmousemove  ====================
*/
function drag_onmousemove(event) 
{
  console.log("drag_onmousemove deut")
  if( dragged ) 
  {
  	console.log("drag_onmousemove deplacement")
    var x = event.clientX + (document.documentElement.scrollLeft + document.body.scrollLeft);
    var y = event.clientY + (document.documentElement.scrollTop + document.body.scrollTop);
                
    //On applique le décalage
    x -= dX;
    y -= dY;

    dragged.style.position = 'absolute';
    dragged.style.left = x + 'px';
    dragged.style.top = y + 'px';
  }
  console.log("drag_onmousemove fin")
}

/*
====================   drag_onmouseup  ====================
*/
function drag_onmouseup(event)  //Lorsque le bouton de la souris est relâché
{
  dragged = null; //On arrête le drag & drop
}

/*
====================   addEvent  ====================
*/
function addEvent(obj,event,fct)
{
  if( obj.attachEvent)
     obj.attachEvent('on' + event,fct);
  else
     obj.addEventListener(event,fct,true);
}



/*
====================   min_max  ====================
*/
function min_max(fenetre)
{
  if( fenetre.style.width != '100%' && fenetre.style.height != '100%') //si la fenêtre n'est pas déjà maximisée
  {
     fenetre.style.width = '100%'; //maximum largeur et hauteur
     fenetre.style.height = '100%';
     fenetre.style.position = 'absolute';
     fenetre.style.left = 0;  //à partir du coin en haut à gauche
     fenetre.style.top = 0;
  }
  else
  {
    fenetre.style.width = '';
    fenetre.style.height = '';
  }
}

/*
====================   close  ====================
*/
function close(fenetre)
{
  fenetre.parentNode.removeChild(fenetre);  //On peut enlever le bloc du document
  //ou: fenetre.style.display = 'none';     //ou alors le cacher avec du style CSS
}






/*
====================   drag_onmousedown  ====================
Permet décleche sur tt les div de la fentre les bonne fct ! si les div possèdent les bonnes classes : 
    window-base à placer sur la fenêtre elle-même pour indiquer que c'est elle qui bouge ;
    window-move à placer sur les objets qui vont déclencher un déplacement (la barre des titres par exemple) ;
    window-close à placer sur les boutons qui vont fermer la fenêtre.
*/
function drag_onmousedown (event)
{
 console.log('debut drag_onmousedown');






  var target = event.target || event.srcElement;
  console.log("drag_onmousedown target:"+ target);
  //On commence par trouver la fenêtre elle-même
  var fenetre = target;


   //fait repasser devant les autres DIV
	var elements = document.getElementsByTagName('*'); //On récupère tous les éléments de la page
	var zIndex = 0;
	for( var i=0; i < elements.length; i++)
	{
	  zIndex = Math.max(zIndex,elements[i].style.zIndex);
	}
	fenetre.style.zIndex = zIndex + 1; //toujours plus haut que le plus haut
	//

  
  while( fenetre)
  {
	 console.log("fenetre.className="+fenetre.className);
     if( fenetre.className && fenetre.className.match((/\bwindow-base\b/g)))
    {
    	console.log("drag_onmousedown trouvé");
       break; //On arrête la boucle
    }
    fenetre = fenetre.parentNode;
  }
  if( !fenetre) { //Si on est sortis de la boucle mais qu'on n'a trouvé aucune fenêtre, on abandonne
  	console.log("drag_onmousedown Pas de fentre");
    return;
	}

	console.log("drag_onmousedown fenetre="+fenetre);

  //Maintenant, on part à la recherche d'un bouton déclencheur
  var element = target;
  while(element)
  {
    if( element.className)
    {
      if( element.className.match(/\bwindow-close\b/g))
      {
        close(fenetre);
        break;
      }
      else if( element.className.match(/\bwindow-min-max\b/g) )
      {
        min_max(fenetre);
        break;
      }
      else if( element.className.match(/\bwindow-move\b/g) )
      {
        start_drag(fenetre, event);
        break;
      }
    }
    element = element.parentNode;
  }


  console.log('Fin  drag_onmousedown');
}


console.log('debut Body');
addEvent(document,'mousedown',drag_onmousedown);
addEvent(document,'mousemove',drag_onmousemove);
addEvent(document,'mouseup',drag_onmouseup);

})(); //Fin du cloisonnement

