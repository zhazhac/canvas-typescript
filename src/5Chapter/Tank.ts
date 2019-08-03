import { TestApplication } from "./TestApplication";
import {CanvasMouseEvent} from '../Core/Event/CanvasMouseEvent';

export class Tank {
    public width: number = 80;
    public height: number = 50;

    public x: number = 100;
    public y: number = 100;

    public scaleX: number = 1.0;
    public scaleY: number = 1.0;

    //  整个坦克旋转，弧度表示
    public tankRotation: number = 0;
    //  炮塔的旋转角度，弧度表示
    public turretRotation: number = 0;

    public initYAxis: boolean = true;
    public showLine: boolean = false;

    public showCoord: boolean = false;
    public gunLength : number = Math.max(this.width, this.height);
    public gunMuzzleRadius: number = 5;

    public targetX: number = 0;
    public targetY: number = 0;

    public draw(app: TestApplication) {
        if(app.context2D === null) {
            return;
        }

        app.context2D.save();

        app.context2D.translate(this.x, this.y);
        app.context2D.rotate(this.tankRotation);
        app.context2D.scale(this.scaleX, this.scaleY);

        app.context2D.save();
        app.context2D.fillStyle = 'grey';
        app.context2D.beginPath();
        app.context2D.rect(-this.width*0.5, -this.height* 0.5, this.width, this.height);
        app.context2D.fill();
        app.context2D.restore();

        app.context2D.save();
        app.context2D.rotate(this.turretRotation);
        app.context2D.fillStyle = 'red';
        app.context2D.beginPath();
        app.context2D.ellipse(0, 0, 15, 10, 0, 0, Math.PI * 2);
        app.context2D.fill();

        app.context2D.strokeStyle = 'blue';
        app.context2D.lineWidth = 5;
        app.context2D.lineCap = 'round';
        app.context2D.beginPath();
        app.context2D.moveTo(0, 0);
        app.context2D.lineTo(this.gunLength, 0);
        app.context2D.stroke();

        app.context2D.translate(this.gunLength, 0);
        app.context2D.translate(this.gunMuzzleRadius, 0);
        app.fillCircle(0, 0, 5, 'black');

        app.context2D.restore();
        app.context2D.save();
        app.context2D.translate(this.width * 0.5, 0);
        app.fillCircle(0, 0, 10, 'green');
        app.context2D.restore();

        if(this.showCoord) {
            app.context2D.save();
            app.context2D.lineWidth = 1;
            app.context2D.lineCap = 'butt';
            app.strokeCoord(0, 0, this.width * 1.2, this.height * 1.2);
            app.context2D.restore();
        }

        app.context2D.restore();
    }

    private _lookAt(): void {
        let diffX: number = this.targetX - this.x;
        let diffY: number = this.targetY - this.y;
        this.tankRotation = Math.atan2(diffY, diffX);
    }

    public onMouseMove(evt: CanvasMouseEvent) : void {
        this.targetX = evt.canvasPosition.x;
        this.targetY = evt.canvasPosition.y;
        this._lookAt();
    }
}