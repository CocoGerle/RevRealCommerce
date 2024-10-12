// "use client";

// import React from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import Link from "next/link";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { api } from "@/components/lib/axios";

// interface FormValues {
//   userName: string;
//   email: string;
//   password: string;
//   confirm: string;
// }
// export const Register = () => {
//   const router = useRouter();
//   const initialValues: FormValues = {
//     //Ymr ymr medeelel back ruu shidehee todorhoilno
//     userName: "",
//     email: "",
//     password: "",
//     confirm: "",
//   };

//   const validationSchema = yup.object({
//     //yup ashiglan ymr ymr utga avj bloh requirements-g oruulna
//     userName: yup.string().required("Нэвтрэх нэрээ оруулна уу"),
//     email: yup
//       .string()
//       .email("Алдаатай имэйл")
//       .required("Имэйлээ оруулна уу")
//       .test(
//         "checkEmailExists",
//         "Хэрэглэгч аль хэдийн бүртгэгдсэн байна", // Error message if user exists
//         async (value) => {
//           if (!value) return false; // Skip test if no value
//           try {
//             const response = await api.post("/auth/check-email", {
//               email: value,
//             });
//             return !response.data.exists; // If 'exists' is true, validation fails
//           } catch (error) {
//             console.error("Error checking email:", error);
//             return false; // Fail validation in case of error
//           }
//         }
//       ),
//     password: yup
//       .string()
//       .min(8)
//       .matches(/[0-9]/, "Тоо оруулна уу")
//       .matches(/[A-Z]/, "Том үсэг оруулна уу")
//       .matches(/[^\w]/, "Тэмдэгт оруулна уу")
//       .matches(/[a-z]/, "Жижиг үсэг оруулна уу")
//       .required("Нууц үгээ оруулна уу"),
//     confirm: yup
//       .string()
//       .oneOf([yup.ref("password"), "Нууц үг зөрүүтэй байна"])
//       .required("Нууц үгээ давтан оруулна уу")
//       .required("Tanii email bvrtgelte bn"),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: (values) => {
//       console.log(values);
//       createUser(values);
//     },
//   });

//   const isValidationSymbol = /[^\w]/.test(formik.values.password);
//   const isValidationNumber = /[0-9]/.test(formik.values.password);
//   const isValidationUpperCase = /[A-Z]/.test(formik.values.password);
//   const isValidationLowerCase = /[a-z]/.test(formik.values.password);

//   const createUser = async (values: FormValues) => {
//     try {
//       const response = await api.post("/auth/register", {
//         userName: values.userName,
//         email: values.email,
//         password: values.password,
//       });
//       router.push("/login");
//       console.log("User created:", response.data.message);
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       formik.submitForm();
//     }
//   };

//   return (
//     <div className="bg-[#F4F4F5]">
//       <div className="w-[1280px] m-auto min-h-[70vh] flex items-center">
//         <div className="flex flex-col w-[30%] m-auto gap-6 ">
//           <div className="text-2xl font-semibold self-center">Бүртгүүлэх</div>
//           <div className="flex flex-col gap-4">
//             <input
//               className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3
//             "
//               placeholder="Нэр"
//               name="userName"
//               value={formik.values.userName}
//               onChange={formik.handleChange}
//               onKeyDown={handleKeyDown}
//             />
//             <input
//               className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3
//             "
//               placeholder="Имэйл"
//               name="email"
//               type="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onKeyDown={handleKeyDown}
//             />
//             <input
//               className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3
//           "
//               placeholder="Нууц үг"
//               type="password"
//               name="password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onKeyDown={handleKeyDown}
//             />
//             <input
//               className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3
//         "
//               placeholder="Нууц үг давтах"
//               name="confirm"
//               type="password"
//               value={formik.values.confirm}
//               onChange={formik.handleChange}
//               onKeyDown={handleKeyDown}
//             />
//             {formik.errors.confirm ? (
//               <p className="text-red-600">{formik.errors.confirm}</p>
//             ) : null}
//           </div>
//           <div className="flex flex-col gap-1 px-2">
//             <div
//               className={`${
//                 formik.values.password === ""
//                   ? "text-[#71717A]"
//                   : isValidationUpperCase
//                   ? "text-green-500"
//                   : "text-red-500"
//               } text-xs`}
//             >
//               Том үсэг орсон байх
//             </div>
//             <div
//               className={`${
//                 formik.values.password === ""
//                   ? "text-[#71717A]"
//                   : isValidationLowerCase
//                   ? "text-green-500"
//                   : "text-red-500"
//               } text-xs`}
//             >
//               Жижиг үсэг орсон байх
//             </div>
//             <div
//               className={`${
//                 formik.values.password === ""
//                   ? "text-[#71717A]"
//                   : isValidationNumber
//                   ? "text-green-500"
//                   : "text-red-500"
//               } text-xs`}
//             >
//               Тоо орсон байх
//             </div>
//             <div
//               className={`${
//                 formik.values.password === ""
//                   ? "text-[#71717A]"
//                   : isValidationSymbol
//                   ? "text-green-500"
//                   : "text-red-500"
//               } text-xs`}
//             >
//               Тэмдэгт орсон байх
//             </div>
//           </div>
//           <div className="flex flex-col gap-12">
//             <button
//               className="px-4 py-2 bg-[#2563EB] text-white rounded-full w-full"
//               onClick={formik.submitForm}
//               type="submit"
//             >
//               Үүсгэх
//             </button>
//             <Link href={`/login`}>
//               <button className="px-4 py-2 border w-full border-[#2563EB] rounded-full">
//                 Нэвтрэх
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Register;

"use client";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/components/lib/axios";

interface FormValues {
  userName: string;
  email: string;
  password: string;
  confirm: string;
}

export const Register = () => {
  const router = useRouter();

  const initialValues: FormValues = {
    userName: "",
    email: "",
    password: "",
    confirm: "",
  };

  const validationSchema = yup.object({
    userName: yup.string().required("Нэвтрэх нэрээ оруулна уу"),
    email: yup
      .string()
      .email("Алдаатай имэйл")
      .required("Имэйлээ оруулна уу")
      .test(
        "checkEmailExists",
        "Энэ имэйл аль хэдийн бүртгэгдсэн байна", // Error message if the email exists
        async (value) => {
          if (!value) return true; // If no value is provided, validation passes
          try {
            const response = await api.post("/auth/check-email", {
              email: value,
            });
            return !response.data.exists; // Return true if email does not exist (validation passes)
          } catch (error) {
            console.error("Error checking email:", error);
            return true; // Allow the form to submit even if there's an error in checking the email
          }
        }
      ),
    password: yup
      .string()
      .min(8, "Нууц үг хамгийн багадаа 8 тэмдэгттэй байх ёстой")
      .matches(/[0-9]/, "Тоо оруулна уу")
      .matches(/[A-Z]/, "Том үсэг оруулна уу")
      .matches(/[^\w]/, "Тэмдэгт оруулна уу")
      .matches(/[a-z]/, "Жижиг үсэг оруулна уу")
      .required("Нууц үгээ оруулна уу"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password")], "Нууц үг зөрүүтэй байна")
      .required("Нууц үгээ давтан оруулна уу"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const lowerCaseEmail = values.email.toLowerCase();
      try {
        const response = await api.post("/auth/register", {
          userName: values.userName,
          email: lowerCaseEmail,
          password: values.password,
        });
        router.push("/login");
        console.log("User created:", response.data.message);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    },
  });

  const isValidationSymbol = /[^\w]/.test(formik.values.password);
  const isValidationNumber = /[0-9]/.test(formik.values.password);
  const isValidationUpperCase = /[A-Z]/.test(formik.values.password);
  const isValidationLowerCase = /[a-z]/.test(formik.values.password);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      formik.submitForm();
    }
  };

  return (
    <div className="bg-[#F4F4F5]">
      <div className="w-[1280px] m-auto min-h-[70vh] flex items-center">
        <div className="flex flex-col w-[30%] m-auto gap-6">
          <div className="text-2xl font-semibold self-center">Бүртгүүлэх</div>
          <div className="flex flex-col gap-4">
            <input
              className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3"
              placeholder="Нэр"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
            />
            <input
              className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3"
              placeholder="Имэйл"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
            />
            {formik.errors.email ? (
              <p className="text-red-600">{formik.errors.email}</p>
            ) : null}
            <input
              className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3"
              placeholder="Нууц үг"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
            />
            <input
              className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3"
              placeholder="Нууц үг давтах"
              name="confirm"
              type="password"
              value={formik.values.confirm}
              onChange={formik.handleChange}
              onKeyDown={handleKeyDown}
            />
            {formik.errors.confirm ? (
              <p className="text-red-600">{formik.errors.confirm}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-1 px-2">
            <div
              className={`${
                formik.values.password === ""
                  ? "text-[#71717A]"
                  : isValidationUpperCase
                  ? "text-green-500"
                  : "text-red-500"
              } text-xs`}
            >
              Том үсэг орсон байх
            </div>
            <div
              className={`${
                formik.values.password === ""
                  ? "text-[#71717A]"
                  : isValidationLowerCase
                  ? "text-green-500"
                  : "text-red-500"
              } text-xs`}
            >
              Жижиг үсэг орсон байх
            </div>
            <div
              className={`${
                formik.values.password === ""
                  ? "text-[#71717A]"
                  : isValidationNumber
                  ? "text-green-500"
                  : "text-red-500"
              } text-xs`}
            >
              Тоо орсон байх
            </div>
            <div
              className={`${
                formik.values.password === ""
                  ? "text-[#71717A]"
                  : isValidationSymbol
                  ? "text-green-500"
                  : "text-red-500"
              } text-xs`}
            >
              Тэмдэгт орсон байх
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <button
              className="px-4 py-2 bg-[#2563EB] text-white rounded-full w-full"
              onClick={formik.submitForm}
              type="submit"
            >
              Үүсгэх
            </button>
            <Link href={`/login`}>
              <button className="px-4 py-2 border w-full border-[#2563EB] rounded-full">
                Нэвтрэх
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
