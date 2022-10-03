export type Charge = boolean;

export interface ID {
  id: string;
}

/**
 * A circuit that can accept a Charge as input
 */
export interface Input extends ID {
  /**
   * Gets invoked when a charge passes though this circuit.
   *
   * Generally, a circuit will perform some boolean logic and
   * the invoke any of its connected circuit's `handleInput`
   */
  handleInput(charge: Charge): void;
}

/**
 * A cicuit that can output a Charge
 */
export interface Output {
  /**
   * Connects this Output to some Input.
   *
   * Generally, this Output will add the Input to its list of
   * connections. If this Output is also an Input, then the
   * connected Inputs can later be charged with `handleInput`.
   */
  handleConnectToInput(input: Input): void;
}

/**
 * As it turns our this works out pretty well because
 *  0=falsey Charge
 *  1=truthy Charge
 */
export type Bit = 0 | 1;

/**
 * A byte is 8 bits
 *
 * Notice that this is a tuple of `Output`. This is because our circuits need
 * electirc signals that can change. A bit is really just the Output of some
 * other circuit or power source. If these were just `Charge` then the bits
 * could never flip, and that wouldn't very fun.
 */
export type Byte = [
  Output,
  Output,
  Output,
  Output,
  Output,
  Output,
  Output,
  Output
];

export interface OutputByte {
  getOutputBytes(): Byte;
}
