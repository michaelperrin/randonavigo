const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `/api/image?url=${encodeURIComponent(src)}&w=${width}&q=${
    quality || 80
  }`;
};

export default imageLoader;
