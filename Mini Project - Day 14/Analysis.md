Problem Decomposition:

INPUT

# Informasi Pengiriman Berupa data-data Pelanggan

1. Nama Lengkap
2. No. Telepon ==> Jika Penulisan tidak sesuai format 08 atau 628 dst akan ada alert
3. Alamat Email ==> Jika Penulisan tidak sesuai format xx@gmail.com or @gmail.co.id akan ada alert
4. Alamat Lengkap

# Memilih Metode Pembayaran

1. Transfer Bank
2. E-Wallet
3. Bayar di tempat (COD)

4. Transfer Bank diberikan 3 pilihan Bank, yaitu
   a. Bank Syariah Indonesia (BSI)
   b. Bank Negra Indonesia (BNI)
   c. Bank Central Asia (BCA)

5. E-Wallet diberikan 3 pilihan, yaitu:
   a. OVO
   b. Gopay
   c. Dana

6. Bayar di tempat (COD) ini sesuai alamat pengiriman

PROCESS:

1. Pada Halaman Beli Sekarang (Checkout), pelanggan harus mengisi nama, no hp, email dan alamat pengiriman.
2. Untuk No Hp dan Email harus mengikuti format yang sudah terdisplay dalam kotak yang disediakan utk No Hp dan Email
3. Memilih Metode Pembayaran yang disediakan dengan melalui Transfer Bank (BSI,BNI, dan BCA), E-Wallet (OVO,Gopay, dan Dana) dan Bayar di tempat (COD)
4. Jika pemesan/pelanggannya merupakan member maka akan mendapatkan diskon 10% dan jika bukan member maka tidak mendapatkan Diskon dan status Member/NonMember akan di tampilkan dalam Ringkasan Pesanan.
5. Subtotal merupakan harga dikalikan dengan Quantity dari produk yang dipilih untuk ukuran juga harus dipilih agar bisa melanjutkan ke halaman Bayar.
6. Ongkos Kirim sudah ditentukan oeh penjual atas berapa pun pilihan ukuran dan quantity dari produk tsb.
7. Total yang dibayar adalah subtotal ditambah ongkos kirim.
8. Setelah lengkap diisi maka dapat meng-klik tombol "Bayar Sekarang" dan "Ulangi Pilihan Metode Bayar"

OUTPUT:

# Ringkasan Pesanan, terdiri dari:

1. Status: Member atau Non Member, Jika tidak menjadi member tidak mendapatkan Diskon dan jika member mendapatkan diskon 10%
2. Pilihan Kaos Kaki,terdiri dari: Warna:Hitam, Ukuran:M (atau S,M,L,XL), Jumlah:1 (atau 1 sd 15). Jika ukuran nya belum dipilih maka ada alert utk memilih ukuran sebelum dilanjutkan ke Menu Bayar
3. Subtotal Harga dari Produk yang di pilih merupakan harga dikalikan quantity yang dipilih
4. Jumlah Ongkos Kirim yang akan dibayar sudah ditentukan oleh penjual
5. Total yang Dibayar (Subtotal + Ongkos Kirim) ini total yang akan dibayar/ditransfer
6. Ada keterangan: Metode Pembayaran yang dipilih dan Nomer rekening atau Nomer Pembayaran E-Wallet

# Setelah Ringkasan Pesanan sesuai dengan Pilihan Produk oleh Konsumen, maka ada 2 Pilihan tombol untuk melanjutkan Pembayaran atau merevisi pilihan metode pembayaran.

1. Bayar Sekarang, tombol yang akan mengarahkan ke halaman bayar
2. Ulang Pilih Metode Bayar, tombol yang akan me-reset metode bayar yang sudah di pilih diawal

PATTERN:
Tombol "Ulangi Pilihan Metode Bayar" dapat memberikan kesempatan Pelanggan utk mengubah metode pembayaran

ABSTRACTION:
Yang penting harus dilakukan dalam Halaman "CheckOut" adalah: mengisi Nama, No Hp, Email, Alamat Pengiriman dan memilih Metode Pembayaran yang akan dilakukan.
