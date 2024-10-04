import { useContextElement } from "@/context/Context";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const URL = "http://18.218.13.130:2003/";

const countries = [
  "Australia",
  "Canada",
  "United Kingdom",
  "United States",
  "Turkey",
];

export default function Checkout() {
  const { cartProducts, setCartProducts } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [idDDActive, setIdDDActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    city: "",
    zipcode: "",
    province: "",
    streetAddress: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({}); // Para rastrear si los campos han sido tocados
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

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
      setCartProducts(response.data)
      calculateTotal(response.data)
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  };

  // Validar los campos obligatorios
  const validateForm = () => {
    const errors = {};
    if (!formValues.firstName) errors.firstName = "First name is required";
    if (!formValues.lastName) errors.lastName = "Last name is required";
    if (!selectedRegion) errors.selectedRegion = "Country is required";
    if (!formValues.city) errors.city = "City is required";
    if (!formValues.zipcode) errors.zipcode = "Postcode / ZIP is required";
    if (!formValues.province) errors.province = "Province is required";
    if (!formValues.streetAddress) errors.streetAddress = "Street address is required";
    if (!formValues.phone) errors.phone = "Phone number is required";
    if (!formValues.email) errors.email = "Email is required";

    setFormErrors(errors);

    // Si no hay errores, el formulario es válido
    return Object.keys(errors).length === 0;
  };

  // Manejar el cambio de valores en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // Marcar los campos como tocados cuando el usuario interactúa con ellos
  const handleFieldBlur = (e) => {
    const { id } = e.target;
    setTouchedFields({ ...touchedFields, [id]: true });
  };

  // Efecto para validar el formulario en tiempo real y habilitar o deshabilitar el botón PLACE ORDER
  useEffect(() => {
    fetchCartProducts();
    setIsFormValid(validateForm());
  }, [formValues, selectedRegion]);

  const proceedToCheckout = () => {
    if (cartProducts.length > 0 && validateForm()) {
      createPedido();
    } else {
      setTouchedFields({
        firstName: true,
        lastName: true,
        city: true,
        zipcode: true,
        province: true,
        streetAddress: true,
        phone: true,
        email: true,
        selectedRegion: true,
      });
    }
  };

  const shoppingBag = () => {
      navigate('/shop_cart');
  };

  const createPedido = async () => {
    try {
        const pedidoData = {
            subtotal: totalPrice,
            descuento: 0, 
            direccion_envio: formValues.streetAddress,
            provincia_envio: formValues.province,
            codigo_postal: formValues.zipcode,
            ciudad_envio: formValues.city,
            pais_envio: selectedRegion, 
            id_usuario: userId,
        };

        // Crear el pedido y obtener el id del pedido
        const response = await axios.post(`${URL}pedidos/`, pedidoData);

        if (response.status === 200) {
            const pedidoId = response.data.id; 
            await createDetallePedido(pedidoId);
            localStorage.setItem("orderId", pedidoId);
            updateCart();
        }
    } catch (error) {
        console.error("Error al crear el pedido", error);
    }
};

const createDetallePedido = async (pedidoId) => {
  try {
      const detallePromises = cartProducts.map(async (producto) => {
          const detalleData = {
              cantidad: producto.cantidad,
              precio: producto.producto.precio,
              id_producto: producto.producto.id, 
              id_pedido: pedidoId, 
          };
          console.log(detalleData)

          await axios.post(`${URL}detallePedidos/`, detalleData);
      });
      await Promise.all(detallePromises);
  } catch (error) {
      console.error("Error al crear los detalles del pedido", error);
  }
};

const updateCart = async () => {
  try {
    const updatePromises = cartProducts.map(async (producto) => {
        const data = { estado: 0 };
        console.log("Actualizando producto en carrito con id:", producto.id);
        await axios.put(`${URL}carritoCompras/${producto.id}`, data);
    });

    await Promise.all(updatePromises);
    console.log("Carrito actualizado correctamente");
    
    setCartProducts([]);
    navigate('/shop_order_complete');
  } catch (error) {
    console.error("Error al actualizar los productos del carrito:", error);
  }
};


  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="checkout-form">
        <div className="billing-info__wrapper">
          <h4>BILLING DETAILS</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}  // Marca como "tocado"
                />
                <label htmlFor="firstName">First Name</label>
                {touchedFields.firstName && formErrors.firstName && (
                  <p className="text-danger">{formErrors.firstName}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}  // Marca como "tocado"
                />
                <label htmlFor="lastName">Last Name</label>
                {touchedFields.lastName && formErrors.lastName && (
                  <p className="text-danger">{formErrors.lastName}</p>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  placeholder="Company Name (optional)"
                  value={formValues.companyName}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}  // Marca como "tocado"
                />
                <label htmlFor="companyName">Nit (optional)</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="search-field my-3">
                <div
                  className={`form-label-fixed hover-container ${idDDActive ? "js-content_visible" : ""}`}
                >
                  <label htmlFor="search-dropdown" className="form-label">
                    Country / Region*
                  </label>
                  <div className="js-hover__open">
                    <input
                      type="text"
                      className="form-control form-control-lg search-field__actor search-field__arrow-down"
                      id="search-dropdown"
                      name="search-keyword"
                      value={selectedRegion}
                      readOnly
                      placeholder="Choose a location..."
                      onClick={() => setIdDDActive((pre) => !pre)}
                    />
                  </div>
                  <div className="filters-container js-hidden-content mt-2">
                    <div className="search-field__input-wrapper">
                      <input
                        type="text"
                        className="search-field__input form-control form-control-sm bg-lighter border-lighter"
                        placeholder="Search"
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                      />
                    </div>
                    <ul className="search-suggestion list-unstyled">
                      {countries
                        .filter((elm) =>
                          elm.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((elm, i) => (
                          <li
                            onClick={() => {
                              setSelectedRegion(elm);
                              setIdDDActive(false);
                            }}
                            key={i}
                            className="search-suggestion__item js-search-select"
                          >
                            {elm}
                          </li>
                        ))}
                    </ul>
                  </div>
                  {touchedFields.selectedRegion && formErrors.selectedRegion && (
                    <p className="text-danger">{formErrors.selectedRegion}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Town / City *"
                  value={formValues.city}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}  // Marca como "tocado"
                />
                <label htmlFor="city">Town / City *</label>
                {touchedFields.city && formErrors.city && (
                  <p className="text-danger">{formErrors.city}</p>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="zipcode"
                  placeholder="Postcode / ZIP *"
                  value={formValues.zipcode}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}  // Marca como "tocado"
                />
                <label htmlFor="zipcode">Postcode / ZIP *</label>
                {touchedFields.zipcode && formErrors.zipcode && (
                  <p className="text-danger">{formErrors.zipcode}</p>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="province"
                  placeholder="Province *"
                  value={formValues.province}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}  // Marca como "tocado"
                />
                <label htmlFor="province">Province *</label>
                {touchedFields.province && formErrors.province && (
                  <p className="text-danger">{formErrors.province}</p>
                )}
              </div>
            </div>
            
            <div className="col-md-12">
              <div className="form-floating mt-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="streetAddress"
                  placeholder="Street Address *"
                  value={formValues.streetAddress}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}  // Marca como "tocado"
                />
                <label htmlFor="streetAddress">Street Address *</label>
                {touchedFields.streetAddress && formErrors.streetAddress && (
                  <p className="text-danger">{formErrors.streetAddress}</p>
                )}
              </div>
              <div className="form-floating mt-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="streetAddress_2"
                  value={formValues.streetAddress_2 || ""}
                  onChange={handleInputChange}
                  placeholder="Street Address 2"
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Phone *"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}  // Marca como "tocado"
                />
                <label htmlFor="phone">Phone *</label>
                {touchedFields.phone && formErrors.phone && (
                  <p className="text-danger">{formErrors.phone}</p>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Mail *"
                  value={formValues.email}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}  // Marca como "tocado"
                />
                <label htmlFor="email">Your Mail *</label>
                {touchedFields.email && formErrors.email && (
                  <p className="text-danger">{formErrors.email}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="checkout__totals-wrapper">
          <div className="sticky-content">
            <div className="checkout__totals">
              <h3>Your Order</h3>
              <table className="checkout-cart-items">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((elm, i) => (
                    <tr key={i}>
                      <td>
                        {elm.producto.nombre} x {elm.cantidad}
                      </td>
                      <td>${(elm.producto.precio * elm.cantidad).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="checkout-totals">
                <tbody>
                  <tr>
                    <th>SUBTOTAL</th>
                    <td>${totalPrice}</td>
                  </tr>
                  <tr>
                    <th>TOTAL</th>
                    <td>${totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="checkout__payment-methods">
              <div className="form-check">
                <input
                  className="form-check-input form-check-input_fill"
                  type="radio"
                  name="checkout_payment_method"
                  id="checkout_payment_method_3"
                />
                <label
                  className="form-check-label"
                  htmlFor="checkout_payment_method_3"
                >
                  Cash on delivery
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input form-check-input_fill"
                  type="radio"
                  name="checkout_payment_method"
                  id="checkout_payment_method_4"
                />
                <label
                  className="form-check-label"
                  htmlFor="checkout_payment_method_4"
                >
                  Paypal
                </label>
              </div>
            </div>
            <div>
              <button className="btn btn-primary btn-checkout mb-2"
                onClick={shoppingBag}>
                RETURN TO SHOPPING BAG
              </button>

              <button
                className="btn btn-primary btn-checkout mt-2"
                onClick={proceedToCheckout}
                disabled={!isFormValid}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}