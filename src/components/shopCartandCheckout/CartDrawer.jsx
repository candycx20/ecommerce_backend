import { Link, useLocation } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const URL = "http://18.218.13.130:2003/";

export default function CartDrawer() {
  const { cartProducts, setCartProducts } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  const { pathname } = useLocation();
  const closeCart = () => {
    document
      .getElementById("cartDrawerOverlay")
      .classList.remove("page-overlay_visible");
    document.getElementById("cartDrawer").classList.remove("aside_visible");
  };

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
            const data = { cantidad: quantity};
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
      const data = { estado: 0};
      await axios.put(`${URL}carritoCompras/${id}`, data); 
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      const fetchCartProducts = async () => {
        try {
          const response = await axios.get(`${URL}carritoCompras/`, {
            params: {
              id_usuario: userId
            }
          });

          setCartProducts(response.data);
          calculateTotal(response.data)
    
        } catch (error) {
          console.error('Error al obtener los productos del carrito:', error);
        }
      }
  
      fetchCartProducts();
      closeCart();
    }else {
      setCartProducts([]);
      setTotalPrice(0);
    }
  }, [userId]);
  

  return (
    <>
      <div
        className="aside aside_right overflow-hidden cart-drawer "
        id="cartDrawer"
      >
        <div className="aside-header d-flex align-items-center">
          <h3 className="text-uppercase fs-6 mb-0">
            SHOPPING BAG (
            <span className="cart-amount js-cart-items-count">
              {cartProducts.length}
            </span>{" "}
            )
          </h3>
          <button
            onClick={closeCart}
            className="btn-close-lg js-close-aside btn-close-aside ms-auto"
          ></button>
        </div>
        {cartProducts.length ? (
          <div className="aside-content cart-drawer-items-list">
            {cartProducts.map((elm, i) => (
              <React.Fragment key={i}>
                <div className="cart-drawer-item d-flex position-relative">
                  <div className="position-relative">
                    {/*<img
                      loading="lazy"
                      className="cart-drawer-item__img"
                      width={330}
                      height={400}
                      style={{ height: "fit-content" }}
                      src={elm.imgSrc}
                      alt="image"
                    />*/}
                  </div>
                  <div className="cart-drawer-item__info flex-grow-1">
                    <h6 className="cart-drawer-item__title fw-normal">
                      {elm?.producto?.nombre || "Producto sin nombre"}
                    </h6>
                    <p className="cart-drawer-item__option text-secondary">
                      {elm?.producto?.nombre || "Producto sin nombre"}
                    </p>
                    <p className="cart-drawer-item__option text-secondary">
                      Talla: {elm?.producto?.talla?.descripcion || "Talla no disponible"}
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-1">
                      <div className="qty-control position-relative">
                        <input
                          type="number"
                          name="quantity"
                          onChange={(e) =>
                            setQuantity(elm.id, e.target.value / 1)
                          }
                          value={elm?.cantidad || 0}
                          min="1"
                          className="qty-control__number border-0 text-center"
                        />
                        <div
                          onClick={() => decrementQuantity(elm.id)} // Restar cantidad
                          className="qty-control__reduce text-start"
                        >
                          -
                        </div>
                        <div
                          onClick={() => incrementQuantity(elm.id)} // Sumar cantidad
                          className="qty-control__increase text-end"
                        >
                          +
                        </div>
                      </div>

                      <span className="cart-drawer-item__price money price">
                        ${elm?.producto?.precio ? (elm.producto.precio * elm.cantidad).toFixed(2) : "Precio no disponible"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(elm.id)}
                    className="btn-close-xs position-absolute top-0 end-0 js-cart-item-remove"
                  ></button>
                </div>
                {/* <!-- /.cart-drawer-item d-flex --> */}

                <hr className="cart-drawer-divider" />
              </React.Fragment>
            ))}

            {/* <!-- /.cart-drawer-item d-flex --> */}
          </div>
        ) : (
          <div className="fs-18 mt-5 px-5">
            Your cart is empty. Start shopping!
          </div>
        )}
        {/* <!-- /.aside-content --> */}

        <div className="cart-drawer-actions position-absolute start-0 bottom-0 w-100">
          <hr className="cart-drawer-divider" />
          <div className="d-flex justify-content-between">
            <h6 className="fs-base fw-medium">SUBTOTAL:</h6>
            <span className="cart-subtotal fw-medium">${totalPrice}</span>
          </div>
          {/* <!-- /.d-flex justify-content-between --> */}
          {cartProducts.length ? (
            <>
              <Link to="/shop_cart" className="btn btn-light mt-3 d-block">
                View Cart
              </Link>
              <Link
                to="/shop_checkout"
                className="btn btn-primary mt-3 d-block"
              >
                Checkout
              </Link>
            </>
          ) : (
            <Link to="/shop-6" className="btn btn-light mt-3 d-block">
              Explore shop
            </Link>
          )}
        </div>
        {/* <!-- /.aside-content --> */}  
      </div>
      <div
        id="cartDrawerOverlay"
        onClick={closeCart}
        className="page-overlay"
      ></div>
    </>
  );
}
