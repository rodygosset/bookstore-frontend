import { Book, GoogleBooksVolume, serializeGoogleBooksVolume } from "@api-conf/data-types/book";
import { GetServerSideProps, NextPage } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";


interface Props {
    book: Book;
    is404: boolean;
}

const ViewBook: NextPage<Props> = ({ book, is404 }) => {

    const router = useRouter()

    useEffect(() => {
        if(is404) router.push('/404')
    }, [])

    return (
        <div>
            <Head>
                <title>BookStore - {book.title}</title>
            </Head>
            <h1>{book.title}</h1>
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