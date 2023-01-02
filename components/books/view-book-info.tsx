
import { Book } from "@api-conf/data-types/book";
import Button from "@components/button";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Context } from "@lib/context";
import styles from "@styles/pages/catalog/view-book.module.scss"
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

interface Props {
    book: Book;
    mobile?: boolean;
}

const ViewBookInfo = ({ book, mobile }: Props) => {

    useEffect(() => console.log(book), [])

    const getClassNames = () => {
        let classNames = styles.textContent
        classNames += (mobile ? ' ' + styles.mobileBookInfo : '')
        return classNames
    }

    const price = book.priceInUSD ? `$${book.priceInUSD}` : 'FREE'
    
    const publishedYear = book.publishedDate ? new Date(book.publishedDate).getFullYear() : null

    // handle user adding book to cart

    const { appData, setAppData } = useContext(Context)

    const router = useRouter()

    const handleAddToCart = () => {
        setAppData({
            cart: [...appData.cart, { bookId: book.id, quantity: 1 }]
        })
        router.push('/cart')
    }

    // as this component is server-rendered,
    // we need to use state for HTML element props
    // so Hydration doesn't fail

    const [description, setDescription] = useState('')

    useEffect(() => setDescription(book.description ? book.description : 'No description provided...'), [book])

    // render

    return (
        <div className={getClassNames()}>
            <p className={styles.pricingInfo}>Get it for <strong>{price}</strong></p>
            <p className={styles.editorialInfo}>By { book.authors?.at(0) } &bull; { book.publisher } (Editor) &bull; { publishedYear } </p>
            <p className={styles.description} dangerouslySetInnerHTML={{__html: description}}></p>
            <Button 
                icon={faShoppingCart}
                onClick={handleAddToCart}>
                Add to cart
            </Button>
        </div>
    )

}

export default ViewBookInfo