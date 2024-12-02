import { ReactNode } from "react";
interface SocialProps {
  url: string;
  children: ReactNode;
}
export function Social({ url, children }: SocialProps) {
  return(
    <a className="hover:scale-125 transition-all duration-500 ease-in-out"
        href={url}
        rel="noopener noreferrer"
        target="_blank"
    >
        {children}
    </a>
  ) 
  
}
