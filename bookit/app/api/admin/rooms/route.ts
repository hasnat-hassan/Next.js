import dbConnect from "@/backend/config/dbConnect";
import { newRoom } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

// Ensure that the newRoom function returns an appropriate type
router.post(async (req: NextRequest, ctx: RequestContext) => {
  try {
    return await newRoom(req, ctx);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
});

// Ensure POST handler returns Response
export async function POST(
  request: NextRequest,
  ctx: RequestContext
): Promise<Response> {
  const result = await router.run(request, ctx);
  return result as Response;
}
