var vector = {
    _x: 1,
    _y: 0,

    create: function(x, y){
        var obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },

    setX: function(value){
        this._x = value;
    },

    getX: function(){
        return this._x;
    },

    setY: function(value){
        this._y = value;
    },

    getY: function(){
        return this._y;
    }

};