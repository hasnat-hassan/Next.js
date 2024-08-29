import dbConnect from "@/backend/config/dbConnect";
import { deleteRoom, updateRoom } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

// Ensure that the functions return appropriate types
router.put(async (req: NextRequest, ctx: RequestContext) => {
  try {
    return await updateRoom(req, ctx);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
});

router.delete(async (req: NextRequest, ctx: RequestContext) => {
  try {
    return await deleteRoom(req, ctx);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
});

// Ensure PUT and DELETE handlers return Response
export async function PUT(
  request: NextRequest,
  ctx: RequestContext
): Promise<Response> {
  const result = await router.run(request, ctx);
  return result as Response; // Ensure the type is compatible with Response
}

export async function DELETE(
  request: NextRequest,
  ctx: RequestContext
): Promise<Response> {
  const result = await router.run(request, ctx);
  return result as Response; // Ensure the type is compatible with Response
}
