import { useFormik } from "formik";
import { loginSchema } from "../../utils/validationSchemas";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authenticationService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

const LoginForm = () => {
  const nav = useNavigate();

  const notify = () => toast.success('Login successful!', {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
  });
  
  const formik = useFormik({
    initialValues:{email:"", password:""},
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try{
        await login(values.email, values.password);
        notify();
        nav('/home')
      }catch{
        toast.error('Login Failed, Please check your credentials.',{
          position: "top-right",
          autoClose:3000,
          pauseOnHover:true
        })
      }
    }
  })


  return (
    <div className=" w-full max-w-sm sm:max-w-md md:max-w-md lg:max-w-[500px] m-auto mt-10 text-center py-10 border-1 rounded-3xl p-10 bg-white " >
      <ToastContainer /> 
      <h1 className="text-2xl font-bold mb-6">Welcome Back</h1>

      <form onSubmit={formik.handleSubmit} className="text-start flex flex-col gap-4">
        {/* Email */}
        <div>
          <label className="block mb-1">Email Address</label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full px-3 py-2 border rounded"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input 
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full px-3 py-2 border rounded"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded mt-4"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* redirecting to the register page */}

            <div className="text-center">
                <p>Dont have an account? <Link to={'/register'} className="text-blue-600 font-semibold">Register Now</Link></p>
            </div>
      </form>
    </div>
  );
};

export default LoginForm;
