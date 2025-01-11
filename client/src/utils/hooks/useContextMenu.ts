import { IContextMenu } from '@/@types/explorer';
import { useAppDispatch } from '@/store';
import { setSelected } from '@/store/slices/explorerSlice';
import React, { useEffect, useState } from 'react'

const useContextMenu = () => {

  const dispatch = useAppDispatch()

  const [contextMenu, setContextMenu] = useState<IContextMenu>({
    show: false,
    x: 0,
    y: 0,
    item: null,
  })

  const handleContextMenu = (e: React.MouseEvent, item: IContextMenu['item']) => {
    e.preventDefault();
    setContextMenu({
      x: e.pageX,
      y: e.pageY,
      show: true,
      item: item
    });
    dispatch(setSelected({ isMulti: false, selection: { id: item.id, type:item.type} }))
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

  return { contextMenu, setContextMenu, handleContextMenu }

}

export default useContextMenu