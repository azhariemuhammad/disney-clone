import React from 'react'
import { Image } from '@chakra-ui/react'
import useLazyLoadImage from '../hooks/useLazyLoadImage'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  sx?: React.CSSProperties
}

const LazyImage = ({ src, alt, sx }: LazyImageProps) => {
  const imgRef = useLazyLoadImage()

  return <Image ref={imgRef} data-src={src} alt={alt} sx={sx} className='lazy' />
}

export default LazyImage
