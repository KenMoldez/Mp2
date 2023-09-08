import React, { useState } from "react";
import "./SignUp.css";

import { useNavigate } from "react-router-dom";

import eyeFill from "/image/eye-fill.svg";
import eyeSlashFill from "/image/eye-slash-fill.svg";
import { useGlobalContext } from "../../AppContext/AppContext";

// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// import { useFormik } from "formik";

const INITIAL_VALUE = {
  email: "",
  userName: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  phoneNumber: "",
  zipCode: "",
  address: "",
  password: "",
  confirmPassword: "",
  eye: false,
};

// const USER_CREDENTIALS = {
//   email: "",
//   userName: "",
//   password: "",
//   confirmPassword: "",
// };

function SignUp() {
  const { setUserInfo } = useGlobalContext();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [formErrors, setFormErrors] = useState(null);

  // const schema = yup.object().shape({
  //   // firstName: yup.number().typeError('Age must be a number').required("First Name Required!"),
  //   email: yup.string().email().required("Email is Required"),
  //   userName: yup.string().required("Username is Required"),
  //   firstName: yup.string().required("First Name is Required"),
  //   // lastName: yup.string().required("Last Name is Required"),
  //   // birthdate: yup
  //   //   .date()
  //   //   .required("Birthdate is Required.")
  //   //   .max(new Date(), "Birthdate must be in the past."),
  //   // phoneNo: yup.number(),
  //   // zipCode: yup.number(),
  //   // address: yup.string().required("Last Name is Required"),
  //   // password: yup.string().required(),
  //   // confirmPassword: yup
  //   //   .string()
  //   //   .oneOf([yup.ref("password"), null])
  //   //   .required(),
  // });
  // const {
  //   register,
  //   handleSubmit,
  // formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  // function submitFormRegistration(data) {
  //   console.log(data);
  //   if (page !== 3) {
  //     setPage((prev) => prev + 1);
  //     return;
  //   }

  //   alert("Account Created");
  // }

  // function onSubmit() {
  //   console.log("Submit");
  //   if (page !== 3) {
  //     setPage((prev) => prev + 1);
  //     return;
  //   }
  // }

  // const { values, handleChange, handleSubmit, errors } = useFormik({
  //   initialValues: {
  //     email: "",
  //     userName: "",
  //     firstName: page == 1 ? "s" : "",
  //   },

  //   validationSchema: schema,
  //   onSubmit,
  // });

  // console.log(errors);

  const [formState, setFormState] = useState(INITIAL_VALUE);
  // const [userCredentials, setUserCredentials] = useState(USER_CREDENTIALS);

  // console.log(formState);

  function handleChange(e) {
    const target = e.target;
    const { name, value, type, checked } = target;

    setFormErrors(null)

    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let errors = {};
    let isValidate = true;

    if (page !== 3) {
      setPage((prev) => prev + 1);
      return;
    }

  

    if (formState.password !== formState.confirmPassword) {
      errors.passwordNotMatch = "Password do not match.";
      isValidate = false;
    }

    setFormErrors(errors);

    if (isValidate) {
      localStorage.setItem("userInfo", JSON.stringify(formState));

      setUserInfo(formState);
      // console.log("Submit");

      navigate("/login");
    }
  }

  return (
    <section id="signup">
      <form
        action="#"
        method="POST"
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="progresss">
          <div className={`progresss-bar active ${page === 1 && "current"}`}>
            <span>
              <img
                src="image/envelope.svg"
                alt=""
              />
            </span>
          </div>
          <div className={`progresss-bar  ${page >= 2 && "active"} ${page === 2 && "current"}`}>
            <span>
              <img
                src="image/person.svg"
                alt=""
              />
            </span>
          </div>
          <div className={`progresss-bar  ${page >= 3 && "active"} ${page === 3 && "current"}`}>
            <span>
              <img
                src="image/lock.svg"
                alt=""
              />
            </span>
          </div>
        </div>

        <div className="pages">
          {page === 1 && (
            <div className={`page active`}>
              <h1>Let's get started</h1>
              <div className="field">
                <div className="field-input">
                  <label htmlFor="email">
                    <span>*</span>Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="e.g. sample@email.com"
                    name="email"
                    // {...register("email")}
                    value={formState.email}
                    onChange={handleChange}
                    required
                  />
                  {/* {errors.email?.message} */}
                </div>
                <div className="field-input">
                  <label htmlFor="userName">
                    <span>*</span>Username
                  </label>
                  <input
                    type="text"
                    id="userName"
                    placeholder="e.g. gab613"
                    required
                    // {...register("username")}
                    name="userName"
                    value={formState.userName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="btn">
                <button
                  type="submit"
                  id="next-btn"
                >
                  <img
                    src="image/caret-right-fill.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          )}
          {page === 2 && (
            <div className={`page active`}>
              <h1>Add a personal touch</h1>
              <div className="field">
                <div className="field-input">
                  <div className="field-group">
                    <div className="fname-input">
                      <label htmlFor="fname">
                        <span>*</span>First Name
                      </label>
                      <input
                        type="text"
                        id="fname"
                        placeholder="e.g. John"
                        required
                        // {...register("firstName")}
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="lname-input">
                      <label htmlFor="fname">
                        <span>*</span>Last Name
                      </label>
                      <input
                        type="text"
                        id="fname"
                        placeholder="e.g. Doe"
                        required
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                        // {...register("lastName")}
                      />
                    </div>
                  </div>
                </div>
                <div className="field-input">
                  <label htmlFor="bdate">
                    <span>*</span>Birthdate
                  </label>
                  <input
                    type="date"
                    id="bdate"
                    required
                    // {...register("birthdate")}
                    name="birthDate"
                    value={formState.birthDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-group">
                  <div className="phonenum-input">
                    <label htmlFor="phone-num">
                      <span>*</span>Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone-num"
                      placeholder="+63 9386759145"
                      required
                      //   {...register("phoneNo")}
                      name="phoneNumber"
                      value={formState.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="zip-input">
                    <label htmlFor="zip">
                      <span>*</span>ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      placeholder="e.g. Doe"
                      size="4"
                      required
                      //   {...register("zipCode")}
                      name="zipCode"
                      value={formState.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field-input">
                  <label htmlFor="address">
                    <span>*</span>Complete Address
                  </label>
                  <input
                    type="text"
                    id="addr"
                    placeholder="San. Juan Street"
                    required
                    // {...register("address")}
                    name="address"
                    value={formState.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="btn">
                <button
                  type="button"
                  id="prev-btn"
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <img
                    src="image/caret-left-fill.svg"
                    alt=""
                  />
                </button>
                <button
                  type="submit"
                  id="next-btn"
                >
                  <img
                    src="image/caret-right-fill.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          )}
          {page === 3 && (
            <div className={`page active`}>
              <h1>Secure your account</h1>
              <div className="field">
                <div className="field-input">
                  <label htmlFor="password">
                    <span>*</span>Password
                  </label>
                  <input
                    type={`${formState.eye ? "text" : "password"}`}
                    id="password"
                    placeholder="Password"
                    required
                    // {...register("password")}
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="eye">
                    <img
                      className="show-hide-pass"
                      // src="image/eye-fill.svg"
                      src={`${formState.eye ? eyeFill : eyeSlashFill}`}
                      alt=""
                    />
                  </label>
                </div>
                <div className="field-input">
                  <label htmlFor="confirmpass">
                    <span>*</span>Confirm Password
                  </label>
                  <input
                    type={`${formState.eye ? "text" : "password"}`}
                    id="confirmpass"
                    placeholder="Confirm Password"
                    // {...register("confirmPassword")}
                    name="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                  />
                  <label htmlFor="eye">
                    <img
                      className="show-hide-pass"
                      src={`${formState.eye ? eyeFill : eyeSlashFill}`}
                      alt=""
                    />

                    <input
                      type="checkbox"
                      name="eye"
                      id="eye"
                      checked={formState.eye}
                      onChange={handleChange}
                    />
                  </label>

                  {/* {errors.confirmPassword?.message} */}

                  <span className="pass_not_match">{formErrors?.passwordNotMatch}</span>
                </div>
              </div>
              <div className="btn">
                <button
                  type="button"
                  id="prev-btn"
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <img
                    src="image/caret-left-fill.svg"
                    alt=""
                  />
                </button>
                <button
                  type="submit"
                  id="submit-btn"
                >
                  Sign up
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

export default SignUp;
