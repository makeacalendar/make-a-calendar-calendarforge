import "./style.css";
import type {Metadata} from "next";
export const metadata:Metadata={title:"CalendarForge Cloud — Calendar infrastructure",description:"Self-hosted calendar planning, business-day intelligence, and exports.",icons:{icon:"/icon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
