const app = require('express')()

const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay');
const cors = require('cors')
app.use(cors())
/*const currencyMapping = {
    INR:5,
    USD:10,

}
currencyMapping[getCurrencyHeader(req.ip)]*/
const razorpay = new Razorpay({
    key_id:'rzp_test_n5dHo3lkFh2iLN',
    key_secret:'w9VetstWdH6BW7DL80Q8bTMC',
});
app.get('/logo.svg',(req,res) => {
    res.sendFile(path.join(__dirname,'logo.svg'))
})


app.post('/razorpay',async (req,res)=>{
    const payment_capture = 1
    const amount =  5
    const currency = 'INR'
    const options = {
        amount: (amount*100).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    try{
    const response = await razorpay.orders.create(options)
    console.log(response)
    res.json({
        id: response.id,
        currency:response.currency,
        amount:response.amount,

    })
    }
    catch(error){
        console.log(error);
    }
})
app.listen(1337,()=>{
    console.log('Listening on 1337')
})