import React from 'react'
import useLazyLoadImage from '../hooks/useLazyLoadImage'
import './styles/LazyImage.css'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  sx?: React.CSSProperties
}

const LazyImage = ({ src, alt, sx, className }: LazyImageProps) => {
  const imgRef = useLazyLoadImage()

  return <img ref={imgRef} data-src={src} alt={alt} style={sx} className={`lazy ${className || ''}`} />
}

export default LazyImage
