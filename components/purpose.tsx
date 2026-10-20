import Image from "next/image";

const PURPOSE_TEXT =
  "Somos a KNEX Jr Consultoria, Empresa Júnior de Computação da UEPB – Campus VII. Com esta rifa, queremos arrecadar fundos para custear a ida dos nossos membros ao Aurora, evento voltado para Empresas Juniores, que acontece nos dias 21 e 22 de novembro. Cada número comprado nos deixa mais perto de viver essa experiência!";

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
