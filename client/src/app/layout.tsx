import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Tea House - Premium Tea Shop',
  description: 'Explore Importance of Taste, Variety and Healthy Options. Total Satisfaction To Your Taste Buds.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
