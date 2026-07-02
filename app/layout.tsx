import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Providers } from './providers'
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Protocol Tracker',
  description: 'Wellness protocol management — supplements, lab values, symptoms, and progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", GeistSans.variable)}>
      <body className={GeistSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
