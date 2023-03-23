import { useNavigate } from "react-router-dom";

function FeaturedCard({ clothing, id }) {
  const navigate = useNavigate();

  return (
    <div
      data-aos="fade-up"
      data-aos-offset="230"
      data-aos-duration="1000"
      data-aos-once="true"
      className="flex mb-10 cursor-pointer"
      onClick={() => navigate(`/shop/${id}`)}
    >
      <div className="card zoom mb-4 w-[27rem] h-[22rem] items-center bg-[#f2f4f5] m-auto shadow-lg border border-blue-200">
        <figure className="w-60 mb-16 ">
          <img
            className="mb-[-40px]"
            src={clothing.image[0]}
            alt={`${clothing.gender} clothing`}
          />
        </figure>
        <div className="h-26 py-3 mt-2 rounded-b-xl  absolute bottom-0 w-full">
          <div className="flex justify-between mt-2 items-center mb-2">
            <div className="ml-3">
              <p className="text-lg font-bold text-neutral cursor-pointer">
                {clothing.title}
              </p>
            </div>
            <p className="mt-2 mr-3 font-bold text-neutral">
              ${clothing.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCard;
