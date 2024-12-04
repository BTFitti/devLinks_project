import { useEffect, useState } from "react";
import { Social } from "../../components/social";
import { FaLinkedin, FaGithub, FaInstagram,} from "react-icons/fa";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { LinkProps } from "../admin";

interface SocialLinksProps{
  github: string;
  linkedin: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([])
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

  useEffect(()=>{
    function loadLinks(){
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created","asc"))

      getDocs(queryRef)
      .then((snapshot)=>{
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
        setLinks(lista);
      })
    }
    loadLinks()
  })

  //useEffect para buscar as redes sociais
  useEffect(()=>{
    //como estamos fazendo uma requisição asíncrona dentro do useEffect, é interessante colocar isso dentro de uma função
    function loadSocialLinks(){
      const docRef = doc(db, "social", "link")
    
      getDoc(docRef)
      .then((snapshot)=>{
        if(snapshot.data !== undefined){
          setSocialLinks({
            github: snapshot.data()?.github,
            linkedin: snapshot.data()?.linkedin,
            instagram: snapshot.data()?.instagram
          })
        }
      })
    }
    loadSocialLinks();
  },[])
 
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center font-home">
      <div className="mb-4 mt-20 ">
        <img src="/src/bruno.jpg" alt="My picture" className="rounded-full object-cover w-24 h-24 shadow-md shadow-black/60 "/>
      </div>
      
      <h1 className="md:text-4xl text-3xl font-bold text-white ">
        Bruno Fitti
      </h1>

      <main className="flex flex-col w-11/12 max-w-xl text-center mt-10">
      
      {links.map((item)=>(
        <section
        key={item.id}
        className="  mb-4 w-full py-2 rounded-md select-none transition duration-300 hover:scale-105 font-medium shadow-md shadow-gray-700"
        style={{background: item.bg}}
        >
        <a href={item.url} target="_blank" >
          <p className="text-base md:text-lg" style={{color: item.color}}>{item.name}</p>
        </a>
      </section>
      ))}
        

        {socialLinks && Object.keys(socialLinks).length > 0 &&(
          <footer className="flex justify-center gap-3 my-4">

          <Social url={socialLinks?.github}>
            <FaGithub  size={35} color="#fff"/>
          </Social>
          <Social url={socialLinks?.linkedin}>
            <FaLinkedin size={35} color="#fff"/>
          </Social>
          <Social url={socialLinks?.instagram}>
            <FaInstagram size={35} color="#fff"/>
          </Social>
        </footer>
        )}

      </main>
    </div>
  );
}
