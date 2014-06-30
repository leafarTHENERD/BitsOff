var bitMatrix = {
    width: 5,
    height: 5,
    bits: null,
    bitWidth: 100,
    bitHeight: 100,
    bitPadding: 10,
    context: null,

    create: function(w, h, ctx){
        var obj = Object.create(this);
        obj.width = w;
        obj.height = h;
        obj.context = ctx;
        obj.bits = new Array(this.width);

        for (var i = 0; i < this.width ; i++) 
            obj.bits[i] = new Array(this.height);
        
        for(var i = 0; i < this.width; i++)
            for(var j = 0; j < this.height; j++)
                obj.bits[i][j] = null;    
        return obj;
    },

    setBit: function(x, y, bit){
        if(x < this.width && x >= 0 && y < this.height && y >= 0)
            this.bits[x][y] = bit;
    },

    getBit: function(x, y){
        if(x < this.width && x >= 0 && y < this.height && y >= 0)
            return this.bits[x][y];
        else
            return null;
    },

    connectBits: function(){
        var up, down, right, left;
        for (var i = 0; i < this.width; i++) 
            for (var j = 0; j < this.height; j++){
                up = j - 1, down = j + 1, right = i + 1, left = i - 1;

                if(this.bits[i][j]){
                    if(up >= 0) this.bits[i][j].up = this.bits[i][up];
                    if(down < this.height) this.bits[i][j].down = this.bits[i][down];
                    if(left >= 0) this.bits[i][j].left = this.bits[left][j];
                    if(right < this.width) this.bits[i][j].right = this.bits[right][j];
                }
            }

    },

    click: function(x, y){
        for (var i = 0; i < this.width; i++) 
            for (var j = 0; j < this.height; j++)
                if(this.bits[i][j].onIt(x, y)){
                    this.bits[i][j].changeStatus();
                    return;
                }
    },

    draw: function(){
        for (var i = 0; i < this.width; i++) 
            for (var j = 0; j < this.height; j++)
                if(this.bits[i][j])
                    this.bits[i][j].draw(this.context);
    }
};