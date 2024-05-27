import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { Container } from "@/layouts/Container";
import { MainSection } from "@/layouts/MainSection";
import { SideBarLeft, SideBarRight } from "@/layouts/SideBars";

const AuthLayout = ({ children }: ChildrenInterface) => (
  <main className="w-full h-full items-center justify-center">
    <Container>
      <SideBarLeft />

      <MainSection>{children}</MainSection>

      <SideBarRight />
    </Container>
  </main>
);

export default AuthLayout;
