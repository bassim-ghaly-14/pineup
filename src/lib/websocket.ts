export class PineSocket {
  private socket:
    | WebSocket
    | null = null;

  connect(url: string) {
    this.socket =
      new WebSocket(url);
  }

  disconnect() {
    this.socket?.close();
  }

  send(data: unknown) {
    this.socket?.send(
      JSON.stringify(data)
    );
  }
}

export const pineSocket =
  new PineSocket();