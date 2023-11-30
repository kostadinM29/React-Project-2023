import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputField from '../../../partials/InputField';
import TagsInputField from '../../../partials/TagInputField';
import { Create, Edit, GetOneById } from '../../../../api/listing/listing';
import { ROUTE_ENDPOINTS } from '../../../../constants/routeEndpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const SaveListingForm = () =>
{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const controller = new AbortController();
    const { signal } = controller;
    const isEditing = Boolean(id);

    useEffect(() =>
    {
        const fetchListing = async () =>
        {
            if (isEditing)
            {
                const response = await GetOneById(id, signal);
                console.log(response)
                const { title, description, contactDetails, tags, images } = response;
                setTitle(title);
                setDescription(description);
                setContactDetails(contactDetails);
                setTags(tags);
                setImages(images);
            }
        };

        fetchListing();

        return () =>
        {
            controller.abort();
        };
    }, [id, isEditing]);

    const validateForm = () =>
    {
        const errors = {};

        if (!title.trim())
        {
            errors.title = 'Title is required!';
        } else if (title.length > 30)
        {
            errors.title = 'Title cannot exceed 30 characters!';
        }

        if (!description.trim())
        {
            errors.description = 'Description is required!';
        } else if (description.length > 200)
        {
            errors.description = 'Description cannot exceed 200 characters!';
        }

        if (!contactDetails.trim())
        {
            errors.contactDetails = 'Contact details are required!';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
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

        const newImages = [...images];
        for (let i = 0; i < files.length; i++)
        {
            if (files[i])
            {
                try
                {
                    const base64String = await readAsDataURL(files[i]);
                    newImages.push(base64String);
                }
                catch (error)
                {
                    console.error("Error reading file:", error);
                }
            }
        }

        setImages(newImages);
    };

    const removeImage = (index) =>
    {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        if (validateForm())
        {
            try
            {
                const requestData = {
                    id: id,
                    title: title,
                    description: description,
                    contactDetails: contactDetails,
                    tags: tags,
                    images: images,
                };

                if (isEditing)
                {
                    const response = await Edit(requestData);
                    console.log('Listing edited successfully:', response);
                }
                else
                {
                    const response = await Create(requestData);
                    console.log('Listing created successfully:', response);
                }

                navigate(`/${ROUTE_ENDPOINTS.LISTINGS_ALL}`);
            }
            catch (error)
            {
                console.error('API request error:', error);
                setErrors({ apiError: 'Listing creation/update failed. Please try again later!' });
            }
        }
    };

    return (
        <section className='w-full max-w-xl mx-auto p-6'>
            <div className='mt-7 bg-white border border-gray-200 rounded'>
                <div className='p-4 sm:p-7 dark:bg-gray-700'>
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800">
                            {isEditing ? 'Edit Listing' : 'Create Listing'}
                        </h1>
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    error={errors.title}
                                />
                                <InputField
                                    id='description'
                                    label='Description'
                                    name='description'
                                    placeholder='Description of the listing.'
                                    type='text'
                                    required={true}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    error={errors.description}
                                />
                                <InputField
                                    id='contactDetails'
                                    label='Contact Details'
                                    name='contactDetails'
                                    placeholder='Add your contact details like phone, email etc.'
                                    type='text'
                                    required={true}
                                    value={contactDetails}
                                    onChange={(e) => setContactDetails(e.target.value)}
                                    error={errors.contactDetails}
                                />
                                <TagsInputField
                                    label='Tags'
                                    placeholder='Press enter or comma to add new tag and backspace to remove it.'
                                    separators={["Enter", ","]}
                                    removers={["Backspace"]}
                                    value={tags}
                                    onChange={setTags}
                                />
                                <InputField
                                    id='images'
                                    label='Images'
                                    name='images'
                                    type='file'
                                    accept='image/*'
                                    multiple={true}
                                    onChange={(e) => onImageChange(e)}
                                />
                                {images.length > 0 &&
                                    (
                                        <div className="flex space-x-2 mb-2">
                                            {images.map((imageUrl, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={imageUrl}
                                                        alt={`Preview ${index}`}
                                                        className="object-cover w-16 h-16 rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-0 right-0 text-red-500 p-1 cursor-pointer"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <FontAwesomeIcon icon={faX} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                {errors.apiError &&
                                    (
                                        <p className="text-red-500 mb-4">{errors.apiError}</p>
                                    )}
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                >
                                    {isEditing
                                        ? 'Update Listing'
                                        : 'Create Listing'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SaveListingForm;