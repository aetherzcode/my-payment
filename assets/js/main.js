function showInfo(name, accountNumber) {
    document.getElementById('qr-code').style.display = 'none';

    // Menampilkan detail rekening di bawah item pembayaran
    const accountDetailsDiv = document.getElementById(`account-${name}`);

    // Cek apakah informasi sudah ditampilkan
    if (accountDetailsDiv.style.display === 'block') {
        // Jika sudah ditampilkan, sembunyikan
        accountDetailsDiv.style.display = 'none';
    } else {
        // Jika belum ditampilkan, tampilkan
        accountDetailsDiv.innerHTML = `
            <strong>${name}</strong><br>
            Nomor Rekening: ${accountNumber}
            <button class="copy-button" onclick="copyToClipboard('${accountNumber}')">
                <i class="fas fa-copy"></i> Copy
            </button>`;
        accountDetailsDiv.style.display = 'block';

        // Menyembunyikan detail rekening lainnya
        const allAccountDetails = document.querySelectorAll('.account-details');
        allAccountDetails.forEach(div => {
            if (div.id !== `account-${name}`) {
                div.style.display = 'none';
            }
        });
    }
}

function showQRCode() {
    const qrCodeDiv = document.getElementById('qr-code');
    const accountInfoDiv = document.getElementById('account-info');

    // Cek apakah QRIS sudah ditampilkan
    if (qrCodeDiv.style.display === 'block') {
        // Jika sudah ditampilkan, sembunyikan
        qrCodeDiv.style.display = 'none';
    } else {
        // Jika belum ditampilkan, tampilkan
        accountInfoDiv.style.display = 'none'; // Sembunyikan informasi rekening
        qrCodeDiv.style.display = 'block'; // Tampilkan QRIS
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Nomor rekening telah disalin: ' + text);
    }, (err) => {
        console.error('Gagal menyalin: ', err);
    });
}

function downloadQRCode() {
    const qrCodeImage = document.querySelector('#qr-code img').src;
    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = 'QRIS_Code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}