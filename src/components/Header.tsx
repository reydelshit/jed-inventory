import pfp from '../assets/pfp.jpg';

export default function Header() {
  return (
    <header className="h-[8rem] border-2 flex items-center p-4 justify-between">
      <h1 className="text-4xl font-bold">DARBC Warehouse Inventory System</h1>

      <img
        className="h-full w-[6rem] rounded-full object-cover"
        src={pfp}
        alt="pfp"
      />
    </header>
  );
}
