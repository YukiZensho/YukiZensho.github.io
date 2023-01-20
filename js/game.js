var Body="";
var Length=100,speed=5,k,playing=false,mood=0;
var dot=[{'xpos':145,'ypos':70,'alpha':0.0}],xpos=0,ypos=0,xfru=0,yfru=0;
function InitialVal(){
    for(var i=0;i<Length;i++){
        document.getElementById("S"+i).style.position="absolute";
        document.getElementById("S"+i).style.width="20px";
        document.getElementById("S"+i).style.height="20px";
        document.getElementById("S"+i).style.margin="0px";
        document.getElementById("S"+i).style.padding="0px";
        document.getElementById("S"+i).style.borderRadius="50%";
        document.getElementById("S"+i).style.backgroundColor="#2f2";
    }
    document.getElementById("S0").style.width="30px";
    document.getElementById("S0").style.height="30px";

}
//Add the fruit
Body+="<div id=\"Fruit\"></div>";

//Initialize Snek
Body+="<div id=\"S0\"></div>";
for(var i=1;i<Length;i++){
    Body+="<div id=\"S"+i+"\"></div>";
    dot.push({'xpos':150-i*30,'ypos':70,'alpha':0.0});
}
document.getElementById("game").innerHTML=Body;
InitialVal();

//Set up Fruit
{
document.getElementById("Fruit").style.position="absolute";
document.getElementById("Fruit").style.width="20px";
document.getElementById("Fruit").style.height="20px";
document.getElementById("Fruit").style.margin="0px";
document.getElementById("Fruit").style.padding="0px";
document.getElementById("Fruit").style.borderRadius="50%";
document.getElementById("Fruit").style.backgroundColor="#f22";
xfru=Math.random()*window.screen.availWidth *.76;
yfru=Math.random()*window.screen.availHeight*.76;
document.getElementById("Fruit").style.top =yfru+"px";
document.getElementById("Fruit").style.left=xfru+"px";
}
SnkHead=document.getElementById("S0");

function Game(){
    if(!playing&&mood==0){
        xpos=xfru;
        ypos=yfru;
    }
    console.log(mood);
    //Get the angle between the head of the snake and the mouse
    if(playing)
        dot[0].alpha=Math.abs(Math.atan((ypos-dot[0].ypos)/(xpos-dot[0].xpos)));
    else{
        switch(mood){
            case 0:dot[0].alpha=Math.abs(Math.atan((ypos-dot[0].ypos)/(xpos-dot[0].xpos))); dot[0].alpha+=(Math.random()-0.5)*.25;break;
            case 1: dot[0].alpha+=8*(1/Length);break;
            case 2:
                if(Math.abs(xpos-dot[0].xpos)<speed||Math.abs(ypos-dot[0].ypos)<speed){
                    xpos=(xfru+7*xpos)/8+(Math.random()-.5)*100;
                    ypos=(yfru+7*ypos)/8+(Math.random()-.5)*100;
                }dot[0].alpha=Math.abs(Math.atan((ypos-dot[0].ypos)/(xpos-dot[0].xpos)));break;
            case 3:
                if(Math.abs(xpos-dot[0].xpos)<speed||Math.abs(ypos-dot[0].ypos)<speed){
                    xpos=Math.random()*Math.random()*window.screen.availWidth;
                    ypos=Math.random()*Math.random()*window.screen.availHeight;
                }dot[0].alpha=Math.abs(Math.atan((ypos-dot[0].ypos)/(xpos-dot[0].xpos)));break;
        }
        if(dot[0].xpos<0||dot[0].ypos<0||dot[0].xpos>window.screen.availWidth||dot[0].ypos>window.screen.availHeight){
            mood=(Math.random()*1000)%3;
            mood=Math.trunc(mood);
        }
    }
    //Move the head towards the player
    if(((Math.abs(xpos-dot[0].xpos)>speed||Math.abs(ypos-dot[0].ypos)>speed)&&xpos&&ypos&&playing)||
        !playing)
    {
        dot[0].ypos+=(ypos>dot[0].ypos)?Math.sin(dot[0].alpha)*speed:-Math.sin(dot[0].alpha)*speed;
        dot[0].xpos+=(xpos>dot[0].xpos)?Math.cos(dot[0].alpha)*speed:-Math.cos(dot[0].alpha)*speed;
    
        SnkHead.style.top =(dot[0].ypos-5)+"px";
        SnkHead.style.left=(dot[0].xpos-5)+"px";
        for(var i=1;i<Length;i++){
            dot[i].alpha=Math.abs(Math.atan((dot[i-1].ypos-dot[i].ypos)/(dot[i-1].xpos-dot[i].xpos)));
            k=(dot[i-1].ypos>dot[i].ypos)?Math.sin(dot[i].alpha)*speed:-Math.sin(dot[i].alpha)*speed;
            dot[i].ypos=dot[i-1].ypos-k;
            k=(dot[i-1].xpos>dot[i].xpos)?Math.cos(dot[i].alpha)*speed:-Math.cos(dot[i].alpha)*speed;
            dot[i].xpos=dot[i-1].xpos-k;
            document.getElementById("S"+i).style.top =dot[i].ypos+"px";
            document.getElementById("S"+i).style.left=dot[i].xpos+"px";
        }
        //Eating Berries
        if(Math.sqrt((dot[0].xpos-xfru)*(dot[0].xpos-xfru)+(dot[0].ypos-yfru)*(dot[0].ypos-yfru))<20){
            i=Length;
            Length+=5;
            //Reworks the HTML to fit the new dots
            Body=document.getElementById("game").innerHTML;
            for(;i<Length;i++){
                Body+="<div id=\"S"+i+"\"></div>";
                dot.push({'xpos':dot[i-1].xpos,'ypos':dot[i-1].ypos,'alpha':0.0});
            }
            document.getElementById("game").innerHTML=Body;
            InitialVal();
            SnkHead=document.getElementById("S0");
            xfru=Math.random()*window.screen.availWidth *.76;
            yfru=Math.random()*window.screen.availHeight*.76;
            document.getElementById("Fruit").style.top =yfru+"px";
            document.getElementById("Fruit").style.left=xfru+"px";
            Mood();
        }
    }
}

function Mood(){
    mood=(Math.random()*1000)%4;
    mood=Math.trunc(mood);
    if(mood==3){
        xpos=Math.random()*Math.random()*window.screen.availWidth;
        ypos=Math.random()*Math.random()*window.screen.availHeight;
    }
}
setInterval(Game, 13);
setInterval(Mood, 100*(20+Math.random()*30));
 
document.addEventListener('mousemove', (event) => {
    if(playing){
	xpos=event.clientX-15;
    ypos=event.clientY-15;
    }
});


document.addEventListener('click', (event) => {playing=!playing;});
document.addEventListener('keydown', (event) => {playing=!playing;});