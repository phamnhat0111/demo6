var express = require('express');
var router = express.Router();

const mongoose= require( 'mongoose');
const { Schema } = mongoose;
//  bước 1 : kết nối vào csdl qua link với username, password
// tên của csdl là anh
const uri = "mongodb+srv://android_sever:MPUN4xVNCOqw4EGP@cluster0.9wxyl.mongodb.net/anh?retryWrites=true&w=majority";
mongoose.connect(uri).catch(error=> console.log('co lỗi xảy ra'))
/// bước 2 : khai báo kiểu dữ liệu - khung của dữ liệu - model và collection
// _id:62e229de28a3a68729705ef0
// name:"Huy Nguyen Huun3333"
// number:"0913456789"
// address:"HaNoi city"

const STUDENT = mongoose.model('tbTenanh', new Schema({
    name: String,
    number: Number,
    address: String
}))

/* kết nối và lấy danh sách */
/* GET home page. */
router.get('/', function (req, res, next) {

    // tim kiem : dk {}
    STUDENT.find({}, function (error, result) {
        if (error) throw error;
        console.log(result.length)
        res.render('index', {title: 'Express', data: result});
    })
});
router.get('/delete/', function (req, res) {

    const id = req.query.id;
    STUDENT.deleteOne({_id: id}, function (error) {
        if (error) throw error;
        res.send('Xoa thanh cong!!!');
    })

})

router.get('/updateForm/', function (req, res) {

    const id = req.query.id;
    STUDENT.findOne({_id: id}, function (error, result) {
        res.render('update', {title: 'Update', data: result})
    })

})

router.post('/update', async function (req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const number = req.body.number;
    const address = req.body.address;


    await STUDENT.updateOne({_id: id}, {
        name: name,
        number: number,
        address: address
    }, null)

    res.redirect('/')
})

router.post('/create', async function (req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const number = req.body.number;
    const address = req.body.address;

    var sv = new STUDENT({
        name: name,
        number: number,
        address: address
    })

    await sv.save();

    res.redirect('/')
})

module.exports = router;
