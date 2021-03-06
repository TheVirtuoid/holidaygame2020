import Screen from "./Screen.js";
import Text from "./../components/Text.js";
import { fontSizes } from "../game/params.js";
import Button from "../components/Button.js";
import Up from "../components/buttons/Up.js";
import Down from "../components/buttons/Down.js";

export default class GameOver extends Screen {
	/**
	 * Construct the Game Over screen. Processes the New High Score buttons
	 * @param args
	 */
	constructor(args) {
		super(args);
		const { left, width } = this.playground;
		const game = this.game;
		const gameOverText = new Text({
			renderer: this.renderer,
			top: this.playground.top + 200,
			left,
			width,
			height: fontSizes[60].height,
			size: 60,
			text: "GAME OVER"
		});
		const startButton = new Button({
			game: game,
			renderer: this.renderer,
			top: this.playground.height - 100,
			left,
			width,
			height: fontSizes[20].height,
			size: 20,
			text: "CLICK OR TOUCH TO START",
			color: "GreenYellow",
			action: {
				name: 'gameOverStartButton',
				routine: this.processStartButton.bind(this)
			}
		});
		this.playground.add(gameOverText);
		this.playground.add(startButton);

		this.initial1 = null;
		this.initial2 = null;
		this.initial3 = null;
		this.initialRange = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		this.up1 = null;
		this.up2 = null;
		this.up3 = null;
		this.down1 = null;
		this.down2 = null;
		this.down3 = null;
		this.submitButton = null;
		this.youGotHighScoreText = null;

		this.highScoreComponents = [];

		this.initialized = false;
		this.timer = null;
	}

	/**
	 * Display the screen. Also displays the high score screen if needed.
	 * If there is no high score, then after 10 seconds, we go onwards to the next screen.
	 */
	start() {
		this.disableHighScoreComponents();
		const isHighScore = this.game.highScores.isHighScore(this.game.scoreboard.getScore());
		const game = this.game;
		if (isHighScore) {
			if (!this.initialized) {
				this.initialized = true;
				const height = 30;
				const width = 30;
				const size = 30;
				const renderer = this.renderer;
				let top = this.playground.top + 200 + fontSizes[60].height + 60;
				this.youGotHighScoreText = new Text({
					renderer: this.renderer,
					top,
					left: this.playground.left,
					width: this.playground.width,
					height: fontSizes[30].height,
					size: 30,
					text: "YOU GOT HIGH SCORE!"
				});
				this.playground.add(this.youGotHighScoreText);

				top += fontSizes[30].height + 20;
				const left = this.playground.left + 125;
				const color = "white";
				const justify = "left";
				let image = this.game.remoteAssets.get('up').image;
				this.up1 = new Up({ renderer, game, image, top, left, width, height, action: { name: 'upInitial1', routine: this.upInitial1.bind(this) } });
				this.up2 = new Up({ renderer, game, image, top, left: left + width + 30, width, height, action: { name: 'upInitial2', routine: this.upInitial2.bind(this) } });
				this.up3 = new Up({ renderer, game, image, top, left: left + width * 2 + 60, width, height, action: { name: 'upInitial3', routine: this.upInitial3.bind(this) } });
				top += height + 10;
				this.initial1 = new Text({ renderer, size, width, height, justify, top, left: left + 6, text: 'A'});
				this.initial2 = new Text({ renderer, size, width, height, justify, top, left: left + width + 36, text: 'A'});
				this.initial3 = new Text({ renderer, size, width, height, justify, top, left: left + width * 2 + 66, text: 'A'});
				this.playground.add(this.initial1);
				this.playground.add(this.initial2);
				this.playground.add(this.initial3);
				top += height + 10;
				image = this.game.remoteAssets.get('down').image;
				this.down1 = new Down({ renderer, game, image, top, left, width, height, action: { name: 'downInitial1', routine: this.downInitial1.bind(this) } });
				this.down2 = new Down({ renderer, game, image, top, left: left + width + 30, width, height, action: { name: 'downInitial2', routine: this.downInitial2.bind(this) } });
				this.down3 = new Down({ renderer, game, image, top, left: left + width * 2 + 60, width, height, action: { name: 'downInitial3', routine: this.downInitial3.bind(this) } });

				this.submitButton = new Button({
					game: this.game,
					renderer: this.renderer,
					top: this.down1.top + this.down1.height + 20,
					left: this.playground.left,
					width: this.playground.width,
					height: fontSizes[20].height,
					size: 20,
					text: "SUBMIT",
					color: "GreenYellow",
					action: {
						name: 'gameOverSubmitButton',
						routine: this.processSubmitButton.bind(this)
					}
				});

				this.playground.add(this.up1);
				this.playground.add(this.up2);
				this.playground.add(this.up3);
				this.playground.add(this.down1);
				this.playground.add(this.down2);
				this.playground.add(this.down3);
				this.playground.add(this.submitButton);

				this.highScoreComponents = [
					this.up1, this.up2, this.up3, this.down1, this.down2, this.down3, this.initial1, this.initial2, this.initial3, this.submitButton, this.youGotHighScoreText
				];
			}
			this.enableHighScoreComponents();
		} else {
			this.timer = setTimeout(this.nextScreen.bind(this), 10000);
		}
		this.scoreboard.draw();
		this.playground.draw();
	}

	/**
	 * Stops the Game Over screen. NOTE: We need to fix the super.stop() in Screen as it does a 'clear', not 'erase'.
	 */
	stop() {
		this.playground.erase();
		this.disableHighScoreComponents();
	}

	/**
	 * Go onwards to the next screen
	 */
	nextScreen() {
		this.game.switchScreens('intro');
	}

	/**
	 * Process the Start Button Click
	 */
	processStartButton() {
		clearTimeout(this.timer);
		this.game.switchScreens('play');
	}

	/**
	 * Process the New High Score submit button.
	 */
	processSubmitButton() {
		const score = this.scoreboard.getScore();
		const initials = `${this.initial1.text}${this.initial2.text}${this.initial3.text}`;
		this.game.highScores.setHighScore(score, initials);
		this.scoreboard.setHighScore(score, initials);
		this.game.switchScreens('intro');
	}

	/**
	 * Move the first initial up by 1 letter
	 */
	upInitial1() {
		this.upInitial(this.initial1);
	}

	/**
	 * Move the second initial up by 1 letter
	 */
	upInitial2() {
		this.upInitial(this.initial2);
	}

	/**
	 * Move the third initial up by 1 letter
	 */
	upInitial3() {
		this.upInitial(this.initial3);
	}

	/**
	 * Move the first initial down by 1 letter
	 */
	downInitial1() {
		this.downInitial(this.initial1);
	}

	/**
	 * Move the second initial down by 1 letter
	 */
	downInitial2() {
		this.downInitial(this.initial2);
	}

	/**
	 * Move the third initial down by 1 letter
	 */
	downInitial3() {
		this.downInitial(this.initial3);
	}

	/**
	 * Move passed initial up by 1 letter
	 * @param {Object} initialObj - the initial in question
	 */
	upInitial(initialObj) {
		initialObj.erase();
		// initialObj = this.getNextInitial(initialObj);
		let index = this.initialRange.indexOf(initialObj.text) + 1;
		index = index === this.initialRange.length ? 0 : index;
		initialObj.text = this.initialRange.charAt(index);
		initialObj.draw();
	}

	/**
	 * Move passed initial down by 1 letter
	 * @param {Object} initialObj - the initial in question
	 */
	downInitial(initialObj) {
		initialObj.erase();
		// initialObj = this.getPrevInitial(initialObj);
		let index = this.initialRange.indexOf(initialObj.text) - 1;
		index = index === -1 ? this.initialRange.length - 1 : index;
		initialObj.text = this.initialRange.charAt(index);
		initialObj.draw();
	}

	/**
	 * Enable high score components to be clickable. This is needed to prevent clicking on
	 * the buttons when they are not on the screen, but are still part of the playground
	 */
	enableHighScoreComponents() {
		this.highScoreComponents.forEach( component => {
			component.noDraw = false;
			if (component.action) component.action.check = true;
		});
		this.initial1.text = "A";
		this.initial2.text = "A";
		this.initial3.text = "A";
	}

	/**
	 * Disable high score components to be clickable. This is needed to prevent clicking on
	 * the buttons when they are not on the screen, but are still part of the playground.
	 */
	disableHighScoreComponents() {
		this.highScoreComponents.forEach( component => {
			component.noDraw = true;
			if (component.action) component.action.check = false;
		});
	}

}
