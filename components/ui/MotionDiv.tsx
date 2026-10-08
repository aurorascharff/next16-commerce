'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export default function MotionDiv(props: HTMLMotionProps<'div'>) {
  return <motion.div {...props}>{props.children}</motion.div>;
}
