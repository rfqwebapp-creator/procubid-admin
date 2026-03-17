import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     navigate("/dashboard", { replace: true });
//   }
// }, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard", { replace: true });

    } catch (err) {

      console.log(err);
      setError("Invalid login credentials");

    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;





// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email: email,
//           password: password
//         }
//       );

//       // TOKEN SAVE
//       localStorage.setItem("token", res.data.token);

//       console.log("Token saved:", res.data.token);

//       // redirect to dashboard
//       navigate("/dashboard", { replace: true });

//     } catch (err) {

//       console.log(err);

//       setError("Invalid login credentials");

//     }
//   };

//   return (

//     <div className="flex items-center justify-center h-screen bg-gray-100">

//       <div className="bg-white p-8 rounded-xl shadow-md w-96">

//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Admin Login
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-3">{error}</p>
//         )}

//         <form onSubmit={handleLogin}>

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 border rounded-lg mb-4"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 border rounded-lg mb-4"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
//           >
//             Login
//           </button>

//         </form>

//       </div>

//     </div>

//   );
// };

// export default Login;