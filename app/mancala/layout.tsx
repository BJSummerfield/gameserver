import '../globals.css'

export const metadata = {
  title: 'Mancala',
  description: 'Play Mancala!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
