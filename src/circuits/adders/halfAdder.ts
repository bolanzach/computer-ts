import { getId } from "../../utils.ts";
import { AndGate } from "../andGate.ts";
import { Output } from "../index.ts";
import { XorGate } from "../xorGate.ts";

/**
 * @input numberA - first number to add
 * @input numberB - second number to add
 *
 * @output sum - sumation of the two
 * @output carry - carry result
 */
export class HalfAdder {
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

  get sumOutput(): Output {
    return this.xorGate;
  }

  get carryOutput(): Output {
    return this.andGate;
  }
}
