import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, PanInfo, useMotionValue, animate } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'
import { Box, Flex, Grid } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  width?: string
}

const transition: any = {
  type: 'spring',
  bounce: 0,
  duration: 3,
}

export const Slider = ({ children, width }: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const cardBoxRef = React.useRef<HTMLDivElement>(null)
  const items = React.Children.toArray(children)
  const [[imageCount, direction], setImageCount] = useState([0, 0])
  const GAP = 16

  const motionValue = useMotionValue(0)
  const activeIndex = wrap(0, items.length, imageCount)
  const clientW = Number(cardBoxRef.current?.clientWidth ?? 0) + GAP
  const xPosition = (clientW / window.innerWidth) * 100 - GAP * 2
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
    <Box pos='relative' flexDirection='column' cursor='grab' ref={containerRef} width='100vw' marginLeft='-16px'>
      <AnimatePresence initial={false} custom={direction}>
        <Grid gridAutoFlow='column' gap={`${GAP}px`} overflow='hidden' paddingX='16px'>
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
              // disabled animation when items is only 1
              {...(items.length !== 1 ? { drag: 'x' } : {})}
              dragElastic={1}
              onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
            >
              <Box w='full' height='100%' left={`${index * 100}%`} right={`${index * 100}%`} ref={cardBoxRef}>
                {child}
              </Box>
            </motion.div>
          ))}
        </Grid>
      </AnimatePresence>
      {items.length > 1 && (
        <Flex justifyContent='center' mt={4} h='100%'>
          <>
            {items.map((_, index) => (
              <Box
                w={activeIndex === index ? '40px' : '8px'}
                h='8px'
                borderRadius={activeIndex === index ? 'lg' : '50%'}
                m='0px 8px'
                display='inline-block'
                cursor='pointer'
                bg={activeIndex === index ? '#007aff' : '#e5e5e5'}
                key={index}
              />
            ))}
          </>
        </Flex>
      )}
    </Box>
  )
}
