import React, {useState} from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import { PlusIcon, XIcon } from '@heroicons/react/solid';




const MenuForm = () => {

    const [inputFields, setInputField] = useState([
        { itemName: '', price: '' }
    ])

	return (
            <div class="min-h-screen flex items-center justify-center">

            
                <div class="bg-white p-8 rounded shadow-2xl w-1/2">
                    
                    <h2 class="text-3xl font-bold mb-4">Menu Item</h2>

                    <form class="w-full max-w-lg">
                        { inputFields.map((inputField, index) => (
                        <div>

                                
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        First Name
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                                </div>
                            </div>
                            <PlusIcon className='text-indigo-500 : text-gray-400 group-hover:text-gray-500, -ml-0.5 mr-2 h-5 w-5'/>
                        </div>
                            

                            
               
                             
                        ))}
                    </form>
                </div>
            </div>
	);
};

export default MenuForm;