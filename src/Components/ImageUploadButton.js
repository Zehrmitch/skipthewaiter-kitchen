import React, { useState, useRef } from 'react';
import ImageUploadPreview from './ImageUploadPreview';

const ImageUploadButton = (props) => {
	const { uploadImages, filesToUpload, i } = props;
	const [showModal, setShowModal] = useState(false);
	const hiddenInput = useRef(null);
	const [files, setFiles] = useState([]);

	const handleChooseFileClick = (e) => {
		e.preventDefault();
		hiddenInput.current.click();
	};

	const handleFileChange = (e) => {
		let newFiles = [];
		let allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
		// Check upload matches type
		for (var i = 0; i < e.target.files.length; i++) {
			if (allowedTypes.includes(e.target.files[i].type.split('/')[1])) {
				newFiles.push(e.target.files[i]);
			}
		}
		// Spread array files and new files
		setFiles([...files, ...newFiles]);
	};

	const deleteFile = (fileName) => {
		setFiles(
			files.filter((file) => {
				return file.name !== fileName;
			})
		);
	};

	const cancelUpload = () => {
		// Close modal and clear uploads
		setShowModal(false);
		setFiles([]);
	};

	// Upload and reset the files array
	const handleUpload = async () => {
		setShowModal(false);
		uploadImages(files, i);
		setFiles([]);
	};

	const hasFiles = ({ dataTransfer: { types = [] } }) => {
		return types.indexOf('Files') > -1;
	};

	const dropHandler = (e) => {
		// Check file change
		e.preventDefault();
		let newFiles = [];
		let allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
		for (var i = 0; i < e.dataTransfer.files.length; i++) {
			if (
				allowedTypes.includes(
					e.dataTransfer.files[i].type.split('/')[1]
				)
			) {
				newFiles.push(e.dataTransfer.files[i]);
			}
		}

		setFiles([...files, ...newFiles]);
		console.log(files);
	};

	const dragOverHandler = (e) => {
		if (hasFiles(e)) {
			e.preventDefault();
		}
	};

	const handleClick = (e) => {
		e.preventDefault();
		setShowModal(true);
	};

	return (
		<div>
			{filesToUpload === 0 && (
				<button
					className='hover:bg-[#68C9BA] text-black border-2font-bold py-2 px-4 rounded bg-[#F7BA20] focus:outline-none whitespace-nowrap text-sm'
					onClick={handleClick}
				>
					Upload Image
				</button>
			)}
			{filesToUpload > 0 && (
				<button className='bg-green-500 text-black border-2 border-[#F7BA20] font-bold py-2 px-4 rounded focus:outline-none cursor-not-allowed'>
					<span className='mr-2'></span>
					Uploading
				</button>
			)}
			{showModal && (
				<div>
					<div className='justify-center items-center flex overflow-x-hidden h-3/4 overflow-y-auto fixed inset-x-0 top-20 z-5 bg-opacity-60'>
						<main className='container mx-auto max-w-screen-lg h-full border-2 border-gray-500 rounded-lg'>
							<article
								aria-label='File Upload Modal'
								className='relative h-full flex flex-col bg-white shadow-xl rounded-md'
								onDrop={dropHandler}
								onDragOver={dragOverHandler}
							>
								<section className='h-full overflow-auto p-8 w-full flex flex-col'>
									<header className='border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center'>
										<p className='mb-3 font-semibold text-gray-900 flex flex-wrap justify-center'>
											<span>Drag and drop your</span>
											&nbsp;
											<span>file anywhere or</span>
										</p>
										<input
											ref={hiddenInput}
											onChange={handleFileChange}
											type='file'
											multiple
											className='hidden'
										/>
										<button
											onClick={handleChooseFileClick}
											className='mt-2 rounded-md px-4 py-2 hover:bg-[#68C9BA] bg-[#F7BA20] focus:shadow-outline focus:outline-none'
										>
											Select a file
										</button>
									</header>

									<h1 className='pt-8 pb-3 font-semibold sm:text-lg text-gray-900'>
										To Upload
									</h1>

									<ul className='flex flex-1 flex-wrap -m-1'>
										{!files && (
											<li
												id='empty'
												className='h-full w-full text-center flex flex-coljustify-center items-center'
											>
												<img
													className='mx-auto w-32'
													src='https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png'
													alt='no data'
												/>
												<span className='text-small text-gray-500'>
													No files selected
												</span>
											</li>
										)}
										{files &&
											files.map((file) => {
												return (
													<ImageUploadPreview
														key={file.name}
														file={file}
														deleteFile={deleteFile}
													></ImageUploadPreview>
												);
											})}
									</ul>
								</section>

								<footer className='flex justify-end px-8 pb-8 pt-4'>
									<button
										onClick={handleUpload}
										className='rounded-md px-4 py-2 bg-[#68C9BA] hover:bg-[#F7BA20] text-black focus:shadow-outline focus:outline-none'
									>
										Upload Now
									</button>
									<button
										onClick={cancelUpload}
										className='ml-3 rounded-md px-4 py-2 hover:bg-gray-300 focus:shadow-outline focus:outline-none'
									>
										Cancel
									</button>
								</footer>
							</article>
						</main>
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageUploadButton;
