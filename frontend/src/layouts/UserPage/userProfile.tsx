import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const UserSectionProfile = ({ user }: any) => (
  <div className="relative">
    <div className="absolute top-0 left-0 w-full h-1/3 bg-accent z-10 rounded-t-2xl"></div>
    <div className="flex flex-col md:flex-row items-center my-6 p-6 gap-6 relative z-20">
      <Avatar className="w-[120px] h-[120px]">
        <AvatarImage src="https://avatars.githubusercontent.com/u/105565220?v=4" />
      </Avatar>
      <div className="mt-16">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <h2 className="text-lg text-gray-500">{user.username}</h2>
      </div>
    </div>
    <div className="bg-gray-50 rounded-lg p-4 mb-4 relative z-20">
      <p>{user.description || "No bio yet."}</p>
    </div>
  </div>
);
