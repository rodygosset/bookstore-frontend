import styles from "@styles/components/books/cart-item.module.scss"
import { Book, serializeGoogleBooksVolume } from "@api-conf/data-types/book";
import { useEffect, useState } from "react";
import Image from "next/image";
import { frontendExternalURL } from "@api-conf/conf";
import { CartItem } from "@lib/context";
import { roundNumberTo2Decimals } from "@lib/utils";
import Link from "next/link";

interface Props {
    cartItem: CartItem;
}

const CartItem = ({ cartItem }: Props) => {

    const [book, setBook] = useState<Book>()
    // book data that needs to be fool-proofed is stored in state
    const [imgSrc, setImgSrc] = useState('')
    const [price, setPrice] = useState(0)
    const [priceTotal, setPriceTotal] = useState(0)
    const [year, setYear] = useState<number | null>()
    

    // get the data we need to display about the book
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${cartItem.bookId}`)
        .then(res => res.json().then(data => setBook(serializeGoogleBooksVolume(data))))
    }, [cartItem])


    // once we got that data,
    // fool-proof it before updating state
    useEffect(() => {
        setImgSrc(book?.imageLinks ? book.imageLinks.thumbnail : `${frontendExternalURL}/images/default-book-cover.svg`)
        setPrice(book?.priceInUSD ? roundNumberTo2Decimals(book.priceInUSD) : 0)
        setYear(book?.publishedDate ? new Date(book.publishedDate).getFullYear() : null)
    }, [book])

    useEffect(() => setPriceTotal(roundNumberTo2Decimals(price * cartItem.quantity)), [price])


    return (
        book ?
        <li className={styles.cartItem}>
            <div className={styles.bookImage}>
                <Image 
                    quality={100}
                    src={imgSrc} 
                    alt={"burger"} 
                    priority
                    fill
                    style={{ 
                        objectFit: "fill", 
                        top: "auto"
                    }}
                />
            </div>
            <div className={styles.textContent}>
                <h3><Link href={`/catalog/${book.id}`}>{book.title}</Link></h3>
                <p className={styles.quantity}>Quantity { cartItem.quantity }</p>
                <p className={styles.editorialInfo}>By { book.authors?.at(0) } &bull; { book.publisher } (Editor) &bull; { year } </p>
                <p className={styles.priceInfo}>${ priceTotal } {cartItem.quantity > 1 ? <span>(${ price } each)</span> : <></>}</p>
            </div>
        </li>
        :
        <>
        </>
    )
}

export default CartItem