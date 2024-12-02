//Arquivo de proteção da rota
import { ReactNode, useState, useEffect} from 'react'
import {auth} from '../services/firebaseConnection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
interface PrivateProps{
    children: ReactNode;
}
export function Private({children}: PrivateProps): any{
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false);
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }
                localStorage.setItem("@reactlinks", JSON.stringify(userData))
                setLoading(false);
                setSigned(true);
            }else{
                setLoading(false);
                setSigned(false);
            }
        })
        //função de limpeza que faz o observer parar de monitorar assim que saimos da rota que contém o private, isso é bom para a performance
        return ()=>{
            unsub();
        }
    },[])
    if(loading){
     return <div><h1>Carregando</h1></div>
    
    }
    if(!signed){
        return <Navigate to="/login"/>
    }

    //se ele passar por todos os ifs acima, ele cai no return children, o children é a página de Admin que está dentro do private nas rotas
    return children;
}