import { game } from "../main";
import { BasicNode } from "../UiComponent/BasicNode";
import { FactoryUI } from "../UiComponent/FactoryUI";
import { Shape } from "../UiComponent/Shape";
import { CustomEventConstant } from "./EventConstant";

export class SpriteOneFourFour extends BasicNode {

    constructor(json: any) {
        super(json);
        this.createCard(json.cardBasicData);
        window.dispatchEvent(new CustomEvent(CustomEventConstant.SHOW_BACK_BUTTON, {
            detail: {
                show: true
            }
        }));

    }

    protected resize(event: Event): void {
        this.pivot.set(1280 / 2, 720 / 2);

        this.x = innerWidth / 2;
        this.y = innerHeight / 2;
        const scale = Math.min((innerWidth / 1280), (innerHeight / 720));
        this.scale.set(scale, scale);
        event?.preventDefault();
    }

    createCard(json: any) {

        for (let i = 0; i < 144; i++) {
            json.id = "cardBasicData" + "_" + i;
            json.y = (json.y / 1.5 + i * 0.5);
            json.fillColor = this.getRandomColor();
            this.cardList.push(FactoryUI.createShape(json, this));
        }

        this.cardIndexProcessing = this.cardList.length - 1;
        this.move();

    }

    private getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    private move() {
        const finalPositionY: number = this.cardList[this.cardIndexProcessing].y / 1.5 + (this.cardList.length - this.cardIndexProcessing - 1) * 0.5;

        game.tweenMove(2, new PIXI.Point(500, finalPositionY), () => {
            console.log("Tween completed", this.cardIndexProcessing);
            this.addChildAt(this.cardList[this.cardIndexProcessing], this.cardList.length - this.cardIndexProcessing - 1);
            this.cardIndexProcessing--;
            if (this.cardIndexProcessing >= 0) {
                this.move();
            }
        }, this.cardList[this.cardIndexProcessing]);
    }


    protected cardList: Shape[] = [];
    private cardIndexProcessing!: number;

}