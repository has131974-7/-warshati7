import { NextResponse } from "next/server";

export function notImplemented(resource: string, method: string) {
  return NextResponse.json(
    {
      success: false,
      resource,
      method,
      message: "Endpoint scaffold is ready. Implement database logic with Prisma.",
    },
    { status: 501 },
  );
}
