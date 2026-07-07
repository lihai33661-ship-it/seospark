interface Window {
  Paddle: {
    Initialize(config: Record<string, unknown>): void;
    Checkout: {
      open(options: { items: Array<{ priceId: string; quantity: number }> }): void;
      close(): void;
    };
    Environment: {
      set(env: "production" | "sandbox"): void;
    };
  };
}

declare var Paddle: Window["Paddle"];
