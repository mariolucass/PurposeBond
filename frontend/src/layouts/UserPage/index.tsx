import { Separator } from "@/components/ui/separator";

export const UserPage = (user: any) => {
  return (
    <section className="border-x-4 gap-4 w-4/6 flex flex-col justify-start">
      <div className="flex flex-col md:flex-row items-center mb-6">
        {/* <IMAGE
        src={user.avatarUrl || "https://via.placeholder.com/150"} // Use placeholder if no avatar
        alt={`${user.name}'s avatar`}
        className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover mr-8 mb-4 md:mb-0"
      /> */}
        <div>
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <h2 className="text-lg text-gray-600">{user.email}</h2>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">About Me</h3>
        <p>{user.description || "No bio yet."}</p>
      </div>

      {/* Add more sections for bookings, reviews, etc. */}

      <Separator />
    </section>
  );
};
