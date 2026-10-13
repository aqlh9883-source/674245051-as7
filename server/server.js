require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../public'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('ติดต่อ MongoDB ได้เรียบร้อย'))
    .catch(err => console.error('เกิดข้อผิดพลาดในการติดต่อ MongoDB'))


const menuSchema = new mongoose.Schema({
    name: String,
    price: Number,
    cat: String
});

const Menus = mongoose.model('Menus', menuSchema);

app.get('/api/menus/:filter', async (req,res) => {
    try{
        const {filter} = req.params;
        let menuItems;
        if (filter === "all") {
            menuItems = await Menus.find();
        }
        else {
            menuItems = await Menus.find({cat: filter});
        }
        
        res.json(menuItems);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
})
const PORT = (process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`Server : http://localhost:${PORT}`);
});