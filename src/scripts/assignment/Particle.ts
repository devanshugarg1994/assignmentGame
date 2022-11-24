import { Emitter } from "pixi-particles";
import { Texture } from "pixi.js";
import { Assets } from "../Assets";
import { game } from "../main";
import { BasicNode } from "../UiComponent/BasicNode";
import { CustomEventConstant } from "./EventConstant";

export class Particle extends BasicNode {
    constructor(json: any) {
        super(json);
        window.dispatchEvent(new CustomEvent(CustomEventConstant.SHOW_BACK_BUTTON, {
            detail: {
                show: true
            }
        }));
        this.init();
    }


    init() {
        const particleConatiner = this.getContainerRefrences("particleEffectContainer")
        this.emitter = new Emitter(particleConatiner, Texture.from(Assets.FireParticle) , game.loader.resources[Assets.EmitterJSON].data);
        this.start();

    }

    private start() {
        game._app.ticker.add(this.emitterUpdate, this);
        this.emitter.emit = true;
    }


    private emitterUpdate(delta: number): void {
        this.emitter.update(delta);
    }

    private emitter!: Emitter;

}