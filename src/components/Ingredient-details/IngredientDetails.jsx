// import Modal from "../modal/modal";
// import clsx from "clsx";
// import styles from "../burger-ingredients-categories/burger-ingredients-categories.module.css";
// import React from "react";
//
// export default function Ingredient-details(props) {
//   return (
//     <Modal
//       isVisible={modalIsActive}
//       title={"fkjfjdfjf"}
//       onClose={() => setModalIsActive(false)}
//     >
//       <>
//         {
//           (modalItem !== null) && <div className={clsx(styles.content, "p-10")}>
//             <h2 className={clsx("text text_type_main-large", styles.heading)}>Детали ингредиента</h2>
//             <img className={clsx(styles.image)} src={modalItem.image_large} alt={modalItem.name}/>
//             <div className={clsx(styles.wrap)}>
//               <h3 className={clsx("text text_type_main-medium", styles.heading)}>{modalItem.name}</h3>
//               <ul className={clsx(styles.list)}>
//                 <li className={clsx(styles.listItem,"text text_type_main-default text_color_inactive")}>
//                   <p>Калории,ккал</p>
//                   <p>{modalItem.calories}</p>
//                 </li>
//                 <li className={clsx(styles.listItem,"text text_type_main-default text_color_inactive")}>
//                   <p>Белки, г</p>
//                   <p>{modalItem.proteins}</p>
//                 </li>
//                 <li className={clsx(styles.listItem,"text text_type_main-default text_color_inactive")}>
//                   <p>Жиры, г</p>
//                   <p>{modalItem.fat}</p>
//                 </li>
//                 <li className={clsx(styles.listItem,"text text_type_main-default text_color_inactive")}>
//                   <p>Углеводы, г</p>
//                   <p>{modalItem.carbohydrates}</p>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         }
//       </>
//     </Modal>
//   )
// }
