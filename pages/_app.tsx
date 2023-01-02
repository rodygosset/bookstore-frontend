import Header from '@components/layout/header'
import '@styles/globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { Context, initContext } from '@lib/context'

export default function App({ Component, pageProps }: AppProps) {
	
	// set up the context API to allow the app to share data across pages

	const [appData, setAppData] = useState(initContext.appData)

	// memoize the context,
	// to avoid needless React re-renders
	const value = useMemo(
		() => ({ appData, setAppData }), [appData]
	)
	
	return (
		<>
			<Head>
				{/* set up favicon */}
				<link rel="shortcut icon" href="favicon/favicon.svg" type="img/svg" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon-180x180.png" />
          		<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
          		<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
			</Head>

			{/* wrap the whole app in the context provider
				so every component & page can access appData
			*/}
			
			<Context.Provider value={value}>
				<Header/>
				<Component {...pageProps} />
			</Context.Provider>
		</>
	)
}
