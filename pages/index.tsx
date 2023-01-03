import styles from '@styles/pages/home.module.scss'
import { Book, GoogleBooksResponse, serializeGoogleBooksVolume } from '@api-conf/data-types/book'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import CatalogBook from '@components/books/catalog-book'
import { frontendExternalURL } from '@api-conf/conf'

interface Props {
	books: Book[];
}

const Home: NextPage<Props> = ({ books }) => {

	return (
		<div className={styles.container}>
			<Head>
				<title>BookStore - Home</title>
				<meta name="title" property="og:title" content="BookStore - Home"/>
				<meta name="description" property='og:description' content="Home page of the best online BookStore!" />
				<meta name="iamge" property="og:image" content={`${frontendExternalURL}/favicon/favicon-180x180.png`} />
			</Head>
			<section className={styles.hero}>
				<h1>Find your next adventure</h1>
				<p>BookStore</p>
			</section>
			<section className={styles.catalogSection} id='#catalog'>
				<div className={styles.sectionTitle}>
					<h3>Catalog</h3>
					<p>Our entire book collection at your fingertips</p>
				</div>
				<div className={styles.catalogContainer}>
				{
					books.map(book => <CatalogBook key={book.id} book={book}/>)
				}
				</div>
			</section>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

	// const data: GoogleBooksResponse = await (await fetch("https://www.googleapis.com/books/v1/volumes?q=ui design&filter=paid-ebooks&maxResults=40")).json()

	const data: GoogleBooksResponse = await (await fetch("http://localhost:8081/BookStoreBackend/books")).json()

	// convert Google Books Response to an array of our own Book object type

	const books = data.items.map(serializeGoogleBooksVolume)

	return {
		props: {
			books: books
		}
	}
}

export default Home