import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  checkout,
  quantityDecrement,
  quantityIncrement,
  removeItem,
} from "../../redux/reducers/cartReducers";
import { RootState } from "../../redux/store";

interface cartInterface {
  id: number;
  product_data: string;
  quantity: number;
}

const Cart = () => {
  const [cartData, setCartData] = useState<cartInterface[]>();
  const [totalAmount, setTotalAmout] = useState<number>(0);

  const cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://192.168.10.107:4000/cart/get`, { withCredentials: true })
      .then((resp) => {
        if (resp.data.success) {
          setCartData(resp.data.cartData);
          setTotalAmout(resp.data.totalPrice);
        }
      })
      .catch((error) => {
        navigate("/error");
      });
  }, [cart]);

  const increaseQuantity = (
    quantity: number,
    stock: number,
    productId: number,
    cartId: number
  ): void => {
    if (quantity !== stock) {
      axios
        .put(
          `http://192.168.10.107:4000/cart/increase/${cartId}`,
          {},
          { withCredentials: true }
        )
        .then((resp) => {
          if (resp.data.success) {
            dispatch(quantityIncrement({ id: productId }));
          }
        })
        .catch((error) => {
          navigate("/error");
        });
    }
  };

  const decreaseQuantity = (
    quantity: number,
    productId: number,
    cartId: number
  ): void => {
    if (quantity !== 1) {
      axios
        .put(
          `http://192.168.10.107:4000/cart/decrease/${cartId}`,
          {},
          { withCredentials: true }
        )
        .then((resp) => {
          if (resp.data.success) {
            dispatch(quantityDecrement({ id: productId }));
          }
        })
        .catch((error) => {
          navigate("/error");
        });
    }
  };

  const handleRemove = (id: number) => {
    axios
      .delete(`http://192.168.10.107:4000/cart/remove/${id}`, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.success) {
          dispatch(removeItem({ id: id }));
          Swal.fire({
            text: "Product removed from cart",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleCheckout = (): void => {
    Swal.fire({
      title: "Checkout Confirmation",
      text: "Are sure you want to checkout?",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      confirmButtonColor: "#2554c7",
      color: "#28183b",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://192.168.10.107:4000/cart/checkout`, {
            withCredentials: true,
          })
          .then((resp) => {
            if (resp.data.success) {
              dispatch(checkout());
              Swal.fire({
                text: "Checkout successfull",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
            navigate("/error");
          });
      }
    });
  };

  return (
    <div className="mb-[50px] font-customFont text-customDark">
      <h2 className="text-center ml-[10px] text-[40px]  font-bold mt-[20px]">
        Cart
      </h2>
      <div className="h-[1px] bg-customDark mx-auto w-[85%]"></div>
      {cartData && cartData.length > 0 ? (
        <div>
          <div>
            <p className="text-[30px] mt-[20px]">
              Total Amount:
              <span className="ml-[10px]">${totalAmount.toFixed(2)}</span>
            </p>
            <div
              className="bg-customDark text-white w-[150px] py-[10px] text-[20px] rounded-[3px] mx-auto duration-300 ease-in-out hover:scale-110 cursor-pointer mt-[15px]"
              onClick={handleCheckout}
            >
              Check Out
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-[20px] px-[10px] mt-[40px]">
            {cartData &&
              cartData.map((element) => {
                return (
                  <div className="w-[calc(100%/5)] px-[15px] bg-silver rounded-[5px] flex flex-col gap-[10px]">
                    <div>
                      <img
                        src={JSON.parse(element.product_data).thumbnail}
                        className="mx-auto"
                      />
                      <p className="text-[18px] font-bold">
                        {JSON.parse(element.product_data).title}
                      </p>
                    </div>
                    <div className="flex flex-col content-between mt-auto pb-[20px]">
                      <p className="font-bold text-[20px]">
                        ${JSON.parse(element.product_data).price}
                      </p>
                      <div className="mt-[15px] flex justify-center">
                        <p className="font-bold">Quantity:</p>
                        <img
                          src="/icons/minus.svg"
                          className="ml-[10px] mr-[15px] cursor-pointer"
                          onClick={() => {
                            decreaseQuantity(
                              element.quantity,
                              JSON.parse(element.product_data).id,
                              element.id
                            );
                          }}
                        />
                        <span className="text-[20px] -mt-[5px]">
                          {element.quantity}
                        </span>
                        <img
                          src="/icons/plus.svg"
                          className="ml-[10px] mr-[15px] cursor-pointer -mt-[2px]"
                          onClick={() =>
                            increaseQuantity(
                              element.quantity,
                              JSON.parse(element.product_data).stock,
                              JSON.parse(element.product_data).id,
                              element.id
                            )
                          }
                        />
                      </div>
                      <div className="mt-[25px] flex justify-center gap-[8px]">
                        <div
                          className="bg-customDark text-white w-[120px] p-[5px] rounded-[3px] duration-300 ease-in-out hover:scale-110 cursor-pointer"
                          onClick={() => {
                            navigate(
                              `/product/${JSON.parse(element.product_data).id}`
                            );
                          }}
                        >
                          View Product
                        </div>
                        <div
                          className="border-[1px] border-customDark w-[120px] py-[5px] rounded-[3px] duration-300 ease-in-out hover:scale-110 cursor-pointer"
                          onClick={() => {
                            handleRemove(element.id);
                          }}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <p className="text-red text-[20px] mt-[10px] max-w-[85%] mx-auto">
          Your cart is empty
        </p>
      )}
    </div>
  );
};

export default Cart;
