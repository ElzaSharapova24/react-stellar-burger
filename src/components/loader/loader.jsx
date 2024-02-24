import styles from "./loader.module.css"
import clsx from "clsx";

function Loader() {
  return(
    <span className={clsx(styles.loader)}></span>
  )
}

export default Loader;
