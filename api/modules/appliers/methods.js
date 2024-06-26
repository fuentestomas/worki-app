const model = require('./model');
const chatModel = require('../chat/model');

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

    async getOfferApplications(offer, id) {
        let result = await model.find({ offerId: offer }).populate(['userId'])
            .then((result) => {
                return result;
            });

        if (result.length === 0) {
            return result;
        } else {
            result = await this.getApplicationChats(result, id);
            return result;
        }
    }

    async getApplicationChats(data, id) {
        // Use map to create an array of promises and await them using Promise.all
        const promises = data.map(async (applier) => {
            const chat = await chatModel.findOne({ employerId: id, applierId: applier.userId._id.toString() });

            let copy;
            if (chat) {
                copy = { ...applier, chat: chat._id.toString()}
                copy._doc.chat = copy.chat;
            } else {
                copy = { ...applier, chat: 'none'}
                copy._doc.chat = copy.chat;
            }
            
            return copy._doc;
        });

        // Await all promises
        const updatedData = await Promise.all(promises);

        return updatedData;
    }

    updateApplicationStatus(id, newStatus) {
        let result = model.findByIdAndUpdate(id, { status: newStatus }, { returnDocument: 'after' })
            .then((result) => {
                return result;
            });
        
        return result;
    }

}

module.exports = {
    ModelMethods
};