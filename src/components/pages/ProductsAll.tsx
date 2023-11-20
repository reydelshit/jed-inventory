import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PageHeader from '../PageHeader';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useNavigate } from 'react-router-dom';
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

type ProductDetailSpecific = {
  product_name: string;
  description: string;
  stocks: number;
  expiration_date: string;
  product_image: string;
  supplier_id: number;
  product_id: number;
  supplier_name: string;
  racks: string;
};

export default function ProductsAll() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetails[]>([]);
  const [searchProduct, setSearchProduct] = useState('' as string);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productID, setProductID] = useState(0 as number);
  const [productDetails, setProductDetails] = useState({
    product_name: '',
    description: '',
    stocks: 0,
    expiration_date: '',
    product_image: '',
    supplier_id: 0,
    racks: '',
  });
  const [productSpecific, setProductSpecific] = useState<
    ProductDetailSpecific[]
  >([]);

  const getAllProducts = () => {
    axios.get('http://localhost/jed-inventory/product.php').then((res) => {
      console.log(res.data, 'prorduct');
      setProduct(res.data);
    });
  };

  const deleteProduct = (id: number) => {
    axios
      .delete('http://localhost/jed-inventory/product.php', {
        data: { product_id: id },
      })
      .then((res) => {
        console.log(res.data);
        getAllProducts();
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  const handleShowUpdateForm = (id: number) => {
    axios
      .get('http://localhost/jed-inventory/product.php', {
        params: {
          product_id: id,
        },
      })
      .then((res) => {
        setProductSpecific(res.data);
        setProductDetails(res.data[0]);
        console.log(res.data, 'spe prorduct');
      });

    setShowUpdateForm(true);
    setProductID(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProductDetails((values) => ({ ...values, [name]: value }));
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put('http://localhost/jed-inventory/product.php', {
        product_id: productID,
        product_name: productDetails.product_name,
        description: productDetails.description,
        expiration_date: productDetails.expiration_date,
        racks: productDetails.racks,
      })
      .then((res) => {
        console.log(res.data);
        getAllProducts();
      });
  };

  return (
    <div className="relative">
      <PageHeader
        title="All Products"
        display="false"
        description="Welcome, your centralized hub displaying a comprehensive list of available products, their current stock levels, and essential details for streamlined inventory management."
      />
      <div className="mt-[2rem]">
        <div className="flex justify-end">
          <Input
            onChange={(e) => setSearchProduct(e.target.value)}
            placeholder="Search product.."
            className="w-[20rem] border-[#618264] border-2 mb-2"
          />
        </div>
        <Table className="border-2">
          <TableHeader className="bg-[#618264] text-white">
            <TableRow>
              <TableHead className="text-white"></TableHead>
              <TableHead className="text-white">Product Name</TableHead>
              <TableHead className="text-white">Date Expiration</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Stocks</TableHead>
              <TableHead className="text-white w-[5rem]">Racks</TableHead>
              <TableHead className="text-white w-[5rem]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product
              .filter((prod) => prod.product_name.includes(searchProduct))
              .map((prod, index) => (
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
                  <TableCell>{prod.racks}</TableCell>

                  <TableCell className="flex gap-2 w-[20rem] border-2">
                    <Button
                      onClick={() => deleteProduct(prod.product_id)}
                      className="bg-[#618264]"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleShowUpdateForm(prod.product_id)}
                      className="bg-[#618264]"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => navigate('/stock')}
                      className="bg-[#618264]"
                    >
                      Add stocks
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {showUpdateForm && (
        <div className="absolute top-0 bg-[#f2f2f0] bg-opacity-75 w-full h-full flex justify-center items-center">
          <form
            onSubmit={handleUpdateProduct}
            className="w-[30rem] border-2 p-4 bg-white rounded-lg"
          >
            <div>
              <Label>Product Name</Label>
              <Input
                defaultValue={productDetails.product_name}
                onChange={handleInputChange}
                name="product_name"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                defaultValue={productDetails.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div>
              <Label>Expiration Date</Label>
              <Input
                type="date"
                defaultValue={productDetails.expiration_date}
                onChange={handleInputChange}
                name="expiration_date"
              />
            </div>

            <div>
              <Label>Racks</Label>
              <Input
                defaultValue={productDetails.racks}
                onChange={handleInputChange}
                name="racks"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowUpdateForm(false)}
                type="submit"
                className="mt-2 bg-[#618264]"
              >
                Cancel
              </Button>

              <Button type="submit" className="mt-2 bg-[#618264]">
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
