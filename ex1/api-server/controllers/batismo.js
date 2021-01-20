// Controlador para o modelo Batismo
var Batismo = require('../models/batismo')

// Devolve a lista de Batismos
module.exports.listar = () => {
    return Batismo
        .find({}, {_id: 1, date: 1, title: 1, ref: 1})
        .exec()
}

module.exports.consultar = idb => {
    return Batismo
        .findOne({_id: idb})
        .exec()
}

module.exports.batisado = () => {
    return Batismo
        .aggregate([{ $addFields: { "lista": { $regexFind: { input: "$title", regex: "(?<=: ).*(?=\. Pai:)"} }}}])
        .group({ _id: "$lista.match" })
        .sort( { _id: 1 } )
        .exec()
}

module.exports.progenitores = () => {
    return Batismo
        .find({}, {_id: 1, pai: 1, mae: 1 })
        .exec()
}

module.exports.byano = a => {
    return Batismo
        .find({"date" : {$regex : ".*"+a+".*"}})
        .exec()
}

module.exports.stats = a => {
    return Batismo
        .aggregate([{ $addFields: { "anos": { $regexFind: { input: "$date", regex: "(?<=\/)[0-9]{4}(?=-)"} }}}])
        .group({ _id: '$anos.match', batismos: { $sum:  1 }})
        .exec()
}