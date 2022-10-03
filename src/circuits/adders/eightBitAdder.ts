import { Byte, Output, OutputByte } from "../index.ts";
import { FullAdder } from "./fullAdder.ts";

export class EightBitAdder implements OutputByte {
  private adder1 = new FullAdder();
  private adder2 = new FullAdder();
  private adder3 = new FullAdder();
  private adder4 = new FullAdder();
  private adder5 = new FullAdder();
  private adder6 = new FullAdder();
  private adder7 = new FullAdder();
  private adder8 = new FullAdder();

  connect(bytesA: Byte, bytesB: Byte, carryIn: Output) {
    this.adder8.connect(bytesA[0], bytesB[0], carryIn);
    this.adder7.connect(bytesA[1], bytesB[1], this.adder8.carryOutput);
    this.adder6.connect(bytesA[2], bytesB[2], this.adder7.carryOutput);
    this.adder5.connect(bytesA[3], bytesB[3], this.adder6.carryOutput);
    this.adder4.connect(bytesA[4], bytesB[4], this.adder5.carryOutput);
    this.adder3.connect(bytesA[5], bytesB[5], this.adder4.carryOutput);
    this.adder2.connect(bytesA[6], bytesB[6], this.adder3.carryOutput);
    this.adder1.connect(bytesA[7], bytesB[7], this.adder2.carryOutput);
  }

  getOutputBytes(): Byte {
    return [
      this.adder8.sumOutput,
      this.adder7.sumOutput,
      this.adder6.sumOutput,
      this.adder5.sumOutput,
      this.adder4.sumOutput,
      this.adder3.sumOutput,
      this.adder2.sumOutput,
      this.adder1.sumOutput,
    ];
  }

  get carryOutput(): Output {
    return this.adder1.carryOutput;
  }
}
