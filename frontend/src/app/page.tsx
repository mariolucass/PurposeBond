import { Feed } from "@/components/feed";
import { Container } from "@/layouts/Container";
import { MainSection } from "@/layouts/MainSection";
import { SideBarLeft, SideBarRight } from "@/layouts/SideBars";

const Dashboard = () => {
  return (
    <main className="w-full h-full items-center justify-center">
      <Container>
        <SideBarLeft />

        <MainSection>
          <Feed />
        </MainSection>

        <SideBarRight />
      </Container>
    </main>
  );
};

export default Dashboard;
