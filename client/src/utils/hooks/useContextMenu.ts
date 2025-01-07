import { IContextMenu } from '@/@types/explorer';
import { useAppDispatch } from '@/store';
import { setSelectedFolder } from '@/store/slices/doc.data';
import React, { useEffect, useState } from 'react'

const useContextMenu = () => {

    const dispatch = useAppDispatch()
  
    const [contextMenu, setContextMenu] = useState<IContextMenu>({
        show: false,
        x: 0,
        y: 0,
        item: {
          id: null,
          type: 'folder'
        },
    })

    const handleContextMenu = (e: React.MouseEvent, item: IContextMenu['item']) => {
        e.preventDefault();
        setContextMenu({
          x: e.pageX,
          y: e.pageY,
          show: true,
          item: item
        });
        // dispatch(setSelectedFolder(item.id))
      };

    useEffect(() => {
        const handleClick = () => {
          setContextMenu(prev => ({ ...prev, show: false }));
        };
    
        document.addEventListener('click', handleClick);
        return () => {
          document.removeEventListener('click', handleClick);
        };
      }, []);

    return { contextMenu, setContextMenu, handleContextMenu}

}

export default useContextMenu