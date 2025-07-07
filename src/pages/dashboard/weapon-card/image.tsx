type ImageProps = {
  src: string;
  alt: string;
};

export default function Image({ src, alt }: ImageProps) {
  return (
    <div className="flex flex-col justify-center relative group">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-all duration-750 group-hover:-rotate-45"
      />
    </div>
  );
}
