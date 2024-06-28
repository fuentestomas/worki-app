const model = require('./model');

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

    async getByUserId(userId) {
        let applications = await model.find({ userId: userId }).populate('offerId')
            .then((result) => {
                return result;
            });

        let appliedOffers = [];

        applications.forEach(element => {
            element.offerId.applicationStatus = element.status;
            appliedOffers.push(element.offerId);
            console.log(element.offerId);
        })
        
        return appliedOffers;
    }

    getUserApplication(user, offer) {
        let result = model.findOne({ userId: user, offerId: offer })
            .then((result) => {
                return result;
            });
        
        return result;
    }

    getOfferApplications(offer) {
        let result = model.find({ offerId: offer })
            .then((result) => {
                return result;
            });
        
        return result;
    }

    updateApplicationStatus(id, newStatus) {
        let result = model.findByIdAndUpdate(id, { status: newStatus }, { returnDocument: 'after' }).populate(['userId'])
            .then((result) => {
                return result;
            });
        
        return result;
    }

}

module.exports = {
    ModelMethods
};