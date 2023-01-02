
import BackwardNavLink from "@components/backward-nav-link"
import CartItem from "@components/books/cart-item"
import Button from "@components/button"
import { faCreditCard, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Context } from "@lib/context"
import { roundNumberTo2Decimals } from "@lib/utils"
import styles from "@styles/pages/cart.module.scss"
import { NextPage } from "next"
import { useContext, useEffect, useState } from "react"

const Cart: NextPage = () => {

    const { appData } = useContext(Context)

    // init these value to 0

    const [booksTotalNb, setBooksTotalNb] = useState(0)

    const [totalCost, setTotalCost] = useState(0)

    // get the actual values for those state variables
    // once our code is executing client-side (inside useEffect)
    
    useEffect(() => {
        setBooksTotalNb(appData.cart.reduce((prevVal, item) => prevVal + item.quantity, 0))
    }, [appData.cart])

    useEffect(() => {
        const total = appData.cart.reduce((prevVal, item) => prevVal + (item.priceInUSD * item.quantity), 0)
        setTotalCost(roundNumberTo2Decimals(total))
    })

    const handleCheckout = () => {

    }
    
    return (
        <div className={styles.container}>
            <div className={styles.goBackContainer}>
                <BackwardNavLink/>
                <p>Go back</p>
            </div>
            <section className={styles.pageHeader}>
                <div className={styles.pageTitle}>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    <h1>Cart</h1>
                </div>
                <p className={styles.priceInfo}>{ booksTotalNb } { booksTotalNb > 1 ? 'books' : 'book' } &nbsp; &bull; &nbsp; ${totalCost} total </p>
                <Button 
                    className={styles.checkOutButton}
                    icon={faCreditCard}
                    onClick={handleCheckout}>
                    Checkout
                </Button>
            </section>
            <ul className={styles.listContainer}>
            {
                // for each item in the cart, 
                // render a component that displays info about it
                appData.cart.map((item, index) => {
                    return (
                        <>
                            <CartItem 
                                key={item.bookId} 
                                cartItem={item} 
                            />
                            {
                                // only display a divider
                                // if the current item isn't the last one
                                index < appData.cart.length - 1 ?
                                <div key={item.bookId + "-divider"} className={styles.divider}>a</div>
                                :
                                <></>
                            }
                        </>
                    )
                })
            }
            </ul>
            <Button
                className={styles.mainCheckOutButton}
                fullWidth
                icon={faCreditCard}
                onClick={handleCheckout}>
                Checkout
            </Button>
        </div>
    )

}

export default Cart