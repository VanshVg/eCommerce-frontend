import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Orders.css";

interface orderInterface {
  id: number;
  tracking_id: number;
  product_data: string;
  quantity: number;
  status: string;
  created_at: string;
}

const Orders = () => {
  const [orderData, setOrderData] = useState<orderInterface[]>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://192.168.10.107:4000/order/get`, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.success) {
          setOrderData(resp.data.orderData);
        }
      })
      .catch((error) => {
        navigate("/");
      });
  }, []);
  return (
    <div className="font-customFont text-customDark mx-auto pb-[50px]">
      <h1 className="text-center text-[40px] font-bold  mt-[20px]">Orders</h1>
      <div className="h-[1px] bg-customDark w-full max-w-[95%] mx-auto"></div>
      {orderData ? (
        <table className="mx-auto mt-[20px] w-[90%]">
          <thead>
            <tr>
              <td>Sr. No.</td>
              <td>Product Name</td>
              <td>Quantity</td>
              <td>Final Amount</td>
              <td>Order Date</td>
              <td>Tracking Id</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="text-[15px]">
            {orderData.map((element: orderInterface, index: number) => {
              return (
                <tr
                  key={index}
                  className={index % 2 === 1 ? "bg-silver" : "bg-white"}
                >
                  <td className="font-bold">{index + 1}</td>
                  <td>{JSON.parse(element.product_data).title}</td>
                  <td>{element.quantity}</td>
                  <td>
                    $
                    {(
                      JSON.parse(element.product_data).price * element.quantity
                    ).toFixed(2)}
                  </td>
                  <td>{new Date(element.created_at).toLocaleDateString()}</td>
                  <td>{element.tracking_id}</td>
                  <td>
                    {element.status !== "Pending" ? (
                      <p className="text-green border-[1px] border-green rounded-[30px] px-[10px]">
                        Delivered
                      </p>
                    ) : (
                      <p className="text-red border-[1px] border-red rounded-[30px] px-[10px]">
                        Pending
                      </p>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/product/${JSON.parse(element.product_data).id}`}
                    >
                      <div className="w-[120px] py-[10px] bg-customDark text-white hover:scale-110 duration-300 ease-in-out cursor-pointer rounded-[2px] mx-auto">
                        View Product
                      </div>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
};

export default Orders;
