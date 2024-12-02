import { FormEvent, useState } from "react";
import { Input } from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Preencha os campos");
      return;
    }
    //esse método de login recebe 3 parâmetros, a conexão com o firebase (auth), o email e a senha
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", {replace: true });
      })
      .catch((error) => {
        console.log(error);
        setEmail("");
        setPassword("");
      });
  }
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to={"/"}>
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl transition-all ease-out duration-500 hover:scale-110  ">
          Dev
          <span className="bg-gradient-to-r from-emerald-300 to-sky-500 bg-clip-text text-transparent ">
            Link
          </span>
        </h1>
      </Link>
      {/* Ativando o display flex, os elementos dentro do form pegam a largura de 100% */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-1"
      >
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="h-11 bg-gradient-to-r from-sky-800 to-emerald-300 rounded-lg border-0 text-xl p-1 font-medium text-white"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
