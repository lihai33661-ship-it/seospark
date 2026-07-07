"use client";

interface PaddleButtonProps {
  priceId: string;
  className: string;
  children: React.ReactNode;
}

export default function PaddleButton({ priceId, className, children }: PaddleButtonProps) {
  return (
    <a
      href={`https://buy.paddle.com/checkout/${priceId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
