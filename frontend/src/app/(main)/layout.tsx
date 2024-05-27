import { PostProvider } from "@/contexts/postContext.context";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { SideBarLeft, SideBarRight } from "@/layouts/SideBars";

const MainLayout = ({ children }: ChildrenInterface) => (
  <main className="w-full h-full items-center">
    <div className="grid grid-cols-12 min-h-screen max-w-7xl mx-auto relative">
      <div className="col-span-2 flex justify-start h-full border-r-4">
        <SideBarLeft />
      </div>

      <div className="col-span-1" />

      <div className="col-span-5 p-2 border-x-2 h-full rounded-t-2xl">
        <PostProvider>{children}</PostProvider>
      </div>

      <div className="col-span-1" />

      <div className="col-span-3 flex justify-end h-full">
        <SideBarRight />
      </div>
    </div>
  </main>
);

export default MainLayout;
