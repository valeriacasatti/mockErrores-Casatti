const addToCart = async (pid) => {
  try {
    const cid = "656915f9d275608fc814127f";
    if (!cid) {
      console.log("cart not found");
    }
    const response = await fetch(
      `http://localhost:8080/api/carts/${cid}/products/${pid}`,
      {
        method: "POST",
      }
    );
    console.log(response);
    if (response.status === 200) {
      Swal.fire({
        text: "product added to cart successfully",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  } catch (error) {
    console.log("error adding product to cart: ", error);
  }
};
