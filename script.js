var block2 = document.getElementById("block2");
var block1 = document.getElementById("block1");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;
var obstaculo = document.getElementById("obstaculo");
/*Makes the holes appear randomly */
hole.addEventListener('animationiteration', () => {
    var random = Math.random()*5;
    var top = (random*40)+30;
    obstaculo.style.top = -(top) + "px";
    counter++;
});

window.addEventListener("keydown",(event) =>{
    const {key} = event;
    if (key == ' '){
        jump();
    }
})

/*Gravity function*/
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping == 0){
        character.style.top = (characterTop+3)+"px";
    }
    var obstaculoLeft = parseInt(window.getComputedStyle(block1,block2).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var cTop = -(600-characterTop);
    if((characterTop>630) || ((obstaculoLeft<20) && (obstaculoLeft>-50) && ((cTop<holeTop) || 
    (cTop>holeTop+200)))){
        alert("Game over.Score: "+counter);
        character.style.top = 100 + "px";
        counter=0;
    }
},10);

/*jump function*/
function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop=parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            if(jumpCount < 5){
                character.style.transform = "rotate(-50deg)";
            } else if(jumpCount >= 5 && jumpCount < 10){
                character.style.transform = "rotate(-40deg)";
            } else {
                character.style.transform = "rotate(-10deg)";
            } 
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
            character.style.transform = "rotate(0deg)";

        }
        jumpCount++;
    },10);
}