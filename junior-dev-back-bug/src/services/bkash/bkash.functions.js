/**
 * !! ATTENTION PLEASE !!
 * Please refer to the documentation at https://developer.bka.sh for information on bKash.
 */
import fetch from '../../utils/fetch';

class BaseClass {
  sandbox = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout';
  live = 'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout';

  constructor(username, password, appKey, appSecret, isDev) {
    this.username = username;
    this.password = password;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.baseUrl = isDev ? this.sandbox : this.live;
  }

  static async init(username, password, appKey, appSecret, isDev) {
    const o = new BaseClass(username, password, appKey, appSecret, isDev);
    await o.grantToken();
    return o;
  }

  async grantToken() {
    try {
      let url = this.baseUrl + '/token/grant';
      let headers = {
        username: this.username,
        password: this.password,
      };

      let data = {
        app_key: this.appKey,
        app_secret: this.appSecret,
      };

      let res = await fetch({
        method: 'POST',
        url, headers, data
      });

      if (res?.statusCode === '0000') {
        this.token = res?.id_token;
        this.tokenType = res?.token_type;
        this.refreshToken = res?.refresh_token;
      }

      return res;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async createAgreement({ mode = '', payerReference = '', email = '', totalPrice = 0 }) {
    console.log("hello agreement");
    try {
      let url = this.baseUrl + '/create';
      let data = {
        mode,
        payerReference,
        callbackURL: 'http://localhost:9000/api/bkash/execute/?email=' + email + '&totalPrice=' + totalPrice,
      };
      let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
      return await fetch({ method: 'POST', url, headers, data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async executeAgreement(paymentID = '') {
    console.log("hello executeAgreement", paymentID);
    try {
      let url = this.baseUrl + '/execute';
      let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
      return await fetch({ method: 'POST', url, headers, data: { paymentID } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async agreementStatus() {
    try {
      let url = this.baseUrl + '/agreement/status';
      let data = { agreementID: this.agreementID };
      let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
      return await fetch({ method: 'POST', url, headers, data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createPayment({
    mode,
    merchantAssociationInfo,
    amount,
    merchantInvoiceNumber,
    agreementID,
    baseURL,
  }) {
    try {
      let url = this.baseUrl + '/create';
      let data = {
        agreementID: agreementID,
        mode: mode,
        payerReference: this.payerReference,
        callbackURL: baseURL,
        merchantAssociationInfo: merchantAssociationInfo,
        amount: amount,
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: merchantInvoiceNumber,
      };
      let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
      return await fetch({ method: 'POST', url, headers, data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async executePayment({ paymentID }) {
    try {
      let url = this.baseUrl + '/execute';
      let data = { paymentID: paymentID };
      let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
      return await fetch({ method: 'POST', url, headers, data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async queryPayment(paymentID) {
    try {
      let url = this.baseUrl + '/payment/status';
      let data = { paymentID };
      let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
      return await fetch({ method: 'POST', url, headers, data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async paymentStatus(paymentID) {
    try {
      let url = this.baseUrl + '/payment/status';
      let data = { paymentID };
      let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
      return await fetch({ method: 'POST', url, headers, data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchTransaction(trxID) {
    try {
      let url = this.baseUrl + '/general/searchTransaction';
      let data = { trxID };
      let headers = { Authorization: this.token, 'X-APP-Key': this.appKey };
      return await fetch({ method: 'POST', url, headers, data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchTransactionDetails() {
    try {
      let url = this.baseUrl + '/general/searchTransaction';
      let headers = {
        Authorization: this.token,
        'X-APP-Key': this.appKey,
      };
      let data = { trxID: this.trxID };
      return await fetch({ method: 'POST', url, headers, data });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

class Bkash extends BaseClass {
  constructor(username, password, appKey, appSecret, isDev) {
    super(username, password, appKey, appSecret, isDev);
  }
}

export default Bkash;