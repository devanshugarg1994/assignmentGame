import { BasicNode } from "../UiComponent/BasicNode";

export class LoadingUI extends BasicNode {
    constructor(json: any) {
        super(json);
        
    }

    protected resize(_event?: Event): void {
        const txt = this.getLabelRefrences("loadingText");
        txt.x = innerWidth / 2;
        txt.y = innerHeight /2;

    }
    


}