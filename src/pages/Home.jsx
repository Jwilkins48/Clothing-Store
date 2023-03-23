import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import store from "../assets/clothes.jpg";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../firebase.config";
import FeaturedCard from "../components/FeaturedCard";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import modelOne from "../assets/model1.jpg";
import modelTwo from "../assets/model2.jpg";
import modelThree from "../assets/model3.jpg";
import modelFour from "../assets/model4.jpg";
import Footer from "../components/Footer";
import Fade from "react-reveal/Fade";
import Reveal from "react-reveal/Reveal";

function Home() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const clothingRef = collection(db, "clothing");
        // Query correct clothing type/gender
        const q = query(clothingRef, limit(4));
        const querySnap = await getDocs(q);
        //Giving each item id/data
        const featured = [];
        querySnap.forEach((doc) => {
          return featured.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setFeatured(featured);
        console.log(featured);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      <section id="home" className="h:[16rem] lg:h-[42rem] background relative">
        <figure>
          <img
            className="img lg:w-full md:w-[50rem] h-[25rem] lg:h-auto"
            src={store}
            alt="store"
          />
        </figure>

        <div className="absolute lg:right-[17rem] bg-neutral w-[22rem] lg:w-[35rem] opacity-[.88] p-3 lg:p-8 mt-16 rounded-lg shadow-3xl">
          <p
            data-aos-duration="1500"
            data-aos="fade-left"
            className="text-red-100 text-4xl font-bold w-[20rem] lg:w-[31rem] mb-1 checkOut "
          >
            Find Your New Outfit
          </p>

          <div
            data-aos-duration="1500"
            data-aos="fade-up"
            className="flex gap-2 "
          >
            <p className="text-red-100 text-4xl font-bold mb-1 checkOut ">At</p>

            <p className="text-[#64bf82] text-4xl font-bold mb-1 checkOut ">
              Daisies
            </p>
          </div>
          <div className="mt-2 fadeIn">
            <Link
              className="btn bg-gray-500 hover:border-primary hover:bg-primary mt-3 mr-3 shop"
              to="/shop/mens/shirt"
            >
              MENS
            </Link>

            <Link
              className="btn bg-gray-500  hover:border-primary hover:bg-primary mt-3 mr-2 shop"
              to="/shop/women/tops"
            >
              WOMENS
            </Link>
          </div>
        </div>
      </section>
      <section className="text-center">
        <div
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <h1 className="mt-24 text-5xl text-neutral featured ">
            Featured Items
          </h1>

          <div className="divider lg:w-[50rem] lg:mx-auto mx-8 my-14">
            <i className="fa-regular my-2 text-green-500 fa-heart" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-16">
          {featured?.map((featured) => (
            <FeaturedCard
              InWishlist={false}
              clothing={featured.data}
              id={featured.id}
              key={featured.id}
            />
          ))}
        </div>
      </section>

      <section className="lg:my-32 w-[20rem] lg:w-full mx-auto">
        <div className=" lg:mx-32 flex flex-col gap-5">
          {/* MODEL ONE */}
          <Reveal effect="fadeInLeft" duration={2000}>
            <div className="flex items-center justify-end flex-col md:flex-row lg:flex-row   mt-10 lg:ml-12">
              <figure>
                <img
                  className="imgs w-[22rem] lg:w-[44rem] rounded-2xl lg:mr-60 shadow-2xl"
                  src={modelOne}
                  alt="clothing model"
                />
              </figure>
              <div className="w-[20rem] md:w-[30rem] lg:w-[50rem] lg:mr-40 md:ml-4">
                <h1 className="text-[28px] lg:text-5xl mt-8 lg:mt-0 lg:mb-8">
                  Shop The Latest Fashion
                </h1>
                <div className="divider lg:hidden my-0"></div>
                <p className=" w-80 lg:w-full text-lg lg:text-[26px] line mt-2 text-neutral">
                  Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
                  iaculis. Iaculis urna id volutpat lacus laoreet non. Magna sit
                  amet purus gravida quis blandit. Habitant morbi tristique
                  senectus et netus. Habitant morbi tristique senectus et netus.
                </p>
              </div>
            </div>
          </Reveal>
          {/* MODEL TWO */}
          <Reveal effect="fadeInRight" duration={2000}>
            <div className="flex items-center justify-end flex-col-reverse lg:flex-row mt-10 lg:ml-12">
              <div className="w-[20rem] lg:w-[50rem] lg:mr-40">
                <h1 className="text-[28px] lg:text-5xl mt-8 lg:mt-0 lg:mb-8">
                  Any Style Any Time
                </h1>
                <div className="divider lg:hidden my-0"></div>
                <p className="text-lg lg:text-[26px] line mt-2 mb-4 text-neutral">
                  Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
                  iaculis. Iaculis urna id volutpat lacus laoreet non. Magna sit
                  amet purus gravida quis blandit. Habitant morbi tristique
                  senectus et netus.
                </p>
              </div>
              <figure>
                <img
                  className="imgs w-[22rem] lg:w-[44rem] rounded-2xl lg:mr-60 shadow-2xl"
                  src={modelThree}
                  alt="clothing model"
                />
              </figure>
            </div>
          </Reveal>
          {/* MODEL THREE */}
          <Reveal effect="fadeInLeft" duration={2000}>
            <div className="flex items-center justify-end flex-col md:flex-row lg:flex-row mt-10 lg:ml-12">
              <figure>
                <img
                  className="imgs w-[22rem] lg:w-[44rem] rounded-2xl lg:mr-60 shadow-2xl"
                  src={modelTwo}
                  alt="clothing model"
                />
              </figure>
              <div className="w-[20rem] lg:w-[50rem] lg:mr-40">
                <h1 className="text-[28px] lg:text-5xl mt-8 lg:mt-0 lg:mb-8">
                  High Quality Clothing
                </h1>
                <div className="divider lg:hidden my-0"></div>
                <p className="text-xl lg:text-[26px] line mt-2 text-neutral">
                  Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
                  iaculis. Iaculis urna id volutpat lacus laoreet non. Magna sit
                  amet purus gravida quis blandit.
                </p>
              </div>
            </div>
          </Reveal>
          {/* MODEL FOUR */}
          <Reveal effect="fadeInRight" duration={2000}>
            <div className="flex items-center justify-end flex-col-reverse lg:flex-row mt-10 mb-32 lg:mb-0 lg:ml-12">
              <div className="w-[20rem] lg:w-[50rem] lg:mr-40">
                <h1 className="text-[26px] lg:text-5xl mt-8 lg:mt-0 lg:mb-8">
                  Clothes For Any Occasion
                </h1>
                <div className="divider lg:hidden my-0"></div>
                <p className="text-xl lg:text-[26px] line mt-2 text-neutral">
                  Imperdiet dui accumsan sit amet nulla facilisi morbi tempus
                  iaculis. Iaculis urna id volutpat lacus laoreet non. Magna sit
                  amet purus gravida quis blandit. Habitant morbi tristique
                  senectus et netus!
                </p>
              </div>
              <figure>
                <img
                  className="imgs w-[22rem] lg:w-[44rem] rounded-2xl lg:mr-60 shadow-2xl"
                  src={modelFour}
                  alt="clothing model"
                />
              </figure>
            </div>
          </Reveal>
        </div>
        <a
          className="absolute bottom-52 right-12 lg:bottom-12 lg:right-32 flex items-center justify-center"
          href="#home"
        >
          <i className="fa-solid fa-chevron-up btn  shadow-2xl bg-blue-300 rounded-3xl border-secondary hover:bg-blue-400 topBtn" />
        </a>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
