export type IView = 'grid' | 'list';

export type IFolder = {
    id?: string | null;
    name: string;
    parentId?: string;
    subFolders?: IFolder[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type IFile = {
    id?: string,
    name: string;
    parentId: string;
    url: string;
    size: number;
    mimetype: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
  

export type IContextMenu = {
    x: number,
    y: number,
    show: boolean;
    item: {
      id: string | null;
      type: 'folder' | 'file';
    };
}