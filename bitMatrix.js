var bitMatrix = {
    width: 5,
    height: 5,
    bits: null,
    bitWidth: 100,
    bitHeight: 100,
    bitPadding: 10,
    context: null,
    sum: 0,


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

    setBit: function(x, y, status){
        var b =  bit.create(this.bitPadding*y + y*this.bitWidth,  this.bitPadding*x + x*this.bitHeight, status);
        if(x < this.width && x >= 0 && y < this.height && y >= 0)
            this.bits[x][y] = b;
        if(b.getStatus())
            this.sum += 1;
    },

    getBit: function(x, y){
        if(x < this.width && x >= 0 && y < this.height && y >= 0)
            return this.bits[x][y];
        else
            return null;
    },

    zero: function(){
        var i, j;
        for(i = 0; i < this.width; i++)
            for(j = 0; j < this.height; j++)
                this.bits[i][j].setStatus(0);
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
        var j = Math.floor(x/(this.bitPadding+this.bitWidth));
        var i = Math.floor(y/(this.bitPadding+this.bitHeight));
        var bit  = this.getBit(i, j);
        
        bit.changeStatus();
        if(bit.up){
            if(bit.up.getStatus()) this.sum += 1;
            else this.sum -= 1;
        }

        if(bit.down){
            if(bit.down.getStatus()) this.sum += 1;
            else this.sum -= 1;
        }

        if(bit.left){
            if(bit.left.getStatus()) this.sum += 1;
            else this.sum -= 1;
        }

        if(bit.right){
            if(bit.right.getStatus()) this.sum += 1;
            else this.sum -= 1;
        }

        if(bit.getStatus())
            this.sum += 1;
        else
            this.sum -= 1;
        this.draw();
    },

    draw: function(){
        for (var i = 0; i < this.width; i++) 
            for (var j = 0; j < this.height; j++)            
                if(this.bits[i][j])
                    this.bits[i][j].draw(this.bitWidth, this.bitHeight, this.context);
    },

    allOff: function(){
        return !this.sum;
    }
};