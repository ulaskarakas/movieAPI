const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true // Eşsiz olmasını sağlar
    },
    name: { 
        type: String, 
        required: true // Zorunlu olmasını sağlar
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // Eşsiz olmasını sağlar
    },
    password: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now, // Kullanıcı oluşturulduğunda tarih otomatik olarak atanır
    }
});

module.exports = mongoose.model('User', userSchema);
