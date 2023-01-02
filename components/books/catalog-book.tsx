import styles from "@styles/components/books/catalog-book.module.scss"
import { Book } from "@api-conf/data-types/book"
import Image from "next/image";
import { useRouter } from "next/router";


interface Props {
    book: Book;
}

const CatalogBook = ({ book }: Props) => {

    const imageSrc = book.imageLinks ? book.imageLinks.thumbnail : '/images/default-book-cover.svg'

    const router = useRouter()

    const handleClick = () => router.push(`/catalog/${book.id}`) 

    return (
        <div 
            className={styles.catalogBook}
            onClick={handleClick}>
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
            <h4>{ book.title }</h4>
            {
                book.authors ?
                <p>By { book.authors[0] }</p>
                :
                <></>
            }
        </div>
    )
}

export default CatalogBook