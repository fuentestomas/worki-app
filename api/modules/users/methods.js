const model = require('./model');
const bcrypt = require('bcryptjs');

class ModelMethods {

    async login(data) {
        console.log('email', data.emailAddress)
        const user = await model.findOne({ emailAddress: data.emailAddress })
            .then((result) => {
                console.log('returning')
                return result;
            })
            .catch((e) => {
                console.log(e);
            })
        console.log('user', user)
        console.log(data.password);
        console.log(user.password);
        if (bcrypt.compareSync(data.password, user.password)) {
            return user
        }
        else return HttpError(401, 'Contraseña incorrecta');
    }
    
    async create(data) {
        const salt = bcrypt.genSaltSync(10);
        console.log('previous data', data)
        const hashedPassword = await bcrypt.hash(data.password, salt);
        
        data.password = hashedPassword;
        console.log('hashed', data)
        let result = model.create(data)
            .then((res) => {
                return res;
            })
        
        return result;
    }
    
    getById(id) {
        let result = model.findById(id)
            .then((result) => {
                return result;
            });
        
        return result;
    };

    getAll(filters, populates) {
        if (arguments.length == 0) {
            filters = {};
            populates = {};
        }
        
        let result = model.find()
            .then((result) => {
                return result;
            });
        
        return result;
    };

    update(id, newData) {
        let result = model.findByIdAndUpdate(id, newData, { returnDocument: 'after' })
            .then((result) => {
                return result;
            });
        
        return result;
    }

    delete(id) {
        let result = model.findByIdAndDelete(id)
            .then((result) => {
                return result;
            });
        
        return result;
    }

}

module.exports = {
    ModelMethods
};