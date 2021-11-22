import { Deferred, deferred } from "../deps.ts";

export class Mutex {
  #locked?: Deferred<void>;
  #queue: Deferred<void>[] = [];

  get locked() {
    return this.#locked?.state === "pending";
  }

  async lock() {
    const currentQueue = [...this.#queue];
    const entry = deferred<void>();
    this.#queue.push(entry);
    await Promise.allSettled(currentQueue);

    await this.#locked;

    // Commit this lock.
    this.#locked = deferred();
    entry.resolve();
  }

  unlock() {
    this.#locked?.resolve();
  }
}
