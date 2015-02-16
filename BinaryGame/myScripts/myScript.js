var oneColor="#F78181";
var oneHoverColor="#F75555";
var zeroColor="#81DAF5";
var zeroHoverColor="#36C4EF";
var count=0;
var moves;
var movesVal=0;
var tiles;
function init()
{
	$("#title").click(function(){refresh();
	
	});
	
	$("#title").hover(function(){$(this).css("cursor","pointer");
	
	});
	moves=$("#movesVal")[0];
	 tiles=document.getElementsByTagName("td");
	
	if(typeof(Storage) !== "undefined") {

	if(localStorage.getItem("binaryGameScore")!=null)
	{
		$("#bestVal").html(localStorage.getItem("binaryGameScore"));

	}
	}

	var val=0;
	for(var i=0;i<tiles.length;++i)
	{
		
		tiles[i].style.transitionDuration="0.30s";

		$("#"+tiles[i].id).hover(function(){
		
		$(this).css("cursor","pointer");
		if($(this).html()=="0")
		{		
			$(this).css("background-color",zeroHoverColor);
				
		}
		else
		$(this).css("background-color",oneHoverColor);
		
		},function(){
		if($(this).html()=="0")
		{	
			$(this).css("background-color",zeroColor);
				
		}
		else
					$(this).css("background-color",oneColor);

		
		});
		
		
		$("#"+tiles[i].id).click(function(){
				
				movesVal+=1;
				moves.innerHTML=movesVal;
				var curPos = $(this).attr("id");
				curPos =  parseInt(curPos.replace("tile",""));
				var lowerPos = curPos+4;
				var upperPos=curPos-4;
				var leftPos = curPos-1;
				var rightPos= curPos+1;
				
				rotator(this);
				
				if(lowerPos<16)
					rotator($("#tile"+lowerPos)[0]);
				if(upperPos>-1)
				{
					rotator($("#tile"+upperPos)[0]);

					
				}
				if(leftPos>-1&&leftPos!=3&&leftPos!=7&&leftPos!=11)
					rotator($("#tile"+leftPos)[0]);
				if(rightPos<16&&rightPos!=4&&rightPos!=8&&rightPos!=12)
					rotator($("#tile"+rightPos)[0]);

				check();
			
			
		});
		//val=1;
		if(val==0)
		{
		
			tiles[i].innerHTML="0";
			tiles[i].style.backgroundColor=zeroColor;
			val=1;
		}else
		{
			count+=1;
			tiles[i].innerHTML="1";
			tiles[i].style.backgroundColor=oneColor;
			val=0;
		}
	}
	
}
function refresh()
{
count=0;
		movesVal=0;
				val=0;

	for(var i=0;i<tiles.length;++i)
	{
		
		if(val==0)
		{
		
			tiles[i].innerHTML="0";
			tiles[i].style.backgroundColor=zeroColor;
			val=1;
		}else
		{
			count+=1;
			tiles[i].innerHTML="1";
			tiles[i].style.backgroundColor=oneColor;
			val=0;
		}
		
	}

}
function check()
{
	if(count==16||count==0)
				{
				
					if(typeof(Storage) !== "undefined") {

					var score=localStorage.getItem("binaryGameScore");
					if(score==null)
					{
						
						localStorage.setItem("binaryGameScore",movesVal);
					}
					else
					{
						if(movesVal<parseInt(score))
						{
							localStorage.setItem("binaryGameScore",movesVal);
																		$("#bestVal").html(movesVal);


						}

						
					}
					}
					alert("Congrats.You finished the puzzle in "+movesVal+" moves.Click Ok to play again.");
					refresh();
					
				}
}
function rotator(element)
{
	if(!element.style.webkitTransform||element.style.webkitTransform=="rotateY(0deg)")
					element.style.webkitTransform = "rotateY(180deg)";
				else
					element.style.webkitTransform = "rotateY(0deg)";

				$(element).html($(element).html()=="0"?"1":"0" );
				if($(element).html()=="0")
				{	
					count-=1;
					$(element).css("background-color",zeroColor);
				}else
				{	
					count+=1;
					$(element).css("background-color",oneColor);
				}
				
				
}

