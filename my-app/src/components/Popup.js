import React from "react";
import CloseButton from 'react-bootstrap/CloseButton'
import { nanoid } from 'nanoid'

import { useCart } from "../Context/cartProvider";

import { formatUSD } from '../Context/format';


function Popup(props) {
  const { addItemToCart  } = useCart();

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [formData, setFormData] = React.useState({
    id: nanoid(),
    name: props.item.name,
    price: props.item.price,
    description: props.item.description,
    choice: "",
    spice: "",
    rice: "",
    quantity: 1,
  });

  React.useEffect(() => {
    if (props.item.choice) {
      if (
        (formData.spice === "") |
        (formData.rice === "") |
        (formData.choice === "")
      ) {
        setButtonDisabled(true);
      } else if (formData.spice && formData.rice && formData.choice) {
        setButtonDisabled(false);
      }
    } else {
      return;
    }
  }, [formData, props]);

  function addOne() {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        quantity: prevFormData.quantity + 1,
      };
    });
  }

  function subOne() {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        quantity: prevFormData.quantity - 1,
      };
    });
  }


  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.closePopup();
    
    addItemToCart({
      ...formData,
      price:
        formData.price +
        (formData.choice === "Beef (+$2.00)" ? 2 : 0) +
        (formData.rice === "Steamed Rice (+$1.50)" ? 1.5 : 0) +
        (formData.rice === "Brown Rice (+$2.00)" ? 2 : 0),
    })
  }

  return (
    <div className="popup">
      <div className="popup-container">
        <div className="popup-container-content">
        <div className="popup-container-header">
          <h2> {props.item.name} </h2>
          <CloseButton onClick={props.closePopup}></CloseButton>
          {/* <button className="close-button" > X </button> */}
        </div>

        <p>{formatUSD(props.item.price)}</p>
        <p>{props.item.description}</p>

        <form>
          {props.item.choice && (
            <fieldset>
              <legend>Choose Protein</legend>
              <input
                name="choice"
                type="radio"
                value="Chicken"
                id="Chicken"
                onChange={handleChange}
                checked={formData.choice === "Chicken"}
              />
              <label htmlFor="Chicken">Chicken</label>
              <br></br>
              <input
                name="choice"
                type="radio"
                value="Beef (+$2.00)"
                id="Beef (+$2.00)"
                onChange={handleChange}
                checked={formData.choice === "Beef (+$2.00)"}
              />
              <label htmlFor="Beef (+$2.00)">Beef (+$2.00)</label>
              <br></br>
              <input
                name="choice"
                type="radio"
                value="Tofu"
                id="Tofu"
                onChange={handleChange}
                checked={formData.choice === "Tofu"}
              />
              <label htmlFor="Tofu">Tofu</label>
              <br></br>
              <input
                name="choice"
                type="radio"
                value="Veggie"
                id="Veggie"
                onChange={handleChange}
                checked={formData.choice === "Veggie"}
              />
              <label htmlFor="Veggie">Veggie</label>
              <br></br>
            </fieldset>
          )}
          <br></br>
          {props.item.spicy && (
            <fieldset>
              <legend>Choose Spiciness Level</legend>
              <input
                name="spice"
                type="radio"
                value="Mild"
                id="Mild"
                onChange={handleChange}
                checked={formData.spice === "Mild"}
              />
              <label htmlFor="Mild">Mild</label>
              <br></br>
              <input
                name="spice"
                type="radio"
                value="Medium"
                id="Medium"
                onChange={handleChange}
                checked={formData.spice === "Medium"}
              />
              <label htmlFor="Medium">Medium</label>
              <br></br>
              <input
                name="spice"
                type="radio"
                value="Hot"
                id="Hot"
                onChange={handleChange}
                checked={formData.spice === "Hot"}
              />
              <label htmlFor="Hot">Hot</label>
              <br></br>
              <input
                name="spice"
                type="radio"
                value="extra hot"
                id="extra hot"
                onChange={handleChange}
                checked={formData.spice === "extra hot"}
              />
              <label htmlFor="extra-hot">Extra Hot</label>
              <br></br>
            </fieldset>
          )}
          <br></br>
          {props.item.rice && (
            <fieldset>
              <legend>Choose Rice</legend>
              <input
                name="rice"
                type="radio"
                value="Steamed Rice (+$1.50)"
                id="Steamed Rice (+$1.50)"
                onChange={handleChange}
                checked={formData.rice === "Steamed Rice (+$1.50)"}
              />
              <label htmlFor="Steamed Rice (+$1.50)">Steamed Rice (+$1.50)</label>
              <br></br>
              <input
                name="rice"
                type="radio"
                value="Brown Rice (+$2.00)"
                id="Brown Rice (+$2.00)"
                onChange={handleChange}
                checked={formData.rice === "Brown Rice (+$2.00)"}
              />
              <label htmlFor="Brown Rice (+$2.00)">Brown Rice (+$2.00)</label>
              <br></br>
              <input
                name="rice"
                type="radio"
                value="none"
                id="none"
                onChange={handleChange}
                checked={formData.rice === "none"}
              />
              <label htmlFor="none">None</label>
              <br></br>
            </fieldset>
          )}
          <div className="modal-footer-custom">
            <div className="quantity-container">
              <button className="quantity-btn" type="button" onClick={subOne}>
                -
              </button>
              <span>{formData.quantity}</span>
              <button className="quantity-btn" type="button" onClick={addOne}>
                +
              </button>
            </div>
            {buttonDisabled && <p>please fill out above options</p>}
          </div>
         
          
        </form>
        </div>
        <button
              className="modal-button"
              onClick={handleSubmit}
              disabled={buttonDisabled}
            >
              Add to Cart
            </button>
      </div>
    </div>
  );
}

export default Popup;
