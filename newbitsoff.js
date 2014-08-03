function seed_generator(w, h, level){
    var len = level;
    var seed = '';
    for(var i = 0; i < len; i++){
        seed += ''+Math.floor(Math.random()*w);
        seed += ''+Math.floor(Math.random()*h);
    }
    return seed;
}

function problem_generation(bitMatrix, seed){
    bitMatrix.zero();
    bitMatrix.draw();
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
        width = canvas.width = window.innerHeight,
        height = canvas.height = window.innerHeight;

    var bits = bitMatrix.create(5, 5, context),
        problem_session = [],
        level = 1;

    bits.bitWidth = (width - bits.width*bits.bitPadding)/bits.width,
    bits.bitHeight = (height - bits.height*bits.bitPadding)/bits.height;

    var i, j;

    for (i = 0; i < 5; i++)
        for (j = 0; j < 5; j++) {            
            bits.setBit(i, j, 0);
    }

    bits.connectBits();

    var seed = seed_generator(5,5, level);
    problem_session.push(seed);
    problem_generation(bits, seed);

    document.getElementById("canvas").addEventListener("click", function(event){
        bits.click(event.clientX, event.clientY);
        if(bits.allOff()){
            finished(level);
            level++;
            seed = seed_generator(5,5,level);
            problem_session.push(seed);
            problem_generation(bits, seed);
        }
    }, false);

    document.getElementById("prev").addEventListener("click", function(event){
        
    }, false);

    document.getElementById("next").addEventListener("click", function(event){

    }, false);
};