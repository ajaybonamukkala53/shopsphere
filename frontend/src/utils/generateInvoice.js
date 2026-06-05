import jsPDF from "jspdf";

const generateInvoice =
  (order) => {

    const doc =
      new jsPDF();




    // TITLE

    doc.setFontSize(24);

    doc.text(

      "ShopSphere Invoice",

      20,

      20

    );




    // ORDER DETAILS

    doc.setFontSize(14);




    doc.text(

      `Invoice ID: ${order._id}`,

      20,

      40

    );




    doc.text(

      `Customer: ${order.address.name}`,

      20,

      50

    );




    doc.text(

      `Phone: ${order.address.phone}`,

      20,

      60

    );




    doc.text(

      `Address: ${order.address.address}`,

      20,

      70

    );




    doc.text(

      `Pincode: ${order.address.pincode}`,

      20,

      80

    );




    // PRODUCTS

    let y = 100;




    doc.setFontSize(18);

    doc.text(

      "Products",

      20,

      y

    );




    y += 10;




    order.products.forEach(

      (item, index) => {

        doc.setFontSize(14);




        doc.text(

          `${index + 1}. ${item.title}`,

          20,

          y

        );




        doc.text(

          `₹${item.price}`,

          150,

          y

        );




        y += 10;

      }

    );




    // TOTAL

    y += 10;




    doc.setFontSize(18);

    doc.text(

      `Total Price: ₹${order.totalPrice}`,

      20,

      y

    );




    // THANK YOU

    y += 20;




    doc.setFontSize(16);

    doc.text(

      "Thank You For Shopping ❤️",

      20,

      y

    );




    // SAVE PDF

    doc.save(

      `invoice_${order._id}.pdf`

    );
  };

export default generateInvoice;