import pfp from '../assets/pfp.jpg';
import { Button } from './ui/button';

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    window.location.href = '/login';
  };
  return (
    <header className="h-[8rem] border-2 flex items-center p-4 justify-between">
      <h1 className="text-4xl font-bold">DARBC Warehouse Inventory System</h1>

      <div className="flex gap-2 items-center">
        <img
          className="h-full w-[6rem] rounded-full object-cover"
          src={pfp}
          alt="pfp"
        />

        <Button onClick={handleLogout} className="bg-[#618264]">
          Logout
        </Button>
      </div>
    </header>
  );
}
