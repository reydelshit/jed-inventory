import PageHeader from '../PageHeader';
import dumy from '@/assets/dumy.png';
import Rainbow from '@/assets/RAINBOW.jpg';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
export default function Product() {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <div className="p-4">
      <div className="flex gap-10">
        <div className="w-[80%]">
          <PageHeader
            title="Product Info"
            display="false"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum et cum eveniet ut saepe commodi, incidunt voluptas nostrum? Quasi, cupiditate!"
          />

          {isMouseOver && (
            <div className="flex gap-2 w-full border-2 mt-[2rem] p-2 border-pink-500 rounded-md font-bold ">
              <img
                className="h-[15rem] w-[20rem] object-cover block rounded-md"
                src={Rainbow}
                alt=""
              />
              <div className="flex items-start flex-col justify-center text-lg">
                <h1 className="font-bold">CARROTS</h1>
                <p className="text-red-500 ">SOLD OUT</p>
                <span className="flex gap-2">
                  SUPPLIER: <p className="text-red-500"> CLASSIX SNACKS</p>
                </span>
                <p>P49.00</p>
                <span className="flex gap-2">
                  CONSINGMENT EXP DATE:{' '}
                  <p className="text-red-500"> 11/11/11</p>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div
              onMouseOver={() => handleMouseOver()}
              onMouseLeave={() => handleMouseLeave()}
              className="h-[20rem]"
            >
              <img
                className="h-[80%] w-full object-cover rounded-md"
                src={Rainbow}
                alt="product"
              />
              <div className="p-2">
                <h1 className="font-bold uppercase text-2xl text-pink-500">
                  Carrots
                </h1>
                <p className="text-sm">18/20 stocks</p>
              </div>
            </div>
            <div
              onMouseOver={() => handleMouseOver()}
              onMouseLeave={() => handleMouseLeave()}
              className="h-[20rem]"
            >
              <img
                className="h-[80%] w-full object-cover rounded-md"
                src={Rainbow}
                alt="product"
              />
              <div className="p-2">
                <h1 className="font-bold uppercase text-2xl text-pink-500">
                  Carrots
                </h1>
                <p className="text-sm">18/20 stocks</p>
              </div>
            </div>

            <div
              onMouseOver={() => handleMouseOver()}
              onMouseLeave={() => handleMouseLeave()}
              className="h-[20rem]"
            >
              <img
                className="h-[80%] w-full object-cover rounded-md"
                src={Rainbow}
                alt="product"
              />
              <div className="p-2">
                <h1 className="font-bold uppercase text-2xl text-pink-500">
                  Carrots
                </h1>
                <p className="text-sm">18/20 stocks</p>
              </div>
            </div>
          </div>
          <div className="w-full text-center mt-[2rem]">
            <Button className="bg-pink-500">View More</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
