import { useAppDispatch, useAppSelector } from '@/store'
import { setIsCreatingNotebook } from '@/store/slices/app.setting'
import { explorerSelectors, uploadFile } from '@/store/slices/explorerSlice'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const notebookSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Title Required'),
    content: Yup.string()
        .required('Content Required')
})


const NotebookCreator = () => {

    const dispatch = useAppDispatch();

    const currentFolder = useAppSelector(explorerSelectors.useCurrentFolder);

    return (
        <Formik
            initialValues={{
                title: 'title',
                content: 'notebook'
            }}
            validationSchema={notebookSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                const file = new File([values.content], `${values.title}.txt`, { type: 'text/plain' });
                await dispatch(uploadFile({ parentId: currentFolder, files: [file] }));
                dispatch(setIsCreatingNotebook(false));
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm, isValid }) => {

                return (
                    <Form className='flex flex-col'>

                        {JSON.stringify(values)}

                        <Field
                            type="text"
                            autoComplete="off"
                            name="title"
                            placeholder="Title"
                        />

                        <Field
                            type="textarea"
                            // type="text"
                            autoComplete="off"
                            name="content"
                            placeholder="Content"
                        />

                        <button type="submit">
                            Upload Notebook
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default NotebookCreator