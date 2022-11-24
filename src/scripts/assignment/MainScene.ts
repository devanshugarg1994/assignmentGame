import { Assets } from "../Assets";
import { game } from "../main";
import { BasicNode } from "../UiComponent/BasicNode";
import { ShapeButton } from "../UiComponent/ShapeButton";
import { CustomEventConstant, EventConstant } from "./EventConstant";
import { MixedText } from "./MixedText";
import { Particle } from "./Particle";
import { SpriteOneFourFour } from "./SpriteOneFourFour";


const NUMBER_OF_TASK: number = 3;
const BUTTON_MARGIN_Y: number = 50
export class MainScene extends BasicNode {
    constructor(json: any) {
        super(json);
        this.spriteOneFourFour = this.getShapeButtonRefrences("button1");
        this.mixedText = this.getShapeButtonRefrences("button2");
        this.particle = this.getShapeButtonRefrences("button3");
        this.init();
    }

    private init() {

        this.registerEvents();

    }

    private registerEvents() {
        this.unRegisterEvents();
        this.spriteOneFourFour.registerEvent(EventConstant.POINTER_DOWN, this.onSpriteOneFourFourPressed.bind(this));
        this.mixedText.registerEvent(EventConstant.POINTER_DOWN, this.onMixedTextPressed.bind(this));
        this.particle.registerEvent(EventConstant.POINTER_DOWN, this.onParticlePressed.bind(this));
        window.addEventListener(CustomEventConstant.BACK_BUTTON_PRESSED, this.addMainScene.bind(this));
    }


    private unRegisterEvents() {
        this.spriteOneFourFour.unRegister(EventConstant.CLICK, this.onSpriteOneFourFourPressed.bind(this));
        this.mixedText.unRegister(EventConstant.CLICK, this.onMixedTextPressed.bind(this));
        this.particle.unRegister(EventConstant.CLICK, this.onParticlePressed.bind(this));
        window.removeEventListener(CustomEventConstant.BACK_BUTTON_PRESSED, this.addMainScene.bind(this));

    }

    protected resize(_event?: Event): void {
        for (let i: number = 1; i <= NUMBER_OF_TASK; i++) {
            const btn: ShapeButton = this.getShapeButtonRefrences("button" + i);
            btn.x = innerWidth / 2;
            btn.y = (innerHeight / 2) + ((i - 2) * (btn.height + BUTTON_MARGIN_Y));
        }
    }

    private onSpriteOneFourFourPressed(_event: Event) {
        game.stage.removeChild(this);
        this.topChild  = new SpriteOneFourFour(game.loader.resources[Assets.SpriteOneFourFourJSON]?.data.spriteOneFourFour);
        game.stage.addChild(this.topChild);

    }

    private onMixedTextPressed(_event: Event) {
        game.stage.removeChild(this);
        this.topChild  = new MixedText(game.loader.resources[Assets.MixedTextJSON]?.data.mixedText);
        game.stage.addChild(this.topChild);
    }

    private onParticlePressed(_event: Event) {
        game.stage.removeChild(this);
        this.topChild  = new Particle(game.loader.resources[Assets.PartcleJSON]?.data.particleEffect);
        game.stage.addChild(this.topChild);
        console.log("onParticlePressed");

    }

    private addMainScene(_event?: Event) {
        this.topChild.destroy();
        game.stage.addChild(this);
    }


    private spriteOneFourFour: ShapeButton;
    private mixedText: ShapeButton;
    private particle: ShapeButton;
    private topChild!: BasicNode;

}