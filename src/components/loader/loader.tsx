import styles from "./loader.module.css"
import clsx from "clsx";

function Loader() {
    return(
        <div className={clsx(styles.loader)}></div>
    )
}

export default Loader;
