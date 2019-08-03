import { Timer, TimerCallback } from './Timer/Timer';
import { CanvasMouseEvent } from './Event/CanvasMouseEvent';
import { CanvasKeyBoardEvent } from './Event/CanvasKeyBoardEvent';

export class Applicatoin implements EventListenerObject {
    protected _start: boolean = false;
    protected _requestId: number = -1;
    protected _lastTime! : number;
    protected _startTime : number;
    protected canvas: HTMLCanvasElement;
    public timers: Timer[] = [];
    private _timeId: number = -1;
    private _fgs: number = 0;
    public isSuportMouseMouseMove: boolean;
    protected _isMouseDown: boolean;

    private get fps() {
        return this._fgs;
    }

    protected constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.canvas.addEventListener('mousedown', this, false);
        this.canvas.addEventListener('mouseup', this, false);
        this.canvas.addEventListener('mousemove', this, false);

        window.addEventListener('keydown', this, false);
        window.addEventListener('keypress', this, false);
        window.addEventListener('keyup', this, false);

        this._isMouseDown = false;
        this.isSuportMouseMouseMove = false;
    }

    public handleEvent(evt: Event): void {
        switch(event.type) {
            case 'mousedown':
                this._isMouseDown = true;
                this.dispatchMouseDown(this._toCanvasMouseEvent(evt));
                break;
            case 'mouseup':
                this._isMouseDown = false;
                this.dispatchMouseUp(this._toCanvasMouseEvent(evt));
                break;
            case 'mousemove':
                if(this.isSuportMouseMouseMove) {
                    this.dispatchMouseMove(this._toCanvasMouseEvent(evt));
                }
                if(this._isMouseDown) {
                    this.dispatchMouseDrag(this._toCanvasMouseEvent(evt));
                }
                break;
            case 'keypress':
                this.dispatchKeyPress(this._toCanvasKeyBoardEvent(evt));
                break;
            case 'keydown':
                this.dispatchKeyDown(this._toCanvasKeyBoardEvent(evt));
                break;
            case 'keyup':
                this.dispatchKeyUp(this._toCanvasKeyBoardEvent(evt));
                break;
        }
    }

    protected dispatchMouseDown(evt: CanvasMouseEvent): void {}

    protected dispatchMouseUp(evt: CanvasMouseEvent): void{}

    protected dispatchMouseMove(evt: CanvasMouseEvent): void{}

    protected dispatchMouseDrag(evt: CanvasMouseEvent): void{}

    protected dispatchKeyPress(evt: CanvasKeyBoardEvent): void{}

    protected dispatchKeyDown(evt: CanvasKeyBoardEvent): void{}

    protected dispatchKeyUp(evt: CanvasKeyBoardEvent): void{}

    private _viewportToCanvasCoordinate(evt: MouseEvent): Object {
        if(this.canvas) {
            let rect: ClientRect = this.canvas.getBoundingClientRect();
            
            let x: number = evt.clientX - rect.left;
            let y: number = evt.clientY - rect.top;

            return {x, y};
        }
        throw new Error('canvas is null');
    }

    private _toCanvasMouseEvent(evt: Event): CanvasMouseEvent {
        let event: MouseEvent = evt as MouseEvent;
        let mousePosition: Object = this._viewportToCanvasCoordinate(event);
        let canvasMouseEvent: CanvasMouseEvent = new CanvasMouseEvent(mousePosition,
            event.button, event.altKey, event.ctrlKey, event.shiftKey);
        return canvasMouseEvent;
    }

    private _toCanvasKeyBoardEvent(evt: Event): CanvasKeyBoardEvent {
        let event: KeyboardEvent = evt as KeyboardEvent;
        let canvasKeyboardEvent: CanvasKeyBoardEvent = new CanvasKeyBoardEvent(event.key, event.keyCode,
            event.repeat, event.altKey, event.ctrlKey, event.shiftKey);
        return canvasKeyboardEvent;
    }

    public removeTimer(id: number) : boolean {
        let _found: boolean = false;

        let _timer: Timer = this.timers.find(timer => timer.id === id);

        if(_timer) {
            _timer.enabled = false;
            _found = true;
        }

        return _found;
    }

    public addTimer(callback: TimerCallback, timeout: number = 1.0, onlyOnce: boolean = false,
        data: any = undefined) :number {

            let timer = this.timers.find(timer => timer.enabled === false);

            if(!timer) {
                timer = new Timer(callback);
                timer.id = ++this._timeId;
                this.timers.push(timer);
            }
            else {
                timer.callback = callback;
            }

            timer.callbackData = data;
            timer.timeout = timeout;
            timer.countdown = timeout;
            timer.enabled = true;
            timer.onlyOnce = onlyOnce;

            return timer.id;
    }

    private _handlerTimers(intervalSec: number): void {

        this.timers.forEach((timer: Timer) => {
            if(timer.enabled){
                timer.countdown -= intervalSec;

                if(timer.countdown < 0) {
                    timer.callback(timer.id, timer.callbackData);

                    if(timer.onlyOnce) {
                        this.removeTimer(timer.id);
                    }
                    else {
                        timer.countdown = timer.timeout;

                    }
                }
            }
        });

    }

    public start() : void {
        if(!this._start) {
            this._start = true;
            this._requestId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            this._requestId = requestAnimationFrame((elapsedMsec: number) : void => {
                this.step(elapsedMsec);
            });
        }
    }

    public stop() : void {
        if(this._start) {
            cancelAnimationFrame(this._requestId);
            this,this._requestId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            this._start = false;
        }
    }

    public isRUnning() : boolean {
        return this._start;
    }

    protected step(timeStamp: number) : void {
        if(this._startTime === -1) {
            this._startTime = timeStamp;
        }
        if(this._lastTime === -1) {
            this._lastTime = timeStamp
        }
        let elapsedMsec: number = timeStamp - this._startTime;

        let intervalSec : number = timeStamp - this._lastTime;

        if(intervalSec !== 0) {
            this._fgs = 1000.0 / intervalSec;
        }

        intervalSec /= 1000.0;

        this._lastTime = timeStamp;

        this._handlerTimers(intervalSec);

        this.update(elapsedMsec, intervalSec);

        this.render();

        requestAnimationFrame((elapsedMsec) : void => {
            this.step(elapsedMsec);
        });
    }

    public update(elapsedMsec: number, intervalSec: number): void {

    }

    public render() : void {}
};