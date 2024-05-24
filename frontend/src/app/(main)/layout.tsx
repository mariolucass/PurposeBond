import { PostProvider } from "@/contexts/postContext.context";
import { IChildren } from "@/interfaces/global.interfaces";
import { Container } from "@/layouts/Container";
import { SideBarLeft, SideBarRight } from "@/layouts/SideBars";

const MainLayout = ({ children }: IChildren) => (
  <main className="w-full h-full items-center justify-center">
    <Container>
      <SideBarLeft />

      <PostProvider>{children}</PostProvider>

      <SideBarRight />
    </Container>
  </main>
);

export default MainLayout;
