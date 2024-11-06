import { useContextElement } from "@/context/Context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const URL = "http://backend.candy21.icu/";

export default function OrderCompleted() {
  const { orderData} = useContextElement();
  const { cartProducts, setCartProducts } = useContextElement();
  const {totalPrice} = useContextElement();
  const [showDate, setShowDate] = useState(false);
  const {factura, setFactura} = useContextElement();
  const {items, setItems} = useContextElement();
  const navigate = useNavigate();

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

  // const calculateTotal = (products) => {
  //   const total = products.reduce((acc, producto) => acc + (producto.producto.precio * producto.cantidad), 0);
  //   setTotalPrice(total.toFixed(2));
  // };


  const fetchCartProducts = async () => {
    try {
      const response = await axios.get(`${URL}carritoCompras/`, {
        params: {
          id_usuario: userId,
        },
      });
      setCartProducts(response.data)
      // calculateTotal(response.data)
    } catch (error) {
      console.error("Error al obtener los productos del carrito:", error);
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      
    console.log(items)
    console.log(factura)
    fetchCartProducts();
    setShowDate(true);
  }else{
    navigate('/');
  }
  }, []);

  return (
    <div className="order-complete">
      <div className="order-complete__message">
        <h3>Factura de Compra</h3>
        <p>Gracias por su compra. A continuación, encontrará los detalles de su pedido:</p>
      </div>
      
      <div className="invoice-section">
        <h4>Emisor</h4>
        <p>Nombre: {factura.receptor.nombre}</p>
        <p>NIT: {factura.receptor.nit}</p>
        <p>Dirección: {factura.receptor.direccion}</p>
        <hr />
        
        <h4>Receptor</h4>
        <p>Nombre: {factura.emisor.nombre || "Consumidor Final"}</p>
        <p>NIT: {factura.emisor.nit || "CF"}</p>
      </div>

      <div className="order-info">
        <div className="order-info__item">
          <label>Número de Autorización</label>
          <span>{factura.no_autorizacion || "N/A"}</span>
        </div>
        <div className="order-info__item">
          <label>Serie</label>
          <span>{factura.serie || "N/A"}</span>
        </div>
        <div className="order-info__item">
          <label>Número DTE</label>
          <span>{factura.no_acceso || "N/A"}</span>
        </div>
        <div className="order-info__item">
          <label>Fecha de Emisión</label>
          {showDate && <span>{new Date().toLocaleDateString()}</span>}
        </div>
      </div>

      <div className="checkout__totals-wrapper">
        <div className="checkout__totals">
          <h4>Detalles del Pedido</h4>
          <table className="checkout-cart-items">
            <thead>
              <tr>
                <th>NO</th>
                <th>TIPO</th>
                <th>CANTIDAD</th>
                <th>DESCRIPCIÓN</th>
                <th>PRECIO UNITARIO</th>
                <th>DESCUENTOS</th>
                <th>OTROS DESCUENTOS</th>
                <th>TOTAL</th>
                <th>IMPUESTO</th>
              </tr>
            </thead>
            <tbody>
              {items.map((elm, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{elm.tipo_item}</td>
                  <td>  {elm.cantidad}</td>
                  <td>{elm.nombre}</td>
                  <td>${elm.precio}</td>
                  <td>${elm.descuento}</td>
                  <td>${elm.otros_descuento}</td>
                  <td>${elm.total}</td>
                  <td>${elm.impuesto}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="checkout-totals">
            <tbody>
              <tr>
                <th>TOTAL</th>
                <td>${factura.total}</td>
              </tr>
              <tr>
                <th>IVA</th>
                <td>${factura.impuesto}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="certification-info">
        <h4>Información de Certificación</h4>
        <p>Certificado por: Candy Carrillo.</p>
        <p>NIT del certificador: 50510231</p>
        <p>Número de acceso: {factura.no_acceso|| "N/A"}</p>
        <p>Fecha de Certificación: {orderData?.certDate || new Date().toLocaleString()}</p>
        <p className="currency-code">* Código de moneda: GTQ - No genera derecho a crédito fiscal</p>
      </div>
    </div>
  );
}
