import { ElectriSignal } from "../machine.ts";
import { getId } from "../utils.ts";
import { Input, Output } from "./index.ts";
import { BasicTransistor, Transistor } from "./transistor.ts";

export class Inverter implements Input, Output {
  id: string;

  private outConnections: Input[] = [];
  private transistor: Transistor;

  constructor() {
    this.id = getId("inverter");
    this.transistor = new BasicTransistor();
  }

  connect(outputConnect: Output) {
    this.transistor.connect(outputConnect, this);
  }

  handleInput(charge: boolean): void {
    if (this.outConnections.length) {
      this.outConnections.forEach((input) => {
        input.handleInput(!charge);
      });
    }
  }

  handleConnectToInput(connect: Input): void {
    this.outConnections.push(connect);
  }
}
