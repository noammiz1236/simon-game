var colors = ["green","red","yellow","blue"];
var historyColor = [];
var client = [];
var start = false;
var level = 1;
// var i = 0;
function random(){
    return Math.floor(Math.random()* 4);
}
function reset(){ // func is reseting all data to get ready for another game
        historyColor = [];
        client = [];
        start = false;
        level = 1;
        // i = 0;
        $('h1').text("Press A Key to Start");
}

function checkKeyPress(){
    // here the game starts if client didnt press nothing will happend and the game will wait for client to click 1
    $("body").keypress(()=>{
        //if client clicked   start turning true and this func wont start again bt will start only after a reset (lose)
        if(!start){
            start = true;
            $('h1').text("level : "+ level);
            newColor();

        }
    });
    
}

function showAnimationColor(){ // going through all last colors that agot chose and showing them in animation with delay
    for(let k =0; k<historyColor.length;k++)

         // delaying animation cuz the code is running fast and its must!! if not it will show all colors at once!!!

            setTimeout(()=>{ 
                        $('#'+ historyColor[k]).fadeOut(50).fadeIn(50);
            },  k*1000+500)
}



function newColor(){    // func giving new random colors ==> showing all color with animation ==> 
                        // clearing clinet picks and index (i) and this makes sure that "client turn" and "checkTurn" func will be executed well
    if(start){
        let rand = random();
        let color = colors[rand];
        historyColor.push(color);
        console.log(color);
        console.log(historyColor);
        // func's doing animation for all the random color that have been chosen
        showAnimationColor();
        
        // console.log(color); // print new randon color in con
        // console.log(historyColor); // print all random colors

        // if we get here it means client were true last round and we can reset i and client arr for the next round and check
        // i = 0;
        client = [];
        clientTurn();
    }

}
function checkTurn(client=[]){ // this func is checking both arrs historyColors(servers color picks) and clent(player color picks) and checking if all client picks were right!

    if(client.length === historyColor.length){ // checking both length  if "true" then checking both arrs colors
        
        if(client[client.length-1] !== historyColor[client.length-1]){ // if colors in the arrs not the same client lost 
            alert("worng !");
            reset();
        }
        
        else{ // else client were right with all colors again and  can change title and then generating another color to next round
            level++;
            $('h1').text("level : " + level);
            newColor();
        }
        // i++;
    }
    
    else{   // if both arr length r not the we make sure to give client more color pick to get to the checking part
             // checking if client last pick is the same and in the same position as server pick if not the reset(lose)
        if(client[client.length-1] !== historyColor[client.length-1]){ 
            alert("worng !");
            reset();
        }
        //else it means last client turn were true and client can pick again till both length is the same 
        clientTurn();
    }
}


function clientTurn(){
    if(start){ // if is checking if the game is runnung without it after the reset it will come here and wont work this is must to start another round !!
        let pressed = false;
        $('.btn').on('click',(e)=>{ // this make sure that clinet press once pre all btns and will not be able to spam clicks .
                                    //  when client click then "pressed" turns true and adding clinets pick to clinets arr.
            if(!pressed){
                pressed = true;
                client.push(e.target.id);
                console.log(client)
                $('#'+ e.target.id).fadeOut(50).fadeIn(50);
                // console.log(e.target.id);
                checkTurn(client);
                
            }
        })
    }
    

}



// game starts
checkKeyPress();

