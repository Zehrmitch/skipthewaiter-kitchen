import React, {useState} from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';




const MenuForm = () => {

    const [inputFields, setInputFields] = useState([
        { itemName: ''}
    ]);

    const handleAddFields = (index) => {
        setInputFields([...inputFields, { itemName: '' }])
        console.log(index)
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        console.log(values);
        values[index].itemName = event.target.value
        setInputFields(values);
    }

	return (
            <div class="min-h-screen flex items-center justify-center">
                <div class="bg-white p-8 rounded shadow-2xl w-1/2">  
                    

                    <form class="w-full max-w-lg">
                        { inputFields.map((inputField, index) => (
                            
                            <div class="flex flex-wrap -mx-3 mb-6" key={index}>
                                <h2 class="text-3xl font-bold mb-4">Menu Item {index + 1}</h2>
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Item Name
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" value={inputField.itemName} id="grid-first-name" type="text" onChange={event => handleChangeInput(index, event)} />
                                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <PlusIcon onClick={(event) => handleAddFields(index+1)} className='text-indigo-500 : text-gray-400 group-hover:text-gray-500, -ml-0.5 mr-2 h-5 w-5'/>
                                <MinusIcon onClick={(event) => handleRemoveFields(index)} className='text-indigo-500 : text-gray-400 group-hover:text-gray-500, -ml-0.5 mr-2 h-5 w-5'/>
                            </div>     
                        ))}
                    </form>
                </div>
            </div>
	);
};

export default MenuForm;