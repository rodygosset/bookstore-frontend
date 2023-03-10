import styles from "@styles/pages/catalog/view-book.module.scss"
import { Book, GoogleBooksVolume, serializeGoogleBooksVolume } from "@api-conf/data-types/book"
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head";
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { frontendExternalURL } from "@api-conf/conf"
import BackwardNavLink from "@components/backward-nav-link"
import Button from "@components/button";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import ViewBookInfo from "@components/books/view-book-info";

interface Props {
    book: Book;
    is404: boolean;
}

const ViewBook: NextPage<Props> = ({ book, is404 }) => {

    const router = useRouter()

    useEffect(() => {
        if(is404) router.push('/404')
    }, [])


    // generate meta data for other online platforms
    // like social media

    const pageTitle = `"${book.title}" by ${book.authors?.at(0)} on BookStore`

    const imageSrc = book.imageLinks ? book.imageLinks.thumbnail : `${frontendExternalURL}/images/default-book-cover.svg`

    const description = `Buy "${book.title}" by ${book.authors?.at(0)} on BookStore.`


    const handleShareClick = () => {
        navigator.clipboard.writeText(window.location.toString())
        alert("Link copied to clipboard")
    }

    return (
        <div className={styles.viewBook}>
            <Head>
                <title>{ pageTitle }</title>
                <meta name="title" property="og:title" content={pageTitle} />
                <meta name="type" property="og:type" content="website" />
                <meta name="description" property="og:description" content={description} />
                <meta name="image" property="og:image" content={imageSrc} />
            </Head>
            <div className={styles.goBackContainer}>
                <BackwardNavLink/>
                <p>Go back</p>
            </div>
            <main className={styles.pageContent}>
                <div className={styles.wrapper}>
                    <div className={styles.bookImage}>
                        <Image 
                            quality={100}
                            src={imageSrc} 
                            alt={"burger"} 
                            priority
                            fill
                            style={{ 
                                objectFit: "fill", 
                                top: "auto"
                            }}
                        />
                    </div>
                    <section className={styles.bookInfo}>
                        <h1>{book.title}</h1>
                        <Button 
                            icon={faShareFromSquare}
                            role="secondary"
                            onClick={handleShareClick}>
                            Share
                        </Button>

                        <ViewBookInfo book={book}/>
                    </section>
                </div>
                <section className={styles.bookInfo}>
                    <ViewBookInfo book={book} mobile/>
                </section>
            </main>
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