import ScoreBoardComponent from "./ScoreBoardComponent.js";
import Score from "./../game/Score.js";
import { fontSizes, borders } from "./../game/params.js";

export default class Health {
	constructor(args) {
		const { renderer, top, left, height, width } = args;
		const size = { text: 18, score: 20 };
		this.renderer = renderer;
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
		this.theText = new ScoreBoardComponent({
			renderer,
			top,
			left,
			width,
			height: fontSizes[size.text].height,
			color: "yellow",
			size: size.text,
			font: "Courier New, monospace",
			text: "HEALTH"
		});
		this.theScore = new ScoreBoardComponent({
			renderer,
			top: top + fontSizes[size.text].height,
			left,
			width,
			height: fontSizes[size.score].height,
			color: "yellow",
			size: size.score,
			font: "Courier New, monospace",
		});
	}

	draw() {
		this.drawHeaderText();
		this.drawScore();
	}

	drawHeaderText() {
		this.theText.draw();
	}

	drawScore() {
		this.theScore.draw("100");
	}
}
