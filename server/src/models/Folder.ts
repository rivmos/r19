import mongoose from "mongoose";
const { Schema, Document } = mongoose;

export interface IFolder extends Document {
    name: string;
    parentId?: string;
    subFolders?: IFolder[];
    createdAt: Date;
    updatedAt: Date;
}

const FolderSchema = new Schema<IFolder>({
    name: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
    subFolders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true })


FolderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.model<IFolder>('Folder', FolderSchema)