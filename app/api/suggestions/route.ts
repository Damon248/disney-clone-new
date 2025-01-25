// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const term = searchParams.get("term");

//   const res = await fetch(
//     `https://disney-clone-new.azurewebsites.net/api/getaisuggestions?term=${term}`, 
//     {
//       method: "GET",
//       next: {
//         revalidate: 60 * 60 * 24 * 3, //Every three months
//       },
//     }
//   );
//   const message = await res.text();
//   return Response.json({ message });
// }


const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407";
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get('term');

  if (!term || typeof term !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid or missing query parameter: term' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Prepare the request body for Hugging Face
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Here are the top three movie/series names that are similar to ${term}: `,
        options: {
          wait_for_model: true,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from Hugging Face:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to fetch suggestions from Hugging Face.' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await response.json();

    // Assuming the result contains a "generated_text" field
    const suggestions = result[0]?.generated_text || 'No suggestions available';

    return new Response(JSON.stringify({ message: suggestions }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}





