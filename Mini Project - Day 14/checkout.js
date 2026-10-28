(function () {
        const emailInput = document.getElementById("emailInput");
        const emailError = document.getElementById("emailError");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function validateEmail() {
          const value = emailInput.value.trim();
          const isValid = value === "" || emailPattern.test(value);

          if (isValid) {
            emailError.classList.add("hidden");
            emailInput.classList.remove("border-red-500");
          } else {
            emailError.classList.remove("hidden");
            emailInput.classList.add("border-red-500");
          }
          return isValid;
        }

        emailInput.addEventListener("input", validateEmail);
        emailInput.addEventListener("blur", validateEmail);

        //* Phone validation: accept "08xxxxxxxxxx" or "+628xxxxxxxxx"
        const phoneInput = document.getElementById("phoneInput");
        const phoneError = document.getElementById("phoneError");

        //* Format Penulisan 08 lalu 8sd12 digits, or +628 lalu  7sd11 digits (total 10-14 digits)
        const phonePattern = /^(08\d{8,12}|\+628\d{7,11})$/;

        function validatePhone() {
          const value = phoneInput.value.trim();
          const isValid = value === "" || phonePattern.test(value);

          if (isValid) {
            phoneError.classList.add("hidden");
            phoneInput.classList.remove("border-red-500");
          } else {
            phoneError.classList.remove("hidden");
            phoneInput.classList.add("border-red-500");
          }
          return isValid;
        }

        phoneInput.addEventListener("input", validatePhone);
        phoneInput.addEventListener("blur", validatePhone);

        //* ====== Metode Pembayaran: dropdown bank & e-wallet ======
        const OWNER = "Mohammad Erfan Suprihadi";

        //* Data bank: nomor rekening + ikon
        const BANKS = {
          BSI: {
            label: "BSI - Bank Syariah Indonesia",
            account: "8272921750",
            icon: "assets/BSI.webp",
          },
          BNI: {
            label: "BNI - Bank Negara Indonesia",
            account: "1922044863",
            icon: "assets/BNI.webp",
          },
          BCA: {
            label: "BCA - Bank Central Asia",
            account: "5240108129",
            icon: "assets/BCA.webp",
          },
        };

        //* Data e-wallet: nomor tujuan + ikon
        const EWALLETS = {
          OVO: { number: "0811970354", icon: "assets/OVO.webp" },
          GoPay: { number: "0811970354", icon: "assets/GoPay.webp" },
          Dana: { number: "0811970354", icon: "assets/Dana.webp" },
        };

        const paymentRadios = document.querySelectorAll(
          'input[name="payment"]'
        );
        const paymentMethodName = document.getElementById("paymentMethodName");
        const paymentMethodDesc = document.getElementById("paymentMethodDesc");

        const bankWrap = document.getElementById("bankDropdownWrap");
        const bankSelect = document.getElementById("bankSelect");
        const bankIcon = document.getElementById("bankIcon");
        const bankAccountNo = document.getElementById("bankAccountNo");
        const bankAccountName = document.getElementById("bankAccountName");

        const ewalletWrap = document.getElementById("ewalletDropdownWrap");
        const ewalletSelect = document.getElementById("ewalletSelect");
        const ewalletIcon = document.getElementById("ewalletIcon");
        const ewalletNumber = document.getElementById("ewalletNumber");
        const ewalletName = document.getElementById("ewalletName");

        function getSelectedMethod() {
          const selected = document.querySelector(
            'input[name="payment"]:checked'
          );
          return selected ? selected.value : "Transfer Bank";
        }

        // Perbarui preview bank sesuai pilihan dropdown
        function updateBankPreview() {
          const bank = BANKS[bankSelect.value];
          bankIcon.src = bank.icon;
          bankIcon.alt = "Ikon " + bankSelect.value;
          bankAccountNo.textContent = bank.account;
          bankAccountName.textContent = "a/n " + OWNER;
        }

        //* Perbarui preview e-wallet sesuai pilihan dropdown
        function updateEwalletPreview() {
          const wallet = EWALLETS[ewalletSelect.value];
          ewalletIcon.src = wallet.icon;
          ewalletIcon.alt = "Ikon " + ewalletSelect.value;
          ewalletNumber.textContent = wallet.number;
          ewalletName.textContent = "a/n " + OWNER;
        }

        //* Perbarui keterangan di Ringkasan Pesanan + tampilkan dropdown yang sesuai
        function updatePaymentInfo() {
          const method = getSelectedMethod();

          //* Tampilkan / sembunyikan dropdown sesuai metode
          bankWrap.classList.toggle("hidden", method !== "Transfer Bank");
          ewalletWrap.classList.toggle(
            "hidden",
            method !== "E-Wallet (OVO, GoPay, Dana)"
          );

          if (method === "Transfer Bank") {
            const bank = BANKS[bankSelect.value];
            paymentMethodName.textContent = "Transfer Bank - " + bankSelect.value;
            paymentMethodDesc.textContent =
              "Transfer ke rekening " +
              bankSelect.value +
              " " +
              bank.account +
              " a/n " +
              OWNER +
              ". Pesanan diproses setelah pembayaran dikonfirmasi.";
          } else if (method === "E-Wallet (OVO, GoPay, Dana)") {
            const wallet = EWALLETS[ewalletSelect.value];
            paymentMethodName.textContent = "E-Wallet - " + ewalletSelect.value;
            paymentMethodDesc.textContent =
              "Transfer ke " +
              ewalletSelect.value +
              " " +
              wallet.number +
              " a/n " +
              OWNER +
              ". Selesaikan pembayaran lewat aplikasi " +
              ewalletSelect.value +
              ".";
          } else {
            paymentMethodName.textContent = "Bayar di Tempat (COD)";
            paymentMethodDesc.textContent =
              "Bayar tunai ke kurir saat pesanan tiba. Siapkan uang pas sesuai total pembayaran.";
          }
        }

        paymentRadios.forEach((radio) => {
          radio.addEventListener("change", updatePaymentInfo);
        });
        bankSelect.addEventListener("change", () => {
          updateBankPreview();
          updatePaymentInfo();
        });
        ewalletSelect.addEventListener("change", () => {
          updateEwalletPreview();
          updatePaymentInfo();
        });

        // Inisialisasi tampilan awal
        updateBankPreview();
        updateEwalletPreview();
        updatePaymentInfo();

        //* ====== Validasi kelengkapan form: aktif/nonaktifkan tombol ======
        const nameInput = document.getElementById("nameInput");
        const addressInput = document.getElementById("addressInput");
        const payNowBtn = document.getElementById("payNowBtn");

        //* Tombol hanya aktif bila Nama, No. Telepon, Email, dan Alamat terisi
        //* serta No. Telepon & Email berformat valid
        function isFormComplete() {
          const nameFilled = nameInput.value.trim() !== "";
          const phoneValue = phoneInput.value.trim();
          const emailValue = emailInput.value.trim();
          const addressFilled = addressInput.value.trim() !== "";

          const phoneValid = phonePattern.test(phoneValue);
          const emailValid = emailPattern.test(emailValue);

          return nameFilled && addressFilled && phoneValid && emailValid;
        }

        function updatePayButtonState() {
          const enabled = isFormComplete();
          payNowBtn.disabled = !enabled;
          payNowBtn.classList.toggle("cursor-not-allowed", !enabled);
          payNowBtn.classList.toggle("opacity-50", !enabled);
        }

        [nameInput, phoneInput, emailInput, addressInput].forEach((el) => {
          el.addEventListener("input", updatePayButtonState);
          el.addEventListener("blur", updatePayButtonState);
        });

        //* Set status awal tombol (nonaktif karena form masih kosong)
        updatePayButtonState();

        //* ====== Tombol Bayar Sekarang -> halaman pembayaran ======
        payNowBtn.addEventListener("click", () => {
          
          //* Jaga-jaga: batalkan jika form belum lengkap
          if (!isFormComplete()) {
            updatePayButtonState();
            return;
          }

          const method = getSelectedMethod();
          const totalText =
            document.getElementById("totalValue").textContent.trim();

          const params = new URLSearchParams();
          params.set("total", totalText);

          if (method === "Transfer Bank") {
            params.set("method", "bank");
            params.set("provider", bankSelect.value);
            params.set("account", BANKS[bankSelect.value].account);
          } else if (method === "E-Wallet (OVO, GoPay, Dana)") {
            params.set("method", "ewallet");
            params.set("provider", ewalletSelect.value);
            params.set("number", EWALLETS[ewalletSelect.value].number);
          } else {
            params.set("method", "cod");
            params.set("provider", "COD");
          }

          window.location.href =
            "bayar-sekarang.html?" + params.toString();
        });

  //*  Konstanta harga (dalam Rupiah)
  const UNIT_PRICE = 45000; //?  Harga satuan Kaos Kaki Premium Combed (Belum dibuatkan masing-masing Ukuran Berbeda Harga)
  const SHIPPING = 10000; //?  DEMO Simulasi Ongkos kirim (Jika ingin benar-benar menggunakan destination pengiriman harus dibuatkan drop down khusus Kurir)
  const MEMBER_DISCOUNT_RATE = 0.1; //?  Diskon 10% khusus member

  const MIN_QTY = 1; //? Mengikuti ketentuan minimal 1 
  const MAX_QTY = 15; //? Mengikuti ketentuan maximal 15 

  //*  Cek status member dari localStorage (diset di LoginMember.html)
  function isMember() {
    return localStorage.getItem("isMember") === "true";
  }

  //*  Format angka menjadi "Rp45.000"
  function formatRupiah(value) {
    return "Rp" + value.toLocaleString("id-ID");
  }

  //*  Ambil quantity dari query string (?qty=...), lalu batasi 1..15
  function getQtyFromUrl() {
    const params = new URLSearchParams(window.location.search);
    let qty = parseInt(params.get("qty"), 10);
    if (isNaN(qty)) qty = MIN_QTY;
    if (qty < MIN_QTY) qty = MIN_QTY;
    if (qty > MAX_QTY) qty = MAX_QTY;
    return qty;
  }

  //*  Ambil warna & ukuran dari query string (opsional)
  function getParam(name, fallback) {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(name);
    return value && value.trim() !== "" ? value : fallback;
  }

  function render() {
    const qty = getQtyFromUrl();
    const color = getParam("color", "Hitam");
    const size = getParam("size", "M");

    //*  Hitung nilai
    const subtotal = UNIT_PRICE * qty;

    //*  Diskon 10% hanya untuk member, selain itu tidak ada diskon
    const member = isMember();
    const discount = member ? Math.round(subtotal * MEMBER_DISCOUNT_RATE) : 0;

    const total = subtotal + SHIPPING - discount;

    //*  Perbarui ringkasan pesanan (warna, ukuran, jumlah)
    const summaryVariant = document.getElementById("summaryVariant");
    if (summaryVariant) {
      summaryVariant.innerHTML =
        "Warna: " + color + " &middot; Ukuran: " + size;
    }

    const summaryQty = document.getElementById("summaryQty");
    if (summaryQty) {
      summaryQty.textContent = "Jumlah: " + qty;
    }

    //*  Perbarui subtotal dan total
    const subtotalEl = document.getElementById("subtotalValue");
    if (subtotalEl) {
      subtotalEl.textContent = formatRupiah(subtotal);
    }

    const totalEl = document.getElementById("totalValue");
    if (totalEl) {
      totalEl.textContent = formatRupiah(total);
    }

    //*  Perbarui baris diskon
    const discountRow = document.getElementById("discountRow");
    const discountEl = document.getElementById("discountValue");
    if (discountEl) {
      discountEl.textContent = "-" + formatRupiah(discount);
    }
    if (discountRow) {
    
      //*  Sembunyikan baris diskon jika bukan member (diskon = 0)
      discountRow.style.display = member ? "flex" : "none";
    }

    //*  Perbarui status member (badge info di ringkasan)
    const memberStatusEl = document.getElementById("memberStatus");
    if (memberStatusEl) {
      if (member) {
        memberStatusEl.textContent = "Member aktif - diskon 10% diterapkan";
        memberStatusEl.className =
          "mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700";
      } else {
        memberStatusEl.innerHTML =
          'Kamu belum member. <a href="LoginMember.html" class="font-semibold underline">Daftar member</a> untuk diskon 10%.';
        memberStatusEl.className =
          "mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700";
      }
    }
  }

  document.addEventListener("DOMContentLoaded", render);
})();


