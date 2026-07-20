import Image from "next/image";

const PropertyImages = ({ images }) => {
  return (
    <section className="container mx-auto p-4 transition-all duration-150">
      {images.length === 1 ? (
        <Image
          alt=""
          src={images[0]}
          className="object-cover object-center w-full h-100 rounded-xl"
          width={"0"}
          height={"0"}
          sizes="100vw"
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={image}
              className={`${(index + 1) % 3 === 0 ? "col-span-2" : "col-span-1"} hover:shadow-lg shadow-blue-200 rounded-xl hover:-translate-y-1 transition-all duration-350 ease-out`}
            >
              <Image
                alt=""
                src={image}
                className="object-cover object-center w-full h-100 rounded-xl"
                width={"0"}
                height={"0"}
                sizes="100vw"
                loading="eager"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PropertyImages;
