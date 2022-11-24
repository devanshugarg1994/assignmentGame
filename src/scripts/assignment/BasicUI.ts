import { game } from "../main";
import { BasicNode } from "../UiComponent/BasicNode";
import { Label } from "../UiComponent/Label";
import { ShapeButton } from "../UiComponent/ShapeButton";
import { CustomEventConstant, EventConstant } from "./EventConstant";

export class BasicUI extends BasicNode {
    constructor(json: any) {
        super(json);
        this.FPS = this.getLabelRefrences("fpsText");
        game.scheduleTask("FPS_COUNT", 0, () => {
            this.FPS.text = '' + game.getFPS().toFixed(2) + 'fps';
        });
        this.backBtn = this.getShapeButtonRefrences("backBtn");
        this.registerEvent();
        this.setPosition();
       }

    protected resize(_event: Event) {
        this.setPosition();
    }

    private setPosition() {
        this.backBtn &&  (this.backBtn.x = innerWidth - this.backBtn.width - 200);

    }

    private registerEvent() {
        this.unRegisterEvent()
        this.backBtn.registerEvent(EventConstant.POINTER_DOWN, this.onBackBtnPressed.bind(this));
        window.addEventListener(CustomEventConstant.SHOW_BACK_BUTTON, this.toggleBackButton.bind(this) as EventListener); 


    }

    private unRegisterEvent() {
        this.backBtn.unRegister(EventConstant.CLICK, this.onBackBtnPressed.bind(this));
        window.removeEventListener(CustomEventConstant.SHOW_BACK_BUTTON, this.toggleBackButton.bind(this)as EventListener);


    }


    private onBackBtnPressed() {
        window.dispatchEvent(new CustomEvent(CustomEventConstant.BACK_BUTTON_PRESSED));
        game.removeTween();
        this.backBtn.visible = false;
    }

    toggleBackButton(event: CustomEvent) {
        this.backBtn.visible = event.detail.show;
    }


    private FPS: Label;
    private backBtn: ShapeButton;

}