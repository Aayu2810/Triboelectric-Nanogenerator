import React from 'react';
import './globals.css';

export const metadata: { title: string; description: string } = {
  title: 'Hygroelectric Research - TENG Technology',
  description:
    'Harvesting electricity from humidity and water droplets using triboelectric nanogenerator technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}