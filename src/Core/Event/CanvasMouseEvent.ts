import { CanvasInputEvent } from './CanvasInputEvent';

export class CanvasMouseEvent extends CanvasInputEvent {
    // 0: 鼠标左键 1: 鼠标中键 2: 鼠标右键
    public botton: number;
    //  canvas坐标系
    public canvasPosition;

    public localPosition;

    public constructor(canvasPos, button: number,
        altKey: boolean = false, ctrlKey: boolean = false,
        shiftKey: boolean = false) {
            super(altKey, ctrlKey, shiftKey);
            this.canvasPosition = canvasPos;
            this.botton = this.botton;
    }
};