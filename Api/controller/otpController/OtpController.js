const Otp = require("../../models/Otp");
const Sequelize = require('sequelize');
const sid = process.env.SID;
const auth_token = process.env.AUTH_TOKEN;
const twilio = require("twilio")(sid, auth_token);
function generateRandomNumber() {
    // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
    const randomDecimal = Math.random();

    // Multiply the decimal by 900000 to get a number between 0 and 899999
    // Add 100000 to ensure the number is at least 100000
    const randomNumber = Math.floor(randomDecimal * 900000) + 100000;

    return randomNumber;
}


function generateDateInTwoMinutes() {
    // Get the current date and time
    const currentDate = new Date();

    // Add 2 minutes to the current date and time
    currentDate.setMinutes(currentDate.getMinutes() + 10);

    // Format the date to a string (optional, you can adjust the format as needed)
    // const formattedDate = currentDate.toISOString();

    return currentDate;
}





exports.sendOtp = async (req, res) => {
    try {
        const { phoneNo } = req.body
        const otp = generateRandomNumber();
        const expirationTime = generateDateInTwoMinutes();
        const insertRecord = await Otp.create({ phoneNo, otp, expirationTime })


        twilio.messages
            .create({
                from: process.env.SENDER_NO,
                to: phoneNo,
                body: `${otp} is your verification code for EGMI`,
            })
            .then(function (response) {
                console.log("sent")
                return res.status(200).json({ success: true, message: "otp sent successfully" })
            })
            .catch(function (err) {
                return res.status(203).json({ err, success: false, message: "failed" })
            });
    } catch (error) {
        return res.status(500).json({ error, message: "internal server error" })
    }



}

exports.verifyOtp = async (req, res) => {
    const { phoneNo, otp } = req.body;
    
    try {
        const userRecords = await Otp.findAll({
            where: {
                phoneNo,
                expirationTime: {
                    [Sequelize.Op.gte]: new Date(),

                }
            },
            order: [['expirationTime', 'DESC']]
        })
        if(otp==userRecords[0].otp){
            return res.status(200).json({success:true,message:"otp successfully verified"})
        }else{
            return res.status(201).json({success:false,message:"otp mismatch or expired"})
        }
    } catch (error) {
        return res.status(500).json({error,message:"internal server error"})
    }
}