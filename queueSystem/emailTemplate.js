export const generateBlockUserEmailContent = (name) => {
  return `
    <p>Hello, ${name}</p>
    <p>Your account has been temporarily blocked due to policy violations or security concerns.</p>
    <p>If you believe this was a mistake, please contact our support team.</p>
    <p>Thank you,</p>
    <p>WearMyArt Team</p>
  `;
};
export const generateUnBlockUserEmailContent = (name) => {
  return `
    <p>Hello, ${name}</p>
    <p>We are pleased to inform you that your account has been unblocked and restored.</p>
    <p>You can now log in and continue using our services.</p>
    <p>Thank you,</p>
    <p>WearMyArt Team</p>
  `;
};

export const generateUpdateUserEmailContent = (name) => {
  return `
    <p>Hello, ${name}</p>
    <p>Your profile details have been updated successfully on WearMyArt.</p>
    <p>If you did not make these changes, please contact our support team immediately.</p>
    <p>Thank you for being a part of WearMyArt!</p>
  `;
};

export const generateStatusChangeOfOrderEmailContent = (name, orderDetails) => {
  return `
    <style>
      .order-details {
        margin: 0 5vw;
        padding: 10px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-top: 3vh
      }
      .order-container {
        margin-top: 20px;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 4px;
        display: flex;
        flex-wrap: wrap;
      }
      .product-image {
        width: 350px;
        margin-right: 2vw;
      }
      .Total-cost {
        font-size: 20px;
      }
      @media (max-width: 768px) {
        .order-container {
          display: block;
        }
      }
    </style>

    <div class="email-container">
      <h1>Order Status Update, ${name}!</h1>
      <p>Your order status has been updated to <strong>${
        orderDetails.Status
      }</strong>. Here are your order details:</p>
      
      <div class="order-details">
        <div class="order-container">
          <img class="product-image" src="${
            orderDetails.FinalProductImg
          }" alt="Final Product Image" />
          <div class="order-info">
            <p><strong>Order ID:</strong> ${orderDetails._id}</p>
            <p><strong>Product ID:</strong> ${orderDetails.ProductId}</p>
            ${
              orderDetails.Font
                ? `<p><strong>Font:</strong> ${orderDetails.Font}</p>`
                : ""
            }
            ${
              orderDetails.Text
                ? `<p><strong>Text:</strong> ${orderDetails.Text}</p>`
                : ""
            }
            ${
              orderDetails.Color
                ? `<p><strong>Color:</strong> ${orderDetails.Color}</p>`
                : ""
            }
            ${
              orderDetails.Quantity
                ? `<p><strong>Quantity:</strong> ${orderDetails.Quantity}</p>`
                : ""
            }
            <p><strong>Price Per Product:</strong> ₹${
              orderDetails.FinalCost
            }</p>
          </div>
        </div>
        <p><strong>Total Cost for this order:</strong> ₹${
          orderDetails.Quantity * orderDetails.FinalCost
        }</p>
      </div>
      
      <p class="thank-you">Thank you for choosing WearMyArt! If you have any questions, feel free to contact us.</p>
    </div>
  `;
};

export const generateAddOrderEmailContent = (
  fullName,
  orderDetailsArray,
  finalProductImgs
) => {
  let Total = 50;
  let ProductTotal = 0;
  let ordersHtml = "";

  orderDetailsArray.forEach((orderDetails, index) => {
    let orderHtml = `
      <div class="order-details">
        <div class="order-container">
          <img class="product-image" src="${finalProductImgs[index]}" alt="Final Product Image" />
          <div class="order-info">
    `;

    orderHtml += `<p><strong>Order ID:</strong> ${orderDetails._id}</p>`;
    orderHtml += `<p><strong>Product ID:</strong> ${orderDetails.ProductId}</p>`;
    if (orderDetails.Font)
      orderHtml += `<p><strong>Font:</strong> ${orderDetails.Font}</p>`;
    if (orderDetails.Text)
      orderHtml += `<p><strong>Text:</strong> ${orderDetails.Text}</p>`;
    if (orderDetails.Color)
      orderHtml += `<p><strong>Color:</strong> ${orderDetails.Color}</p>`;
    if (orderDetails.Quantity)
      orderHtml += `<p><strong>Quantity:</strong> ${orderDetails.Quantity}</p>`;
    orderHtml += `<p><strong>Price Per Product:</strong> ₹${orderDetails.FinalCost}</p>`;

    ProductTotal = orderDetails.Quantity * orderDetails.FinalCost;
    orderHtml += `
          </div>
        </div>
        <p><strong>Total Cost for this order:</strong> ₹${ProductTotal}</p>
      </div>
    `;

    Total += orderDetails.FinalCost * orderDetails.Quantity;
    ordersHtml += orderHtml;
  });

  return `
    <style>
      .order-details {
        margin: 0 5vw;
        padding: 10px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-top: 3vh
      }
      .order-container {
        margin-top: 20px;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 4px;
        display: flex;
        flex-wrap: wrap;
      }
      .product-image {
        width: 350px;
        margin-right: 2vw;
      }
      .Total-cost {
        font-size: 20px;
      }
      .Shipping-cost {
        font-size: 10px;
      }
      @media (max-width: 768px) {
        .order-container {
          display: block;
        }
      }
    </style>

    <div class="email-container">
      <h1>Thank You for Your Orders, ${fullName}!</h1>
      <p>We are excited to let you know that your orders have been successfully placed. Here are your order details:</p>
      ${ordersHtml}
      <p class="Shipping-cost">Shipping Charge is: ₹50.00</p>
      <p class="Total-cost"><strong>Total Amount is: </strong> ₹${Total}</p>
      <p class="thank-you">Thank you for choosing WearMyArt! If you have any questions, feel free to contact us.</p>
    </div>
  `;
};

export const generateActivateUserEmailContent = (name) => {
  return `
    <p>Hello, ${name}</p>
    <p>Your WearMyArt account has been successfully <strong>activated</strong>!</p>
    <p>You can now log in and start exploring all the amazing features we offer.</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p>Thank you for joining WearMyArt!</p>
    <p>Best regards,</p>
    <p>WearMyArt Team</p>
  `;
};

export const generateDeActivateUserEmailContent = (name) => {
  return `
    <p>Hello, ${name}</p>
    <p>We're notifying you that your WearMyArt account has been <strong>deactivated</strong>.</p>
    <p>If this action was unintentional or you have concerns, please contact our support team for assistance.</p>
    <p>We hope to see you back soon!</p>
    <p>Best regards,</p>
    <p>WearMyArt Team</p>
  `;
};
