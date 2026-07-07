"use client";

interface PaddleButtonProps {
  priceId: string;
  className: string;
  children: React.ReactNode;
}

export default function PaddleButton({ priceId, className, children }: PaddleButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof Paddle === "undefined") {
      window.open(`https://buy.paddle.com/checkout/${priceId}`, "_blank");
      return;
    }
    Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
    });
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
