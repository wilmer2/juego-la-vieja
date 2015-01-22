var principal,oponente,hechas;
var tablero =
{
	turno: true,
	ganador: false,
	empate: false,
	fondo: new Image(),
	ocupado: false,
	contador: 0
};
var Participante = function (nom, figura)
{
	this.nombre = nom;
	this.figura = new Image();
	this.triunfante = false;
	this.figura.src = figura;

}
function inicio ()
{   
	
	var canvas = document.getElementById('tik-tak');
	var contexto = canvas.getContext('2d');
    var nombre = nombrar();
	var figura = seleccionFigura();
	var btn = document.getElementById('boton');
	var figuraOponente = seleccionFiguraRival(figura);
    
    tablero.ctx = contexto;
	tablero.fondo.src = 'cuadrilla.jpg';
	tablero.fondo.onload = dibujar;

	principal = new Participante(nombre,figura);
	oponente = new Participante('computadora', figuraOponente);
	hechas = new Array(9);


	btn.addEventListener('click', seleccionTurno);
	
}
function jugar()
{   
	tablero.segundo = oponente.figura;
	tablero.primero = principal.figura;

	var primerTurno , segundoTurno;

	if(principal.jugador == 1)
	{ 
		primerTurno = principal;
		segundoTurno = oponente;
	}
	else
	{
		primerTurno = oponente;
		segundoTurno = principal;
	}

    comienza(primerTurno, segundoTurno);
}
function comienza (jugadorUno, jugadorDos)
{    
   
    if(!jugadorUno.triunfante && !jugadorDos.triunfante && !tablero.empate)
    {
   	   if(tablero.turno)
   	   {  
  	   	   tablero.primero = jugadorUno.figura;
   	       
   	   	   if(!tablero.ganador)
   	   	   {
   	   	   	   partida(jugadorUno.nombre, jugadorUno.triunfante);
   	   	   }
   	   	   else
   	   	   {  
   	   	   	   jugadorUno.triunfante = tablero.ganador;
   	   	   	   jugar();
   	   	   }          
   	   }
   	   else
   	   {   
   	   	   tablero.segundo = jugadorDos.figura;
   	   	   
   	   	   if(!tablero.ganador)
   	   	   {
   	   	   		partida(jugadorDos.nombre, jugadorDos.triunfante);
   	   	   }
   	   	   else
   	   	   {    
   	   	   	    jugadorDos.triunfante = tablero.ganador;
   	   	   		jugar();
   	   	   }
   	   }
    }
    else
    {
    	if(tablero.empate)
    	{
    		alert('empate');
    	}
    	else if(jugadorUno.triunfante)
    	{
    		alert('gana ' + jugadorUno.nombre);
    	}
    	else
    	{
    		alert('gana ' + jugadorDos.nombre);
    	}
    }
}
function dibujar ()
{
	 var lienzo = tablero.ctx;

	 lienzo.drawImage(tablero.fondo, 0 , 0); 
 

	 if(tablero.uno)
	 {
	 	lienzo.drawImage(hechas[0], 40, 50);
	 }
	 if(tablero.dos)
	 {
	 	lienzo.drawImage(hechas[1], 160, 50);
	 	 
	 }
	 if(tablero.tres)
	 {
	 	lienzo.drawImage(hechas[2], 280, 45);
	 }
	 if(tablero.cuatro)
	 {
	 	lienzo.drawImage(hechas[3], 40, 150);
	 }
	 if(tablero.cinco)
	 {
	 	lienzo.drawImage(hechas[4], 160, 150);
	 }
	 if(tablero.seis)
	 {
	 	lienzo.drawImage(hechas[5], 280 , 150);
	 }
	 if(tablero.siete)
	 {
	 	lienzo.drawImage(hechas[6], 40, 268);
	 }
	 if(tablero.ocho)
	 {
	 	lienzo.drawImage(hechas[7], 168 , 268);
	 	
	 }
	 if(tablero.nueve)
	 {
	 	lienzo.drawImage(hechas[8], 280 , 268);
	 	
	 }	
    
     if(tablero.contador > 0)
     {
     	vieja();
     }
	 
	 //jugar();
}
function nombrar ()
{
	nom = prompt('Ingrese nombre');	
	return nom;
}
function seleccionFigura ()
{   
	var confimada = false;

	while(!confimada)
	{       
	    var casilla = prompt('Que figura desea para su casilla X u O');

	 	casilla = casilla.toLowerCase();

	 	if(casilla == 'x' || casilla == 'o')
	 	{
	 		confimada = true;
	 		casilla += '.jpg';
	 	}
	 	else
	 	{
	 		alert('seleccione las figuras indicadas');
	 	}
	}
	return casilla;
}
function seleccionFiguraRival(fig)
{  
	var figuraRival;

	if(fig == 'x.jpg')
	{
		figuraRival = 'o.jpg';
	}
	else
	{
     	figuraRival = 'x.jpg';
	}
	return figuraRival;
}
function seleccionTurno ()
{   
	var max = 2;
	var min = 1;
	var random = Math.floor(Math.random() * (max - min + 1)) + 1;
	principal.jugador = random;

	if(principal.jugador == 1)
	{
		oponente.jugador = 2;
	}
	else
	{
        oponente.jugador = 1;
	}
	alert('seleccion las casillas a travez de los numeros del teclado');
	jugar();
}
function aleatorio ()
{
	var maxCuadro = 57;
	var minCuadro = 49;
    var cuadro = Math.floor(Math.random() * (maxCuadro - minCuadro + 1)) + minCuadro;
    return cuadro;
}
function marcar (envio)
{    
    
    var casilla,codigo; 

    if(!envio)
    {  
       codigo = aleatorio();   
    }
    else
    {  
       codigo = envio.keyCode;  
    }
    console.log(codigo);
    casilla = asignacionTeclado(codigo);

    if(!tablero.ganador && !tablero.empate)
    {
    	verificar(casilla);
    }
    
}
function verificar (casilla)
{   
    var recorrido;
    for(recorrido = 0; recorrido < hechas.length; recorrido ++)
    {
    	if(casilla == recorrido)
    	{     		
    		if(hechas[recorrido] == undefined)
    		{
    			if(tablero.turno)
    			{
    				hechas[recorrido] = tablero.primero;
    			}
    			else
    			{
    				hechas[recorrido] = tablero.segundo;
    			}
    			tablero.ocupado = false;
    			confimar(casilla);
    			break;
    		}
    		else
    		{
    			tablero.ocupado = true;
    			jugar();
    			break;
    			//comienzo
    		}
    	}
    }
}

function confimar (num)
{ 

   if(num == 0)
   {
   	  tablero.uno = true;
   	  tablero.contador ++;
   }
   else if(num == 1)
   {
   	  tablero.dos = true;
   	  tablero.contador ++;
   }
   else if(num == 2)
   {
   	  tablero.tres = true;
   	  tablero.contador ++;
   }
   else if(num == 3)
   {
   	  tablero.cuatro = true;
   	  tablero.contador ++;
   }
   else if(num == 4)
   {
   	  tablero.cinco = true;
   	  tablero.contador ++;
   }
   else if(num == 5)
   {
   	  tablero.seis = true;
   	  tablero.contador ++;
   }
   else if(num == 6)
   {
   	  tablero.siete = true;
   	  tablero.contador ++;
   }
   else if(num == 7)
   {
   	  tablero.ocho = true;
   	  tablero.contador ++;
   }
   else if(num == 8)
   {
   	   tablero.nueve = true;
   	   tablero.contador ++;
   }

   dibujar();
}
function asignacionTeclado (opcion)
{   
	var teclado = [49, 50 ,51 ,52, 53, 54, 55, 56, 57, 58, 59];
    var i,num;   
    for(i in teclado)
    {
    	if(opcion == teclado[i])
    	{
    		num = i;
    		break;  		
    	}
    }  
    num = parseInt(num);
    return num;
}

function partida (nomb)
{   
	
	if(nomb == 'computadora')
	{
		marcar();
	}
	else
	{   
		if(tablero.ocupado)
		{
			alert('casilla seleccionada prueba con otra');
		}
		else
		{
			alert('tu turno');

		}

		

		document.addEventListener('keydown', marcar);				
	}
}
function vieja ()
{    
	var contexto = tablero.ctx;
	
	if(hechas[0] != undefined && hechas[0] == hechas[1] && hechas[0] == hechas[2])
	{
		tablero.ganador = true;
		contexto.beginPath();
		contexto.moveTo(50, 80);
		contexto.lineTo(360,80);
		contexto.lineWidth = 10;
		contexto.strokeStyle ='#000';
		contexto.stroke();
		contexto.closePath();
	}
	if(hechas[0] != undefined && hechas[0] == hechas[3] && hechas[0] == hechas[6])
	{
		
		tablero.ganador = true;
		contexto.beginPath();
		contexto.moveTo(80, 40);
		contexto.lineTo(80, 350);
		contexto.lineWidth = 10;
		contexto.strokeStyle ='#000';
		contexto.stroke();
		contexto.closePath();
	}
	if(hechas[0] != undefined && hechas[0] == hechas[4] && hechas[0] == hechas[8])
	{
		tablero.ganador = true;
		contexto.beginPath();
		contexto.moveTo(40, 40);
		contexto.lineTo(370, 357);
		contexto.lineWidth = 10;
		contexto.strokeStyle ='#000';
		contexto.stroke();
		contexto.closePath();

	}
	if(hechas[3] != undefined && hechas[3] == hechas[4] && hechas[3] == hechas[5])
	{
		tablero.ganador = true;
		contexto.beginPath();
		contexto.moveTo(40, 200);
		contexto.lineTo(370, 200);
		contexto.lineWidth = 10;
		contexto.strokeStyle ='#000';
		contexto.stroke();
		contexto.closePath();
	}
	if(hechas[2] != undefined && hechas[2] == hechas[5] && hechas[2] == hechas[8])
	{
		tablero.ganador = true;
		contexto.beginPath();
		contexto.moveTo(320, 30);
		contexto.lineTo(320, 360);
		contexto.lineWidth = 10;
		contexto.strokeStyle ='#000';
		contexto.stroke();
		contexto.closePath();
	}
	if(hechas[2] != undefined && hechas[2] == hechas[4] && hechas[2] == hechas[6])
	{
		tablero.ganador = true;
		contexto.beginPath();
		contexto.moveTo(40, 355);
		contexto.lineTo(375, 35);
		contexto.lineWidth = 10;
		contexto.strokeStyle ='#000';
		contexto.stroke();
		contexto.closePath();
	}
	if(hechas[6] != undefined && hechas[6] == hechas[7] && hechas[6] == hechas[8])
	{
		tablero.ganador = true;
		contexto.beginPath();
		contexto.moveTo(40, 300);
		contexto.lineTo(375, 300);
		contexto.lineWidth = 10;
		contexto.strokeStyle ='#000';
		contexto.stroke();
		contexto.closePath();
	}
	if(hechas[1] != undefined && hechas[1] == hechas[4] && hechas[1] == hechas[7])
	{
		tablero.ganador = true;
		contexto.beginPath();
		contexto.moveTo(200, 40);
		contexto.lineTo(200, 360);
		contexto.lineWidth = 10;
		contexto.strokeStyle ='#000';
		contexto.stroke();
		contexto.closePath();
	}
	
	
	if(!tablero.ganador)
	{ 
	  if(tablero.contador < 9)
	  {
	  	if(tablero.turno)
		{
			tablero.turno = false;
		}
		else
		{
			tablero.turno = true;
		}
	  }
	  else
	  {
	  	  tablero.empate = true;
	  }
		
	}
	jugar();
}