import Navbar from "../components/ui/NavBar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div>
        <h1 className="text-2xl font-bold mb-4">Welcome to RealEstate App</h1>
        <p>Browse properties and save your favourites.</p>
        <h2 className="text-xl">Dashboard coming soon...</h2>
      </div>

      <Footer />
    </>
  );
};

export default Home;
