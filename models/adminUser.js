const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Användarschema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Hasha lösenordet innan sparning
userSchema.pre('save', async function(next) {
    try {
        if(this.isNew || this.isModified('password')) {
            const hashedPassword = await bcrypt.hash(this.password, 10); //Hashar lösenordet
            this.password = hashedPassword; //Sätter det hashade lösenordet
        }

        next(); //Går vidare i flödet
    } catch(error) {
        next(error); //Vid fel, gå vidare med fel
    }
});

//Jämför hashade lösenord vid inloggning
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch(error) {
        throw error;
    }
}

const adminUser = mongoose.model('adminUser', userSchema);
module.exports = adminUser;