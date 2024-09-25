import {
  additionalShopPageitems,
  blogmenuItems,
  homePages,
  othersMenuItems,
  shopDetails,
  shopList,
} from "@/data/menu";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react"; // Importamos useState

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export default function Nav() {
  const { pathname } = useLocation();
  const [tokenValid, setTokenValid] = useState(false); // Declaramos el estado con useState

  const isMenuActive = (menu) => {
    return menu.split("/")[1] == pathname.split("/")[1];
  };

  const isActiveParentMenu = (menus) => {
    return menus.some((menu) => menu.href.split("/")[1] == pathname.split("/")[1]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Suponiendo que guardas el token en localStorage
    if (token) {
      try {
        const parsedToken = parseJwt(token);
        const now = Date.now() / 1000;
        if (parsedToken.exp > now) {
          setTokenValid(true); // El token es válido
        }
      } catch (error) {
        console.error("Error parsing token:", error);
        setTokenValid(false); // Si el token no es válido o hay un error
      }
    }

    function setBoxMenuPosition(menu) {
      const scrollBarWidth = 17; // You might need to calculate or define this value
      const limitR = window.innerWidth - menu.offsetWidth - scrollBarWidth;
      const limitL = 0;
      const menuPaddingLeft = parseInt(
        window.getComputedStyle(menu, null).getPropertyValue("padding-left")
      );
      const parentPaddingLeft = parseInt(
        window
          .getComputedStyle(menu.previousElementSibling, null)
          .getPropertyValue("padding-left")
      );
      const centerPos =
        menu.previousElementSibling.offsetLeft - menuPaddingLeft + parentPaddingLeft;

      let menuPos = centerPos;
      if (centerPos < limitL) {
        menuPos = limitL;
      } else if (centerPos > limitR) {
        menuPos = limitR;
      }

      menu.style.left = `${menuPos}px`;
    }
    document.querySelectorAll(".box-menu").forEach((el) => {
      setBoxMenuPosition(el);
    });
  }, []);

  return (
    <>
      <li className="navigation__item">
        <a
          href="/"
          className={`navigation__link ${
            isActiveParentMenu(homePages) ? "menu-active" : ""
          }`}
        >
          Home
        </a>
      </li>

      <li className="navigation__item">
        <a
          href="../shop-6"
          className={`navigation__link ${
            isActiveParentMenu(shopList) ? "menu-active" : ""
          } ${isActiveParentMenu(shopDetails) ? "menu-active" : ""} ${
            isActiveParentMenu(additionalShopPageitems) ? "menu-active" : ""
          }`}
        >
          Shop
        </a>
      </li>

      {/* Pages solo se muestra si el token es válido */}
      {tokenValid && (
        <li className="navigation__item">
          <a
            href="#"
            className={`navigation__link ${
              isActiveParentMenu(othersMenuItems) ? "menu-active" : ""
            }`}
          >
            Pages
          </a>
          <ul className="default-menu list-unstyled">
            {othersMenuItems.map((elm, i) => (
              <li key={i} className="sub-menu__item">
                <Link
                  to={elm.href}
                  className={`menu-link menu-link_us-s ${
                    isMenuActive(elm.href) ? "menu-active" : ""
                  }`}
                >
                  {elm.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      )}
    </>
  );
}
