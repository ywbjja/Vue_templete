import CryptoJS from 'crypto-js/crypto-js'

// 默认的 KEY 与 iv 
const KEY = CryptoJS.enc.Hex.parse("3132333435363738393041424344454631323334353637383930414243444566");
const IV = CryptoJS.enc.Hex.parse('30313233343536373839414243444546');
/**
 * AES加密 
 */
export function Encrypt(word, keyStr, ivStr) {
  let key = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }
  // 传过来的密码
  let srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
 // console.log("-=-=-=-", encrypted.ciphertext)
  return encrypted.ciphertext.toString()

}
/**
 * AES 解密 
 *
 */
export function Decrypt(word, keyStr, ivStr) {
  let key  = KEY
  let iv = IV

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let src = CryptoJS.format.Hex.parse(word);

  var decrypt =CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return CryptoJS.enc.Utf8.stringify(decrypt)
}