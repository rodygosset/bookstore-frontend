
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "@styles/components/backward-nav-link.module.scss"
import { useRouter } from "next/router"

const BackwardNavLink = () => {

    const router = useRouter()

    const handleClick = () => router.back()

    return (
        <div className={styles.container} onClick={handleClick}>
            <FontAwesomeIcon icon={faAngleLeft}/>
        </div>
    )
}

export default BackwardNavLink