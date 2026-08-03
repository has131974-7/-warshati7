import { notImplemented } from "@/app/api/v1/_shared/not-implemented";

const resource = "repair-items";

export async function GET() {
  return notImplemented(resource, "GET by id");
}

export async function PATCH() {
  return notImplemented(resource, "PATCH");
}

export async function DELETE() {
  return notImplemented(resource, "DELETE");
}
