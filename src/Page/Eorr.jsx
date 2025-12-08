
import { useNavigate } from "react-router";
import Button from "./Shared/Button/Button";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-md mx-auto">

        {/* Gradient 404 Text */}
        <h1 className="text-[120px] font-extrabold tracking-wider 
          bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 
          bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Oops! Page Not Found
        </h2>

        <p className="mt-3 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
          Don’t worry — you can navigate back safely!
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">

          {/* BACK Button (Gradient Border) */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2 border-2 rounded-lg 
              border-transparent bg-white 
              hover:border-teal-400 hover:text-teal-500 
              transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-teal-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            Go Back
          </button>

          {/* HOME Button (Gradient like Logo) */}
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg text-white font-semibold 
              bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500
              hover:opacity-90 transition"
          >
            Go To Home
          </button>

        </div>
      </div>
    </section>
  );
};

export default Error404;
