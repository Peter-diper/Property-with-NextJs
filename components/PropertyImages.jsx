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
              className={`${images.length === 3 && index === 2 ? "col-span-2" : "col-span-1"}`}
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
