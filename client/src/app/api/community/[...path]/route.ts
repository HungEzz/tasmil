import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/constants/routes";

export async function GET(
  request: Request,
  props: { params: Promise<{ path: string[] }> }
) {
  const params = await props.params;
  const pathJoined = params.path.join("/");
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();

  try {
    const backendUrl = `${API_BASE_URL}/community/${pathJoined}${
      queryString ? `?${queryString}` : ""
    }`;
    const response = await fetch(backendUrl);

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Backend API error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(`Error in community API proxy for path /${pathJoined}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
