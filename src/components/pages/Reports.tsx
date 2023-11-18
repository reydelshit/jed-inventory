import PageHeader from '../PageHeader';

export default function Reports() {
  return (
    <div>
      <PageHeader
        title="Reports"
        display="false"
        description="    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, labore beatae earum quisquam alias sed asperiores delectus quae architecto nulla."
      />

      <div className="border-2 mt-[5rem] flex justify-between w-[80%]">
        <div className="flex justify-center w-[20rem] border-2 flex-col items-center leading-8">
          <h1 className="text-9xl text-pink-500 font-bold">75%</h1>
          <p className="font-bold text-3xl">carrots</p>
          <p className="font-bold text-1xl mb-[2rem]">Supplier: Reydel Ocon</p>

          <p className="font-bold text-1xl">MANILA TUPI</p>
        </div>

        <div className="flex justify-center w-[20rem] border-2 flex-col items-center leading-8">
          <h1 className="text-9xl text-pink-500 font-bold">75%</h1>
          <p className="font-bold text-3xl">carrots</p>
          <p className="font-bold text-1xl mb-[2rem]">Supplier: Reydel Ocon</p>

          <p className="font-bold text-1xl">MANILA TUPI</p>
        </div>

        <div className="flex justify-center w-[20rem] border-2 flex-col items-center leading-8">
          <h1 className="text-9xl text-pink-500 font-bold">75%</h1>
          <p className="font-bold text-3xl">carrots</p>
          <p className="font-bold text-1xl mb-[2rem]">Supplier: Reydel Ocon</p>

          <p className="font-bold text-1xl">MANILA TUPI</p>
        </div>
      </div>
    </div>
  );
}
