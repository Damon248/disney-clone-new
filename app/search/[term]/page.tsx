import AiSuggestion from "@/components/AiSuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Props = {
  params: {
    term: string;
  };
};

async function SearchPage({ params: { term } }: Props) {
  if (!term) notFound();
  const cleanTerm = decodeURI(term);

  // API call to get searched movies
  const searchedMovies = await getSearchedMovies(cleanTerm);
  // API call to get popular movies
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mt-32 xl:mt-42">
        <h1 className="text-4xl font-bold px-10">Results for: "{cleanTerm}"</h1>

        {/* AI suggestions */}
        <AiSuggestion term={term} />

        <MoviesCarousel title="Movies" movies={searchedMovies} isVertical />
        <MoviesCarousel title="You may also like:" movies={popularMovies} />
      </div>
    </div>
  );
}

export default SearchPage;
