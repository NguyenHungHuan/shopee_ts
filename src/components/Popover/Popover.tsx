import {
  FloatingArrow,
  arrow,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
  type Placement
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type ElementType } from 'react'

interface Props {
  renderPopover: React.ReactNode
  placement?: Placement
  className?: string
  as?: ElementType
  children: React.ReactNode
  isArrow?: boolean
}

export default function Popover({
  renderPopover,
  placement = 'bottom-end',
  className,
  as: Element = 'div',
  children,
  isArrow = true
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { x, y, strategy, refs, context } = useFloating({
    middleware: [
      arrow({
        element: arrowRef
      }),
      offset(-6),
      shift()
    ],
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement
  })
  const hover = useHover(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <Element ref={refs.setReference} {...getReferenceProps()} className={className}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='z-10'
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
              transformOrigin: `${context.middlewareData.arrow?.x}px top`
            }}
            {...getFloatingProps()}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isArrow && <FloatingArrow ref={arrowRef} context={context} className='h-6 w-6 fill-white' />}
            {renderPopover}
          </motion.div>
        )}
      </AnimatePresence>
    </Element>
  )
}
