import styles from '@styles/pages/home.module.scss'
import { Book, GoogleBooksResponse, serializeGoogleBooksVolume } from '@api-conf/data-types/book'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import CatalogBook from '@components/books/catalog-book'

interface Props {
	books: Book[];
}

const Home: NextPage<Props> = ({ books }) => {

	return (
		<div className={styles.container}>
			<Head>
				<title>BookStore - Home</title>
				<meta name="description" content="Home page of the best online BookStore!" />
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

	const data: GoogleBooksResponse = await (await fetch("https://www.googleapis.com/books/v1/volumes?q=ui design&filter=paid-ebooks&maxResults=40")).json()

	// convert Google Books Response to an array of our own Book object type

	const books = data.items.map(serializeGoogleBooksVolume)

	return {
		props: {
			books: books
		}
	}
}

export default Home