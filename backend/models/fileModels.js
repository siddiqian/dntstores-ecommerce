import mongoose from 'mongoose'


const fileSchema = new mongoose.Schema({
    meta_data:{}
})

const fileModel = mongoose.model("file",fileSchema);

export default fileModel;