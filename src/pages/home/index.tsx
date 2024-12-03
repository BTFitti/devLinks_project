import { useEffect, useState } from "react";
import { Social } from "../../components/social";
import { FaLinkedin, FaGithub,} from "react-icons/fa";
import { collection, onSnapshot, query, orderBy, doc,deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { LinkProps } from "../admin";


export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([])
  useEffect(()=>{
    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc"));
    let lista = [] as LinkProps[];
    const unsub = onSnapshot(queryRef, (snapshot)=>{
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
    return()=>{
      unsub();
    }
  },[])
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center ">
      <h1 className="md:text-4xl text-3xl font-bold text-white  mt-20">
        Bruno Fitti
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
      
      {links.map((item)=>(
        <article
        key={item.id}
        className="mb-4 w-full py-2 rounded-lg select-none transition duration-500 hover:scale-105 font-medium "
        style={{background: item.bg, color: item.color}}
        >
        <a href={item.url} target="_blank" >
          <p className="text-base md:text-lg">{item.name}</p>
        </a>
      </article>
      ))}
        

        <footer className="flex justify-center gap-3 my-4  ">
          <Social  url="https://github.com/BTFitti">
            <FaGithub  size={35} color="#fff" />
          </Social>
          <Social url="https://www.linkedin.com/in/bruno-fitti-0629251b9/">
            <FaLinkedin size={35} color="#fff"/>
          </Social>
        </footer>

      </main>
    </div>
  );
}
