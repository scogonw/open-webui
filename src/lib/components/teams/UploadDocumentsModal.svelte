<script lang="ts">
	import { flyAndScale } from '$lib/utils/transitions';
	import Modal from '../common/Modal.svelte';
	import Check from '../icons/Check.svelte';
	import Cross from '../icons/Cross.svelte';
	import { Checkbox, Combobox, Select } from 'bits-ui';
	import FileUpload from '../icons/FileUpload.svelte';
	import Pdf from '../icons/Pdf.svelte';
	import FileCross from '../icons/FileCross.svelte';
	import Tooltip from '../common/Tooltip.svelte';

	export let show = false;
</script>

<Modal size="w-[32rem]" bind:show>
	<div class="relative">
		<button
			class="absolute top-4 right-1 hover:cursor-pointer"
			on:click={() => {
				show = false;
			}}
		>
			<Cross />
		</button>
		<div
			class="flex flex-col p-5 gap-3 bg-white dark:bg-gray-850 rounded-lg shadow-lg dark:text-white"
		>
			<h1 class="text-lg font-medium dark:text-white">File Upload</h1>
			<p class="text-[#007AFF]">Uploaded documents (10)</p>
			<div class="w-full h-52 p-4 dashed rounded flex flex-col justify-evenly items-center">
				<FileUpload className="size-12" />
				<h1>Drag your file(s) to start uploading</h1>
				<h2><span class="bg-white dark:bg-gray-850 dark:text-white">OR</span></h2>
				<button
					class="border-2 border-[#1849D6] text-[#1849D6] font-semibold py-1 px-2 rounded-lg hover:bg-[#1849D6] hover:text-white transition"
					on:click={()=>{
                        const fileExplorer = document.getElementById("file-upload");
                        fileExplorer.click();
                    }}
                    >Browse Files</button
				>
                <input type="file" name="file-upload" id="file-upload" hidden>
			</div>
			<h1 class="text-[#6D6D6D]">Only supports .pdf .doc and .csv files</h1>
			<div class="w-full h-36">
				<div class="w-full h-16 border-2 border-[#E7E7E7] dark:border-gray-700 rounded-2xl p-3 flex gap-2">
					<div><Pdf className="size-8" /></div>
					<div class="flex-grow">
						<p class="text-sm leading-4 font-semibold">assets.pdf</p>
						<p class="text-sm text-[#6D6D6D]">5.3 MB</p>
					</div>
					<div class="m-auto cursor-pointer hover:scale-110 transition duration-300">
                        <Tooltip content="Remove">
                            <FileCross className="size-6"/>
                        </Tooltip>
                    </div>
				</div>
			</div>
			<div class="flex gap-4 justify-end">
				<button
					class="border border-[#CECECE] px-3 py-2 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
					on:click={()=>{
                        show=false;
                    }}
                    >Cancel</button
				>
				<button class="bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800">Upload</button>
			</div>
		</div>
	</div>
</Modal>

<style>
	.dashed {
		/* dashed border */
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%231849D6FF' stroke-width='3' stroke-dasharray='4%2c 10' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e");
		border-radius: 10px;
	}
	h2 {
		width: 40%;
		text-align: center;
		border-bottom: 1px solid #e7e7e7;
		line-height: 0.1em;
		margin: 10px 0 20px;
		color: #6d6d6d;
		font-weight: 400;
	}

	h2 span {
		padding: 0 10px;
	}
</style>
