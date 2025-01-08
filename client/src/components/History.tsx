import { CiCircleChevRight } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCurrentFolder } from "@/store/slices/explorerSlice";
import { PiFolderSimpleFill } from "react-icons/pi";
import useResponsive from "@/utils/hooks/useResponsive";


const History = () => {

    const dispatch = useAppDispatch()
    const history = useAppSelector(state => state.explorerSlice.history);

    const handleClick = (item: string | null) => {
        dispatch(setCurrentFolder(item));
    }

    const responsive = useResponsive();

    const responsiveHistory = () => {
        return (responsive.smaller.md && history.length > 2) ? history.slice(history.length - 2, history.length) : history;
    }

    return (
        <div className="flex items-center bg-gray-50 w-full h-6 px-2 border-b select-none overflow-x-auto space-x-1 md:space-x-2">
            {(responsive.smaller.md && history.length > 2) && <span className="text-sm text-gray-500 font-medium flex items-center cursor-pointer space-x-1"><CiCircleChevRight className="inline-block h-4 w-4 text-gray-400" /> ...</span>}
            {responsiveHistory().map((item) => {
                return (
                    <span
                        onClick={() => handleClick(item.id)}
                        key={item.id}
                        className="text-sm text-gray-500 font-medium flex items-center cursor-pointer space-x-1"
                    >
                        <CiCircleChevRight className="inline-block h-4 w-4 text-gray-400" />
                        <PiFolderSimpleFill size={12} className="text-indigo-500" />
                        <span className="truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">
                            {item.name}
                        </span>
                    </span>
                );
            })}
        </div>
    );
};

export default History;