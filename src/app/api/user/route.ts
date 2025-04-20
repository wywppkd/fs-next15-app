import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"; // 导入 zod

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({
    code: 200,
    data: users,
  });
}

const deleteUserSchema = z.object({
  id: z.number().int().positive({ message: "ID 必须是正整数" }),
});

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = deleteUserSchema.safeParse(body);

    // 处理校验失败的情况
    if (!validationResult.success) {
      // 获取第一个错误对象
      const firstError = validationResult.error.errors[0];
      // 获取字段名 (通常是 path 数组的第一个元素)
      const fieldName = firstError?.path[0] || "未知字段";
      // 获取错误信息
      const errorMessage = firstError?.message || "未知的校验错误";

      return NextResponse.json(
        {
          code: 400,
          data: false,
          // 在 msg 中显示字段名和错误信息
          msg: `参数错误: '${fieldName}' - ${errorMessage}`,
        },
        { status: 400 },
      );
    }

    // 校验成功，使用验证后的数据
    const validatedData = validationResult.data;

    await prisma.user.delete({
      where: {
        id: validatedData.id,
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
