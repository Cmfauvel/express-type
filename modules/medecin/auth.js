/** @format */
const bcrypt = require("bcryptjs");
const db = require("../index")
const { Medecin } = require("./model");
const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../../helpers/error");
require("dotenv").config();

exports.register = async (req, res, next) => {
    try {
        console.log(db.models)
        // const { Medecin } = initModels(sequelize);
        const { name, mail, password } = req.body;

        if (!mail || !password) {
            throw new ErrorHandler(404, 'Missing required email and password fields')
        };

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        const token = jwt.sign({ email: mail }, process.env.ACCESS_TOKEN_SECRET);

        const alreadyExistsUser = await Medecin.findOne({
            where: { mail: req.body.mail },
        }).catch((err) => {
            console.log('Error : ', err);
            throw new ErrorHandler(404, 'Cannot find user with this mail');
        });
        if (alreadyExistsUser) {
            throw new ErrorHandler(404, 'User with email already exists !');
            // return res.json({
            //   message: "User with email already exists !",
            // });
        }
        const newUser = await new Medecin({
            name,
            mail,
            password: hashedPassword,
        });

        const savedUser = newUser
            .save()
            .then((response) => {
                res.json({ message: 'Thanks for registering !' });
                // const user = response.dataValues;
            })
            .catch((err) => {
                throw new ErrorHandler(500, 'Cannot register user at the moment !')
                //   console.log("Error : ", err);
                //   res.json({
                //     error: "Cannot register user at the moment!",
                //   });
            });
        next();
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    console.log(req.body)
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword)
    const user = {
        mail,
        password,
    };

    const userWithEmail = await User.findOne({ where: { mail: req.body.mail } }).catch((err) => {
        console.log("Error: ", err);
    });
    let compare = await bcrypt.compare(password, userWithEmail.password);
    console.log(compare)
    if (!userWithEmail) {
        return res.json({
            message: "Adresse mail ou mot de passe erroné.",
        });
    } else if (compare == false) {
        return res.json({
            message: "Adresse mail ou mot de passe erroné.",
        });

    } else if (compare == true) {
        const accessToken = jwt.sign(
            {
                id: userWithEmail.id,
                mail: userWithEmail.mail,
            },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.writeHead(200, {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            "Access-Control-Allow-Credentials": "true",
            "Methods": "GET, PUT, POST, DELETE"
        });


        res.write(
            JSON.stringify({
                mail: userWithEmail.mail,
                id: userWithEmail.id,
                username: userWithEmail.username,
                password: userWithEmail.password,
                message: "Welcome Back!",
                token: accessToken
            })
        );

        res.end();
    }


};