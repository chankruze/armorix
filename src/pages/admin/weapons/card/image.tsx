type ImageProps = {
  src: string;
  alt: string;
};

export default function Image({ src, alt }: ImageProps) {
  return (
    <div className="flex flex-col justify-center relative">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-all duration-750 hover:scale-105 hover:-rotate-12"
      />
    </div>
  );
}
