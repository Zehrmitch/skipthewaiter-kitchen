import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/solid';
import axios from 'axios';
import ImageUploadButton from '../../Components/ImageUploadButton';

const MenuForm = () => {
	const storeId = sessionStorage.getItem('storeId');
	const [inputFields, setInputFields] = useState([
		{
			_id: '',
			productName: '',
			productPrice: '',
			productImageUrl: '',
			productDescription: '',
			storeId: storeId,
		},
	]);
	const [filesToUpload, setFilesToUpload] = useState(0);
	const [uploadedFiles, setUploadedFiles] = useState(false);
	const [imageUrls, setImageUrls] = useState([]);
	const [loaded, setLoaded] = useState(false);

	if (!loaded) {
		const apiUrl = 'http://localhost:8080/api/product/all/' + storeId;
		axios.get(apiUrl).then((response) => {
			if (response && response.data) {
				setInputFields(response.data);
				setLoaded(true);
			}
		});
	}

	const handleAddFields = (index) => {
		setInputFields([
			...inputFields,
			{
				_id: '-1',
				productName: '',
				productPrice: '',
				productImageUrl: '',
				productDescription: '',
				storeId: storeId,
			},
		]);
	};

	const handleRemoveFields = (index) => {
		const values = [...inputFields];
		values.splice(index, 1);
		setInputFields(values);
	};

	const handleChangeInput = (index, event) => {
		const values = [...inputFields];
		if (event.target.name == 'productPrice') {
			values[index][event.target.name] = event.target.value;
		} else {
			values[index][event.target.name] = event.target.value;
		}

		setInputFields(values);
	};

	const saveMenu = () => {
		const values = [...inputFields];
		values.forEach((menuItem) => {
			if (menuItem._id == '-1') {
				delete menuItem._id;
				axios.post('http://localhost:8080/api/product', menuItem);
			}
		});
	};

	const uploadImages = async (files, i) => {
		setFilesToUpload(files.length);
		setUploadedFiles(false);

		await Promise.all(
			files.map(async (file) => {
				var fileName = file.name;
				var fileType = file.type;
				console.log(file);

				try {
					axios
						.post('http://localhost:8080/sign_s3', {
							fileName: fileName,
							fileType: fileType,
						})
						.then((response) => {
							var returnData = response.data.data.returnData;
							var signedRequest = returnData.signedRequest;

							setImageUrls([...imageUrls, returnData.url]);

							const values = [...inputFields];
							values[i].productImageUrl = returnData.url;
							console.log(values[i].productImageUrl);
							setInputFields(values);

							// Put the fileType in the headers for the upload
							var options = {
								headers: {
									'Content-Type': fileType,
								},
							};

							axios
								.put(signedRequest, file, options)
								.then((result) => {
									console.log('Response from s3');
								})
								.catch((error) => {
									console.log(error);
								});
						});
				} catch (error) {
					console.log(error);
				}
			})
		);

		setFilesToUpload(0);
		setUploadedFiles(true);
	};

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='bg-white p-8 rounded shadow-2xl lg:w-1/2'>
				<form>
					{inputFields.map((inputField, index) => (
						<div key={index}>
							<>
								<h2 className='text-3xl font-bold mb-4'>
									Menu Item {index + 1}
								</h2>
								<div
									className='grid mb-6 grid-cols-4 gap-4 grid-rows-1'
									key={index}
								>
									<div className='col-span-3'>
										<div className='w-full px-3 mb-6 md:mb-0'>
											<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
												Product Name
											</label>
											<input
												name='productName'
												className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												value={inputField.productName}
												id='grid-itemName'
												type='text'
												required
												onChange={(event) =>
													handleChangeInput(
														index,
														event
													)
												}
											/>
										</div>
										<div className='w-full px-3 mb-6 md:mb-0'>
											<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
												Product Price
											</label>
											<input
												name='productPrice'
												className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												value={inputField.productPrice}
												id='grid-productPrice'
												type='text'
												required
												onChange={(event) =>
													handleChangeInput(
														index,
														event
													)
												}
											/>
										</div>
										<div className='w-full px-3 mb-6 md:mb-0'>
											<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
												Product Description
											</label>
											<input
												key={index}
												name='productDescription'
												className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
												value={
													inputField.productDescription
												}
												id='grid-productDescription'
												type='text'
												required
												onChange={(event) =>
													handleChangeInput(
														index,
														event
													)
												}
											/>
										</div>
									</div>
									<div className='col-start-4 mt-auto'>
										<ImageUploadButton
											uploadImages={uploadImages}
											filesToUpload={filesToUpload}
											i={index}
										/>
										<div className='flex justify-center '>
											<PlusIcon
												onClick={(event) =>
													handleAddFields(index + 1)
												}
												className='text-[#68C9BA] hover:text-red-500 mr-2 h-5 w-auto justify-start cursor-pointer'
											/>
											<MinusIcon
												style={{
													display:
														inputFields.length > 1
															? 'block'
															: 'none',
												}}
												onClick={(event) =>
													handleRemoveFields(index)
												}
												className='text-[#68C9BA] hover:text-red-500 mr-2 h-5 w-auto justify-end cursor-pointer'
											/>
										</div>
									</div>
								</div>
							</>
						</div>
					))}
				</form>
				<button
					onClick={saveMenu}
					className='rounded-lg bg-[#F7BA20] hover:bg-[#68C9BA] py-2 px-2'
				>
					Save Menu
				</button>
			</div>
		</div>
	);
};

export default MenuForm;
