import { EightBitAdder } from "../circuits/adders/eightBitAdder.ts";
import { Inverter } from "../circuits/inverter.ts";
import { InputSwitch } from "../inputOutput/inputSwitch.ts";
import { LogGate } from "../inputOutput/logOutput.ts";
import PowerSource from "../machine.ts";

/*
 /////
 An example showing an 8 bit adder usage
 /////
*/

const powerSource = new PowerSource({ tick: 200 });

// Invert the power source signal
const inverter = new Inverter();
inverter.connect(powerSource);

// First 8-bit number (the number 1)
const inputA8 = new InputSwitch(powerSource, 0);
const inputA7 = new InputSwitch(powerSource, 0);
const inputA6 = new InputSwitch(powerSource, 0);
const inputA5 = new InputSwitch(powerSource, 0);
const inputA4 = new InputSwitch(powerSource, 0);
const inputA3 = new InputSwitch(powerSource, 0);
const inputA2 = new InputSwitch(powerSource, 0);
const inputA1 = new InputSwitch(powerSource, 1);

// Second 8-bit number (also the number 1)
const inputB8 = new InputSwitch(powerSource, 0);
const inputB7 = new InputSwitch(powerSource, 0);
const inputB6 = new InputSwitch(powerSource, 0);
const inputB5 = new InputSwitch(powerSource, 0);
const inputB4 = new InputSwitch(powerSource, 0);
const inputB3 = new InputSwitch(powerSource, 0);
const inputB2 = new InputSwitch(powerSource, 0);
const inputB1 = new InputSwitch(powerSource, 1);

// Add the two numbers together
const eightBitAdder = new EightBitAdder();
eightBitAdder.connect(
  [inputA8, inputA7, inputA6, inputA5, inputA4, inputA3, inputA2, inputA1],
  [inputB8, inputB7, inputB6, inputB5, inputB4, inputB3, inputB2, inputB1],
  inverter
);

// The sum is an 8-bit number, which is 1 + 1 = 2
// or 00000010
const sum = eightBitAdder.getOutputBytes();

const output8 = new LogGate("0");
output8.connect(sum[0]);

const output7 = new LogGate("1");
output7.connect(sum[1]);

const output6 = new LogGate("2");
output6.connect(sum[2]);

const output5 = new LogGate("3");
output5.connect(sum[3]);

const output4 = new LogGate("4");
output4.connect(sum[4]);

const output3 = new LogGate("5");
output3.connect(sum[5]);

const output2 = new LogGate("6");
output2.connect(sum[6]);

const output1 = new LogGate("7");
output1.connect(sum[7]);
