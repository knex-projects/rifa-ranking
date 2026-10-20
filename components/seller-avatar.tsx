"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  photoSrc: string | null;
  initials: string;
  /** Largest size the avatar is shown at, in px; its parent sets the actual size. */
  size: number;
  /** Background behind the initials when there is no photo. */
  fallbackClassName?: string;
};

export function SellerAvatar({ photoSrc, initials, size, fallbackClassName = "bg-p1" }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!photoSrc || failedSrc === photoSrc) {
    return (
      <div
        className={`@container flex size-full items-center justify-center rounded-full font-display text-w1 ${fallbackClassName}`}
        aria-hidden
      >
        <span className="text-[36cqw] leading-none">{initials}</span>
      </div>
    );
  }

  return (
    <Image
      src={photoSrc}
      alt=""
      width={size}
      height={size}
      onError={() => setFailedSrc(photoSrc)}
      className="size-full rounded-full object-cover object-top"
    />
  );
}
