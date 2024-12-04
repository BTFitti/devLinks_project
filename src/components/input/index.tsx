import { InputHTMLAttributes} from "react"
//A tipagem InputProps está extendendo todas as propriedades que o tipo input recebe.

/*
InputHTMLAttributes: Este tipo é importado do React e representa as propriedades padrão que um elemento <input> HTML pode ter. 
Isso inclui atributos como type, value, placeholder, onChange, etc.

Extensão de InputHTMLAttributes: A interface InputProps estende InputHTMLAttributes<HTMLInputElement>. 
Isso significa que qualquer propriedade válida para um elemento <input> HTML também é válida para o componente Input.


O componente Input recebe um objeto props do tipo InputProps. 
Isso significa que o componente pode receber qualquer propriedade válida de um elemento <input> ou seja, pode receber um 
type, value, placeholder, onChange.


*/
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps){
    return(
        <input 
        className="  border-0 h-9 rounded-md mb-5 px-3 outline-none" 
        {...props}
        />
    )
}