type EmotiveImageProps = {
  src: string;
  alt: string;
  caption?: string;
  align?: "left" | "center";
};

/**
 * Full-bleed emotional photography band — deep navy imagery with a soft
 * gradient veil so brand light (violet / pink / cyan) carries through.
 */
export function EmotiveImage({
  src,
  alt,
  caption,
  align = "left",
}: EmotiveImageProps) {
  return (
    <figure className="relative isolate overflow-hidden bg-ink">
      <img
        src={src}
        alt={alt}
        width={1408}
        height={1008}
        loading="lazy"
        className="h-[380px] w-full object-cover opacity-95 sm:h-[460px] lg:h-[560px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent" />
      {caption ? (
        <figcaption
          className={`absolute inset-x-0 bottom-0 mx-auto flex max-w-6xl px-6 pb-10 lg:px-10 lg:pb-14 ${
            align === "center" ? "justify-center text-center" : ""
          }`}
        >
          <p className="max-w-md font-serif text-2xl leading-snug text-background sm:text-3xl">
            {caption}
          </p>
        </figcaption>
      ) : null}
    </figure>
  );
}
