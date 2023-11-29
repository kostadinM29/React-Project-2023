import { useEffect } from "react";
import { TagsInput } from "react-tag-input-component";


const TagsInputField = ({ id, value, label, placeholder, wrapperClassName, separators, removers, onChange, error }) =>
{
    useEffect(() =>
    {
        // Remove pre-existing style classes from TagsInput
        const containerElements = document.querySelectorAll('.rti--container');
        const inputElements = document.querySelectorAll('.rti--input');

        containerElements.forEach(element =>
        {
            element.classList.remove('rti--container');
        });

        inputElements.forEach(element =>
        {
            element.classList.remove('rti--input');
        });
    }, [])

    return (
        <div className={wrapperClassName}>
            {label &&
                (
                    <label htmlFor={id} className='block text-sm mb-2 dark:text-white'>
                        {label}
                    </label>
                )}
            <div className='relative'>
                <TagsInput
                    placeHolder={placeholder}
                    onChange={onChange}
                    value={value}
                    separators={separators}
                    removers={removers}
                    classNames={{
                        tag: 'border-2 rounded p-1 m-0.5 text-sm border-gray-200 dark:bg-slate-600 dark:text-gray-400',
                        input: `py-3 px-4 pr-7 block w-full border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ${error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-200 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-700'
                            } disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:text-gray-400 dark:focus:ring-gray-600`
                    }}
                />
            </div>
        </div>
    );
};

export default TagsInputField;