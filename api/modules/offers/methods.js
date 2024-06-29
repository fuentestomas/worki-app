const model = require('./model');

class ModelMethods {

    create(data) {
        let result = model.create(data)
            .then((res) => {
                return res;
            })
        
        return result;
    }
    
    getById(id, fields = '') {
        if (fields) {
            return model.findById(id)
                .select(fields)
                .populate(['userId'])
                .then((result) => result)
                .catch((err) => { throw err; });
        } else {
            return model.findById(id)
                .then((result) => result)
                .populate(['userId'])
                .catch((err) => { throw err; });
        }
    }

    getAll(filters = {}, fields = '') {
        if (fields) {
            return model.find(filters)
                .select(fields)
                .then((result) => result)
                .catch((err) => { throw err; });
        } else {
            return model.find(filters)
                .then((result) => result)
                .catch((err) => { throw err; });
        }
    }

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

    getByUserId(userId) {
        let result = model.find({ userId })
            .then((result) => {
                return result;
            });
        
        return result;
    }

    getByOfferId(offerId) {
        let result = applicationModel.find({ offerId }).populate('userId')
            .then((result) => {
                return result;
            });
        
        return result;
    }

}

module.exports = {
    ModelMethods
};  