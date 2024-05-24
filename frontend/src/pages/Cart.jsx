import { React, useEffect, useState } from "react";
import { FaHome, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import emailjs from "emailjs-com";
import {
  clearCart,
  increase,
  decrease,
  productSubTotal,
  productTotalAmount,
  productTax,
  removeCartItem,
} from "../features/cart/cartSlice";
import { orderCreate } from "../features/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { deleteLocalStorageCart } from "../utils/localStorage";

const Cart = () => {
  const { cartItems, subTotal, totalAmount, tax } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productSubTotal());
    dispatch(productTax());
    dispatch(productTotalAmount());
  }, [dispatch, cartItems]);

  const [customer, setCustomer] = useState("");
  const [country, setCountry] = useState("India");
  const [province, setProvince] = useState("Delhi");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("Cash");

  const handleSubmit = (e) => {

    const newOrder = {
      customer,
      country,
      province,
      zipcode,
      phone,
      address,
      email,
      cartItems,
      subTotal,
      totalAmount,
      tax,
      payment,
      user: user._id,
    };

    if (customer !== "" || zipcode !== "" || phone !== "" || address !== "") {
      dispatch(orderCreate(newOrder));
      dispatch(clearCart());
      deleteLocalStorageCart();
      navigate("/dashboard/orders");
    } else {
      toast.warning("Please fill in the required fields");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="info-details">
        <div className="icon-info">
          <div className="icon">
            <Link to="/dashboard">
              <FaHome className="icon-cart" />
            </Link>
          </div>
          <span>Return to the main page and add products to the cart.</span>
        </div>
      </div>
    );
  }
  const getStates = (country) => {
    switch (country) {
      case "Turkey":
  return ["Istanbul", "Ankara", "Izmir", "Antalya"];

      case "USA":
        return ["New York", "California", "Texas", "Florida"];
      case "India":
        return ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi"];
      case "Canada":
        return ["Ontario", "Quebec", "British Columbia", "Alberta"];
      case "UK":
        return ["England", "Scotland", "Wales", "Northern Ireland"];
        case "Germany":
          return ["Berlin", "Bavaria", "Hamburg", "Baden-Württemberg"];
        case "France":
          return ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Occitanie", "Auvergne-Rhône-Alpes"];
        case "Japan":
          return ["Tokyo", "Osaka", "Kyoto", "Hokkaido"];
        case "Brazil":
          return ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia"];
        case "Russia":
          return ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg"];
        case "South Korea":
          return ["Seoul", "Busan", "Incheon", "Daegu"];
        case "Mexico":
          return ["Mexico City", "Jalisco", "Veracruz", "Puebla"];
        case "Italy":
          return ["Lazio", "Lombardy", "Campania", "Veneto"];
        case "Spain":
          return ["Madrid", "Catalonia", "Andalusia", "Valencia"];
      default:
        return [];
    }
  };
  const sendEmail=async(e)=>{
    // e.preventDefault();
  const templateParams={
    to_name: customer,
    from_email: "anuragmiglani8@gmail.com",
    to_email: email,
    message:`Your order has been successfully created.
             Thank you for shopping with us!`
  }

    emailjs.send('service_jpwubah','template_8zp0gde',templateParams,'biY11f48trGlSHwmC')
    .then((res)=>{
      console.log("Email sent successfully",res);
    }).catch(err=>console.log(err));
  };
  return (
    <div className="cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <a href="/dashboard" className="logo">
            Shopping Cart
          </a>
          <ul className="navigation">
            <li className="cart-items">Cart Items: {cartItems.length}</li>
          </ul>
        </header>
      </div>

      <div id="shop-container">
        <section id="cart">
          <table>
            <thead>
              <tr>
                <td></td>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {cartItems ? (
                cartItems.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeCartItem(product.id));
                        }}
                      >
                        <FaTimes />
                      </button>
                    </td>
                    <td>
                      {product.image ? (
                        <img
                          className="product-image"
                          src={product.image}
                          alt="..."
                        />
                      ) : (
                        <img
                          className="default-image"
                          src={require("../images/product.png")}
                          alt="..."
                        />
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>$ {product.price.toFixed(2)}</td>
                    <td>
                      <div className="count">
                        <button
                          className="increment-btn"
                          type="button"
                          onClick={() => {
                            dispatch(increase(product.id));
                          }}
                        >
                          +
                        </button>
                        <span className="amount">{product.quantity}</span>
                        <button
                          className="decrement-btn"
                          type="button"
                          onClick={() => {
                            dispatch(decrease(product.id));
                          }}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>$ {(product.price * product.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <div>Products Loading...</div>
              )}
            </tbody>
          </table>
        </section>

        <div className="cart-summary styled">
          <form  onSubmit={handleSubmit}>
            <div className="item">
              <div className="customer">
                <input
                  className="customer-name"
                  name="customer"
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="enter customer"
                />
                <button>Customer</button>
              </div>
              <div className="shipping-rate collapse">
                <div className="has-child expand">
                  <h3>CUSTOMER INFORMATION</h3>
                  <div className="content">
                    <div className="countries">
                      <div>
                        <label htmlFor="country">Country</label>
                        <select
                          name="country"
                          id="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option defaultValue="Turkey">Turkey</option>
                          <option defaultValue="usa">USA</option>
                          <option defaultValue="usa">India</option>
                         <option defaultValue="canada">Canada</option>
                         <option defaultValue="uk">UK</option>
                          <option defaultValue="germany">Germany</option>
                          <option defaultValue="france">France</option>
                            <option defaultValue="japan">Japan</option>
                            <option defaultValue="brazil">Brazil</option>
                              <option defaultValue="russia">Russia</option>
                             <option defaultValue="south-korea">South Korea</option>
                          <option defaultValue="mexico">Mexico</option>
                           <option defaultValue="italy">Italy</option>
                            <option defaultValue="spain">Spain</option>
                        </select>
                      </div>
                    </div>
                    <div className="states">
                      <div>
                        <label htmlFor="province">State / Province</label>
                        <select
                          name="province"
                          id="province"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                        >
                          <option value="">Select</option>
                      {getStates(country).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>))}
                        </select>
                      </div>
                    </div>
                    <div className="states">
                      <div>
                        <label htmlFor="payment">Payment Method</label>
                        <select
                          name="payment"
                          id="payment"
                          value={payment}
                          onChange={(e) => setPayment(e.target.value)}
                        >
                          <option defaultValue="cash">Cash</option>
                          <option defaultValue="credit card">
                            Credit Card
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="email">
                      <div>
                        <label htmlFor="zipcode">Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="postal-code">
                      <div>
                        <label htmlFor="zipcode">Zipcode</label>
                        <input
                          type="number"
                          name="zipcode"
                          id="zipcode"
                          value={zipcode}
                          onChange={(e) => setZipcode(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="postal-code">
                      <div>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          type="number"
                          name="phone"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="address">
                      <div>
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart-total-table">
                <table>
                  <tbody>
                    <tr>
                      <th>SubTotal:</th>
                      <td>$ {subTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th>Tax: % 8</th>
                      <td>$ {tax.toFixed(2)}</td>
                    </tr>
                    <tr className="grand-total">
                      <th>TOTAL:</th>
                      <td>
                        <strong>$ {totalAmount.toFixed(2)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="secondary-button">
                  <button type="submit" onClick={()=>{sendEmail()
                    handleSubmit()  
                    toast.success("Email sent successfully")}}>Create Order</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
