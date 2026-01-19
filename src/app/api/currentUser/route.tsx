import {NextRequest, NextResponse} from "next/server";

export function GET (req: NextRequest) {
  return new Response(JSON.stringify('Hello World!'))
}
