const crypto =  require('crypto');
const axios = require('axios');
const sequelize=require('../../utill/database')
const User=require("../../models/User")
const Order=require("../../models/Order")


// const {salt_key, merchant_id} = require('./secret')
let salt_key="099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
let merchant_id="PGTESTPAYUAT"


function generateTransactionId() {
    const timeStamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000);
    const merchentPrefiex = "T";
    const TransactionId = `${merchentPrefiex}${timeStamp}${randomNum}`
    return TransactionId
}
const merchantTransactionId=generateTransactionId()

const newPayment = async (req, res) => {
    try {
        // const {name,number,amount}=req.body;
        // const merchantTransactionId = req.body.transactionId;
        const {downpayment}=req.body;
        
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: "MU933037302229373",
            // name: name,
            amount: downpayment * 100,
            redirectUrl: `http://15.206.185.111:3010/api/phonepay/status/${merchantTransactionId}?merchant=${merchantTransactionId}&orderDetails=${JSON.stringify(req.body)}`,
            redirectMode: 'POST',
            // mobileNumber: number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;
        // console.log(checksum)

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        axios.request(options).then(function (response) {
            // console.log(response.data)
            return res.json(response.data.data.instrumentResponse.redirectInfo.url)
        })
        .catch(function (error) {
            console.error(error);
        });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

const checkStatus = async(req, res) => {
    const t = await sequelize.transaction();
    const orderDetails=JSON.parse(req.query.orderDetails);
    const {userId,productId,color,emiTreanure,emiPerMonth,addressId,availableLimit,totalPrice}=orderDetails;
    const newAvailableLimit=availableLimit-totalPrice;
    const merchantTransactionId = req.query.merchant;
    const merchantId = merchant_id
    // console.log(merchantId)
    // console.log(req.query)
    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
    method: 'GET',
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': `${merchantId}`
    }
    };

    // CHECK PAYMENT TATUS
    axios.request(options).then(async(response) => {
        if (response.data.success === true) {
            const order=await Order.create({
                productId,
                color,
                emiTreanure,
                perMonthEmi:emiPerMonth,
                addressId,
                status:"confirmed",
                userId
            },{ transaction: t })
            await User.update({ availableLimit: newAvailableLimit }, {
                where: {
                  id: userId
                },
                transaction: t
          
              });
              await t.commit();
            const url = `http://localhost:5174/#/Success`
            return res.redirect(url)
        } else {
            // console.log(response)
            await t.rollback();
            const url = `http://localhost:5174/#/Error`
            return res.redirect(url)
        }
    })
    .catch((error) => {
        console.error(error);
    });
};

module.exports = {
    newPayment,
    checkStatus
}
