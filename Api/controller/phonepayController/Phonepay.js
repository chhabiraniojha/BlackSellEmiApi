const crypto = require('crypto');
const axios = require('axios');
const sequelize = require('../../utill/database')
const User = require("../../models/User")
const Order = require("../../models/Order")


// const {salt_key, merchant_id} = require('./secret')
let salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
let merchant_id = "PGTESTPAYUAT"


function generateTransactionId() {
    const timeStamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000);
    const merchentPrefiex = "T";
    const TransactionId = `${merchentPrefiex}${timeStamp}${randomNum}`
    return TransactionId
}

// console.log(merchantTransactionId)

const newPayment = async (req, res) => {
    try {
        const merchantTransactionId = generateTransactionId()
        const { downpayment, productId } = req.body;
        let encodedParams = Object.entries(req.body).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

        const data = {
            "token": "6a959c-37713a-ad2ca1-27204d-9b48a8",
            "order_id": merchantTransactionId,
            "txn_amount": downpayment,
            "txn_note": "Pay For EGMI",
            "product_name": productId,
            "customer_name": "all in one",
            "customer_mobile": "9999999999",
            "customer_email": "customer@gmail.com",
            "callback_url": `http://localhost:5000/api/phonepay/status/${merchantTransactionId}/${encodedParams}`
        };
        // console.log(data.callback_url)
        const response = await axios.post(`https://allapi.in/order/create`, data);
        // console.log(response)
        if(response.data.status==true){
            return res.json(response.data.results.payment_url)
        }else{
            console.log(response.data.status)
            return;
        }
        

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const checkStatus = async (req, res) => {
    const orderDetailsBeforeDecode=req.params.details;
    // console.log(req.params.id)
    const params = new URLSearchParams(orderDetailsBeforeDecode);

    // Convert to an object
    const orderDetails = {};
    params.forEach((value, key) => {
        orderDetails[key] = value;
    });
    // console.log(orderDetails)
        const t = await sequelize.transaction();
    //     const orderDetails = JSON.parse(req.params.details);
        const { userId, productId, color, emiTreanure, emiPerMonth, addressId, availableLimit, totalPrice } = orderDetails;
        const newAvailableLimit = availableLimit - totalPrice;
        const merchantTransactionId = req.params.id;
        const data={
            "token": "6a959c-37713a-ad2ca1-27204d-9b48a8",
            "order_id": merchantTransactionId
        }

    // CHECK PAYMENT TATUS
    axios.post("https://allapi.in/order/status",data).then(async (response) => {
        // console.log(1)
        // console.log(response.data)
    if (response.data.results.status=="Success") {
        const order = await Order.create({
            productId,
            color,
            emiTreanure,
            perMonthEmi: emiPerMonth,
            addressId,
            status: "confirmed",
            userId
        }, { transaction: t })
        await User.update({ availableLimit: newAvailableLimit }, {
            where: {
                id: userId
            },
            transaction: t

        });
        await t.commit();
        const url = `https://egmi.in/#/Success`
        return res.redirect(url)
    } else {
        // console.log(response)
        await t.rollback();
        const url = `https://egmi.in/#/error`
        return res.redirect(url)
    }
    })
        .catch((error) => {
           return console.error(error);
        });
};

module.exports = {
    newPayment,
    checkStatus
}
