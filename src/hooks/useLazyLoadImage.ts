import { useEffect, useRef } from 'react'

const useLazyLoadImage = () => {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement
            lazyImage.src = lazyImage.dataset.src || ''
            lazyImage.srcset = lazyImage.dataset.srcset || ''
            lazyImage.classList.remove('lazy')
            observer.unobserve(lazyImage)
          }
        })
      },
      {
        root: null,
        threshold: 0,
      },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  return imgRef
}

export default useLazyLoadImage
