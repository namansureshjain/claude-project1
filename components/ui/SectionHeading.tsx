export default function SectionHeading({
  index,
  title,
  lede,
  id,
}: {
  index: string;
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      <span className="label-mono block">{index}</span>
      <h2
        id={id}
        className="mt-3 text-[clamp(1.75rem,4.4vw,3rem)] font-light leading-[1.05] tracking-[-0.02em] text-paper"
      >
        {title}
      </h2>
      {lede && (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-smoke md:text-base">{lede}</p>
      )}
    </header>
  );
}
