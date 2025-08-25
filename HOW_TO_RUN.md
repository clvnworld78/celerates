# Memerlukan Node.js dan NPM terinstall v12
1. Setelah di clone silahkan ketik npm install untuk menginstall dependencies terlebih dahulu

2. Setelah berhasil terinstall silahkan ketik kembali 'npm start', pesan Shipping API is running on http://localhost:3000 akan muncul

3. Program sudah berjalan

4. Dapat di test dengan memasukan data mockup seperti berikut
{
  "originLatLng": { "lat": -6.1751, "lng": 106.8650 },
  "destLatLng": { "lat": -6.2000, "lng": 106.8000 },
  "weightGram": 1500
}

5. Saya tadi test menggunakan Postman, dapat dijalankan dengan memilih method POST pada URL http://localhost:3000/test

6. Atau dapat di test menggunakan CURL
curl -X POST http://localhost:3000/api/test \
-H "Content-Type: application/json" \
-d '{
  "originLatLng": { "lat": -6.1751, "lng": 106.8650 },
  "destLatLng": { "lat": -6.2000, "lng": 106.8000 },
  "weightGram": 1500
}'

