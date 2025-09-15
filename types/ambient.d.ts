declare module '@radix-ui/react-slot' {
  import * as React from 'react'
  export const Slot: React.ComponentType<React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>
}

declare module 'class-variance-authority' {
  // Minimal type shims to satisfy the TypeScript compiler
  export type VariantProps<T> = any
  export function cva(base?: string, config?: any): (props?: any) => string
}


