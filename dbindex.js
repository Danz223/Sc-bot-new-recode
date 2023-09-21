require('./settings')
const moment = require('moment-timezone');
const { default: dirlyconnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require('@adiwajshing/baileys')
const { state } = useSingleFileAuthState(`./sessi.json`)
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const figlet = require('figlet')
const FileType = require('file-type')
const path = require('path')
const PhoneNumber = require('awesome-phonenumber')
const { color, bgcolor, mycolor } = require('./lib/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/functions')
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const dtime = moment.tz('Asia/Makassar').format('HH:mm:ss')
const dbdate = moment.tz('Asia/Makassar').format('DD/MM/YYYY')



async function startdirly() {
let { version, isLatest } = await fetchLatestBaileysVersion()
const dirly = dirlyconnect({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['DIRLY MD','Safari','1.0.0'],
auth: state,
version
})

store.bind(dirly.ev)

console.log(color(figlet.textSync('Botz', {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
width: 80,
whitespaceBreak: false
}), 'blue'))

console.log(color('╭─ ⑆ INFO BOT\n╰─────────╼\n', 'blue'),color('╭─ ⑆\n│BAILEYS : MULTI DEVICE\n│NAME SCRIPT : DIRLY MULTI DEVICE\n│CREATOR : DIRRONE OFC\n│YOUTUBE : @dirroneofx\n│GROUP BOT : https://chat.whatsapp.com/ILg7FNEViK89NKMpO25RiS\n╰─────────╼\n\n╭─ ⑆ NOTE\n│JOIN GROUP WHATSAPP SAYA CARA JOIN , TINGGAL KLIK LINK DI ATAS THANKS\n╰─────────╼', 'blue'))

dirly.ev.on('messages.upsert', async chatUpdate => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return
if (!dirly.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = smsg(dirly, m, store)
require('./dirly')(dirly, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})

dirly.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await dirly.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await dirly.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await dirly.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
//welcome\\
memb = metadata.participants.length
dirlywelcome = await getBuffer(ppuser)
dirlyleft = await getBuffer(ppuser)
                if (anu.action == 'add') {
                const dirlylbuffer = await getBuffer(ppuser)
                let dirlylname = num
                const dtime = moment.tz('Asia/Makassar').format('HH:mm:ss')
	            const dbdate = moment.tz('Asia/Makassar').format('DD/MM/YYYY')
	            const dirlytomem = metadata.participants.length
                bodydirly = `╭─ ⑆
│「 𝗛𝗶 ✌🏼 」
╰┬ ⑆ 「  @${dirlylname.split("@")[0]}  」
   │⎘  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 
   │⎘  ${metadata.subject}
   │⎘  𝗠𝗲𝗺𝗯𝗲𝗿 : 
   │⎘  Ke ${dirlytomem}
   │⎘  𝗝𝗼𝗶𝗻𝗲𝗱 : 
   │⎘  ${dtime} ${dbdate}
   ╰───────────────┈ ⳹`
dirly.sendMessage(anu.id,
 { text: bodydirly,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": 'ᴅ ‎ɪ ‎ʀ ‎ʟ ‎ʏ ‎ ‎ ‎ʙ ‎ᴏ ‎ᴛ  ‎‎ ‎ᴍ ‎ᴅ ‎〆',
"body": `Ytb Dirrone Ofc`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": dirlywelcome,
"sourceUrl": `https://chat.whatsapp.com/ILg7FNEViK89NKMpO25RiS`}}})
                } else if (anu.action == 'remove') {
                	const dirlylbuffer = await getBuffer(ppuser)
                    const dirlyz = moment.tz('Asia/Makassar').format('HH:mm:ss')
	                const dirlyzz = moment.tz('Asia/Makassar').format('DD/MM/YYYY')
                	let dirlylname = num
                    const dirlytomem = metadata.participants.length
                    bodydirly = `╭─❖
│「 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 🦶 」
╰┬❖ 「 @${dirlylname.split("@")[0]}  」
   │⎘  𝗟𝗲𝗳𝘁 
   │⎘  ${metadata.subject}
   │⎘  𝗠𝗲𝗺𝗯𝗲𝗿 : 
   │⎘  ${dirlytomem}
   │⎘  𝗧𝗶𝗺𝗲 : 
   │⎘  ${dirlyz} ${dirlyzz}
   ╰───────────────┈ ⳹`
dirly.sendMessage(anu.id,
 { text: bodydirly,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": 'ᴅ ‎ɪ ‎ʀ ‎ʟ ‎ʏ ‎ ‎ ‎ʙ ‎ᴏ ‎ᴛ  ‎‎ ‎ᴍ ‎ᴅ ‎〆',
"body": `ᴅ ‎ɪ ‎ʀ ‎ʟ ‎ʏ ‎ ‎ ‎ʙ ‎ᴏ ‎ᴛ  ‎‎ ‎ᴍ ‎ᴅ ‎〆`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": dirlyleft,
"sourceUrl": `https://chat.whatsapp.com/ILg7FNEViK89NKMpO25RiS`}}})
} else if (anu.action == 'promote') {
const dirlylbuffer = await getBuffer(ppuser)
const dirlyz = moment.tz('Asia/Makassar').format('HH:mm:ss')
const dirlyzz = moment.tz('Asia/Makassar').format('DD/MM/YYYY')
let dirlylname = num
bodydirly = ` 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @${dirlylname.split("@")[0]}, you have been *promoted* to *admin* 🥳`
   dirly.sendMessage(anu.id,
 { text: bodydirly,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": 'ᴅ ‎ɪ ‎ʀ ‎ʟ ‎ʏ ‎ ‎ ‎ʙ ‎ᴏ ‎ᴛ  ‎‎ ‎ᴍ ‎ᴅ ‎〆',
"body": `ᴅ ‎ɪ ‎ʀ ‎ʟ ‎ʏ ‎ ‎ ‎ʙ ‎ᴏ ‎ᴛ  ‎‎ ‎ᴍ ‎ᴅ ‎〆`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": dirlywelcome,
"sourceUrl": `https://chat.whatsapp.com/ILg7FNEViK89NKMpO25RiS`}}})
} else if (anu.action == 'demote') {
const dirlylbuffer = await getBuffer(ppuser)
const dirlyz = moment.tz('Asia/Makassar').format('HH:mm:ss')
const dirlyzz = moment.tz('Asia/Makassar').format('DD/MM/YYYY')
let dirlylname = num
bodydirly = `𝗢𝗼𝗽𝘀‼️ @${dirlylname.split("@")[0]}, you have been *demoted* from *admin* 😬`
dirly.sendMessage(anu.id,
 { text: bodydirly,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": 'ᴅ ‎ɪ ‎ʀ ‎ʟ ‎ʏ ‎ ‎ ‎ʙ ‎ᴏ ‎ᴛ  ‎‎ ‎ᴍ ‎ᴅ ‎〆',
"body": `ᴅ ‎ɪ ‎ʀ ‎ʟ ‎ʏ ‎ ‎ ‎ʙ ‎ᴏ ‎ᴛ  ‎‎ ‎ᴍ ‎ᴅ ‎〆`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": dirlyleft,
"sourceUrl": `https://chat.whatsapp.com/ILg7FNEViK89NKMpO25RiS`}}})
}
}
} catch (err) {
console.log(err)
}
})

dirly.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

dirly.ev.on('contacts.update', update => {
for (let contact of update) {
let id = dirly.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

dirly.getName = (jid, withoutContact= false) => {
id = dirly.decodeJid(jid)
withoutContact = dirly.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = dirly.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === dirly.decodeJid(dirly.user.id) ?
dirly.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

dirly.setStatus = (status) => {
dirly.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

dirly.public = true

dirly.serializeM = (m) => smsg(dirly, m, store)

dirly.ev.on('connection.update', (update) => {
const {connection,lastDisconnect} = update
if (connection === 'close') {lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startdirly() : ''}
else if(connection === 'open') 
console.log(update)})

dirly.send5ButGif = async (jid , text = '' , footer = '', but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ video: thumb, gifPlayback: true }, { upload: dirly.waUploadToServer })
 const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
 templateMessage: {
 hydratedTemplate: {
 videoMessage: message.videoMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
dirly.relayMessage(jid, template.message, { messageId: template.key.id })
}

dirly.send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ image: img }, { upload: dirly.waUploadToServer })
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
imageMessage: message.imageMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
dirly.relayMessage(jid, template.message, { messageId: template.key.id })
}

dirly.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], options = {}) =>{
let message = await prepareWAMessageMedia({ video: vid }, { upload: dirly.waUploadToServer })
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
videoMessage: message.videoMessage,
 "hydratedContentText": text,
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
dirly.relayMessage(jid, template.message, { messageId: template.key.id })
}

dirly.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
 "hydratedContentText": text,
 "locationMessage": {
 "jpegThumbnail": img },
 "hydratedFooterText": footer,
 "hydratedButtons": but
}
}
}), options)
dirly.relayMessage(jid, template.message, { messageId: template.key.id })
}

dirly.sendList = async (jid , title = '', text = '', buttext = '', footer = '', but = [], options = {}) =>{
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
listMessage :{
 title: title,
 description: text,
 buttonText: buttext,
 footerText: footer,
 listType: "SELECT",
 sections: but,
 listType: 1
}
}), options)
dirly.relayMessage(jid, template.message, { messageId: template.key.id })
}

dirly.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
dirly.sendMessage(jid, buttonMessage, { quoted, ...options })
}

dirly.sendButMessage = async (id, text1, desc1, but = [], options) => {
let buttonMessage = {
text: text1,
footer: desc1,
buttons: but,
headerType: 1
}
return dirly.sendMessage(id, buttonMessage,{quoted: options})
}

dirly.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

dirly.sendText = (jid, text, quoted = '', options) => dirly.sendMessage(jid, { text: text, ...options }, { quoted })

dirly.sendImage = async (jid, path, caption = '', quoted = '', options) => {
	let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await dirly.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

dirly.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await dirly.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
}

dirly.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await dirly.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
}

dirly.sendTextWithMentions = async (jid, text, quoted, options = {}) => dirly.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

dirly.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}

await dirly.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

dirly.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}

await dirly.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
 
dirly.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
	let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

dirly.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
	}
	return buffer
 }
 
dirly.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
		let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await dirly.relayMessage(jid, waMessage.message, { messageId:waMessage.key.id })
return waMessage
}

dirly.cMod = (jid, copy, text = '', sender = dirly.user.id, options = {}) => {
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === dirly.user.id
return proto.WebMessageInfo.fromObject(copy)
}

dirly.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
	size: await getSizeMedia(data),
...type,
data
}
}
return dirly
}

startdirly()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})