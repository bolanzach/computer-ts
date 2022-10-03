import { getId } from "../../utils.ts";
import { AndGate } from "../andGate.ts";
import { Charge, Input, MultiOutput, Output } from "../index.ts";
import { XorGate } from "../xorGate.ts";

interface HalfAdderOutput {
  sum: Charge;
  carry: Charge;
}

export class HalfAdder implements Input, MultiOutput<HalfAdderOutput> {
  id: string;

  private xorGate = new XorGate();
  private andGate = new AndGate();

  constructor() {
    this.id = getId("half_adder");
  }

  connect(inputA: Output, inputB: Output) {
    this.xorGate.connect(inputA, inputB);
    this.andGate.connect(inputA, inputB);
  }

  handleConnectToInput(input: Input, output: keyof HalfAdderOutput): void {
    if (output === "sum") {
      this.xorGate.handleConnectToInput(input);
    } else if (output === "carry") {
      this.andGate.handleConnectToInput(input);
    }
  }

  handleInput(charge: boolean): void {
    //
  }
}
