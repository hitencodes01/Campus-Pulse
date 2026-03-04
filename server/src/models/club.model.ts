import mongoose, { Document, Schema } from "mongoose";

export interface IClub extends Document{
    name : string;
    description : string;
    category : string;
    createdBy : mongoose.Types.ObjectId;
    createdAt : Date;
}

const clubSchema = new Schema<IClub>({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true,
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    category : {
        type : String,
        required : true,
    },
},{timestamps : true})

export const Club = mongoose.model<IClub>('Club',clubSchema)