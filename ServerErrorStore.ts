export interface ApiError {
  id: string;
  message: string;
  timestamp: string;
}

class ServerErrorStore {
  private errors: ApiError[] = [];
  private callbacks: { [key: string]: (apiErrors: ApiError[]) => void } = {};
  private counter = 0;

  subscribe(callback: (apiErrors: ApiError[]) => void): number {
    this.counter++;
    this.callbacks[this.counter] = callback;
    return this.counter;
  }

  unsubscribe(handle: number) {
    delete this.callbacks[handle];
  }

  trigger() {
    Object.keys(this.callbacks).map((obj) => {
      this.callbacks[obj].call(null, this.errors);
    });
  }

  setErrors(errors: ApiError[]) {
    this.errors = errors;
    this.trigger();
  }

  addError(error: ApiError) {
    this.errors.push(error);
    this.trigger();
  }

  dismissError(id: string) {
    this.errors = this.errors.filter((e) => e.id !== id);
    this.trigger();
  }
}

export const serverErrorStore = new ServerErrorStore();
