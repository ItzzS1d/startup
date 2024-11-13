// Home.tsx
import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import connectToDB from "@/lib/db";

export interface StartupCardType {
  createdAt: Date;
  views: number;
  author: {
    _id: number;
    name: string;
    image: string;
    email: string;
    bio?: string;
  };
  _id: number;
  image: string;
  description: string;
  category: string;
  title: string;
}
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const session = await auth();
  console.log(session);
  await connectToDB();
  // let posts: StartupCardType[];
  // if (query) {
  //   posts = await Startup.find({ title: query }).populate("author");
  // } else {
  //   posts = await Startup.find({}).populate("author");
  // }

  const posts: StartupCardType[] = [
    {
      createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "siddharam", image: "/logo.png", email: "hel" },
      _id: 1,
      image: "/logo.png",
      description: "This is description",
      category: "Robots",
      title: "We Robots",
    },
  ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit ideas, Vote on Pitches and Get Notices In Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-[30px] font-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
