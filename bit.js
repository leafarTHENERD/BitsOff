var bit = {
	position: null,
	status: 0,
	height: 100,
	width: 100,

	create: function(x, y, stat){
		var obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.status = stat;
		return obj;
	},

	setStatus: function(stat){
		this.status = stat;
	},

	getStatus: function(){
		return this.status;
	},

	setHeight: function(h){
		this.height = h;
	},

	getHeight: function(){
		return this.height;
	},

	setWidth: function(w){
		this.width = w;
	},

	getWidth: function(){
		return this.width;
	},

	draw: function(ctx){
		if(this.status)
			ctx.fillStyle = "#EEE";
		else
			ctx.fillStyle = "#000";
		ctx.fillRect(this.position.getX(), this.position.getY(), this.width, this.height);
	}
};