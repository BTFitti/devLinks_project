import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FormEvent, useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { addDoc, collection, onSnapshot, query, orderBy, doc,deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface LinkProps{
  id: string;
  name: string
  url: string
  bg: string
  color: string
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1")
  const [bgColorInput, setBgColorInput] = useState("#121212")

  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(()=>{
    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot)=>{
      let lista = [] as LinkProps[];
      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })
      setLinks(lista)
      
    })
    return ()=>{
      unsub();
    }
  },[])

  async function handleRegister(e:FormEvent) {
    e.preventDefault();
    if(nameInput === "" || urlInput === ""){
      alert("Preencha todos os campos!")
      return;
    }
    // adicionando no banco
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: bgColorInput,
      color: textColorInput,
      created: new Date()
    })
    .then(()=>{
      setNameInput("")
      setUrlInput("")
      console.log("Cadastro feito!");
    })
    .catch((error)=>{
      console.log("Erro ao cadastrar no banco" + error);
    })
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form className="w-full max-w-xl flex flex-col px-2 mt-8 mb-3" onSubmit={handleRegister}>
        <label className="text-cyan-300 font-medium mt-2 mb-2">
          Nome do link
        </label>
        <Input
          placeholder="Digite o nome do link "
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="text-cyan-300 font-medium mt-2 mb-2">
          Url do link
        </label>
        <Input
          type="url"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        {/* Criando uma section porque esses elementos vão ficar lado a lado e o flex do nosso form é em coluna então eu crio uma section e uma div para nao pegar esse coluna
          do formulario
        */}
        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-cyan-300 font-medium mt-2 mb-2">Cor do texto</label>
            <input type="color" 
              value={textColorInput}
              onChange={(e)=> setTextColorInput(e.target.value)}
              className="rounded-sm"
            />
          </div>
          <div className="flex gap-2">
            <label className="text-cyan-300 font-medium mt-2 mb-2">Cor de fundo do link</label>
            <input type="color" 
              value={bgColorInput}
              onChange={(e)=> setBgColorInput(e.target.value)}
              className="rounded-sm"
            />
          </div>
        </section>

        {/* renderização condicional */}
          {nameInput !== '' && (
            <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-cyan-300 font-medium mt-2 mb-3">Veja como está ficando</label>
            <article
             className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3"
             style={{marginBottom: 8, marginTop: 8, background: bgColorInput}}
            >
              <p className="font-medium text-2xl" style={{color: textColorInput}}>{nameInput}</p>
            </article>
            </div>
          )}
        

        <button type="submit" className=" mb-7 bg-blue-500 p-2 text-white font-medium rounded-md h-11">
          Cadastrar🔗
        </button>
      </form>
      
        <h1 className="text-4xl font-bold text-white mb-4">Meus links</h1>
        <article 
        className="flex items-center justify-between w-11/12 max-w-xl py-3 px-2 rounded-md mb-2 select-none"
        style={{background: bgColorInput, color: textColorInput}}
        >
          <p>{nameInput}</p>
          <div>
            <button
              className="border border-dashed p-1 rounded bg-neutral-900"
            >
              <FiTrash size={19} color="#fff"/>
            </button>
          </div>
        </article>
        
    </div>
  );
}
