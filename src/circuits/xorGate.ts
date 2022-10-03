import { getId } from "../utils.ts";
import { AndGate } from "./andGate.ts";
import { Input, Output } from "./index.ts";
import { NandGate } from "./nandGate.ts";
import { OrGate } from "./orGate.ts";

export class XorGate implements Input, Output {
  id: string;

  private orGate = new OrGate();
  private nandGate = new NandGate();
  private andGate = new AndGate();
  private outConnections: Input[] = [];

  constructor() {
    this.id = getId("xor_gate");
  }

  connect(connectA: Output, connectB: Output) {
    this.orGate.connect(connectA, connectB);
    this.nandGate.connect(connectA, connectB);
    this.andGate.connect(this.orGate, this.nandGate);
  }

  handleInput(charge: boolean): void {
    // handled by andGate
  }

  handleConnectToInput(connect: Input) {
    this.andGate.handleConnectToInput(connect);
  }
}
