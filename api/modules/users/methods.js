require('dotenv').config()
const model = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const firebaseAuth = require("firebase-admin/auth");
//const { privateKey } = JSON.parse(process.env.PRIVATE_KEY);

//const serviceAccount = require("../../firebase/worki.json");
console.log("env", process.env.UNIVERSE_DOMAIN)
const serviceAccount = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_x509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN
}

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = firebaseAuth.getAuth(firebase);

class ModelMethods {

    async login(data) {
        let user = await model.findOne({ emailAddress: data.emailAddress }).lean()
            .then((result) => {
                return result;
            })
            .catch((e) => {
                console.log(e);
            })

        if (user && bcrypt.compareSync(data.password, user.password)) {
            const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1y' });
            user.token = token;
            return user
        }
        else {
            const error = new Error();
            error.status = 401;
            error.message = user ? 'Contraseña incorrecta' : 'Usuario no existe';
            return error;
        }
    }
    
    async create(data) {
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = await bcrypt.hash(data.password, salt);
        
        data.password = hashedPassword;

        let result = model.create(data)
            .then((res) => {
                return res;
            })
        
        return result;
    }

    async register(data) {

        if (!data.uid) {
            const salt = bcrypt.genSaltSync(10);

            const hashedPassword = await bcrypt.hash(data.password, salt);
            
            data.password = hashedPassword;
        }

        let result = await model.create(data);
        
        if (data.uid) {
            const googleUser = await auth.getUserByEmail(data.emailAddress)
                .then((userRecord) => {
                    console.log(`Successfully fetched user data: ${userRecord}`);
                    return userRecord.toJSON();
                })
                .catch((error) => {
                    console.log('Error fetching user data:', error);
                });
            await auth.deleteUser(data.uid)
                .then(async () => {
                    console.log('Successfully deleted user');
                })
                .catch((error) => {
                    console.log('Error deleting user:', error);
                });
            //console.log('Google user', googleUser)
            let firebaseUser = [{
                uid: result._id.toString(),
                displayName: googleUser.displayName,
                email: googleUser.email,
                photoURL: googleUser.photoURL,
                emailVerified: true,
                metadata: googleUser.metadata,
                // User with Google provider.
                providerData: [
                    {
                    uid: googleUser.providerData[0].uid,
                    email: googleUser.email,
                    displayName: googleUser.displayName,
                    photoURL: googleUser.photoURL,
                    providerId: 'google.com',
                    },
                ],
            }]
            //console.log(firebaseUser)
            await auth.importUsers(firebaseUser)
                .then((userRecord) => {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log('userRecord', userRecord)
                })
                .catch((error) => {
                    console.log('Error creating new user:', error);
                });
        }

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