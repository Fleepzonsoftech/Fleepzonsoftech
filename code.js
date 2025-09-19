document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".pay-button[data-amount]");
  const customInput = document.getElementById("customAmount");
  const payNowBtn = document.getElementById("rzp-button");

  let selectedAmount = 50000; // default ₹500 in paise

  // Preset amount buttons
  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      selectedAmount = parseInt(this.dataset.amount) * 100;
      buttons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      customInput.value = "";
    });
  });

  // Custom amount
  customInput.addEventListener("input", function () {
    const val = parseInt(this.value);
    if (!isNaN(val) && val > 0) {
      selectedAmount = val * 100;
      buttons.forEach(b => b.classList.remove("active"));
    }
  });

  // Razorpay checkout
  payNowBtn.onclick = async function (e) {
    e.preventDefault();
    try {
      const orderRes = await fetch("/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedAmount })
      });
      const { order } = await orderRes.json();

      var options = {
        key: "rzp_live_RJS0X8SOuENgkk", 
        amount: order.amount,
        currency: order.currency,
        name: "Fleepzonsoftech",
        description: "Payment Transaction",
        order_id: order.id,
        handler: function (response) {
          fetch("/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
          })
          .then(r => r.json())
          .then(data => {
            if (data.success) {
              window.location.href = "success.html?payment_id=" + response.razorpay_payment_id;
            } else {
              window.location.href = "failure.html";
            }
          });
        },
        prefill: { name: "Customer", email: "customer@example.com", contact: "9876543210" },
        theme: { color: "#528FF0" },
        modal: { ondismiss: function () { window.location.href = "failure.html"; } }
      };
      var rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Error creating order. Try again!");
      console.error(err);
    }
  };
});
