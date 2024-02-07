import * as Yup from "yup";

export const loginvalidation = Yup.object({
    email:Yup.string().email("please enter valid email").required("please enter email"),
    password:Yup.string().min(6).required("password must be 6 character long")
})