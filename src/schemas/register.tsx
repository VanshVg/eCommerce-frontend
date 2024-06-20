import * as Yup from "yup";

const register = () => {
  let schema = Yup.object();
  schema = schema.shape({
    contactNo: Yup.string()
      .trim()
      .required("Please enter Username")
      .matches(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
        message: "Please enter correct mobile number",
      }),
    email: Yup.string()
      .trim()
      .required("Please enter email address")
      .email("Please enter valid email address"),
    password: Yup.string()
      .trim()
      .required("Please enter password")
      .min(6, "Password must have at least six characters")
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@_)(#$%^&*]{6,16}$/, {
        message: "At least one number and one special character are must",
      }),
    confirmPassword: Yup.string()
      .trim()
      .required("Please enter confirm password")
      .oneOf(
        [Yup.ref("password")],
        "Password and Confirm password must be same"
      ),
  });
  return schema;
};

export default register;
