import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import axios from 'axios';
import { isTokenValid, getUsuario } from "@/components/LoginValidToken/authUtils"; // Importa las utilidades

const URL = "http://backend.candy21.icu/";

export default function Shop6() {
  const { toggleWishlist, isAddedtoWishlist, addProductToCart } = useContextElement(); 
  const [selectedColView] = useState(5); 
  const [filtered, setFiltered] = useState([]);
  const [cartProductIds, setCartProductIds] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener productos de la tienda
    fetch(`${URL}productos/`)
      .then((response) => response.json())
      .then((data) => setFiltered(data))
      .catch((error) => console.error("Error al obtener los productos de la tienda:", error));

    // Obtener productos del carrito del backend
    const fetchCartProducts = async () => {
      if (isTokenValid()) {
        const userId = getUsuario();
        try {
          const response = await axios.get(`${URL}carritoCompras/`, {
            params: { id_usuario: userId },
          });
          const cartIds = response.data.map((item) => item.id_producto);
          setCartProductIds(cartIds); 
        } catch (error) {
          console.error("Error al obtener los productos del carrito:", error);
        }
      }
    };

    fetchCartProducts();
  }, []);

  const handleAddToCart = (productId) => {
    if (!isTokenValid()) {
      navigate("/login_register#register-tab");
    } else {
      if (isProductInCart(productId)) {
        return; // Producto ya en el carrito
      }
      const userId = getUsuario();
      const data = { id_producto: productId, cantidad: 1, id_usuario: userId };
      axios.post(`${URL}carritoCompras/`, data)
        .then(() => {
          addProductToCart(productId);
          setCartProductIds((prevIds) => [...prevIds, productId]);
        })
        .catch((error) => console.error('Error al agregar el producto al carrito:', error));
    }
  };

  const isProductInCart = (productId) => cartProductIds.includes(productId);

  return (
    <>
      <section>
        <div style={{ borderColor: "#eeeeee" }}>
          <div className="shop-banner position-relative">
            <div className="background-img background-img_overlay" style={{ backgroundColor: "#eeeeee" }}>
              <img
                loading="lazy"
                src="/assets/images/landpage2c.png"
                width="1903"
                height="420"
                alt="Pattern"
                className="slideshow-bg__img object-fit-cover"
              />
            </div>
            <div className="shop-banner__content container position-absolute start-50 top-50 translate-middle">
              <h2 className="h1 text-uppercase text-white text-center fw-bold mb-3 mb-xl-4 mb-xl-5">
                Clothes
              </h2>
            </div>
          </div>
        </div>
      </section>
      <div className="mb-4 pb-lg-3"></div>
      <section className="shop-main container">
        <div className={`products-grid row row-cols-2 row-cols-md-3 row-cols-lg-${selectedColView}`} id="products-grid">
          {filtered.slice(0, 15).map((elm, i) => (
            <div key={i} className="product-card-wrapper">
              <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                <div className="pc__img-wrapper">
                  <button
                    className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium"
                    onClick={() => handleAddToCart(elm.id)}
                    title={isProductInCart(elm.id) ? "Already Added" : "Add to Cart"}
                  >
                    {isProductInCart(elm.id) ? "Already Added" : "Add To Cart"}
                  </button>
                </div>
                <div className="pc__info position-relative">
                  <p className="pc__category">{elm.category}</p>
                  <h6 className="pc__title">
                    <Link to={`/product1_simple/${elm.id}`}>{elm.nombre}</Link>
                  </h6>
                  <div className="product-card__price d-flex">
                    <span className="money price">${elm.precio}</span>
                  </div>
                  <button
                    className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 ${
                      isAddedtoWishlist(elm.id) ? "active" : ""
                    }`}
                    onClick={() => toggleWishlist(elm.id)}
                    title="Add To Wishlist"
                  ></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
