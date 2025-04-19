"use client";
import { delUserById, getUsers } from "@/api/user";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const res = await getUsers();
    if (res.code === 200) {
      setUsers(res.data ?? []);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    console.log("🚀 ~ handleDelete ~ id:", id);
    const res = await delUserById({
      id,
    });
    if (res.code === 200) {
      alert("删除成功");
      fetchData();
    }
  };

  return (
    <div>
      {users.map((item: any) => {
        return (
          <div key={item.id}>
            <div>
              {item.id} - {item.name} - {item.age}
            </div>
            <button onClick={() => handleDelete(item.id)}>按钮</button>
          </div>
        );
      })}
    </div>
  );
}
