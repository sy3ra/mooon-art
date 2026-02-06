import { Metadata } from 'next';
import ExhibitionClient from './ExhibitionClient';

export const metadata: Metadata = {
    title: 'Exhibitions | Mooon Art',
    description: 'Upcoming and past exhibitions.',
};

export default function ExhibitionPage() {
    return <ExhibitionClient />;
}
