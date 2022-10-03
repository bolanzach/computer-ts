import { getId } from "../../utils.ts";
import { AndGate } from "../andGate.ts";
import { Output } from "../index.ts";
import { HalfAdder } from "./halfAdder.ts";

export class FullAdder {
  id: string;

  private halfAdderA = new HalfAdder();
  private halfAdderB = new HalfAdder();
  private andGate = new AndGate();

  constructor() {
    this.id = getId("half_adder");
  }

  connect(inputA: Output, inputB: Output, carryIn: Output) {
    this.halfAdderA.connect(inputA, inputB);
    this.halfAdderB.connect(carryIn, this.halfAdderA.sumOutput);
    this.andGate.connect(
      this.halfAdderB.carryOutput,
      this.halfAdderA.carryOutput
    );
  }

  get sumOutput(): Output {
    return this.halfAdderB.sumOutput;
  }

  get carryOutput(): Output {
    return this.andGate;
  }
}
