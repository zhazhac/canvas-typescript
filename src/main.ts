import { TestApplication } from "./5Chapter/TestApplication";

let _application: TestApplication = new TestApplication(document.getElementById('canvas') as HTMLCanvasElement);

_application.start();