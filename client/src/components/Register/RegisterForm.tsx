import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../utils/validationSchemas";
import { useFormik } from "formik";
import { useState } from "react";
import { register } from "../../services/authenticationService";


const RegisterForm = () => {
  const [error, setError] = useState("");
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setError("");
        await register(values.email, values.password);
        nav("/home");
      } catch (err: any) {
        setError("Registration failed. Please check your input.");
      }
    },
  });

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-md lg:max-w-[500px] m-auto mt-10 text-center py-10 border-1 rounded-3xl p-10">
      <h1 className="text-2xl font-bold mb-6">Register as a new member</h1>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form
        onSubmit={formik.handleSubmit}
        className="text-start flex flex-col gap-4"
      >
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
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            className="w-full px-3 py-2 border rounded"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded mt-4"
        >
          {formik.isSubmitting ? "Registering..." : "Register"}
        </button>

        <div className="text-center">
                <p>Already have an account? <Link to={'/login'} className="text-blue-600 font-semibold">Login Instead</Link></p>
            </div>
      </form>
    </div>
  );
};

export default RegisterForm;
