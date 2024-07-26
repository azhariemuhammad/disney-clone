import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, PanInfo, useMotionValue, animate } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import './styles/Slider.css'

type Props = {
  children: React.ReactNode
}

const transition: any = {
  type: 'spring',
  bounce: 0,
  duration: 3,
}

export const Slider = ({ children }: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const cardBoxRef = React.useRef<HTMLDivElement>(null)
  const items = React.Children.toArray(children)
  const [[imageCount, direction], setImageCount] = useState([0, 0])
  const GAP = 16

  const motionValue = useMotionValue(0)
  const activeIndex = wrap(0, items.length, imageCount)
  const clientW = Number(cardBoxRef.current?.clientWidth ?? 0) + GAP
  const xPosition = typeof window !== 'undefined' ? (clientW / window.innerWidth) * 100 - GAP * 2 : 0
  const calculateNewX = () => -(activeIndex * clientW) + (activeIndex > 0 ? xPosition / 2 : 0)

  const swipeTo = (swipeDirection: number) => {
    setImageCount([imageCount + swipeDirection, swipeDirection])
  }

  const dragEndHandler = (dragInfo: PanInfo) => {
    const clientWidth = containerRef.current?.clientWidth || 0
    const offset = dragInfo.offset
    const draggedDistanceX = dragInfo.offset.x
    const draggedDistanceY = dragInfo.offset.y
    const isHorizontalSwipe = Math.abs(draggedDistanceX) > Math.abs(draggedDistanceY)

    if (isHorizontalSwipe && offset.x > clientWidth / 4) {
      swipeTo(-1)

      return
    }

    if (isHorizontalSwipe && offset.x < -clientWidth / 4) {
      swipeTo(1)

      return
    }

    animate(motionValue, calculateNewX(), transition)
  }

  useEffect(() => {
    const controls = animate(motionValue, calculateNewX(), transition)

    return controls.stop
  }, [activeIndex])

  return (
    <div className='container' ref={containerRef}>
      <AnimatePresence initial={false} custom={direction}>
        <div className='grid'>
          {React.Children.map(children, (child, index) => (
            <motion.div
              key={index}
              style={{
                width: '100%',
                x: motionValue,
              }}
              initial='incoming'
              animate='active'
              exit='exit'
              // Disable animation when items is only 1
              {...(items.length !== 1 ? { drag: 'x' } : {})}
              dragElastic={1}
              onDragEnd={(e, dragInfo) => {
                e.preventDefault()
                dragEndHandler(dragInfo)
              }}
            >
              <div className='card-box' ref={cardBoxRef}>
                {child}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      {items.length > 1 && (
        <div className='pagination'>
          {items.map((_, index) => (
            <div className={`pagination-dot ${activeIndex === index ? 'active' : ''}`} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}
