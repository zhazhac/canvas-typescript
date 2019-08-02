import { Applicatoin } from "../Core/Application";

export class Canvas2DApplication extends Applicatoin {
    public context2D: CanvasRenderingContext2D | null = null;
    public constructor(canvas: HTMLCanvasElement, contextAttrbutes?: CanvasRenderingContext2DSettings) {
        super(canvas);

        this.context2D = this.canvas.getContext("2d", contextAttrbutes);
    }
};