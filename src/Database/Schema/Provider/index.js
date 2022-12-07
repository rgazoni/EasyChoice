const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new Schema({
    display_priority: Number,
    logo_path: String,
    provider_name: String,
    provider_id: Number
});

const Provider = mongoose.model('Provider', providerSchema, 'providers');
//Provider.createCollection();

module.exports = {
    Provider: Provider
};