import AiSuggestion from "@/components/AiSuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from "@/lib/getMovies";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};

async function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
  // http://localhost:3000/genre/80?genre=action

  const movies = await getDiscoverMovies(id);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col  space-y-5 mt-32 xl:mt-42">
        <h1 className="text-4xl font-bold px-10">
          Results for the genre: "{genre}"
        </h1>
        {/* AI suggestions */}
        {/* <AiSuggestion term={genre} /> */}
        <MoviesCarousel title={`Genre`} movies={movies} isVertical />
      </div>
    </div>
  );
}

export default GenrePage;
