"use client";

import { useEffect, useRef } from "react";

interface Props {
  hostedButtonId: string;
}

export default function PayPalHostedButton({ hostedButtonId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && (window as any).paypal?.HostedButtons) {
        clearInterval(interval);
        (window as any).paypal.HostedButtons({
          hostedButtonId,
        }).render(`#paypal-container-${hostedButtonId}`);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [hostedButtonId]);

  return <div id={`paypal-container-${hostedButtonId}`} ref={containerRef} />;
}
