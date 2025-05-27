import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// 加载单个景区详情
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    z.string().regex(/^\d+$/, "id必须是数字").parse(id); // 校验id是否为字符串

    const attraction = await prisma.attraction.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!attraction) {
      return NextResponse.json(
        { error: "Attraction not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(attraction);
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    // 如果是ZodError，则是入参校验失败
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "参数校验失败",
          msg: error.errors.map((e) => `${e.path} ${e.message}`).join("; "),
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { msg: error?.message ?? "Failed to fetch attraction details" },
      { status: 500 },
    );
  }
}
