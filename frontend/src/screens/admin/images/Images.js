// REACT
import { useEffect, useState } from "react";
import Select from "react-select";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVariants, getColors } from "../../../store/actions/adminActions";

// COMPONENTS
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Image from "./image/Image";

// OTHERS
import styles from "./styles.module.scss";

function Images() {
 // HOOKS
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { id } = useParams();

 const adminVariants = useSelector((state) => state.adminVariants);
 const { error, loading, variants, success, successUpdate,successCreate } = adminVariants;

 const adminColors = useSelector((state) => state.adminColors);
 const { colors } = adminColors;

 const onSubmit = () => {
   // dispatch(updateProduct(id, data));
 };

 useEffect(() => {
   dispatch(getVariants(id));
   dispatch(getColors());
 }, [dispatch, success, successUpdate,successCreate]);

 console.log(variants);
 console.log(colors);

 return (
   <article className={styles.container}>
     <button
       onClick={() => navigate(`/admin/products/${id}/edit`)}
       className={styles.button}
     >
       უკან
     </button>
     {/* {colors && <Variant create colors={colors} id={id}/>} */}
     <section className={styles.createComponentContainer}>
        
     </section>
     <section className={styles.imageContainer}>
        
     <Image src={"https://ecowood.ge/wp-content/uploads/2020/07/weco-5l-2-700x700.jpg"}/>
     <Image src={"https://ecowood.ge/wp-content/uploads/2019/07/fasadis-laqi-2-700x700.jpg"}/>
     <Image src={"https://ecowood.ge/wp-content/uploads/2020/07/weco-eco-700x700.jpg"}/>
     <Image src={"https://ecowood.ge/wp-content/uploads/2020/07/weco-5l-2-700x700.jpg"}/>
     </section>
     {loading && <Loader />}
     {error && <Message>{error}</Message>}
     {/* {variants &&
       variants.map((variant) => (
         <Variant variant={variant} key={variant.id} />
       ))} */}
   </article>
 );
}

export default Images