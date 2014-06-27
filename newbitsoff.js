function click(x, y, problem, w, h){
    var up = y - 1, down = y + 1, right = x + 1, left = x - 1;

    if(up >= 0) {problem[x][up] = (!problem[x][up]);}
    if(down < h) {problem[x][down] = (!problem[x][down]);}
    if(right < w) {problem[right][y] = (!problem[right][y]);}
    if(left >= 0) {problem[left][y] = (!problem[left][y]);}

    problem[x][y] = (!problem[x][y]);
    return problem;
}

function seed_generator(w, h){
    var len = Math.floor(Math.random()*100+1);
    len = (!(len%2)) ? len : len+1;
    var seed = '';
    for(var i = 0; i < len; i++){
        seed += ''+Math.floor(Math.random()*w);
        seed += ''+Math.floor(Math.random()*h);
    }
    return seed;
}

function problem_generator(seed){
    var problem = new Array(5);

    for (var i = 0; i < 5; i++) {
        problem[i] = new Array(5);
    }
    for(var i = 0; i < 5; i++)
        for(var j = 0; j < 5; j++)
            problem[i][j] = 0;

    for (var i = 0; i < seed.length-1; i+=2) {
        problem = click(parseInt(seed[i], 10), parseInt(seed[i+1], 10), problem, 5, 5);
    }
    return problem;
}

window.onload = function(){
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    var bitWidth = bit.getWidth(),
        bitHeight = bit.getHeight(),
        bits = [];

    var problem = problem_generator(seed_generator(5,5));

    /*
    var problem = [
                    [0,1,0,1,0],
                    [1,0,1,0,1],
                    [0,1,0,1,0],
                    [1,0,1,0,1],
                    [0,1,0,1,0],
                  ];
    */


    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++)
            bits.push(bit.create(10*i + i*bitWidth, 10*j + j*bitHeight, problem[i][j]));
    }

    for (var i = 0; i < bits.length; i++) {
        bits[i].draw(context);
    }


};