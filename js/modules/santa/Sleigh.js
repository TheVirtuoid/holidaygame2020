import Component from "../components/Component.js";

export default class Sleigh extends Component {
	constructor(args) {
		super(args);
	}

	isHit(pos) {
		// determine if there is a hit
	}

	draw(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.drawFill(top, left);
	}

	erase(top, left) {
		top = top ? top : this.top;
		left = left ? left : this.left;
		super.erase(top, left);
	}
}
