import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const URL = "http://candy21.icu/";

export default function Cart() {
  const navigate = useNavigate();
  const { cartProducts, setCartProducts } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = JSON.parse(
          decodeURIComponent(
            window
              .atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          )
        );
        const now = Date.now() / 1000;
        return jsonPayload.exp > now; 
      } catch (error) {
        console.error("Error parsing token:", error);
        return false; 
      }
    }
    return false; 
  };

  const getUsuario = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = JSON.parse(
          decodeURIComponent(
            window
              .atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          )
        );
          const now = Date.now() / 1000;
        return jsonPayload.id; 
      } catch (error) {
        console.error("Error parsing token:", error);
        return false; 
      }
    }
    return false; 
  };

  const userId = getUsuario();

  const calculateTotal = (products) => {
    const total = products.reduce((acc, producto) => acc + (producto.producto.precio * producto.cantidad), 0);
    setTotalPrice(total.toFixed(2));
  };


  const fetchCartProducts = async () => {
    try {
      const response = await axios.get(`${URL}carritoCompras/`, {
        params: {
          id_usuario: userId,
        },
      });
      setCartProducts(response.data);
      calculateTotal(response.data)
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      fetchCartProducts();
    }else {
      setCartProducts([]);
      setTotalPrice(0);
    }
  }, []);

  const setQuantity = async (id, quantity) => {
    if (quantity >= 1) {
      const updatedProducts = cartProducts.map((product) => {
        if (product.id === id) {
          return { ...product, cantidad: quantity };
        }
        return product;
      });

      setCartProducts(updatedProducts);
      calculateTotal(updatedProducts)

      try {
        const data = { cantidad: quantity };
        await axios.put(`${URL}carritoCompras/${id}`, data);
      } catch (error) {
        console.error("Error al actualizar la cantidad del producto:", error);
      }
    }
  };

  const incrementQuantity = (id) => {
    const product = cartProducts.find((elm) => elm.id === id);
    if (product) {
      setQuantity(id, product.cantidad + 1);
    }
  };

  const decrementQuantity = (id) => {
    const product = cartProducts.find((elm) => elm.id === id);
    if (product && product.cantidad > 1) {
      setQuantity(id, product.cantidad - 1);
    }
  };

  const removeItem = async (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
    try {
      await axios.delete(`${URL}carritoCompras/${id}`);
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const proceedToCheckout = () => {
    if (cartProducts.length > 0) {
      navigate('/shop_checkout');
    }
  };

  return (
    <div className="shopping-cart" style={{ minHeight: "calc(100vh - 300px)" }}>
      <div className="cart-table__wrapper">
        {cartProducts.length ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th></th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((elm, i) => (
                  <tr key={i}>
                    <td>
                      {/* <div className="shopping-cart__product-item">
                        <img
                          loading="lazy"
                          src={elm.imgSrc}
                          width="120"
                          height="120"
                          alt="image"
                        />
                      </div> */}
                    </td>
                    <td>
                      <div className="shopping-cart__product-item__detail">
                        <h4>{elm.producto?.nombre || 'Producto sin nombre'}</h4>
                        <ul className="shopping-cart__product-item__options">
                          <li>Talla: {elm.producto?.talla?.descripcion || 'Talla no disponible'}</li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <span className="shopping-cart__product-price">
                        ${elm.producto?.precio}
                      </span>
                    </td>
                    <td>
                      <div className="qty-control position-relative">
                        <input
                          type="number"
                          name="quantity"
                          value={elm.cantidad}
                          min={1}
                          onChange={(e) =>
                            setQuantity(elm.id, e.target.value / 1)
                          }
                          className="qty-control__number text-center"
                        />
                        <div
                          onClick={() => decrementQuantity(elm.id)}
                          className="qty-control__reduce"
                        >
                          -
                        </div>
                        <div
                          onClick={() => incrementQuantity(elm.id)}
                          className="qty-control__increase"
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="shopping-cart__subtotal">
                        ${elm.producto?.precio * elm.cantidad}
                      </span>
                    </td>
                    <td>
                      <a
                        onClick={() => removeItem(elm.id)}
                        className="remove-cart"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="#767676"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0.259435 8.85506L9.11449 0L10 0.885506L1.14494 9.74056L0.259435 8.85506Z" />
                          <path d="M0.885506 0.0889838L9.74057 8.94404L8.85506 9.82955L0 0.97449L0.885506 0.0889838Z" />
                        </svg>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <div className="fs-20">Shop cart is empty</div>

            <button className="btn mt-3 btn-light">
              <Link to={"/shop-6"}>Explore Products</Link>
            </button>
          </>
        )}
      </div>
      {cartProducts.length ? (
        <div className="shopping-cart__totals-wrapper">
          <div className="sticky-content">
            <div className="shopping-cart__totals">
              <h3>Cart Totals</h3>
              <table className="cart-totals">
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>${totalPrice}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>
                      $
                      {totalPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mobile_fixed-btn_wrapper">
              <div className="button-wrapper container">
                <button className="btn btn-primary btn-checkout" onClick={proceedToCheckout}>
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
