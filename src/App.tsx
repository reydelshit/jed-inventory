import Header from './components/Header';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from './components/ui/input';
import PageHeader from './components/PageHeader';

function App() {
  return (
    <div className="p-4">
      <PageHeader title="Dashboard" display="true" description="" />

      <div className="mt-[5rem] flex flex-col">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold uppercase">Overview of products</h1>

          <Input
            className="self-end mb-2 w-[20rem] border-pink-500 border-2"
            placeholder="Search product.."
          />
        </div>
        <Table className="border-2">
          <TableHeader className="bg-pink-500 text-white">
            <TableRow>
              <TableHead className="text-white">Product Code</TableHead>
              <TableHead className="text-white">Product Name</TableHead>
              <TableHead className="text-white">Date Expiration</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>GAGO</TableCell>
              <TableCell>11/20/2023</TableCell>
              <TableCell>IN STOCK</TableCell>
              <TableCell>400/400</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>GAGO</TableCell>
              <TableCell>11/20/2023</TableCell>
              <TableCell>IN STOCK</TableCell>
              <TableCell>400/400</TableCell>
            </TableRow>{' '}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>GAGO</TableCell>
              <TableCell>11/20/2023</TableCell>
              <TableCell>IN STOCK</TableCell>
              <TableCell>400/400</TableCell>
            </TableRow>{' '}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>GAGO</TableCell>
              <TableCell>11/20/2023</TableCell>
              <TableCell>IN STOCK</TableCell>
              <TableCell>400/400</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        HP
      </div>
    </div>
  );
}

export default App;
