import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import axios from 'axios';

const URL = "http://18.218.13.130:2003/";

export default function Shop6() {
  const {
    toggleWishlist,
    isAddedtoWishlist,
    addProductToCart, 
    isAddedToCartProducts
  } = useContextElement(); 

  const [selectedColView] = useState(5); 
  const [filtered, setFiltered] = useState([]);
  const [cartProductIds, setCartProductIds] = useState([]); 
  const navigate = useNavigate();

  // Función para validar el token de autenticación
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
        console.error("Error al analizar el token:", error);
        return false;
      }
    }
    return false; 
  };

  // Función para obtener el ID del usuario desde el token almacenado
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
        return jsonPayload.id; 
      } catch (error) {
        console.error("Error al analizar el token:", error);
        return false;
      }
    }
    return false;
  };

  // Al cargar la página obtenemos los productos de la tienda y del carrito del usuario
  useEffect(() => {
    fetch(`${URL}productos/`)
      .then((response) => response.json())
      .then((data) => {
        setFiltered(data); 
      })
      .catch((error) => {
        console.error("Error al obtener los productos de la tienda:", error);
      });

    // Obtener productos del carrito del backend
    const fetchCartProducts = async () => {
      if (isTokenValid()) {
        const userId = getUsuario();
        try {
          const response = await axios.get(`${URL}carritoCompras/`, {
            params: { id_usuario: userId },
          });
          const cartIds = response.data.map((item) => item.id_producto); // Obtiene los IDs de los productos en el carrito
          setCartProductIds(cartIds); 
        } catch (error) {
          console.error("Error al obtener los productos del carrito:", error);
        }
      }
    };

    fetchCartProducts();
  }, []);

  // Función para manejar el evento de agregar productos al carrito
  const handleAddToCart = (productId) => {
    if (!isTokenValid()) {
      navigate("/login_register#register-tab");
    } else {
      if (isProductInCart(productId)) {
        // Si el producto ya está en el carrito, no hacemos nada
        return;
      }
      const userId = getUsuario();
      const data = {
        id_producto: productId,
        cantidad: 1,
        id_usuario: userId,
      };
      axios.post(`${URL}carritoCompras/`, data)
        .then(() => {
          addProductToCart(productId);
          setCartProductIds((prevIds) => [...prevIds, productId]); 
        })
        .catch((error) => {
          console.error('Error al agregar el producto al carrito:', error);
        });
    }
  };

  // Función para verificar si el producto ya está en el carrito
  const isProductInCart = (productId) => {
    return cartProductIds.includes(productId); 
  };

  return (
    <>
      <section>
        <div style={{ borderColor: "#eeeeee" }}>
          <div className="shop-banner position-relative">
            <div
              className="background-img background-img_overlay"
              style={{ backgroundColor: "#eeeeee" }}
            >
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
              <ul
                className="d-flex flex-wrap justify-content-center list-unstyled text-uppercase h6"
                aria-label="Collections List"
              ></ul>
            </div>
            {/* <!-- /.shop-banner__content --> */}
          </div>
        </div>
      </section>
      <div className="mb-4 pb-lg-3"></div>
      <section className="shop-main container">
        <div className="d-flex justify-content-between mb-4 pb-md-2"></div>

        <div
          className={`products-grid row row-cols-2 row-cols-md-3 row-cols-lg-${selectedColView}`}
          id="products-grid"
        >
          {filtered.slice(0, 15).map((elm, i) => (
            <div key={i} className="product-card-wrapper">
              <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                <div className="pc__img-wrapper">
                  {/*<Swiper
                    className="shop-list-swiper  swiper-container background-img js-swiper-slider"
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation={{
                      prevEl: ".prev" + i,
                      nextEl: ".next" + i,
                    }}
                  >*/}
                    {/* IMAGENES DE LOS PRODUCTOS */}
                    {/* {[elm.imgSrc, elm.imgSrc2].map((elm2, i) => (
                      <SwiperSlide key={i} className="swiper-slide">
                        <Link to={`/product1_simple/${elm.id}`}>
                          <img
                            loading="lazy"
                            src={elm2}
                            width="330"
                            height="400"
                            alt={elm.nombre}
                            className="pc__img"
                          />
                        </Link>
                      </SwiperSlide>
                    ))} */}

                    {/* <span
                      className={`cursor-pointer pc__img-prev ${"prev" + i} `}
                    >
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_prev_sm" />
                      </svg>
                    </span>
                    <span
                      className={`cursor-pointer pc__img-next ${"next" + i} `}
                    >
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_next_sm" />
                      </svg>
                    </span> 
                  </Swiper>*/}
                  
                  <button
                    className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
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
                    className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${
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
