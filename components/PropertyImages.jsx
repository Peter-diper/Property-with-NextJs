import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
  return (
    <Gallery>
      <section className="container mx-auto p-4 transition-all duration-150">
        {images.length === 1 ? (
          <Item
            original={images[0]}
            thumbnail={images[0]}
            width={"1000"}
            height={"600"}
          >
            {({ ref, open }) => (
              <Image
                ref={ref}
                onClick={open}
                alt=""
                src={images[0]}
                className="object-cover object-center w-full h-100 rounded-xl"
                width={"0"}
                height={"0"}
                sizes="100vw"
              />
            )}
          </Item>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={image}
                className={`${(index + 1) % 3 === 0 ? "col-span-2" : "col-span-1"} hover:shadow-lg shadow-blue-200 rounded-xl hover:-translate-y-1 transition-all duration-350 ease-out`}
              >
                <Item
                  original={image}
                  thumbnail={image}
                  width={"1000"}
                  height={"600"}
                >
                  {({ open, ref }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      alt=""
                      src={image}
                      className="object-cover object-center w-full h-100 rounded-xl"
                      width={"0"}
                      height={"0"}
                      sizes="100vw"
                      loading="eager"
                    />
                  )}
                </Item>
              </div>
            ))}
          </div>
        )}
      </section>
    </Gallery>
  );
};

export default PropertyImages;
