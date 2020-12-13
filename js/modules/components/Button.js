import Component from "./Component.js";

export default class Button extends Component {
	constructor(args) {
		super(args);
		const { action = null, text } = args;
		this.text = text;
		this.action = action;
		if (this.action) {
			action.check = true;
		}
	}

	erase() {
		this.game.events.remove(this.action);
		super.erase();
	}

	draw() {
		if (this.image) {
			this.action.clickZone = super.drawImage(this.top, this.left);
			this.game.events.add(this.action);
		} else {
			this.action.clickZone = super.draw(this.text);
			this.game.events.add(this.action);
		}
	}
}