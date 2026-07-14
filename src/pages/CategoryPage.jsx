import { useParams } from "react-router-dom";
import { getEvents } from "../data";
import EventCards from "../components/events/EventCards";
import CategoryHero from "../components/CategoryHero";

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="p-5">
      <section className="mx-auto max-w-6xl px-6 py-5">
        <CategoryHero category={categoryName} />

        <EventCards category={categoryName} showAll={true} />
      </section>
    </div>
  );
};

export default CategoryPage;
