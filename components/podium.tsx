import Image from "next/image";
import type { PodiumStep, RankedSeller } from "@/lib/ranking";
import { formatNumber, salesLabel } from "./format";
import { SellerAvatar } from "./seller-avatar";
import { WinnerShader } from "./winner-shader";

// Sizes from the Figma frames, mobile first and desktop (lg) second.
// Mobile shows 1st alone on top, then 3rd and 2nd; desktop shows 3rd, 1st, 2nd in one row.
const PLACE_STYLE: Record<number, {
  column: string;
  base: string;
  gap: string;
  laurel: string;
  avatarSize: number;
  name: string;
  place: string;
  sales: string;
}> = {
  1: {
    column: "order-1 col-span-2 h-[316px] justify-center py-6 lg:order-2 lg:col-span-1 lg:h-[432px] lg:justify-start lg:py-0",
    base: "top-0 lg:top-auto lg:h-[360px]",
    gap: "gap-1.5",
    laurel: "w-[144px] lg:w-[208px]",
    avatarSize: 144,
    name: "text-2xl leading-8 lg:text-[32px] lg:leading-normal",
    place: "text-[40px] leading-[48px] lg:text-[64px] lg:leading-normal",
    sales: "text-[28px] leading-[34px] lg:text-5xl lg:leading-normal",
  },
  2: {
    column: "order-3 h-[202px] justify-end pb-5 lg:h-[354px] lg:justify-start lg:pb-0",
    base: "h-[160px] bg-linear-to-b from-p1 to-p3 lg:h-[270px]",
    gap: "gap-[5px]",
    laurel: "w-[96px] lg:w-[184px]",
    avatarSize: 128,
    name: "text-xl leading-[26px] lg:text-[32px] lg:leading-normal",
    place: "text-[25px] leading-[31px] lg:text-5xl lg:leading-normal",
    sales: "text-lg leading-6 lg:text-[40px] lg:leading-normal",
  },
  3: {
    column: "order-2 h-[202px] justify-end pb-5 lg:order-1 lg:h-[269px] lg:justify-start lg:pb-0",
    base: "h-[148px] bg-linear-to-t from-p1 to-p3 lg:h-[180px]",
    gap: "gap-[5px]",
    laurel: "w-[72px] lg:w-[144px]",
    avatarSize: 100,
    name: "text-xl leading-[26px] lg:text-2xl lg:leading-normal",
    place: "text-[25px] leading-[31px] lg:text-[28px] lg:leading-normal",
    sales: "text-lg leading-6 lg:text-[32px] lg:leading-normal",
  },
};

const POSITIONS = [1, 2, 3];

export function Podium({ steps }: { steps: PodiumStep[] }) {
  if (steps.length === 0) {
    return (
      <section aria-label="Pódio" className="rounded bg-p1 px-6 py-10 text-center font-display text-2xl text-w1">
        Nenhuma venda ainda. O pódio está esperando!
      </section>
    );
  }

  return (
    <section aria-label="Pódio" className="grid grid-cols-2 items-end gap-x-3.5 gap-y-7 lg:grid-cols-3 lg:gap-6">
      {POSITIONS.map((position) => (
        <Place
          key={position}
          position={position}
          sellers={steps.find((step) => step.position === position)?.sellers ?? []}
        />
      ))}
    </section>
  );
}

function Place({ position, sellers }: { position: number; sellers: RankedSeller[] }) {
  const style = PLACE_STYLE[position];
  const ticketsSold = sellers[0]?.ticketsSold ?? 0;

  return (
    <div className={`relative flex flex-col items-center ${style.column}`}>
      <div className={`absolute inset-x-0 bottom-0 overflow-hidden rounded-t ${style.base}`}>
        {position === 1 && (
          <>
            {/* Shown where WebGPU is unavailable and the shader renders nothing. */}
            <div className="absolute inset-0 bg-linear-to-b from-p1 to-p3" />
            <WinnerShader className="absolute inset-0" />
          </>
        )}
      </div>

      {sellers.length > 0 && (
        <div className={`relative flex flex-col items-center text-center lg:gap-0 ${style.gap}`}>
          <ul className="flex justify-center gap-4">
            {sellers.map((seller) => (
              <li key={seller.id} className={`flex flex-col items-center lg:gap-2 ${style.gap}`}>
                <Laurel seller={seller} className={style.laurel} avatarSize={style.avatarSize} />
                <span className={`font-display text-w1 ${style.name}`} title={seller.fullName}>
                  {seller.displayName}
                </span>
              </li>
            ))}
          </ul>
          <p className={`font-bold text-w1 ${style.place}`}>
            <span className="text-g4">{position}</span> Lugar
          </p>
          <p className={`font-bold text-w0 ${style.sales}`}>
            <span className="text-g4">{formatNumber(ticketsSold)}</span> {salesLabel(ticketsSold)}
          </p>
        </div>
      )}
    </div>
  );
}

// The "Coroa de louros" frame: the avatar sits under two wreath layers, all positioned in
// percentages of the 208×190 frame so it scales to every size in the design.
function Laurel({ seller, className, avatarSize }: { seller: RankedSeller; className: string; avatarSize: number }) {
  return (
    <div className={`@container relative aspect-[208/190] shrink-0 ${className}`}>
      <div className="absolute top-[10.53%] left-[15.38%] aspect-square w-[69.23%] rounded-full outline-[length:0.96cqw] outline-p0 outline-solid">
        <SellerAvatar photoSrc={seller.photoSrc} initials={seller.initials} size={avatarSize} />
      </div>
      <div className="absolute inset-[7.98%_9.62%_6.32%_9.62%]">
        <div className="absolute inset-[-0.41%_-0.4%]">
          <Image src="/assets/figma/laurel-stems.svg" alt="" fill unoptimized />
        </div>
      </div>
      <div className="absolute inset-[6.09%_4.79%_7.4%_4.79%]">
        <Image src="/assets/figma/laurel-leaves.svg" alt="" fill unoptimized />
      </div>
    </div>
  );
}
