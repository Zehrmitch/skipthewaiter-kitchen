import React, {useState} from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';




const MenuForm = () => {

    const [inputFields, setInputFields] = useState([
        { productName: '', productPrice:'', productDescription: ''}
    ]);

    const handleAddFields = (index) => {
        setInputFields([...inputFields, { itemName: '' , price: '', productDescription: ''}])
    }

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index][event.target.name] = event.target.value
        setInputFields(values);
    }

    const saveMenu = () => {

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
                                        Product Name
                                    </label>
                                    <input name="productName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" value={inputField.itemName} id="grid-first-name" type="text" onChange={event => handleChangeInput(index, event)} />
                                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Product Price
                                    </label>
                                    <input name="productPrice" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" value={inputField.productPrice} id="grid-productPrice" type="text" onChange={event => handleChangeInput(index, event)} />
                                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Product Description
                                    </label>
                                    <input name="productDescription" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" value={inputField.productDescription} id="grid-productDescription" type="text" onChange={event => handleChangeInput(index, event)} />
                                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                                <PlusIcon onClick={(event) => handleAddFields(index+1)} className='text-indigo-500 : text-gray-400 group-hover:text-gray-500, -ml-0.5 mr-2 h-5 w-5'/>
                                <MinusIcon style={{display: inputFields.length>1 ? 'block': 'none' }} onClick={(event) => handleRemoveFields(index)} className='text-indigo-500 : text-gray-400 group-hover:text-gray-500, -ml-0.5 mr-2 h-5 w-5'/>
                            </div>     
                        ))}
                    </form>
                    <button onClick={saveMenu}>Save</button>
                </div>
            </div>
	);
};

export default MenuForm;