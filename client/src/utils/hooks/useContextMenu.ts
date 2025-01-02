import { useAppDispatch } from '@/store';
import { setSelectedFolder } from '@/store/slices/doc.data';
import React, { useEffect, useState } from 'react'

interface IContextMenu {
    x: number,
    y: number,
    show: boolean;
    itemId: string | null;
}

const useContextMenu = () => {

    const dispatch = useAppDispatch()
  
    const [contextMenu, setContextMenu] = useState<IContextMenu>({
        show: false,
        x: 0,
        y: 0,
        itemId: null
    })

    const handleContextMenu = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setContextMenu({
          x: e.pageX,
          y: e.pageY,
          show: true,
          itemId: id
        });
        dispatch(setSelectedFolder(id))
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