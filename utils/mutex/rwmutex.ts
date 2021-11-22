import { Deferred, deferred } from "../deps.ts";

export class RWMutex {
  #reads = 0;
  #reading?: Deferred<void>;
  #writing?: Deferred<void>;
  #writeQueue: Deferred<void>[] = [];

  get reads() {
    return this.#reads;
  }

  get writing() {
    return this.#writing?.state === "pending";
  }

  async readLock() {
    await this.#writing;
    await Promise.allSettled(this.#writeQueue);
    this.#reading ??= deferred();
    this.#reads += 1;
  }

  readUnlock() {
    if (!this.reads) return;
    if (this.#reading?.state === "pending" && this.reads === 1) {
      this.#reading?.resolve();
    }

    this.#reads -= 1;
  }

  async lock() {
    // We have to wait in the queue of write locks before we create one.
    const currentQueue = [...this.#writeQueue];
    const entry = deferred<void>();
    this.#writeQueue.push(entry);
    await Promise.allSettled(currentQueue);

    // Wait for others to release their locks.
    await this.#reading;
    await this.#writing;

    // Commit this lock.
    this.#writing = deferred();
    entry.resolve();
  }

  unlock() {
    this.#writing?.resolve();
  }
}
