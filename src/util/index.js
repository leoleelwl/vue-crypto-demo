/*
 * @Author: your name
 * @Date: 2022-04-27 17:12:48
 * @LastEditTime: 2022-04-28 13:33:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my-crypto-demo/src/uti/index.js
 */
import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'
const NodeRSA =  require('node-rsa')

function rsaEncrypt(data, publicKey) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  console.log(encrypt.encrypt(data))
  return encrypt.encrypt(data)
}


function rsaDecrypt(data, privateKey) {
  let encrypt = new JSEncrypt();
  encrypt.setPrivateKey(privateKey);
  console.log(encrypt.decrypt(data))
  return encrypt.decrypt(data)
}

function md5Encrypt(data) {
  return CryptoJS.MD5(data).toString();
}

function createRsaKeyPair(length, func) {
    const key = new NodeRSA({ b: length }); //生成512, 1024, 2048位的密钥
    const publicDer = key.exportKey("pkcs8-public-pem"); //公钥
    const privateDer = key.exportKey('pkcs8-private-pem');//私钥
    // 'pkcs1' — public key starts from '-----BEGIN RSA PUBLIC KEY-----' header and private key starts from '-----BEGIN RSA PRIVATE KEY-----' header
    // 'pkcs8' — public key starts from '-----BEGIN PUBLIC KEY-----' header and private key starts from '-----BEGIN PRIVATE KEY-----' header
    // 'pem'— 带有页眉和页脚的 Base64 编码字符串。默认使用。
    // 'der' — 二进制编码的密钥数据。
    return func(privateDer, publicDer);
}

export {rsaEncrypt, rsaDecrypt, md5Encrypt, createRsaKeyPair}
