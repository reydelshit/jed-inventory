import axios from 'axios';
import PageHeader from '../PageHeader';
import { Button } from '../ui/button';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import moment from 'moment';

type ProductDetails = {
  product_name: string;
  description: string;
  stocks: number;
  expiration_date: string;
  product_image: string;
  supplier_id: number;
  product_id: number;
  supplier_name: string;
  racks: number;
};

export default function Racks() {
  const [racks, setRack] = useState(0 as number);

  const [product, setProduct] = useState<ProductDetails[]>([]);

  const handleRack = (rack: number) => {
    setRack(rack);
    axios
      .get('http://localhost/jed-inventory/racks.php', {
        params: {
          racks: rack,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });

    console.log(rack);
  };
  return (
    <div>
      <PageHeader
        title="Racks"
        display="false"
        description="Where product is located"
      />

      <div className="flex gap-[2rem] justify-between">
        <div className="flex flex-col w-[15rem]">
          <h1 className="font-bold my-[2rem] text-2xl">Number of Racks</h1>
          {Array.from({ length: 10 }, (_, i) => i).map((number) => {
            const isSelected = racks === number + 1;
            return (
              <Button
                onClick={() => handleRack(number + 1)}
                key={number + 1}
                className={`${
                  isSelected ? 'bg-[#79AC78] text-white' : 'bg-[#618264] '
                } ' mr-2 my-2 hover:bg-[#79AC78] hover:text-white`}
              >
                {number + 1}
              </Button>
            );
          })}
        </div>

        {product.length > 0 ? (
          <div className="w-[70%] border-2 ">
            <Table className="border-2 w-full">
              <TableHeader className="bg-[#618264] text-white">
                <TableRow>
                  <TableHead className="text-white"></TableHead>
                  <TableHead className="text-white">Product Name</TableHead>
                  <TableHead className="text-white">Date Expiration</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Stocks</TableHead>
                  <TableHead className="text-white w-[5rem]">Racks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.map((prod, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        className="w-[5rem] rounded-lg h-[5rem] object-cover"
                        src={prod.product_image}
                        alt={prod.product_name}
                      />
                    </TableCell>
                    <TableCell>{prod.product_name}</TableCell>
                    <TableCell>
                      {moment(prod.expiration_date).format('LL')}
                    </TableCell>
                    <TableCell>
                      {prod.stocks > 20 ? 'IN STOCK' : 'OUT OF STOCK'}
                    </TableCell>
                    <TableCell>{prod.stocks}</TableCell>
                    <TableCell>{prod.racks} </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
