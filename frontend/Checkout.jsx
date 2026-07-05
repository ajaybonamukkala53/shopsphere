const API_URL = import.meta.env.VITE_API_URL;

const placeOrder = async () => {
  try {

    if (
      !name ||
      !phone ||
      !address ||
      !pincode
    ) {
      alert(
        "Please fill all delivery details"
      );
      return;
    }

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (!user) {
      alert(
        "Please Login First"
      );
      return;
    }

    // CREATE RAZORPAY ORDER

    const { data } =
      await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          amount: totalPrice,
        }
      );

    const options = {
      key:
        "rzp_test_SuiC4XnCGvntxx",

      amount:
        data.amount,

      currency:
        data.currency,

      name:
        "ShopSphere",

      description:
        "Order Payment",

      order_id:
        data.id,

      handler:
        async function (
          response
        ) {

          try {

            await axios.post(
              `${API_URL}/api/orders`,
              {
                products:
                  cartItems,

                totalPrice,

                userEmail:
                  user.email,

                paymentMethod:
                  "Online",

                paymentStatus:
                  "Paid",

                orderStatus:
                  "Order Placed",

                razorpayPaymentId:
                  response.razorpay_payment_id,

                address: {
                  name,
                  phone,
                  address,
                  pincode,
                },
              }
            );

            dispatch(
              clearCart()
            );

            navigate(
              "/payment-success"
            );

          } catch (error) {

            console.log(error);

            alert(
              "Order Creation Failed ❌"
            );

          }

        },

      prefill: {
        name,
        email:
          user.email,
        contact:
          phone,
      },

      theme: {
        color:
          "#000000",
      },
    };

    if (
      !window.Razorpay
    ) {
      alert(
        "Razorpay SDK Not Loaded"
      );
      return;
    }

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.on(
      "payment.failed",
      function (
        response
      ) {
        alert(
          "Payment Failed ❌"
        );

        console.log(
          response.error
        );
      }
    );

    razorpay.open();

  } catch (error) {

    console.log(error);

    alert(
      "Payment Failed ❌"
    );

  }
};