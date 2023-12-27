import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";

export default async function Home() {
  const UpcomingMovies = await getUpcomingMovies();
  const TopRatedMovies = await getTopRatedMovies();
  const PopularMovies = await getPopularMovies();

  return (
    <main className="">
      <CarouselBannerWrapper />
      <div className="flex flex-col space-y-2 xl:-mt-48">
        <MoviesCarousel movies={UpcomingMovies} title="Upcoming" />
        <MoviesCarousel movies={TopRatedMovies} title="Top-rated" />
        <MoviesCarousel movies={PopularMovies} title="Popular" />
      </div>
    </main>
  );
}
