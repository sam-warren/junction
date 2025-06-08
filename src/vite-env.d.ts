/// <reference types="vite/client" />

declare module '*.mdx' {
  import { ComponentType } from 'react';
  import { BlogMetadata } from './types/blog';
  
  const Component: ComponentType;
  export const metadata: BlogMetadata;
  export default Component;
}
