"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  photoSrc: string | null;
  initials: string;
  size: number;
};

export function SellerAvatar({ photoSrc, initials, size }: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!photoSrc || failedSrc === photoSrc) {
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-full bg-zinc-200 font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
        style={{ width: size, height: size, fontSize: size * 0.36 }}
        aria-hidden
      >
        {initials}
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
      className="shrink-0 rounded-full object-cover object-top"
      style={{ width: size, height: size }}
    />
  );
}
