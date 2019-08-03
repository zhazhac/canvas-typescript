import { Canvas2DApplication } from "../Canvas/CanvasApplication";
import { Tank } from "./Tank";
import Math2D from "../Math2D";
import { CanvasMouseEvent } from "../Core/Event/CanvasMouseEvent";

export class TestApplication extends Canvas2DApplication {

    private _tank: Tank;
    private _mouseX: number;
    private _mouseY: number;

    public constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this._tank = new Tank();
        this._tank.x = canvas.width * 0.5;
        this._tank.y = canvas.height * 0.5;
        this._tank.scaleX = 2;
        this._tank.scaleY = 2;
        this.isSuportMouseMouseMove = true;
    }

    public drawTank() : void {
        this._tank.draw(this);
    }

    public drawCanvasCoordCenter() : void {
        if(this.context2D === null) {
            return;
        }

        let halfWidth: number = this.canvas.width * 0.5;
        let HalfHeight: number = this.canvas.height * 0.5;
        this.context2D.save();
        this.context2D.lineWidth = 2;
        this.context2D.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        this.strokeLine(0, HalfHeight, this.canvas.width, HalfHeight);
        this.context2D.strokeStyle = 'rgba(0, 0, 255, 0.5)';
        this.strokeLine(halfWidth, 0, halfWidth, this.canvas.height);
        this.context2D.restore();
        this.fillCircle(halfWidth, HalfHeight, 5, 'rgba(0, 0, 0, 0.5)');
    }

    public draw4Quadrant(): void {
        if(this.context2D === null) {
            return;
        }

        this.context2D.save();
        this.fillText('第一象限', this.canvas.width, this.canvas.height, 'rgba(0, 0, 255, 0.5)', 'right', 'bottom', '20px sans-serif');
        this.fillText('第二象限', 0, this.canvas.height, 'rgba(0, 0, 255, 0.5)', 'left', 'bottom', '20px sans-serif');
        this.fillText('第三象限', 0, 0, 'rgba(0, 0, 255, 0.5)', 'left', 'top', '20px sans-serif');
        this.fillText('第四象限', this.canvas.width, 0, 'rgba(0, 0, 255, 0.5)', 'right', 'top', '20px sans-serif');
        this.context2D.restore();
    }

    protected dispatchMouseMove(evt: CanvasMouseEvent) {
        this._mouseX = evt.canvasPosition.x;
        this._mouseY = evt.canvasPosition.y;
        this._tank.onMouseMove(evt);
    }

    public render(): void {
        if(this.context2D !=  null) {
            let _centX: number;

            this.context2D.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.strokeGrid();
            this.drawCanvasCoordCenter();
            this.draw4Quadrant();
            this.drawTank();
        }
    }
}