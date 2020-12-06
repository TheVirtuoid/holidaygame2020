import Box from "./../game/Box.js";

export default class Meteor extends Box {
	constructor(args) {
		super(args);
		this.color = "crimson";
	}

	get damage() {
		return Math.floor(Math.random() * 10);
	}

	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.draw(top, left);
	}

	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.erase(top, left);
	}
}
