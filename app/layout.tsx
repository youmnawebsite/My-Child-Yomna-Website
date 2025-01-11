import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Child Yomna Website',
  description: 'Created to 7abibty Yomna',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
