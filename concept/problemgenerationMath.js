problemgenerationMath.js
function click(x, y, problem, w, h){
    var up = y - 1,
        down = y + 1,
        right = x + 1,
        left = x - 1;

    problem[x][y] = (!problem[x][y]);

    if(up >= 0)
        problem[x][up] = (!problem[x][up]);
    if(down < h)
        problem[x][down] = (!problem[x][down]);
    if(right < w)
        problem[right][y] = (!problem[right][y]);
    if(left >= 0)
        problem[left][y] = (!problem[left][y]);

    return problem;
}

function seed_generator(w, h, level){
    var len = 2*level;
    var seed = '';
    for(var i = 0; i < len; i++){
        seed += ''+Math.floor(Math.random()*w);
        seed += ''+Math.floor(Math.random()*h);
    }
    return seed;
}

function scal_prod(v1, v2){
    var sum = 0;
    if(v1.length == v2.length)
        for(var i = 0; i < v1.length; i++)
            sum += v1[i]*v2[i];
    return sum;
}

function matrixToVector(m, w, h){
    var vec = [];
    for(var i = 0; i < w; i++)        
        for(var j = 0; j < h; j++)
            vec.push(m[i][j]);
    return vec;
}

function problem_generator(seed, level){
    var problem = new Array(5);

    for (var i = 0; i < 5; i++) {
        problem[i] = new Array(5);
    }
    for(var i = 0; i < 5; i++)
        for(var j = 0; j < 5; j++)
            problem[i][j] = 0;

    for (var i = 0; i < seed.length-1; i+=2)
        problem = click(parseInt(seed[i], 10), parseInt(seed[i+1], 10), problem, 5, 5);

    /*
        Teste para verificar se o problema gerado é solucionável.
        Baseado na matemática e provas desenvolvidas Marlow Anderson and Todd Feil sobre o jogo Lights Out
    */
    var N1 = [
                [0,1,1,1,0],
                [1,0,1,0,1],
                [1,1,0,1,1],
                [1,0,1,0,1],
                [0,1,1,1,1], 
             ],
        N2 = [
                [1,0,1,0,0],
                [1,0,1,0,1],
                [0,0,0,0,0],
                [1,0,1,0,1],
                [1,0,1,0,1], 
             ];

    N1 = matrixToVector(N1);
    N2 = matrixToVector(N2);

    if ( scal_prod(matrixToVector(problem,5,5),N1), scal_prod(matrixToVector(problem,5,5),N1) )
        problem = problem_generator(seed_generator(5,5));

    return problem;
}