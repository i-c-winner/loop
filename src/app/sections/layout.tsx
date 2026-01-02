import "../../shared/styles/globals.css";
import {Header} from "@/entities/header/ui/Header";
import {Chat} from "@/entities/chat/ui/Chat";
import Box from "@mui/material/Box";
import {ListProjects} from "@/entities/listProjects/ui/ListProjects";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      className="wrapper"
    >
      <Header></Header>
      <Box className="main">
        <ListProjects></ListProjects>
        <Chat/>
        {children}
      </Box>
    </Box>
  );
}
