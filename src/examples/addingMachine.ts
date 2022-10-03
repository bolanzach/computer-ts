import { EightBitAdder } from "../circuits/adders/eightBitAdder.ts";
import { Inverter } from "../circuits/inverter.ts";
import { InputSwitch } from "../inputOutput/inputSwitch.ts";
import { LogGate } from "../inputOutput/logOutput.ts";
import PowerSource from "../machine.ts";

const powerSource = new PowerSource({ tick: 1000 });

// Invert the power source signal
const inverter = new Inverter();
inverter.connect(powerSource);

// First 8-bit number
const inputA8 = new InputSwitch(powerSource, 0);
const inputA7 = new InputSwitch(powerSource, 0);
const inputA6 = new InputSwitch(powerSource, 0);
const inputA5 = new InputSwitch(powerSource, 1);
const inputA4 = new InputSwitch(powerSource, 0);
const inputA3 = new InputSwitch(powerSource, 0);
const inputA2 = new InputSwitch(powerSource, 0);
const inputA1 = new InputSwitch(powerSource, 1);

// Second 8-bit number
const inputB8 = new InputSwitch(powerSource, 0);
const inputB7 = new InputSwitch(powerSource, 0);
const inputB6 = new InputSwitch(powerSource, 0);
const inputB5 = new InputSwitch(powerSource, 0);
const inputB4 = new InputSwitch(powerSource, 0);
const inputB3 = new InputSwitch(powerSource, 1);
const inputB2 = new InputSwitch(powerSource, 0);
const inputB1 = new InputSwitch(powerSource, 1);

// Add the two numbers together
const eightBitAdder = new EightBitAdder();
eightBitAdder.connect(
  [inputA8, inputA7, inputA6, inputA5, inputA4, inputA3, inputA2, inputA1],
  [inputB8, inputB7, inputB6, inputB5, inputB4, inputB3, inputB2, inputB1],
  inverter
);

const sum = eightBitAdder.getOutputBytes();

const output8 = new LogGate();
output8.connect(sum[7]);

const output7 = new LogGate();
output7.connect(sum[6]);

const output6 = new LogGate();
output6.connect(sum[5]);

const output5 = new LogGate();
output5.connect(sum[4]);

const output4 = new LogGate();
output4.connect(sum[3]);

const output3 = new LogGate();
output3.connect(sum[2]);

const output2 = new LogGate();
output2.connect(sum[1]);

const output1 = new LogGate();
output1.connect(sum[0]);
