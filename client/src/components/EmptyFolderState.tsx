import { useAppDispatch } from '@/store';
import { setIsCreatingFolder, setSelectedFolder } from '@/store/slices/doc.data';
import React from 'react';
import { FaFolderOpen, FaUpload, FaPlus } from 'react-icons/fa';

const EmptyFolderState = () => {

    const dispatch = useAppDispatch()

    const handleCreateNewFolder = () => {
        dispatch(setIsCreatingFolder(true));
        dispatch(setSelectedFolder(null));
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center animate-gradient-y">
            <div className="max-w-md w-full h-full backdrop-blur-xl bg-white/80 rounded-2xl p-12 shadow-indigo-100/50 transition-all duration-500 ease-out">
                {/* Floating icon with animation */}
                <div className="mb-8 relative animate-float">
                    {/* Animated background circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 animate-spin-slow">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-75"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-200 rounded-full animate-pulse delay-150"></div>
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-300"></div>
                    </div>

                    <div className="relative w-24 h-24 mx-auto animate-morph bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                            <FaFolderOpen size={44} className="text-indigo-600 animate-bounce-subtle" />
                        </div>
                    </div>
                </div>

                {/* Animated text content */}
                <div className="space-y-3 mb-10">
                    <h3 className="text-2xl font-semibold text-indigo-950 mb-3 tracking-tight animate-fade-in">
                        This folder is empty
                    </h3>
                    <p className="text-indigo-600/70 leading-relaxed animate-fade-in animation-delay-150">
                        Start building your collection by uploading files or creating new folders
                    </p>
                </div>

                {/* Animated buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <button className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 animate-fade-in animation-delay-300">
                        <FaUpload size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Upload Files
                    </button>
                    <button type='button' onClick={handleCreateNewFolder} className="group inline-flex items-center justify-center px-6 py-3 bg-white text-indigo-700 rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-sm hover:shadow border border-indigo-100 hover:border-indigo-200 animate-fade-in animation-delay-450">
                        <FaPlus size={18} className="mr-2 group-hover:rotate-180 transition-transform duration-300" />
                        New Folder
                    </button>
                </div>

                {/* Animated drop zone */}
                <div className="relative group animate-fade-in animation-delay-600">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 rounded-xl blur-xl transform group-hover:scale-105 transition-transform duration-300"></div>
                    <div className="relative border-2 border-dashed border-indigo-100 rounded-xl p-10 bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:border-indigo-200 animate-pulse-slow">
                        <div className="flex flex-col items-center gap-2">
                            <FaUpload size={24} className="text-indigo-400 group-hover:text-indigo-500 transition-colors duration-300 group-hover:translate-y-1 group-hover:scale-110" />
                            <p className="text-sm text-indigo-400 group-hover:text-indigo-600 transition-colors duration-300">
                                Drag and drop your files here
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes gradient-y {
          0% { background-position: 50% 0%; }
          100% { background-position: 50% 100%; }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-morph { animation: morph 8s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-gradient-y { animation: gradient-y 15s ease infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animation-delay-150 { animation-delay: 150ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-450 { animation-delay: 450ms; }
        .animation-delay-600 { animation-delay: 600ms; }

        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default EmptyFolderState;
