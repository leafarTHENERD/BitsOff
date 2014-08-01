function seed_generator(w, h, level){
    var len = 2*level;
    var seed = '';
    for(var i = 0; i < len; i++){
        seed += ''+Math.floor(Math.random()*w);
        seed += ''+Math.floor(Math.random()*h);
    }
    return seed;
}

function problem_generation(bitMatrix, seed){
    for (var i = 0; i < seed.length-1; i+=2){
        var x = parseInt(seed[i], 10);
        var y = parseInt(seed[i+1], 10);
        bitMatrix.click( bitMatrix.bitPadding*y + y*bitMatrix.bitWidth,  bitMatrix.bitPadding*x + x*bitMatrix.bitHeight );
    }

}

function finished(level){
    window.alert("You finished level "+level+" !!!");
}

window.onload = function(){
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var bitWidth = bit.getWidth(),
        bitHeight = bit.getHeight(),
        bits = bitMatrix.create(5, 5, context),
        level = 1,
        inGame = true;

    
    /*
    var problem = [
                    [0,0,0,0,1],
                    [0,0,0,1,1],
                    [0,0,0,0,1],
                    [0,0,0,0,0],
                    [0,0,0,0,0],
                  ];
    */
    var i, j;

    for (i = 0; i < 5; i++)
        for (j = 0; j < 5; j++) {            
            bits.setBit(i, j, 0);
    }

    bits.connectBits();
    bits.draw();

    var problem_session = [];
    var seed = seed_generator(5,5, level);
    problem_session.push(seed);
    problem_generation(bits, seed);

    document.body.addEventListener("click", function(event){
        //if(inGame){
        bits.click(event.clientX, event.clientY);
        if(bits.allOff()){
            //inGame = false;
            finished(level);
            level++;
            seed = seed_generator(5,5,level);
            problem_session.push(seed);
            problem_generation(bits, seed);
        }
        //}
    }, false);
};