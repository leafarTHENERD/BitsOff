var bit = {
	position: null,
	status: false,
	up: null,
	down: null,
	left: null,
	right: null,

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

	changeStatus: function(){
		this.setStatus(!this.status);
		if(this.up) this.up.setStatus(!this.up.getStatus());
		if(this.down) this.down.setStatus(!this.down.getStatus());
		if(this.left) this.left.setStatus(!this.left.getStatus());
		if(this.right) this.right.setStatus(!this.right.getStatus());
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

	draw: function(w, h, ctx){
		if(this.status)
			ctx.fillStyle = "#000";
		else
			ctx.fillStyle = "#EEE";
		ctx.fillRect(this.position.getX(), this.position.getY(), w, h);
	},
};