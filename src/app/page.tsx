import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div>
      {users.map((item) => {
        return (
          <div key={item.id}>
            {item.id} - {item.name} - {item.age}
          </div>
        );
      })}
    </div>
  );
}
