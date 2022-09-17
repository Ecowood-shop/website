// REACT
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser,updateUser } from "../../../../store/actions/adminActions";
import { useForm } from "react-hook-form";

// COMPONENTS
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";

function User() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();

  const adminUsers = useSelector((state) => state.adminUsers);
  const { errorUser, loadingUser, user,success } = adminUsers;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    data.id=id;
   dispatch(updateUser(data))
 
  };

  useEffect(() => {
    dispatch(getUser(id));if(success){
    navigate("/admin/users/")
  }
  }, [dispatch,success]);

  
  console.log(user);
  return (
    <article className={styles.container}>
      <button onClick={()=>navigate("/admin/users/")} className={styles.button}>უკან</button>
      {loadingUser && <Loader />} {errorUser && <Message>{errorUser}</Message>}
      {user && (
        <section>
          <h1>რედაქტირება</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="სახელი"
              {...register("firstName")}
              className={styles.input}
              defaultValue={user ? user.first_name : ""}
            />

            <input
              placeholder="გვარი"
              {...register("lastName")}
              className={styles.input}
              defaultValue={user ? user.last_name : ""}
            />

            <input
              placeholder="მეილი"
              type="email"
              {...register("email")}
              className={styles.input}
              defaultValue={user ? user.email : ""}
            />

            <input
              placeholder="ტელეფონი"
              type="tel"
              {...register("phone")}
              className={styles.input}
              defaultValue={user ? user.phone : ""}
            />

            <div className={styles.admin}>
              <input
                type="checkbox"
                {...register("status")}
                defaultChecked={user ? user.is_staff : false}
                className={styles.checkbox}
              />
              <label>ადმინი</label>
            </div>
            <button type="submit" className={styles.button}>Submit</button>
          </form>
        </section>
      )}
    </article>
  );
}

export default User;
