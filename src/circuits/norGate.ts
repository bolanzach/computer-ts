import { getId } from "../utils.ts";
import { Input, Output } from "./index.ts";
import { BasicTransistor, Transistor } from "./transistor.ts";

export class NorGate implements Input, Output {
  id: string;

  private transistorA: Transistor;
  private transistorB: Transistor;
  private outConnections: Input[] = [];

  constructor() {
    this.id = getId("nor_gate");
    this.transistorA = new BasicTransistor();
    this.transistorB = new BasicTransistor();
  }

  connect(connectA: Output, connectB: Output) {
    this.transistorA.connect(connectA, this);
    this.transistorB.connect(connectB, this);
  }

  handleInput(charge: boolean): void {
    if (this.outConnections.length) {
      const charged =
        !this.transistorA.isCharged && !this.transistorB.isCharged;
      this.outConnections.forEach((input) => input.handleInput(charged));
    }
  }

  handleConnectToInput(connect: Input) {
    this.outConnections.push(connect);
  }
}
