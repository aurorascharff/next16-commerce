'use client';

import { motion } from 'framer-motion';
import React from 'react';
import type { HTMLMotionProps } from 'framer-motion';

export function MotionDiv(props: HTMLMotionProps<'div'>) {
  return <motion.div {...props}>{props.children}</motion.div>;
}

export function MotionP(props: HTMLMotionProps<'p'>) {
  return <motion.p {...props}>{props.children}</motion.p>;
}

export function MotionH2(props: HTMLMotionProps<'h2'>) {
  return <motion.h2 {...props}>{props.children}</motion.h2>;
}

export function MotionSection(props: HTMLMotionProps<'section'>) {
  return <motion.section {...props}>{props.children}</motion.section>;
}
