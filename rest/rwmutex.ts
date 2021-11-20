// deno-lint-ignore-file no-empty

import { immerable } from "./deps.ts";

export class RWMutex {
  readonly [immerable] = true;

  readonly reads = 0;
  readonly writes = 0;

  #writesWaiting = 0;

  readLock() {
    while (this.writes && this.#writesWaiting) {}
    Reflect.set(this, "reads", 1);
  }

  readUnlock() {
    Reflect.set(this, "reads", Math.max(0, this.reads - 1));
  }

  lock() {
    this.#writesWaiting += 1;
    while (this.reads && this.writes) {}
    Reflect.set(this, "writes", this.writes + 1);
    this.#writesWaiting -= 1;
  }

  unlock() {
    Reflect.set(this, "writes", Math.max(0, this.writes - 1));
  }
}
