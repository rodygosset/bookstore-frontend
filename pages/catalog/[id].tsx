import styles from "@styles/pages/catalog/view-book.module.scss"
import { Book, GoogleBooksVolume, serializeGoogleBooksVolume } from "@api-conf/data-types/book";
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { frontendExternalURL } from "@api-conf/conf";
import BackwardNavLink from "@components/backward-nav-link";


interface Props {
    book: Book;
    is404: boolean;
}

const ViewBook: NextPage<Props> = ({ book, is404 }) => {

    const router = useRouter()

    useEffect(() => {
        console.log(book)
        if(is404) router.push('/404')
    }, [])


    // generate meta data for other online platforms
    // like social media

    const pageTitle = `"${book.title}" by ${book.authors?.at(0)} on BookStore`

    const imageSrc = book.imageLinks ? book.imageLinks.thumbnail : `${frontendExternalURL}/images/default-book-cover.svg`

    const description = `Buy "${book.title}" by ${book.authors?.at(0)} on BookStore.`

    return (
        <div className={styles.viewBook}>
            <Head>
                <title>{ pageTitle }</title>
                <meta name="title" property="og:title" content={pageTitle} />
                <meta name="type" property="og:type" content="website" />
                <meta name="description" property="og:description" content={description} />
                <meta name="image" property="og:image" content={imageSrc} />
            </Head>
            <div className={styles.pageHeader}>
                <div className={styles.goBackContainer}>
                    <BackwardNavLink/>
                    <p>Go back</p>
                </div>
                <h1>{book.title}</h1>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

    const bookId = context.query.id?.toString();

	const data: GoogleBooksVolume = await (await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)).json()

    // in case the is invalid (error 503)
    // redirect the 404 page

    if((data as any).error) {
        return {
            props: { 
                book: { id: bookId ? bookId : '', title: '' }, 
                is404: true 
            }
        }
    }

    // otherwise, 
	// convert Google Books Volume to our own Book object type

	const book = serializeGoogleBooksVolume(data)

	return {
		props: {
			book: book,
            is404: false
		}
	}
}

export default ViewBook