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

    async getUserChats(id ,role) {
        const filter = role == 'worker' ? {applierId: id} : {employerId: id}
        let result = await model
                    .find(filter)
                    .populate([role == 'worker' ? 'employerId': 'applierId'])
                    .sort('+_id')
                    .then(async (data) => {
                        const promises = data.map(async (chat) => {
                            const message = await messagesModel.findOne({ chatId: chat._id.toString() }).sort('-createdAt');

                            const argentinaTimeZone = 'America/Argentina/Buenos_Aires';

                            const date = new Date(message.createdAt.toString());

                            // Format the date to Argentina time
                            const formatter = new Intl.DateTimeFormat('en-US', {
                                timeZone: argentinaTimeZone,
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            });

                            const formattedDate = formatter.format(date);

                            console.log(formattedDate);

                            let modifiedMsg = { ...message, time: formattedDate };
                            modifiedMsg._doc.time = modifiedMsg.time;

                            let chatUser;
                            if (chat.employerId.fullName) {
                                chatUser = {
                                    id: chat.employerId._id.toString(),
                                    fullName: chat.employerId.fullName,
                                    photo: chat.employerId.photo,
                                    
                                }
                            } else {
                                chatUser = {
                                    id: chat.applierId._id.toString(),
                                    fullName: chat.applierId.fullName,
                                    photo: chat.applierId.photo,
                                    
                                }
                            }

                            let copy = { ...chat, lastMsg: modifiedMsg._doc, chatUser: chatUser };
                            copy._doc.lastMsg = copy.lastMsg;
                            copy._doc.chatUser = copy.chatUser;
                            delete copy._doc.applierId;
                            delete copy._doc.employerId;
                            
                            //console.log('chat', copy)
                            return copy._doc;
                        });
                
                        // Await all promises
                        const updatedData = await Promise.all(promises);

                        return updatedData;
                    });
        return result;
    }

}

module.exports = {
    ModelMethods
};