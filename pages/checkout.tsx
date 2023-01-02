import BackwardNavLink from "@components/backward-nav-link"
import Button from "@components/button"
import Label from "@components/form-elements/label"
import TextField from "@components/form-elements/text-field"
import TextInput from "@components/form-elements/text-input"
import { faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Context } from "@lib/context"
import { roundNumberTo2Decimals } from "@lib/utils"
import styles from "@styles/pages/checkout.module.scss"
import { MouseEventHandler, useContext, useEffect, useState } from "react"

import Image from "next/image"


const Checkout = () => {

    const { appData } = useContext(Context)

    // data logic copied from pages/cart.tsx

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

    const handleCheckoutFormSubmit: MouseEventHandler<HTMLFormElement> = event => {
        event.preventDefault()
        alert("Payment isn't available at the moment.")
    }

    // form field values in state

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [ccv, setCCV] = useState('')
    const [expiryDate, setExpiryDate] = useState('')

    return (
        <div className={styles.container}>
            <div className={styles.goBackContainer}>
                <BackwardNavLink/>
                <p>Go back</p>
            </div>
            <section className={styles.pageHeader}>
                <div className={styles.pageTitle}>
                    <FontAwesomeIcon icon={faCreditCard}/>
                    <h1>Checkout</h1>
                </div>
                <p className={styles.priceInfo}>{ booksTotalNb } { booksTotalNb > 1 ? 'books' : 'book' } &nbsp; &bull; &nbsp; ${totalCost} total </p>
            </section>
            <section className={styles.formContainer}>
                <div className={styles.sectionTitle}>
                    <h3>Payment details</h3>
                    <p>Enter your payment details to purchase</p>
                </div>
                <form name="payment-details" onSubmit={handleCheckoutFormSubmit}>
                    <TextField>
                        <Label htmlFor="payment-details">Email address</Label>
                        <TextInput 
                            placeholder="email@example.com"
                            type="email"
                            currentValue={email}
                            onChange={setEmail}                        
                        />
                    </TextField>

                    <TextField>
                        <Label htmlFor="payment-details">Name on card</Label>
                        <TextInput 
                            placeholder="John Doe"
                            currentValue={name}
                            onChange={setName}                        
                        />
                    </TextField>

                    <div className={styles.cardInfo}>
                        <TextField>
                            <Label htmlFor="payment-details">Card Number</Label>
                            <TextInput 
                                icon={faCreditCard}
                                placeholder="XXXX XXXX XXXX XXXX"
                                currentValue={cardNumber}
                                onChange={setCardNumber}                        
                            />
                        </TextField>
                        <div className={styles.secondaryInfo}>
                            <TextField>
                                <Label htmlFor="payment-details">CCV</Label>
                                <TextInput 
                                    placeholder="123"
                                    type="password"
                                    currentValue={ccv}
                                    onChange={setCCV}                        
                                />
                            </TextField>
                            <TextField>
                                <Label htmlFor="payment-details">Expiry</Label>
                                <TextInput 
                                    placeholder="MM/YY"
                                    type="date"
                                    currentValue={expiryDate}
                                    onChange={setExpiryDate}                        
                                />
                            </TextField>
                        </div>
                    </div>

                    <div className={styles.illustration}>
                        <Image 
                            quality={100}
                            src={'/images/payment-illustration.svg'} 
                            alt={"burger"} 
                            priority
                            fill
                            style={{ 
                                objectFit: "fill", 
                                top: "auto"
                            }}
                        />
                    </div>

                    <Button
                        icon={faCreditCard}
                        type='submit'
                        fullWidth
                        onClick={handleCheckoutFormSubmit}>
                        Pay now
                    </Button>
                </form>
            </section>
        </div>
    )
}

export default Checkout