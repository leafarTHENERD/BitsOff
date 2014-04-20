var height = 5, width = 5;
var table_zero = '', table_one = '';

function figure_dead(cood, h, w){
    var array=[];
    for(i = 0; i < h*w; i++)
        array[i]  = (cood.indexOf(i) == -1) ? 1 : 0;
    return array;
}

function figure_table(array, h, w){
    var table = '<table border=\"0\">';
    for(i = 0; i < h; i++){
        table += '<tr>';
        for(j = 0; j < w; j++){
            table += '<td ';
            if(array[i*(h-1)+j] == 1)
                table += 'class=\'zero\' ';
            table += '>&nbsp;</td>';
        }
        table += '</tr>';
    }
    table += '</table>';
    return table;
}

function setup(){
    var zero = [4,7], one = [0,2,5,6,8];
    var h = 4, w = 3;
    var array_zero = figure_dead(zero, h, w);
    var array_one = figure_dead(one, h, w);
    table_zero = figure_table(array_zero, h, w);
    table_one = figure_table(array_one, h, w);
}

function verify(problem){
    for(var i = 0; i < h; i++)
        for(var j = 0; j < w; j++)
            if(problem[5*i+j] != 0) return -1;

    window.alert("YEP!!!");
    return 0;
}

function draw(problem, w, h){
    var str="<table class=\"game\">";
    for(var i = 0; i < h; i++){
        str+="<tr>";
        for(var j = 0; j < w; j++){
            str+=("<td onclick=\"clicked("+j+","+i+", ["+problem+"], "+w+")\">");
            if(problem[w*i+j])
                str+=table_one;
            else
                str+=table_zero;
            str+="</td>";
        }

        str+="</tr>";
    }
    str+="</table>";
    document.body.innerHTML=str;
}

function click(x, y, problem, w){
    var up = x + (y-1)*w;
    var down = x + (y+1)*w;
    var right = (x+1) + y*w;
    var left = (x-1) + y*w;

    if(up >= 0)
        problem[up] = +(!problem[up]);
    if(down < problem.length)
        problem[down] = +(!problem[down]);
    if(x != (w-1))
        problem[right] = +(!problem[right]);
    if(x != 0)
        problem[left] = +(!problem[left]);

    problem[x + y*w] = +(!problem[x + y*w]);
    return problem;
}

function clicked(x, y, problem, w){
    problem = click(x, y, problem, w);
    draw(problem, height, width);
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

function problem_generator(seed, w){
    var problem = new Array(25);
    for(var i = 0; i < problem.length; i++)
        problem[i] = 0;

    for (var i = 0; i < seed.length-1; i+=2) {
        problem = click(parseInt(seed[i], 10), parseInt(seed[i+1], 10), problem, w);
    }
    return problem;
}

function main(){
    setup();
    var problem = problem_generator(seed_generator(5,5), width);
    draw(problem, height, width);
}