const express = require('express');
const { Client, NoAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode'); 
const app = express();

// Fungsi untuk menginisialisasi klien WhatsApp
function initializeWhatsAppClient() {
    const client = new Client({
        authStrategy: new NoAuth()
    });

    client.on('qr', async (qr) => {
        // QR code akan ditampilkan sebagai tautan
        const qrCode = await generateQRCode(qr);
        console.log('Scan the QR code:', qrCode);
    });

    client.on('ready', () => {
        console.log('WhatsApp client is ready!');
    });

    client.on('message', async (message) => {
        // Logika untuk menangani pesan yang masuk
    });

    client.initialize();
}

// Fungsi untuk menghasilkan QR code sebagai tautan
async function generateQRCode(qrContent) {
    try {
        // Generate QR code as data URL
        const qrCode = await qrcode.toDataURL(qrContent);
        return qrCode;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
}

// Panggil fungsi untuk menginisialisasi klien WhatsApp saat aplikasi dijalankan
initializeWhatsAppClient();

// Route untuk menampilkan QR code di halaman web
app.get('/', async (req, res) => {
    try {
        // Generate QR code
        const qrCode = await generateQRCode();
        res.send(`
            <h1>WhatsApp QR Code</h1>
            <img src="${qrCode}" alt="WhatsApp QR Code">
        `);
    } catch (error) {
        console.error('Error handling QR request:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Port disesuaikan dengan yang disediakan oleh Vercel
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server started on PORT ${port}`);
});
