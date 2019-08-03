import { Applicatoin } from "../Core/Application";

type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle'| 'bottom';
type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end';
type FontType = '10px sans-serif' | '15px sans-serif' | '20px sans-serif' | '25px sans-serif';

export class Canvas2DApplication extends Applicatoin {
    public context2D: CanvasRenderingContext2D | null = null;
    public constructor(canvas: HTMLCanvasElement, contextAttrbutes?: CanvasRenderingContext2DSettings) {
        super(canvas);

        this.context2D = this.canvas.getContext("2d", contextAttrbutes);
    }

    public fillCircle(x: number, y: number, radius: number, fillStyle: string | CanvasGradient | CanvasPattern = 'red') {
        if(this.context2D != null) {
            this.context2D.save();
            this.context2D.fillStyle = fillStyle;
            this.context2D.beginPath();
            this.context2D.arc(x, y, radius, 0, Math.PI * 2);
            this.context2D.fill();
            this.context2D.restore();
        }
    }
    
    public strokeLine(x0: number, y0: number, x1: number, y1: number) : void {
        if(this.context2D !== null) {
            this.context2D.beginPath();
            this.context2D.moveTo(x0, y0);
            this.context2D.lineTo(x1, y1);
            this.context2D.stroke();
        }
    }

    public strokeCoord(originX: number, originY: number, width: number, height: number): void {
        if(this.context2D !== null) {
            this.context2D.save();
            this.context2D.strokeStyle = 'red';
            this.strokeLine(originX, originY, originX + width, originY);
            this.context2D.strokeStyle = 'blue';
            this.strokeLine(originX, originY, originX, originY + height);
            this.context2D.restore();
        }
    }

    public strokeGrid(color: string = 'grey', interval: number = 10): void {
        if(this.context2D !== null) {
            this.context2D.save();
            this.context2D.strokeStyle = color;
            this.context2D.lineWidth = 0.5;
            for(let i: number = interval + 0.5; i < this.canvas.width; i += interval) {
                this.strokeLine(i, 0, i, this.canvas.height);
                this.strokeLine(0, i, this.canvas.width, i);
            }
            this.context2D.restore();
            this.fillCircle(0, 0, 5, 'green');
            this.strokeCoord(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    public fillText(text: string, x: number, y: number, color: string = 'white',
        align: TextAlign = 'left', baseline: TextBaseline = 'top', font: FontType = '10px sans-serif'): void {
        if(this.context2D !== null) {
            this.context2D.save();
            this.context2D.textAlign = align;
            this.context2D.textBaseline = baseline;
            this.context2D.font = font;
            this.context2D.fillStyle = color;
            this.context2D.fillText(text, x, y);
            this.context2D.restore();
        }
    }
};