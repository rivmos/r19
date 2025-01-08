import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
    name: string;
    filename: string;
    parentId?: string; // Optional, null for files in the root
    url: string;       // Location of the file (local path or cloud URL)
    size: number;      // File size in bytes
    mimetype: string;  // MIME type (e.g., image/png)
    createdAt: Date;
    updatedAt: Date;
}

const FileSchema: Schema = new Schema<IFile>(
    {
        name: { type: String, required: true },
        filename: { type: String, required: true },
        parentId: { type: String, default: null },
        url: { type: String, required: true },
        size: { type: Number, required: true },
        mimetype: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

FileSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export default mongoose.model<IFile>('File', FileSchema);
