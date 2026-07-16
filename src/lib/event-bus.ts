type Handler<T> = (
  payload: T
) => void;

class EventBus {
  private listeners =
    new Map<
      string,
      Set<Handler<any>>
    >();

  on<T>(
    event: string,
    handler: Handler<T>
  ) {
    if (
      !this.listeners.has(event)
    ) {
      this.listeners.set(
        event,
        new Set()
      );
    }

    this.listeners
      .get(event)
      ?.add(handler);
  }

  off<T>(
    event: string,
    handler: Handler<T>
  ) {
    this.listeners
      .get(event)
      ?.delete(handler);
  }

  emit<T>(
    event: string,
    payload: T
  ) {
    this.listeners
      .get(event)
      ?.forEach((handler) =>
        handler(payload)
      );
  }
}

export const eventBus =
  new EventBus();