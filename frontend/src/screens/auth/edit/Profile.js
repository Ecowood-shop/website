// REACT
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser } from "../../../store/actions/userActions";
import { useForm } from "react-hook-form";

// COMPONENTS
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";

// OTHERS
import styles from "./styles.module.scss";

function Profile() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState();

  const User = useSelector((state) => state.User);
  const { error, loading, user, success } = User;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    delete data.confirmPassword;
    dispatch(updateUser(data));
  };

  useEffect(() => {
    success ? navigate("/profile") : dispatch(getUser());
  }, [dispatch, success]);

  return (
    <article className={styles.container}>
      <button onClick={() => navigate("/profile")} className={styles.button}>
        უკან
      </button>
      {loading && <Loader />} {error && <Message>{error}</Message>}
      {user && (
        <section>
          <h1>რედაქტირება</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <p className={styles.error}>
              {errors.firstName
                ? "სახელი უნდა შეიცავდეს მხოლოდ სიმბილოებს და ციფრებს"
                : errors.lastName
                ? "გვარი უნდა შეიცავდეს მხოლოდ სიმბილოებს და ციფრებს"
                : errors.password || errors?.confirmPassword?.type == "pattern"
                ? "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, ერთ დიდ და ერთ პატარა სიმბოლოს და ციფრს"
                : errors?.confirmPassword?.type == "validate"
                ? "პაროლი არ ემთხვევა"
                : ""}
            </p>
            <input
              placeholder="სახელი"
              {...register("firstName", {
                required: true,
                pattern: /^[A-Za-z0-9]*$/,
              })}
              className={styles.input}
              defaultValue={user ? user.first_name : ""}
            />

            <input
              placeholder="გვარი"
              {...register("lastName", {
                required: true,
                pattern: /^[A-Za-z0-9]*$/,
              })}
              className={styles.input}
              defaultValue={user ? user.last_name : ""}
            />

            <input
              placeholder="ტელეფონი"
              type="tel"
              {...register("phone", { required: true })}
              className={styles.input}
              defaultValue={user ? user.phone : ""}
              required
            />
            <input
              placeholder="პაროლი"
              type="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              })}
              className={styles.input}
              required
            />
            <input
              placeholder="გაიმეორეთ პაროლი"
              type="password"
              {...register("confirmPassword", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                validate: (password) => {
                  if (watch("password") != password) {
                    return "Your passwords do no match";
                  }
                },
              })}
              className={styles.input}
            />

            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </section>
      )}
    </article>
  );
}

export default Profile;
