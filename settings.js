const fs = require('fs')
const chalk = require('chalk')
const petik = '```'

/*
 ⚠️ NOTE PENTING !!!
 Kalau Mau Phuskontak, UsahaKan Self Dlu...
 Bagi yang G ngerti , Kalian Ketik #self
 Dan Kalau Mau Kembali Kayak Awal > #public
 Ini buat ketenangan phuskontak aja , biar text gak mental :)
 © Dirrone Ofc 2023
 */
 
 
 // SUBS MY YT DIRRONE OFC
global.owner = ['6281543342705'] // NOMOR 
global.ownvcard = '+62 815-4334-2705' // NOMOR
global.nomerOwner = '6281543342705' // NOMOR 
global.nameowner = 'D i r r ' // NAMA MU
global.namebot = 'DIRLYBOTZ - MD' // NAMA BOT MU
global.imel = `dirroneofc@gmail.com` // IMEL
global.dbmdUrl = `https://telegra.ph/file/8becd96f0dfdc16e74b35.jpg` // Thumbnail
global.gr = `https://chat.whatsapp.com/ILg7FNEViK89NKMpO25RiS` // LINK GROUP
global.verbot = `1.0.5 [ Up to Update ]` // GAK USAH GANTI
global.packname = 'im\n©' // name stiker
global.author = 'dirly md\n᭖͜͡𝗗𝗜𝗥𝗥𝗢𝗡𝗘 𝗢𝗙𝗖' // name stiker
global.dbimg = fs.readFileSync('./image/dirlymd.png')
global.logo = { url: 'https://telegra.ph/file/8becd96f0dfdc16e74b35.jpg'}  // ganti logo lu
global.qrisdonate = { url: 'https://telegra.ph/file/bdc777f44ff72aef6e33a.jpg' } // donasi
global.txtjpm = `BOT WHATSAPP 🌷` // jpm otomatis
/*
Terserah mau diganti apa kaga.
ingat !! , kalau gak paham jangan di ganti !
!*/

global.mess = {
    wait: `${petik}⌛ Please wait sis !!${petik}`,
    succes: `${petik}✅ Success sis !!${petik}`,
    publics: `${petik}✅ Succes changed to public!${petik}`,
    selfs: `${petik}✅ Succes changed to self!${petik}`,
    admin: `${petik}❎ This feature is only admin !!${petik}`,
    botAdmin: `${petik}❎ Bot is not Admin !!${petik}`,
    owner: `${petik}❎ Owner Only !!${petik}`,
    db: `${petik}⚠️ Sudah Aktif Sebelumnya${petik}`,
    group: `${petik}❎ Group only features !!${petik}`,
    private: `${petik}❎ Private Only !!${petik}`,
    error: `${petik}❎ Error 404\nLapor Ke owners dirly bot Jika Eror \nLapor Ke Owners Bila penting !!${petik}`,
}
// Biarin aja
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})