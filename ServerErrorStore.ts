import { Store } from "./Store";

export interface ApiError {
  id: string;
  message: string;
  timestamp: string;
}

class ServerErrorStore extends Store<ApiError[]> {
  constructor(state: ApiError[]) {
    super(state);
  }

  addError(error: ApiError) {
    this.setState([...this.getState(), error]);
  }

  dismissError(id: string) {
    this.setState(this.getState().filter((e) => e.id !== id));
  }
}

export const serverErrorStore = new ServerErrorStore([]);
