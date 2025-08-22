'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ ...fadeInUp.transition, delay }}
    >
      {children}
    </motion.div>
  )
}
