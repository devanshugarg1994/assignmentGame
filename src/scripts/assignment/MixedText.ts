import { Sprite } from "pixi.js";
import { Assets, EmojiPath } from "../Assets";
import { Loader } from "../Engine/Loader";
import { game } from "../main";
import { BasicNode } from "../UiComponent/BasicNode";
import { Label } from "../UiComponent/Label";
import { CustomEventConstant } from "./EventConstant";

const NumberOfCharcter = 3;
const MinFont = 16;
const MaxFont = 32;
const offsetSpace = 10;
const NextCycleTimeInSec = 2;
export class MixedText extends BasicNode {
    constructor(json: any) {
        super(json);
        this.json = json;
        window.dispatchEvent(new CustomEvent(CustomEventConstant.SHOW_BACK_BUTTON, {
            detail: {
                show: true
            }
        }));
        this.randomTxt = game.loader.resources[Assets.RandomTxtJSON].data.randomTxt;
        this.loadAssets();
        this.registerEvent();

    }

    private registerEvent() {
        this.unRegisterEvent
        window.addEventListener(CustomEventConstant.BACK_BUTTON_PRESSED, this.removeScheduledTask.bind(this));

    }

    private unRegisterEvent() {
        window.removeEventListener(CustomEventConstant.BACK_BUTTON_PRESSED, this.removeScheduledTask.bind(this));

    }

    protected resize(event: Event): void {
        const scale = Math.min((innerWidth / 1280), (innerHeight / 720));
        this.scale.set(scale, scale);
        event?.preventDefault();
    }


    loadAssets() {

        Loader.loadDynamic(EmojiPath, (_loader: PIXI.Loader, _resources: Partial<Record<string, PIXI.LoaderResource>>) => {
            const callback = () => {
                this.emojiList = [];
                this.removeChildren();
                this.setUp();
            }
            game.scheduleTask("MIXED_TEXT_SCHEDULER", NextCycleTimeInSec, callback);
            callback();

        });
    }

    private setUp() {
        let numberOfImage = Math.round(Math.random() * NumberOfCharcter);
        while (numberOfImage > 0) {
            const img: string = "../images/" + Math.floor((Math.random() * EmojiPath.length + 1)) + ".png"
            this.emojiList.push(new Sprite(game.loader.resources[img]?.texture));
            numberOfImage--;
        }


        if (NumberOfCharcter - this.emojiList.length === 0) {
            this.threeImages();
        } else if (NumberOfCharcter - this.emojiList.length === 1) {
            this.twoImages();
        } else if (NumberOfCharcter - this.emojiList.length === 2) {
            this.oneImage();
        } else {
            this.addSingleText();
        }

        this.x = Math.random() * (innerWidth - this.width);
        this.y = Math.random() * (innerHeight - this.height);
    }


    private threeImages() {
        this.emojiList.forEach((element: Sprite, _index: number) => {
            this.addChild(element);
        }, this);
        this.setPositionofMessage();

    }



    private twoImages() {
        this.emojiList.forEach((element: Sprite, _index: number) => {
            this.addChild(element);
        }, this);
        const randomTxtpostion = Math.floor(Math.random() * NumberOfCharcter);
        this.addSingleText(randomTxtpostion);
        this.setPositionofMessage();
    }

    private oneImage() {
        const jsonData = this.json.txt;
        jsonData.style.fontSize = Math.floor((Math.random() * MaxFont) + MinFont);
        const randomTxtIndex = Math.floor(Math.random() * this.randomTxt.length)
        const textStatement: string[] = this.randomTxt[randomTxtIndex].split(" ");
        const randomPosition = Math.floor(Math.random() * textStatement.length);

        let numberOfTxt = NumberOfCharcter - this.emojiList.length;
        let index = 0;
        while (index < numberOfTxt) {
            jsonData.id = this.json.id + index;
            const txt = new Label(jsonData);
            txt.anchor.set(0, 0);
            if (index === 0) {
                txt.text = this.getAppendedString(0, randomPosition, textStatement);
            } else {
                txt.text = this.getAppendedString(randomPosition, textStatement.length, textStatement);

            }
            this.addChild(txt);
            index++;
        }

        const emoji: Sprite = this.emojiList.pop() as Sprite;
        this.addChildAt(emoji, 1);
        this.setPositionofMessage();
    }


    private addSingleText(randomTxtpostion?: number) {
        const jsonData = this.json.txt;
        jsonData.id = this.json.id + "1";
        jsonData.style.fontSize = Math.floor((Math.random() * MaxFont) + MinFont);
        const randomTxtIndex = Math.floor(Math.random() * this.randomTxt.length)
        const txt = new Label(jsonData);
        txt.text = this.randomTxt[randomTxtIndex];
        txt.anchor.set(0, 0);
        if (randomTxtpostion) {
            this.addChildAt(txt, randomTxtpostion);
        } else {
            this.addChild(txt);

        }
    }

    getAppendedString(start: number, end: number, textStatement: string[]) {
        let words: string = ""
        for (let i = start; i < end; i++) {
            words = words + " " + textStatement[i];
        }

        return words;
    }


    private setPositionofMessage() {
        this.children.forEach((element, index) => {
            if (index === 0) {
                element.x = 0;
            } else {
                // @ts-ignore               
                element.x = this.children[index - 1].x + this.children[index - 1].width + offsetSpace;
            }
        }, this);
    }

    private removeScheduledTask() {
        game.removeScheduledTask("MIXED_TEXT_SCHEDULER")
    }




    private emojiList: Sprite[] = [];
    private json: any;
    private randomTxt!: string[];
       
}