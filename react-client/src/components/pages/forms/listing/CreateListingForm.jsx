import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../partials/InputField';
import { Create } from '../../../../api/listing/listing';
import TagsInputField from '../../../partials/TagInputField';

const CreateListingForm = () =>
{
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});

    const validateForm = () =>
    {
        const errors = {};

        if (!title.trim())
        {
            errors.title = 'Title is required!';
        }
        else if (title.length > 30)
        {
            errors.title = 'Title cannot exceed 30 characters!';
        }

        if (!description.trim())
        {
            errors.description = 'Description is required!';
        }
        else if (description.length > 100)
        {
            errors.description = 'Description cannot exceed 100 characters!';
        }

        if (!contactDetails.trim())
        {
            errors.contactDetails = 'Contact details are required!';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        if (validateForm())
        {
            try
            {
                const requestData = {
                    title: title,
                    description: description,
                    contactDetails: contactDetails,
                    tags: tags,
                    images: images,
                };

                const response = await Create(requestData);

                console.log('Listing created successfully with id:', response);
                navigate('/');
            } catch (error)
            {
                console.error('API request error:', error);

                setErrors({ apiError: 'Listing creation failed. Please try again later!' });
            }
        }
    };

    const onTitleChange = (event) =>
    {
        setTitle(event.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, title: '', apiError: '' }));
    };

    const onDescriptionChange = (event) =>
    {
        setDescription(event.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, description: '', apiError: '' }));
    };

    const onContactDetailsChange = (event) =>
    {
        setContactDetails(event.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, contactDetails: '', apiError: '' }));
    };

    const onImageChange = async (event) =>
    {
        const files = event.target.files;

        const readAsDataURL = (file) =>
        {
            return new Promise((resolve, reject) =>
            {
                const reader = new FileReader();

                reader.onloadend = () =>
                {
                    resolve(reader.result);
                };

                reader.onerror = reject;

                reader.readAsDataURL(file);
            });
        };

        const newImages = [];
        for (let i = 0; i < files.length; i++)
        {
            if (files[i])
            {
                try
                {
                    const base64String = await readAsDataURL(files[i]);
                    newImages.push(base64String);
                } catch (error)
                {
                    console.error("Error reading file:", error);
                }
            }
        }

        setImages(newImages);
    };

    return (
        <section className='w-full max-w-xl mx-auto p-6'>
            <div className='mt-7 bg-white border border-gray-200 rounded'>
                <div className='p-4 sm:p-7 dark:bg-gray-700'>
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800">Create Listing</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='w-full mx-auto p-6'>
                            <div className='grid gap-y-4'>
                                <InputField
                                    id='title'
                                    label='Title'
                                    name='title'
                                    placeholder='Title'
                                    type='text'
                                    required={true}
                                    onChange={onTitleChange}
                                    error={errors.title}
                                />
                                <InputField
                                    id='description'
                                    label='Description'
                                    name='description'
                                    placeholder='Description'
                                    type='text'
                                    required={true}
                                    onChange={onDescriptionChange}
                                    error={errors.description}
                                />
                                <InputField
                                    id='contactDetails'
                                    label='Contact Details'
                                    name='contactDetails'
                                    placeholder='Contact Details'
                                    type='text'
                                    required={true}
                                    onChange={onContactDetailsChange}
                                    error={errors.contactDetails}
                                />
                                <TagsInputField
                                    label='Tags'
                                    placeholder='Press enter or comma to add new tag.'
                                    separators={["Enter", ","]}
                                    removers={["Backspace"]}
                                    onChange={setTags}
                                />
                                <InputField
                                    id='images'
                                    label='Images'
                                    name='images'
                                    type='file'
                                    accept='image/*'
                                    multiple={true}
                                    onChange={onImageChange}
                                />
                                {errors.apiError && (
                                    <p className="text-red-500 mb-4">{errors.apiError}</p>
                                )}
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    Create Listing
                                </button>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </section >
    );
}

export default CreateListingForm;
