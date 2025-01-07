import { CiCircleChevRight } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCurrentFolder } from "@/store/slices/doc.data";
import { IFolder } from "@/@types/explorer";
import { PiFolderSimpleFill } from "react-icons/pi";


const History = () => {
    
    const dispatch = useAppDispatch()
    const history = useAppSelector(state => state.docData.history);

    const handleClick = (item:IFolder) => {
        dispatch(setCurrentFolder(item));
    }
    
    return (
        <div className="flex items-center bg-gray-50 w-full h-6 px-2 space-x-1 border-b select-none">
            {
                history.map(item => {
                    return (
                        <span onClick={() => handleClick(item)} key={item.id} className="text-sm text-gray-500 font-medium space-x-1 flex items-center cursor-pointer">
                            <CiCircleChevRight className="inline-block h-4 w-4 text-gray-400" />
                            <PiFolderSimpleFill size={12} className="text-indigo-500" />
                            <span>{item.name}</span>
                        </span>
                    )
                })
            }


        </div>
    );
};

export default History;