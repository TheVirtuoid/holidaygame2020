import Box from "./Box.js";

export default class MilkAndCookies extends Box {
	constructor() {
		super();
	}

	get damage() {
		return Math.ceil(Math.random() * -10);
	}
}
