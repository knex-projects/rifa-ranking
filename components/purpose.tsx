import Image from "next/image";

// Placeholder copied from the design until the real text is sent.
const PURPOSE_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue.";

export function Purpose() {
  return (
    <section aria-labelledby="purpose-title" className="grid items-center gap-6 lg:mt-8 lg:grid-cols-2">
      <div className="flex flex-col gap-6 lg:gap-8">
        <h2 id="purpose-title" className="font-display text-[32px] text-w1 lg:text-5xl">
          Qual o propósito desta <span className="text-g4">rifa</span>?
        </h2>
        <p className="text-base text-w0 lg:text-2xl">{PURPOSE_TEXT}</p>
      </div>

      {/* The "auroraFrame": the logo box is placed and clipped as in Figma, in % of the 564×358 frame. */}
      <div className="relative aspect-[564/358] overflow-hidden rounded-[2.5px] bg-pp0 lg:rounded">
        <div className="absolute top-[18.72%] left-[26.77%] aspect-[271.827/223] w-[48.2%] overflow-hidden">
          <Image
            src="/assets/figma/aurora-logo.svg"
            alt="Aurora — Atitude que nos move"
            width={277.22}
            height={231.016}
            unoptimized
            className="absolute top-[1.3%] left-[-0.06%] h-[103.59%] w-[101.98%] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
