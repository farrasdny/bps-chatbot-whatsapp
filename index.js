// ============================  DECLARATION & CLIENT ============================

const express = require('express');
const { Client, NoAuth, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();

const client = new Client({
    authStrategy: new NoAuth()
});

// const client = new Client({
//     authStrategy: new LocalAuth()
// });

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    const content = message.body;
    const sender = message.from;
    const replyMessage = await handleIncomingMessage(content, sender);

    if (replyMessage.message) {
        client.sendMessage(sender, replyMessage.message);
    }

    if (replyMessage.image) {
        const media = MessageMedia.fromFilePath(replyMessage.image);
        client.sendMessage(sender, media, { caption: replyMessage.caption });
    }
});

// Route for generating QR code
app.get('/qr', (req, res) => {
    // Generate and return QR code image
    const qrCode = generateQRCode(); // Function to generate QR code image
    res.send(qrCode);
});

// Route for handling incoming messages
app.post('/incoming', async (req, res) => {
    const content = req.body.content;
    const sender = req.body.sender;
    const replyMessage = await handleIncomingMessage(content, sender);

    // Handle the reply message
    res.send(replyMessage);
});

// Function to handle incoming message
async function handleIncomingMessage(content, sender) {
    // Your logic to handle incoming message
}

// Function to generate QR code image
function generateQRCode() {
    // Your logic to generate QR code image
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// ==============================  FUNCTION  ==============================

const ext = {
    // =========================  NUMBER OPTION  =========================
    greeting() {
        const greetingMessage = "*Selamat Datang😊* \n*Chatbot BPS Kabupaten Malang* \n-------------------------------------------------------\nPilih Layanan Informasi : \n1. Pusat Statistik Terpadu (PST) Online \n2. Panduan Konsultasi Statistik \n3. Informasi Data Statistik \n4. Pojok Statistik";
        const image = 'image/logo-or-header/bps-logo.jpg'; // Change 'path/to/your/image.jpg' to the actual path of your image
        return { image, caption: greetingMessage };
    },
    optionPST() { 
        const PSTmessage = contentHandle("1");
        const image = 'image/logo-or-header/logo-pst.png';
        return {image, caption: PSTmessage};
    },
    optionKonsultasiStat() {
        const consultantMessage = contentHandle("2");
        const image = 'image/logo-or-header/statistics-consultan.jpg';
        return { image, caption: consultantMessage};  
    },
    optionVisualisasiData() {
        const VDmessage = contentHandle("3");
        const image = 'image/logo-or-header/statistics-header.jpg';
        return {image, caption: VDmessage};
    },
    optionPojokStatistik() {
        const PSmessage = contentHandle("4");
        const image = 'image/logo-or-header/pojokstatistik.png';
        return {image, caption: PSmessage};
    },
    optionSaranPengaduan() {
        const SPmessage = contentHandle("5");
        const image = 'image/logo-or-header/suggestion.jpg';
        return {image, caption: SPmessage};
    },

    // =========================  ABJAD OPTION  =========================`

    // Konsultasi Statistik
    optionKonsultasi1() {
        const K1message = contentHandle("k1");
        const image = 'image/logo-or-header/konsul-1.png'
        return {image, caption: K1message};
    },
    optionKonsultasi2() {
        const K2message = contentHandle("k2");
        const image = 'image/logo-or-header/konsul-2.png'
        return {image, caption: K2message};
    },
    optionKonsultasi3() {
        const K3message = contentHandle("k3");
        const image = 'image/logo-or-header/konsul-3.png'
        return {image, caption: K3message};
    },
    optionKonsultasi4() {
        const K4message = contentHandle("k4");
        const image = 'image/logo-or-header/konsul-4.png'
        return {image, caption: K4message};
    },
    optionKonsultasi5() {
        const K5message = contentHandle("k5");
        const image = 'image/logo-or-header/konsul-5.png'
        return {image, caption: K5message};
    },

    // Sosial dan Kependudukan
    optionSosialKependudukan() {
        const SKmessage = contentHandle("sk");
        const image = 'image/logo-or-header/society.jpg'
        return {image, caption: SKmessage};
    },
    optionAgama() {
        const AGmessage = contentHandle("sk 1");
        const image = 'image/logo-or-header/religion.jpg'
        return {image, caption: AGmessage};
    },
    optionGender() {
        const GDmessage = contentHandle("sk 2");
        const image = 'image/logo-or-header/gender.jpg'
        return {image, caption: GDmessage};
    },
    optionGeography() {
        const GFmessage = contentHandle("sk 3");
        const image = 'image/logo-or-header/geography.jpg'
        return {image, caption: GFmessage};
    },
    optionIklim() {
        const IklimMessage = contentHandle("sk 4");
        const image = 'image/logo-or-header/climate.jpg'
        return {image, caption: IklimMessage};
    },
    optionPembangunanManusia() {
        const PembangunanManusiaMessage = contentHandle("sk 5");
        const image = 'image/logo-or-header/human-development.jpg'
        return {image, caption: PembangunanManusiaMessage};
    },
    optionKemiskinan() {
        const KemiskinanMessage = contentHandle("sk 6");
        const image = 'image/logo-or-header/poverty.jpg'
        return {image, caption: KemiskinanMessage};
    },
    optionKependudukan() {
        const KependudukanMessage = contentHandle("sk 7");
        const image = 'image/logo-or-header/population.jpg'
        return {image, caption: KependudukanMessage};
    },
    optionKesehatan() {
        const KependudukanMessage = contentHandle("sk 8");
        const image = 'image/logo-or-header/health.jpg'
        return {image, caption: KependudukanMessage};
    },
    optionKonsumsi() {
        const KonsumsiMessage = contentHandle("sk 9");
        const image = 'image/logo-or-header/consumtion.jpg'
        return {image, caption: KonsumsiMessage};
    },
    optionLingkunganHidup() {
        const EnvirontmentMessage = contentHandle("sk 10");
        const image = 'image/logo-or-header/environtment.jpg'
        return {image, caption: EnvirontmentMessage};
    },
    optionLingkunganHidup() {
        const EnvirontmentMessage = contentHandle("sk 11");
        const image = 'image/logo-or-header/environtment.jpg'
        return {image, caption: EnvirontmentMessage};
    },
    optionPemerintah() {
        const GovernmentMessage = contentHandle("sk 12");
        const image = 'image/logo-or-header/government.jpg'
        return {image, caption: GovernmentMessage};
    },
    optionPemerintah() {
        const GovernmentMessage = contentHandle("sk 12");
        const image = 'image/logo-or-header/government.jpg'
        return {image, caption: GovernmentMessage};
    },
    optionPemerintah() {
        const GovernmentMessage = contentHandle("sk 12");
        const image = 'image/logo-or-header/government.jpg'
        return {image, caption: GovernmentMessage};
    },
    optionPendidikan() {
        const EducationMessage = contentHandle("sk 13");
        const image = 'image/logo-or-header/education.jpg'
        return {image, caption: EducationMessage};
    },
    optionPerumahan() {
        const HousingAreaMessage = contentHandle("sk 14");
        const image = 'image/logo-or-header/housing-area.jpg'
        return {image, caption: HousingAreaMessage};
    },
    optionPolitikKeamanan() {
        const PoliticsMessage = contentHandle("sk 15");
        const image = 'image/logo-or-header/politics.jpg'
        return {image, caption: PoliticsMessage};
    },
    optionSosialBudaya() {
        const CulturalMessage = contentHandle("sk 16");
        const image = 'image/logo-or-header/socio-cultural.jpg'
        return {image, caption: CulturalMessage};
    },
    optionTenagaKerja() {
        const LaborMessage = contentHandle("sk 17");
        const image = 'image/logo-or-header/labor.jpg'
        return {image, caption: LaborMessage};
    },
    

    // Ekonomi dan Perdagangan
    optionEkonomiPerdagangan() {
        const EPmessage = contentHandle("ep");
        const image = 'image/logo-or-header/economic-and-trading.jpg'
        return {image, caption: EPmessage};
    },
    optionEksporImpor() {
        const message = contentHandle("ep 1");
        const image = 'image/logo-or-header/export-import.jpg'
        return {image, caption: message};
    },
    optionEnergi() {
        const message = contentHandle("ep 2");
        const image = 'image/logo-or-header/energy.jpg'
        return {image, caption: message};
    },
    optionHargaEceran() {
        const message = contentHandle("ep 3");
        const image = 'image/logo-or-header/retail-price.jpg'
        return {image, caption: message};
    },
    optionHargaProdusen() {
        const message = contentHandle("ep 4");
        const image = 'image/logo-or-header/producer-price.jpg'
        return {image, caption: message};
    },
    optionIndustry() {
        const message = contentHandle("ep 5");
        const image = 'image/logo-or-header/industry.jpg'
        return {image, caption: message};
    },
    optionInflasi() {
        const message = contentHandle("ep 6");
        const image = 'image/logo-or-header/inflation.jpg'
        return {image, caption: message};
    },
    optionKeuangan() {
        const message = contentHandle("ep 7");
        const image = 'image/logo-or-header/finance.jpg'
        return {image, caption: message};
    },
    optionKomunikasi() {
        const message = contentHandle("ep 8");
        const image = 'image/logo-or-header/comunication.jpg'
        return {image, caption: message};
    },
    optionPariwisata() {
        const message = contentHandle("ep 9");
        const image = 'image/logo-or-header/tourist.jpg'
        return {image, caption: message};
    },
    optionProdukDomestik() {
        const message = contentHandle("ep 10");
        const image = 'image/logo-or-header/gross-regional.jpg'
        return {image, caption: message};
    },
    optionTransportasi() {
        const message = contentHandle("ep 11");
        const image = 'image/logo-or-header/transport.jpg'
        return {image, caption: message};
    },
    optionUpahBuruh() {
        const message = contentHandle("ep 12");
        const image = 'image/logo-or-header/labor-wages.jpg'
        return {image, caption: message};
    },

    // Pertanian dan Pertambangan
    optionPertanianPertambangan() {
        const PPmessage = contentHandle("pp");
        const image = 'image/logo-or-header/agriculture-and-mining.jpg'
        return {image, caption: PPmessage};
    },
    optionHortikultura() {
        const message = contentHandle("pp 1");
        const image = 'image/logo-or-header/horticultura.jpg'
        return {image, caption: message};
    },
    optionKehutanan() {
        const message = contentHandle("pp 2");
        const image = 'image/logo-or-header/forestry.jpg'
        return {image, caption: message};
    },
    optionPerikanan() {
        const message = contentHandle("pp 3");
        const image = 'image/logo-or-header/fishery.jpg'
        return {image, caption: message};
    },
    optionPerkebunan() {
        const message = contentHandle("pp 4");
        const image = 'image/logo-or-header/plantation.jpg'
        return {image, caption: message};
    },
    optionPertambangan() {
        const message = contentHandle("pp 5");
        const image = 'image/logo-or-header/mining.jpg'
        return {image, caption: message};
    },
    optionPeternakan() {
        const message = contentHandle("pp 6");
        const image = 'image/logo-or-header/breeder.jpg'
        return {image, caption: message};
    },
    optionTanamanPangan() {
        const message = contentHandle("pp 7");
        const image = 'image/logo-or-header/crops.jpg'
        return {image, caption: message};
    },
};

function contentHandle(content) {
    let result;
    // ------ PST Online
    if (content === "1") {
        result = "*Selamat Datang!* \n*Pelayanan Statistik Terpadu (PST) Online 📲* \n-------------------------------------------------------\nBerikut link website seputar PST Online : \n• Keluar *[ex]*";
    } 

    // ------ Konsultasi Statistik 
    else if(content === "2") {
        result = "*Selamat Datang!* \n*Panduan Konsultasi Statistik Online & Offline 📲* \n-------------------------------------------------------\nPilih Layanan Konsultasi : \n• Standar Pelayanan Rekomendasi Kegiatan Statistik Sektoral *[k1]*  \n• Standar Pelayanan Perpustakaan *[k2]* \n• Standar Pelayanan Konsultasi Data Statistik *[k3]* \n• Standar Pelayanan Penjualan Produk BPS *[k4]* \n• Daftar Jenis & Tarif Penerimaan Negara Bukan Pajak BPS *[k5]* \n• Keluar *[ex]*";
    }
    else if(content === "k1") {
        result = "*Panduan Layanan Konsultasi Online Maupun Offline* \n\n• Keluar *[ex]*"
    }
    else if(content === "k2") {
        result = "*Panduan Layanan Konsultasi Online Maupun Offline* \n\n• Keluar *[ex]*"
    }
    else if(content === "k3") {
        result = "*Panduan Layanan Konsultasi Online Maupun Offline* \n\n• Keluar *[ex]*"
    }
    else if(content === "k4") {
        result = "*Panduan Layanan Konsultasi Online Maupun Offline* \n\n• Keluar *[ex]*"
    } 
    else if(content === "k5") {
        result = "*Daftar Jenis & Tarif Penerimaan Negara Bukan Pajak BPS* \nBerdasarkan Peraturan Pemerintah No.7 Tahun 2015 \n\n• Keluar *[ex]*"
    }

    // ------ Kumpulan Data
    else if (content === "3") {
        result = "*Selamat Datang!* \n*Kumpulan Data Statistik 📊* \n\Kumpulan Data Statistik merupakan layanan informasi mengenai pendataan BPS Kabupaten Malang dalam beberapa kategori \n-------------------------------------------------------\nPilih Layanan Informasi : \n• Sosial dan kependudukan *[sk]* \n• Ekonomi dan Perdagangan *[ep]* \n• Pertanian dan Pertambangan *[pp]* \n• Keluar *[ex]*";
    } 
    // Sosial dan Kependudukan
    else if (content === "sk") {
        result = "*Selamat Datang!* \n*Sosial dan Kependudukan 👨‍👩‍👧‍👦* \n-------------------------------------------------------\nPilih Layanan Informasi : \n• Agama *[sk 1]* \n• Gender *[sk 2]* \n• Geografi *[sk 3]* \n• Iklim *[sk 4]* \n• Indeks Pembangunan Manusia *[sk 5]* \n• Kemiskinan dan Ketimpangan *[sk 6]* \n• Kependudukan *[sk 7]* \n• Kesehatan *[sk 8]* \n• Konsumsi dan Pengeluaran *[sk 9]* \n• Lingkungan Hidup *[sk 10]* \n• Pemerintah *[sk 11]* \n• Pendidikan *[sk 12]* \n• Perumahan *[sk 13]* \n• Politik dan Keamanan *[sk 14]* \n• Sosial Budaya *[sk 15]* \n• Tenaga Kerja *[sk 16]* \n• Keluar *[ex]*"
    } 
    else if (content === "sk 1"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Agama* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Agama : \nhttps://malangkab.bps.go.id/subject/108/agama.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 2"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Gender* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Gender : \nhttps://malangkab.bps.go.id/subject/40/gender.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 3"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Geografi* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Geografi : \nhttps://malangkab.bps.go.id/subject/153/geografi.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 4"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Iklim* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Iklim : \nhttps://malangkab.bps.go.id/subject/154/iklim.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 5"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Indeks Pembangunan Manusia* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Indeks Pembangunan Manusia : \nhttps://malangkab.bps.go.id/subject/26/indeks-pembangunan-manusia.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 6"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Kemiskinan dan Ketimpangan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Kemiskinan dan Ketimpangan : \nhttps://malangkab.bps.go.id/subject/23/kemiskinan-dan-ketimpangan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 7"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Kependudukan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Kependudukan : \nhttps://malangkab.bps.go.id/subject/12/kependudukan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 8"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Kesehatan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Kesehatan : \nhttps://malangkab.bps.go.id/subject/30/kesehatan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 9"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Konsumsi dan Pengeluaran* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Konsumsi dan Pengeluaran : \nhttps://malangkab.bps.go.id/subject/5/konsumsi-dan-pengeluaran.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 10"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Lingkungan Hidup* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Lingkungan Hidup : \nhttps://malangkab.bps.go.id/subject/152/lingkungan-hidup.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 11"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Pemerintahan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Pemerintahan : \nhttps://malangkab.bps.go.id/subject/101/pemerintahan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 12"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Pendidikan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Pendidikan : \nhttps://malangkab.bps.go.id/subject/28/pendidikan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 13"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Perumahan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Perumahan : \nhttps://malangkab.bps.go.id/subject/29/perumahan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 14"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Politik dan Keamanan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Politik dan Keamanan : \nhttps://malangkab.bps.go.id/subject/34/politik-dan-keamanan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 15"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Sosial Budaya* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Sosial Budaya : \nhttps://malangkab.bps.go.id/subject/27/sosial-budaya.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "sk 16"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Tenaga Kerja* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Tenaga Kerja : \nhttps://malangkab.bps.go.id/subject/6/tenaga-kerja.html#subjekViewTab3 \nKeluar *[ex]*"
    }

    // Ekonomi dan Perdagangan
    else if (content === "ep") {
        result = "*Selamat Datang!* \n*Ekonomi dan Perdagangan 💵* \n-------------------------------------------------------\nPilih Layanan Informasi : \n• Ekspor-Impor *[ep 1]* \n• Energi *[ep 2]* \n• Harga Eceran *[ep 3]* \n• Harga Produsen *[ep 4]* \n• Industri *[ep 5]* \n• Inflasi *[ep 6]* \n• Keuangan *[ep 7]* \n• Komunikasi *[ep 8]* \n• Pariwisata *[ep 9]* \n• Produk Domestik Regional Bruto *[ep 10]* \n• Transportasi *[ep 11]* \n• Upah Buruh *[ep 12]* \n• Keluar *[ex]*"
    } 
    else if (content === "ep 1"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Ekspor Impor* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Ekspor Impor : \nhttps://malangkab.bps.go.id/subject/8/ekspor-impor.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 2"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Energi* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Energi : \nhttps://malangkab.bps.go.id/subject/7/energi.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 3"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Harga Eceran* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Harga Eceran : \nhttps://malangkab.bps.go.id/subject/102/harga-eceran.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 4"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Harga Produsen* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Harga Produsen : \nhttps://malangkab.bps.go.id/subject/36/harga-produsen.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 5"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Industri* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Industri : \nhttps://malangkab.bps.go.id/subject/9/industri.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 6"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Inflasi* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Inflasi : \nhttps://malangkab.bps.go.id/subject/3/inflasi.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 7"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Keuangan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Keuangan : \nhttps://malangkab.bps.go.id/subject/13/keuangan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 8"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Komunikasi* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Komunikasi : \nhttps://malangkab.bps.go.id/subject/2/komunikasi.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 9"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Pariwisata* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Pariwisata : \nhttps://malangkab.bps.go.id/subject/16/pariwisata.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 10"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Produk Domestik Regional Bruto* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Produk Domestik Regional Bruto : \nhttps://malangkab.bps.go.id/subject/52/produk-domestik-regional-bruto.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 11"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Transportasi* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Transportasi : \nhttps://malangkab.bps.go.id/subject/17/transportasi.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "ep 12"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Upah Buruh* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Upah Buruh : \nhttps://malangkab.bps.go.id/subject/19/upah--buruh.html#subjekViewTab3 \nKeluar *[ex]*"
    }


    // Pertanian dan Pertambanngan
    else if (content === "pp") {
        result = "*Selamat Datang!* \n*Pertanian dan Pertambangan 🌱* \n-------------------------------------------------------\nPilih Layanan Informasi : \n• Hortikultura *[pp 1]* \n• Kehutanan *[pp 2]* \n• Perikanan *[pp 3]* \n• Perkebunan *[pp 4]* \n• Pertambangan *[pp 5]* \n• Peternakan *[pp 6]* \n• Tanaman Pangan *[pp 7]* \n• Keluar *[ex]*"
    }
    else if (content === "pp 1"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Hortikultura* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Hortikultura : \nhttps://malangkab.bps.go.id/subject/55/hortikultura.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "pp 2"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Kehutanan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Kehutanan : \nhttps://malangkab.bps.go.id/subject/60/kehutanan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "pp 3"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Perikanan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Perikanan : \nhttps://malangkab.bps.go.id/subject/56/perikanan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "pp 4"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Perkebunan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Perkebunan : \nhttps://malangkab.bps.go.id/subject/54/perkebunan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "pp 5"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Pertambangan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Pertambangan : \nhttps://malangkab.bps.go.id/subject/10/pertambangan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "pp 6"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Peternakan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Peternakan : \nhttps://malangkab.bps.go.id/subject/24/peternakan.html#subjekViewTab3 \nKeluar *[ex]*"
    }
    else if (content === "pp 7"){
        result = "*Selamat Datang!* \n*Informasi Data Statistik Tanaman Pangan* \n-------------------------------------------------------\nBerikut Link Website Seputar Data Statistik Tanaman Pangan : \nhttps://malangkab.bps.go.id/subject/53/tanaman-pangan.html#subjekViewTab3 \nKeluar *[ex]*"
    }

    // ------ Pojok Statistik
    else if (content === "4") {
        result = "*Selamat Datang!* \n*Layanan Pojok Statistik 📊* \n-------------------------------------------------------\nSilahkan hubungi nomor : \n+62 896-5499-3852 \n• Keluar *[ex]*"
    }

    // ------ Saran dan Pengaduan
    else if (content === "5") {
        result = "*Selamat Datang!* \n*Saran dan Pengaduan 💡* \n-------------------------------------------------------\nLayanan saran dan pengaduan dapat menghubungi e-mail : \npengaduan3507@bps.go.id \n• Keluar *[ex]*"
    }
    return result;  
}

async function handleIncomingMessage(content, sender) {
    // Salam Pembuka
    if (content.toLowerCase() === "hi" || content.toLowerCase() === "halo") {
        qrScanned = true; // Set status bahwa QR sudah dipindai
        const { image, caption } = ext.greeting();
        return { image, caption };
    } 
    // ------ PST Online
    else if (content === "1") {
        const { image, caption} = ext.optionPST();
        return { image, caption };
    } 
    // ------ Konsultasi Statistik
    else if (content === "2") {
        const { image, caption } = ext.optionKonsultasiStat();
        return { image, caption };
    }
    else if (content === "k1") {
        const { image, caption } = ext.optionKonsultasi1();
        return { image, caption };
    }
    else if (content === "k2") {
        const { image, caption } = ext.optionKonsultasi2();
        return { image, caption };
    }
    else if (content === "k3") {
        const { image, caption } = ext.optionKonsultasi3();
        return { image, caption };
    }
    else if (content === "k4") {
        const { image, caption } = ext.optionKonsultasi4();
        return { image, caption };
    }
    else if (content === "k5") {
        const { image, caption } = ext.optionKonsultasi5();
        return { image, caption };
    }

    // ------ Kumpulan Data
    else if (content === "3") {
        const { image, caption } = ext.optionVisualisasiData();
        return { image, caption};
    } 
    // Sosial dan Kependudukan
    else if (content === "sk") {
        const { image, caption } = ext.optionSosialKependudukan();
        return { image, caption};
    } 
    else if (content === "sk 1") {
        const { image, caption } = ext.optionAgama();
        return { image, caption};
    }
    else if (content === "sk 2") {
        const { image, caption } = ext.optionGender();
        return { image, caption};
    }
    else if (content === "sk 3") {
        const { image, caption } = ext.optionGeography();
        return { image, caption};
    }
    else if (content === "sk 4") {
        const { image, caption } = ext.optionIklim();
        return { image, caption};
    }
    else if (content === "sk 5") {
        const { image, caption } = ext.optionPembangunanManusia();
        return { image, caption};
    }
    else if (content === "sk 6") {
        const { image, caption } = ext.optionKemiskinan();
        return { image, caption};
    }
    else if (content === "sk 7") {
        const { image, caption } = ext.optionKependudukan();
        return { image, caption};
    }
    else if (content === "sk 8") {
        const { image, caption } = ext.optionKesehatan();
        return { image, caption};
    }
    else if (content === "sk 9") {
        const { image, caption } = ext.optionKonsumsi();
        return { image, caption};
    }
    else if (content === "sk 10") {
        const { image, caption } = ext.optionLingkunganHidup();
        return { image, caption};
    }
    else if (content === "sk 11") {
        const { image, caption } = ext.optionPemerintah();
        return { image, caption};
    }
    else if (content === "sk 12") {
        const { image, caption } = ext.optionPendidikan();
        return { image, caption};
    }
    else if (content === "sk 13") {
        const { image, caption } = ext.optionPerumahan();
        return { image, caption};
    }
    else if (content === "sk 14") {
        const { image, caption } = ext.optionPolitikKeamanan();
        return { image, caption};
    }
    else if (content === "sk 15") {
        const { image, caption } = ext.optionSosialBudaya();
        return { image, caption};
    }
    else if (content === "sk 16") {
        const { image, caption } = ext.optionTenagaKerja();
        return { image, caption};
    }


    // Ekonomi dan Perdagangan
    else if (content === "ep") {
        const { image, caption } = ext.optionEkonomiPerdagangan();
        return { image, caption}
    } 
    else if (content === "ep 1") {
        const { image, caption } = ext.optionEksporImpor();
        return { image, caption}
    } 
    else if (content === "ep 2") {
        const { image, caption } = ext.optionEnergi();
        return { image, caption}
    } 
    else if (content === "ep 3") {
        const { image, caption } = ext.optionHargaEceran();
        return { image, caption}
    } 
    else if (content === "ep 4") {
        const { image, caption } = ext.optionHargaProdusen();
        return { image, caption}
    } 
    else if (content === "ep 5") {
        const { image, caption } = ext.optionIndustry();
        return { image, caption}
    } 
    else if (content === "ep 6") {
        const { image, caption } = ext.optionInflasi();
        return { image, caption}
    } 
    else if (content === "ep 7") {
        const { image, caption } = ext.optionKeuangan();
        return { image, caption}
    } 
    else if (content === "ep 8") {
        const { image, caption } = ext.optionKomunikasi();
        return { image, caption}
    } 
    else if (content === "ep 9") {
        const { image, caption } = ext.optionPariwisata();
        return { image, caption}
    } 
    else if (content === "ep 10") {
        const { image, caption } = ext.optionProdukDomestik();
        return { image, caption}
    } 
    else if (content === "ep 11") {
        const { image, caption } = ext.optionTransportasi();
        return { image, caption}
    } 
    else if (content === "ep 12") {
        const { image, caption } = ext.optionUpahBuruh();
        return { image, caption}
    } 

    // Pertanian dan Pertambangan
    else if (content === "pp") {
        const { image, caption } = ext.optionPertanianPertambangan();
        return { image, caption}
    }
    else if (content === "pp 1") {
        const { image, caption } = ext.optionHortikultura();
        return { image, caption}
    }
    else if (content === "pp 2") {
        const { image, caption } = ext.optionKehutanan();
        return { image, caption}
    }
    else if (content === "pp 3") {
        const { image, caption } = ext.optionPerikanan();
        return { image, caption}
    }
    else if (content === "pp 4") {
        const { image, caption } = ext.optionPerkebunan();
        return { image, caption}
    }
    else if (content === "pp 5") {
        const { image, caption } = ext.optionPertambangan();
        return { image, caption}
    }
    else if (content === "pp 6") {
        const { image, caption } = ext.optionPeternakan();
        return { image, caption}
    }
    else if (content === "pp 7") {
        const { image, caption } = ext.optionTanamanPangan();
        return { image, caption}
    }

    // ------ Pojok Statistik
    else if (content === "4") {
        const { image, caption } = ext.optionPojokStatistik();
        return { image, caption};
    }

    // ------ Pojok Statistik
    else if (content === "5") {
        const { image, caption } = ext.optionSaranPengaduan();
        return { image, caption};
    }
    // function exit
    else if (content === "ex") {
        const { image, caption } = ext.greeting();
        return { image, caption };
    } 
    else {
        const { image, caption } = ext.greeting();
        return { image, caption };
    }
}

client.initialize();
