import request from "@/utils/request";

// 引入 app/api/user/route.ts 中的类型
export const getUsers = async (): Promise<any> => {
  return request({
    url: "/user",
  });
};

export const delUserById = async (data: {
  id: number;
}): Promise<API.BaseResponse<boolean>> => {
  return request({
    url: `/user`,
    method: "delete",
    data,
  });
};
