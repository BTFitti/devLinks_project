import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks(){
    const [github, setGithub] = useState("")
    const [instagram, setInstagram] = useState("")
    const [linkedin, setLinkedin] = useState("")

    //criando o useEffect para buscar uma unica vez do BD os itens da coleção
    useEffect(()=>{
        function loadLinks(){
            //criando a referencia no banco para armazenar nessa variável e depois realizar a busca.
            const docRef = doc(db,"social","link")
            getDoc(docRef)
            .then((snapshot)=>{
                if(snapshot.data() !== undefined){
                    //passo a interrogação porque pode ser que não tenha nada quando acessarmos as useStates
                    setGithub(snapshot.data()?.github)
                    setInstagram(snapshot.data()?.instagram)
                    setLinkedin(snapshot.data()?.linkedin)
                }
            })
        }
        loadLinks()
    },[])

    function handleRegister(e: FormEvent){
        e.preventDefault();
        setDoc(doc(db, "social", "link"),{
            github: github,
            instagram: instagram,
            linkedin: linkedin,
        })
        .then(()=>{
            
        })
        .catch((error)=>{
            console.log(error);
        })

    }
    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2 font-home ">
            <Header/>
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>
            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium my-2">Link do Github</label>
                <Input
                    type="url"
                    placeholder="Digte a url do github..."
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                />
                <label className="text-white font-medium my-2">Link do Instagram</label>
                <Input
                    type="url"
                    placeholder="Digte a url do instagram..."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />
                <label className="text-white font-medium my-2">Link do linkedin</label>
                <Input
                    type="url"
                    placeholder="Digte a url do linkedin..."
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                />
                <button 
                type="submit"
                className="text-white font-medium bg-blue-600 h-9 rounded-md items-center justify-center flex my-4">
                    Salvar links
                </button>
            </form>
        </div>
    )
}