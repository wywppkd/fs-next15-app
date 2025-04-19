import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({
    code: 200,
    data: users,
  });
}

// 根据id删除用户: id 在请求体中
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({
        code: 400,
        data: false,
        msg: "id不能为空",
      });
    }
    await prisma.user.delete({
      where: {
        id: body.id + 1,
      },
    });
    return NextResponse.json({
      code: 200,
      data: true,
      msg: "删除成功",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        code: error?.code || 500,
        data: false,
        msg: error?.message || "删除失败",
      },
      {
        status: 500,
      },
    );
  }
}
