export class Store<T> {
  private state: T;
  private callbacks: { [key: string]: (state: T) => void } = {};
  private counter = 0;

  constructor(state: T) {
    this.state = state;
  }

  subscribe(callback: (state: T) => void): number {
    this.counter++;
    this.callbacks[this.counter] = callback;
    return this.counter;
  }

  unsubscribe(handle: number) {
    delete this.callbacks[handle];
  }

  trigger() {
    Object.keys(this.callbacks).map((obj) => {
      this.callbacks[obj].call(null, this.state);
    });
  }

  setState(state: T) {
    this.state = state;
    this.trigger();
  }

  getState(): T {
    return this.state;
  }
}
