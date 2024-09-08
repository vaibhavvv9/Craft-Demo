import React, { useState } from 'react';
import './shimmerImage.css'; // Assuming the CSS is saved in a file named ShimmerImage.css

interface ShimmerImageProps {
  src: string;
  alt: string;
}

const ShimmerImage: React.FC<ShimmerImageProps> = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <div className="image-wrapper">
      {!loaded && <div className="shimmer-placeholder"></div>}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
        className={loaded ? 'loaded' : 'not-loaded'}
      />
    </div>
  );
};

export default ShimmerImage;
