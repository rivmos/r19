export type IView = 'grid' | 'list';

export type IFolder = {
    id?: string;
    name: string;
    parentId?: string;
    subFolders?: IFolder[];
    createdAt?: Date;
    updatedAt?: Date;
}
