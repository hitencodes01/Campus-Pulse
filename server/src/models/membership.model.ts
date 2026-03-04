import mongoose, { Document, Schema } from "mongoose";

export interface IMembership extends Document{
    user : mongoose.Types.ObjectId;
    club : mongoose.Types.ObjectId;
    joinedAt : Date;
}

const membershipSchema = new Schema<IMembership>({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        requied : true
    },
    club : {
        type : Schema.Types.ObjectId,
        ref : 'Club',
        requied : true
    },
},{timestamps : true})

// prevent duplicates joins
membershipSchema.index({user : 1 , club : 1} , {unique : true})

export const Membership = mongoose.model<IMembership>('Membership',membershipSchema)