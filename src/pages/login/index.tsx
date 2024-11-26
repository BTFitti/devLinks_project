
import { useNavigate } from "react-router-dom";
export function Login() {
  const navigate = useNavigate();
  

  function handleSubmit() {
    navigate("/admin");
  }
  return (
    <main >
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Digite seu email" />
        <input type="text" placeholder="Digite sua senha" />
        <button>Acessar</button>
      </form>
    </main>
  );
}
