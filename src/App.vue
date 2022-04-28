<!--
 * @Author: your name
 * @Date: 2022-04-28 03:18:00
 * @LastEditTime: 2022-04-28 04:26:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-admin-template/src/App.vue
-->
<template>
  <div id="app">
    <el-card shadow="never">
        <template #header>
            <span class="title">
                云管平台数据传输过程中的国密算法研究
            </span>
        </template>
        <el-tabs style="padding: 0 200px 0 200px" tab-position="top" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <!-- rsa -->
            <el-tab-pane label="rsa" name="RSA">
                <span slot="label"><i class="el-icon-copy-document"></i> RSA</span>
                <el-divider content-position="left">1.生成秘钥对</el-divider>
                <el-row :gutter="20">
                    <el-col :span="12">
                      <div style="float:left;font-size:14px">
                        秘钥长度:
                        <el-select style="width:100px" v-model="rsaLength" class="m-2" placeholder="Select" size="small">
                          <el-option label='512' value = '512'/>
                          <el-option label='1024' value = '1024'/>
                          <el-option label='2048' value = '2048'/>
                          <el-option label='4096' value = '4096'/>
                        </el-select>
                        加密方式:
                        <el-select style="width:120px" v-model="rsaType" class="m-2" placeholder="Select" size="small">
                          <el-option label='SHA-1' value = '1'/>
                          <el-option label='SHA-256' value = '256'/>
                          <el-option label='SHA-384' value = '384'/>
                          <el-option label='SHA-512' value = '512'/>
                        </el-select>
                      </div>
                      <el-button type="primary" plain size="small" style="float:left; margin-left:5px" @click="generateKeyPair('rsa')">生成</el-button>
                      <el-button type="text" style="float:right">rsa加密公钥</el-button>
                      <el-input disabled placeholder="生成的公钥可用于加密数据" v-model="rsaPublicKeyText" type="textarea"  :autosize="{ minRows: 15, maxRows: 15 }">
                      </el-input>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="text" style="float:right">rsa加密私钥</el-button>
                      <el-input disabled placeholder="私钥可用于解密公钥加密的数据" v-model="rsaPrivateKeyText" type="textarea" :autosize="{ minRows: 15, maxRows: 15 }">
                      </el-input>
                    </el-col>
                </el-row>
                <el-divider content-position="left"> 2.加密数据
                  <el-tag class="el-icon-info" size="mini" type="warning">需要先生成秘钥对</el-tag>
                  <span v-show="showUseTimeRsa" class="red">
                    <el-tag class="el-icon-success" style= "margin-left:5px" size="mini" type="success">耗时: {{useTimeRsa}} ms</el-tag>
                  </span>
                  </el-divider>

                <el-row :gutter="20">
                    <el-col :span="12">
                      <el-button type="primary" plain icon="el-icon-lock" size="small" style="float:left" @click="encrypt('rsa')">执行</el-button>
                      <el-button icon="el-icon-refresh" size="small" style="float:left" @click="needEncryptDataRsa = ''">清空</el-button>
                      <el-button type="text" style="float:right">需要加密的数据</el-button>
                      <el-input placeholder="填写你需要加密的数据, 可以为空" v-model="needEncryptDataRsa" type="textarea"  :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="text" style="float:right">结果</el-button>
                      <el-input disabled v-model="encryptedDataRsa" type="textarea" :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                    </el-col>
                </el-row>
                <el-divider content-position="left">3.解密数据
                  <el-tag class="el-icon-info" size="mini" type="warning">需要先生成秘钥对, 并且加密数据</el-tag>
                  <span v-show="showUseTimeRsa_decrypt" class="red">
                    <el-tag style= "margin-left:5px" class="el-icon-success" size="mini" type="success">耗时: {{useTimeRsa_decrypt}} ms</el-tag>
                  </span>
                </el-divider>
                <el-row :gutter="20">
                    <el-col :span="12">
                      <el-button type="primary" plain icon="el-icon-unlock" size="small" style="float:left" @click="decrypt('rsa')">执行</el-button>
                      <el-button icon="el-icon-refresh" size="small" style="float:left" @click="decryptDataRsa = ''">清空</el-button>
                      <el-button type="text" style="float:right">验证结果</el-button>
                      <el-input disabled placeholder="根据生成的结果用私钥解密" v-model="decryptDataRsa" type="textarea"  :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <!-- sm2 -->
            <el-tab-pane label="sm2" name="sm2">
                <span slot="label"><i class="el-icon-copy-document"></i> SM2</span>
                <el-divider content-position="left">1.生成秘钥对
                </el-divider>
                <el-row :gutter="20">
                    <el-col :span="12">
                      <div style="float:left;font-size:14px">
                        加密模式:
                        <el-select style="width:100px" v-model="sm2Type" class="m-2" placeholder="Select" size="small">
                          <el-option label='C1C3C2' :value = '1'/>
                          <el-option label='C1C2C3' :value = '0'/>
                        </el-select>
                      </div>
                      <el-button type="primary" plain size="small" style="float:left; margin-left:5px" @click="generateKeyPair">生成</el-button>
                      <el-button type="text" style="float:right">sm2加密公钥</el-button>
                      <el-input disabled placeholder="生成的公钥可用于加密数据" v-model="sm2PublicKeyText" type="textarea"  :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="text" style="float:right">sm2加密私钥</el-button>
                      <el-input disabled placeholder="私钥可用于解密公钥加密的数据" v-model="sm2PrivateKeyText" type="textarea" :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                    </el-col>
                </el-row>
                <el-divider content-position="left">2.加密数据
                    <el-tag class="el-icon-info" size="mini" type="warning">需要先生成秘钥对</el-tag>
                    <span v-show="showUseTimeSm2" class="red">
                      <el-tag style= "margin-left:5px" class="el-icon-success" size="mini" type="success">耗时: {{useTimeSm2}} ms</el-tag>
                    </span>
                </el-divider>
                <el-row :gutter="20">
                    <el-col :span="12">
                      <el-button type="primary" plain icon="el-icon-lock" size="small" style="float:left" @click="encrypt('sm2')">执行</el-button>
                      <el-button icon="el-icon-refresh" size="small" style="float:left" @click="needEncryptDataSm2 = ''">清空</el-button>
                      <el-button type="text" style="float:right">需要加密的数据</el-button>
                      <el-input placeholder="填写你需要加密的数据, 可以为空" v-model="needEncryptDataSm2" type="textarea"  :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                    </el-col>
                    <el-col :span="12">
                      <el-button type="text" style="float:right">结果</el-button>
                      <el-input disabled v-model="encryptedDataSm2" type="textarea" :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                    </el-col>
                </el-row>
                <el-divider content-position="left">3.解密数据
                  <el-tag class="el-icon-info" size="mini" type="warning">需要先生成秘钥对, 并且加密数据</el-tag>
                  <span v-show="showUseTimeSm2_decrypt" class="red">
                    <el-tag style= "margin-left:5px" class="el-icon-success" size="mini" type="success">耗时: {{useTimeSm2_decrypt}} ms</el-tag>
                  </span>
                </el-divider>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-button type="primary" plain icon="el-icon-unlock" size="small" style="float:left" @click="decrypt('sm2')">执行</el-button>
                    <el-button icon="el-icon-refresh" size="small" style="float:left" @click="decryptDataSm2 = ''">清空</el-button>
                    <el-button type="text" style="float:right">验证结果</el-button>
                    <el-input disabled placeholder="根据生成的结果用私钥解密" v-model="decryptDataSm2" type="textarea"  :autosize="{ minRows: 8, maxRows: 10 }">
                    </el-input>
                  </el-col>
                </el-row>
            </el-tab-pane>
            <!-- md5 -->
            <el-tab-pane label="md5" name="md5">
              <span slot="label"><i class="el-icon-copy-document"></i> MD5</span>
                <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input placeholder="请输入" v-model="md5Text" type="textarea"  :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                      <div style="float:left; margin-top:5px">
                        <el-button size="small" type="primary" plain @click="encrypt('md5')">MD5加密</el-button><el-button size="small">清空</el-button>
                        <el-tag style= "margin-left:5px" v-show="showUseTimeMd5" class="el-icon-success" type="success">耗时: {{useTimeMd5}} ms</el-tag>
                      </div>
                      </el-col>
                      <el-col :span="12">
                      <el-input disabled placeholder="" v-model="md5EncryptedData" type="textarea"  :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <!-- sm3 -->
            <el-tab-pane label="sm3" name="sm3">
              <span slot="label"><i class="el-icon-copy-document"></i> SM3</span>
                <el-row :gutter="20">
                    <el-col :span="12">
                      <el-input placeholder="请输入" v-model="sm3Text" type="textarea"  :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                      <div style="float:left; margin-top:5px">
                        <el-button type="primary" plain size="small"  @click="encrypt('sm3')">sm3加密</el-button><el-button size="small">清空</el-button>
                        <el-tag style= "margin-left:5px" v-show="showUseTimeSm3" class="el-icon-success" type="success">耗时: {{useTimeSm3}} ms</el-tag>
                      </div>
                      </el-col>
                      <el-col :span="12">
                      <el-input disabled placeholder="" v-model="sm3EncryptedData" type="textarea"  :autosize="{ minRows: 8, maxRows: 10 }">
                      </el-input>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {
  rsaEncrypt,
  rsaDecrypt,
  md5Encrypt,
  createRsaKeyPair,
} from './util'

import {sm2, sm3} from 'sm-crypto'
export default {
    data() {
        return {
            sm2PrivateKeyText: '',
            sm2PublicKeyText: '',
            rsaPublicKeyText: '',
            rsaPrivateKeyText: '',
            md5Text: '',
            md5EncryptedData: '',
            sm3Text: '',
            sm3EncryptedData: '',
            needEncryptDataSm2: '',
            needEncryptDataRsa: '',
            encryptedDataSm2: '',
            encryptedDataRsa:'',
            data:{},
            showTime: false,
            activeName: 'RSA',
            decryptDataRsa: '',
            decryptDataSm2: '',
            showUseTimeRsa: false,
            showUseTimeRsa_decrypt: false,
            showUseTimeSm2: false,
            showUseTimeSm2_decrypt: false,
            showUseTimeSm3: false,
            showUseTimeMd5: false,
            useTimeRsa: 0,
            useTimeRsa_decrypt: 0,
            useTimeSm2: 0,
            useTimeSm2_decrypt: 0,
            useTimeSm3: 0,
            useTimeMd5: 0,
            rsaLength: 1024,
            rsaType: '512',
            sm2Type: 1,

        }
    },
    methods: {
        /**
         * [SM2Encrypt description]
         * @param {[type]} data       [待加密数据]
         * @param {[type]} publicKey  [公钥 hex]
         * @param {[type]} cipherMode [加密模式 C1C3C2:1, C1C2C3:0]
         * @return {[type]}           [返回加密后的数据 hex]
         */
        sm2Encrypt(data, publicKey, cipherMode){
          return sm2.doEncrypt(data, publicKey, cipherMode);
        },
        /**
         * [SM2Decrypt sm2 解密数据]
         * @param {[type]} encrypted  [待解密数据 hex]
         * @param {[type]} privateKey [私钥 hex]
         * @param {[type]} cipherMode [加密模式 C1C3C2:1, C1C2C3:0]
         * @return {[type]}           [返回解密后的数据]
         */
        sm2Decrypt(encrypted, privateKey, cipherMode) {
          return sm2.doDecrypt(encrypted, privateKey, cipherMode);
        },
      /**
       * 生成秘钥对
       * @returns { "privateKey": "XXX", "publicKey": "XXXX" }
       */
        sm2generateKeyPair() {
          return sm2.generateKeyPairHex()
        },
        sm3Encrypt(data) {
          return sm3(data);
        },
        handleClick(tab, event){},
        generateKeyPair(type){
            if (type === 'rsa'){
                this.generateRsaKeyPair()
            }else{
                const data = this.sm2generateKeyPair()
                this.sm2PrivateKeyText = data.privateKey;
                this.sm2PublicKeyText = data.publicKey;
            }
        },
        encrypt(type){
            const start = new Date().getTime()
            if (type === 'rsa'){
                const data = this.needEncryptDataRsa;
                const pbkey = this.rsaPublicKeyText;
                if (!pbkey){
                    this.$message({
                        message: '请先生成公钥',
                        type: 'warning',
                    })
                    return;
                }
                this.showUseTimeRsa = false
                const e = rsaEncrypt(data, pbkey)
                const end = new Date().getTime()
                this.useTimeRsa = end - start
                this.encryptedDataRsa = e
                this.showUseTimeRsa = true
            }else if (type === 'sm2'){
                const data = this.needEncryptDataSm2
                const pbkey = this.sm2PublicKeyText
                if (!pbkey){
                    this.$message({
                        message: '请先生成公钥',
                        type: 'warning',
                    })
                    return
                }
                this.showUseTimeSm2 = false
                const e = this.sm2Encrypt(data, pbkey, this.sm2Type)
                const end = new Date().getTime()
                this.useTimeSm2 = end - start
                this.encryptedDataSm2 = e
                this.showUseTimeSm2 = true
            }else if (type === 'sm3'){
                let data =  this.sm3Text
                if(!data){
                    this.$message({
                        message: '请输入数据',
                        type: 'warning',
                    })
                    return
                }
                this.showUseTimeSm3 = false
                this.sm3EncryptedData = this.sm3Encrypt(data)
                const end = new Date().getTime()
                this.useTimeMd5 = end - start
                this.showUseTimeSm3 = true

            }else if (type === 'md5'){
                let data =  this.md5Text
                if(!data){
                    this.$message({
                        message: '请输入数据',
                        type: 'warning',
                    })
                    return
                }
                this.showUseTimeMd5 = false
                this.md5EncryptedData = md5Encrypt(data)
                const end = new Date().getTime()
                this.useTimeMd5 = end - start
                this.showUseTimeMd5 = true
            }
        },
        generateRsaKeyPair(){
            createRsaKeyPair(this.rsaLength, (privateKey, publicKey) =>{
                this.rsaPrivateKeyText = privateKey;
                this.rsaPublicKeyText = publicKey;
            })
        },
      decrypt: function(type) {
        const start = new Date().getTime()
        if (type === 'rsa') {
          const data = this.needEncryptDataRsa
          const prvkey = this.rsaPrivateKeyText
          if (!prvkey) {
            this.$message({
              message: '请先生成私钥',
              type: 'warning'
            })
            return
          }

          const result = this.encryptedDataRsa
          if (!result) {
            this.$message({
              message: '请先使用公钥加密数据',
              type: 'warning'
            })
            return
          }
          this.showUseTimeRsa_decrypt = false
          this.decryptDataRsa = rsaDecrypt(result, prvkey)
          const end = new Date().getTime()
          this.useTimeRsa_decrypt = end - start
          this.showUseTimeRsa_decrypt = true
          this.$message({ message: '解密成功', type: 'success' })
        } else if (type === 'sm2') {
          const prvkey = this.sm2PrivateKeyText;
          if (!prvkey) {
            this.$message({
              message: '请先生成私钥',
              type: 'warning'
            })
            return
          }
          const result = this.encryptedDataSm2
          if (!result) {
            this.$message({
              message: '请先使用公钥加密数据',
              type: 'warning'
            })
            return
          }
          this.showUseTimeSm2_decrypt = false
          this.decryptDataSm2 = this.sm2Decrypt(result, prvkey, this.sm2Type)
          const end = new Date().getTime()
          this.useTimeSm2_decrypt = end - start
          this.$message({ message: '解密成功', type: 'success' })
          this.showUseTimeSm2_decrypt = true

        }
      }
    },
    name: 'App',
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.title {
    font-size: 25px;
    font-weight: bold;
}

</style>
