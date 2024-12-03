import { FormEvent, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks(){
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [youtube, setYoutube] = useState("")
    
    function handleRegister(e: FormEvent){
        e.preventDefault();
        setDoc(doc(db, "social", "link"),{
            facebook: facebook,
            instagram: instagram,
            youtube: youtube,
        })
        .then(()=>{
            
        })
        .catch((error)=>{
            console.log(error);
        })

    }
    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>
            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium my-2">Link do Facebook</label>
                <Input
                    type="url"
                    placeholder="Digte a url do facebook..."
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />
                <label className="text-white font-medium my-2">Link do Instagram</label>
                <Input
                    type="url"
                    placeholder="Digte a url do instagram..."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />
                <label className="text-white font-medium my-2">Link do Youtube</label>
                <Input
                    type="url"
                    placeholder="Digte a url do youtube..."
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
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