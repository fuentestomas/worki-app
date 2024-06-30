const model = require('./model');
const messagesModel = require('../message/model');

class ModelMethods {

    create(data) {
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

    getChatMessages(id) {
        let result = messagesModel.find({ chatId: id }).sort('+_id')
            .then((result) => {
                return result;
            });
        
        return result;
    };

}

module.exports = {
    ModelMethods
};