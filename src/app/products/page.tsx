import { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
    title: 'Drawings | Mooon Art',
    description: 'Original charcoal and mixed media drawings.',
};

export default function ProductsPage() {
    return <ProductsClient />;
}
