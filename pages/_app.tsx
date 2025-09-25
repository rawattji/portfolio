import { AppProps } from 'next/app'
import '../src/styles/globals.css'
import '../src/styles/Aurora.css'
import '../src/styles/SpotlightCard.css'
import '../src/styles/experience-smooth.css'
import '../src/styles/gradual-blur.css'
import '../src/styles/metallic-border.css'
import '../src/styles/MetallicPaint.css'
import '../src/styles/ScrollStack.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
