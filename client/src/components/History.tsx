import { CiCircleChevRight } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCurrentFolder, setHistory } from "@/store/slices/doc.data";


const History = () => {
    
    const dispatch = useAppDispatch()
    const history = useAppSelector(state => state.docData.history);

    const handleClick = (item:string | null) => {
        dispatch(setCurrentFolder(item));
    }
    
    return (
        <div className="flex items-center bg-gray-50 w-full h-6 px-2 space-x-1 border-b select-none">

            <span onClick={() => handleClick(null)} className="text-sm text-gray-500 font-medium space-x-1 flex items-center cursor-pointer">
                <span>root</span>
            </span>

            {
                history.map(item => {
                    return (
                        <span onClick={() => handleClick(item)} key={item} className="text-sm text-gray-500 font-medium space-x-1 flex items-center cursor-pointer">
                            <CiCircleChevRight className="inline-block h-4 w-4 text-gray-400" />
                            <span>{item}</span>
                        </span>
                    )
                })
            }


        </div>
    );
};

export default History;