import classNames from 'classnames';
import { Field, Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { PiFolderSimpleFill } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsCreatingFolder, explorerSelectors, createOrUpdateFolder } from '@/store/slices/explorerSlice';

const NewFolder = () => {

    const dispatch = useAppDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const currentFolder = useAppSelector(explorerSelectors.useCurrentFolder)
    const view = useAppSelector(state => state.appSetting.view)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

    }, [])

    const iconConfig = {
        size: view === 'grid' ? 36 : 12
    }


    return (
        <div className={classNames("flex items-center select-none cursor-pointer hover:bg-indigo-50 p-1 border-b", { 'flex-col w-16 items-start justify-center border-b-0 gap-0 rounded-md': view === 'grid' })}>
            <PiFolderSimpleFill size={iconConfig.size} className="text-indigo-500" />
            <Formik
                initialValues={{
                    name: ''
                }}
                onSubmit={async (values, { resetForm }) => {
                    if (!values.name) {
                        dispatch(setIsCreatingFolder(false));
                        return;
                    }
                    dispatch(createOrUpdateFolder({ ...values, parentId: currentFolder }))
                    resetForm();
                }}
            >
                {
                    (props) => (
                        <Form className='flex'>
                            <Field id="name" name="name" onBlur={props.submitForm} ref={inputRef} placeholder="" className="w-12 h-4 !p-1 bg-indigo-400 text-white rounded-md focus:border-0 focus:ring-0 focus:outline-none text-xs" autoComplete="off" />
                            <button type="submit" className='hidden'>Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default NewFolder