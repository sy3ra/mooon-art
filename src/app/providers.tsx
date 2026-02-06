"use client";

import { ArtworkProvider } from '../context/ArtworkContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return <ArtworkProvider>{children}</ArtworkProvider>;
}
