export default class Vec2 {
    public values: Float32Array;

    public constructor(x: number = 0, y: number = 0) {
        this.values = new Float32Array([x, y]);
    }

    public toString(): string {
        return `[ ${this.values[0]} , ${this.values[1]} ]`;
    }

    public get x() : number {
        return this.values[0];
    }

    public set x(val) {
        this.values[0] = val;
    }

    public get y(): number {
        return this.values[1];
    }

    public set y(val) {
        this.values[1] = val;
    }

    public static create(x: number = 0, y: number = 0): Vec2 {
        return new Vec2(x, y);
    }
}