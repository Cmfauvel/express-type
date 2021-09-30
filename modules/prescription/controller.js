/** @format */

const { Model, Sequelize } = require("./model");


exports.findAll = (req, res) => {
    Model.findAll()
        .then((models) => {
            res.send(models);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        });
};


exports.findOne = (req, res) => {
    Model.findAll({ where: { id: req.params.id } })
        .then((models) => {
            res.send(models);
            console.log(req.params.id);
        })
        .catch((err) => {
            if (err) {
                console.log(err);
            }
        });
};

exports.create = (req, res) => {
    Model.create({
        name: req.body.name
    }).then((resp) => {
        console.log(resp)
        res.send({ message: "Model ajoutée." });
    }).catch((err) => {
        if (err) {
            console.log(err);
            res.send({ message: "L'ajout à la base de données a échoué." })
        }
    });
};

exports.update = (req, res) => {
    Model.update({
        name: req.body.name
    }, { where: { id: req.params.id } }, { multi: false }).then((resp) => {
        res.send({ message: "Model modifié." });
    }).catch((err) => {
        if (err) {
            console.log(err);
            res.send({ message: "La modification a échoué." })
        }
    })
};

exports.delete = (req, res) => {
    Model.destroy({ where: { id: req.params.id } }).then((resp) => {
        res.send({ message: "Model supprimé." })
    }).catch((err) => {
      if (err) {
        console.log(err);
        res.send({message: "La suppression a échoué."})
      }
    })
};

exports.haveMeds = () => {

};