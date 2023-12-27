export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  const res = await fetch(
    `https://disney-clone-new.azurewebsites.net/api/getaisuggestions?term=${term}`,
    {
      method: "GET",
      next: {
        revalidate: 60 * 60 * 24 * 3, //Every three months
      },
    }
  );
  const message = await res.text();
  return Response.json({ message });
}
