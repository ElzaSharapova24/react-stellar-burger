import styles from "./modal-overlay.module.css"
import {useRef} from "react";


export default function ModalOverlay (props) {
  const containerRef = useRef(null);
  
  // const handleClick = (e: SyntheticEvent) => {
  //   if (e.target === containerRef.current) {
  //     props.onClose();
  //   }
  // };
  
  function handleClick(e) {
    if (e.target === containerRef.current) {
      props.onclose()
    }
  }
  
  return (
    <div onClick={handleClick} ref={containerRef} />
  )
  
  
}
