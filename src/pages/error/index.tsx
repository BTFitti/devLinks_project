import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="flex items-center justify-center flex-col w-full min-h-screen">
      <h1 className="text-6xl mb-7 italic font-display text-red-700 [text-shadow:_0_0_5px_rgb(0_0_0_/_100%)] ">404</h1>
      <h1 className="text-6xl mb-20 font-display ">
        Página{" "}
        <span className="text-red-700 [text-shadow:_0_0_5px_rgb(0_0_0_/_100%)]">
          não
        </span>{" "}
        encontrada!
      </h1>

      <Link
        to="/"
        className=" p-4 bg-slate-300 rounded-full shadow-lg shadow-zinc-900 hover:bg-slate-500 transition-all duration-500 text-5xl text-black font-display "
      >
        Voltar para a home
      </Link>
    </div>
  );
}
