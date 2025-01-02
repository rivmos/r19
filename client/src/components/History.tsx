import { useAppSelector } from "@/store";
import { CiCircleChevRight } from "react-icons/ci";

const History = () => {
    
    const currentFolder = useAppSelector(state => state.docData.currentFolder);

    return (
        <div className="fixed bottom-0 flex items-center bg-gray-50 w-full h-6 px-4 border-b select-none">
            {!currentFolder ? (
                <span className="text-sm text-gray-500 font-medium">
                    root
                    <CiCircleChevRight className="inline-block h-4 w-4 ml-1 text-gray-400" />
                </span>
            ) : (
                <span className="text-sm text-gray-500 font-medium">
                    <CiCircleChevRight className="inline-block h-4 w-4 mx-1 text-gray-400" />
                    {currentFolder}
                </span>
            )}
        </div>
    );
};

export default History;