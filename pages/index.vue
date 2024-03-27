<script setup lang="ts">
  import { useForm, useField } from 'vee-validate';
  import { usePageStatusStore } from '~/store/page-status';
  import axios from 'axios';

  definePageMeta({
    title: 'Upload',
    description: 'Upload your image in this page.'
  });

  const status = usePageStatusStore();
  let url = useState('url', () => '');

  const MAX_FILE_SIZE = 5000000;
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const { handleSubmit, errors, setErrors, isSubmitting } = useForm();
  const { value: context } = useField('context');
  const { value: filename } = useField('filename');
  const { value: image } = useField('image');
  const onFileChange = (e: Event) =>
  {
    const target = e.target as HTMLInputElement;
    if(target.files)
    {
      const file = target.files[0];
      if (!file) return;
      image.value = file;
    }
  }

  const onSubmit = handleSubmit( async (value, { resetForm }) =>
  {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(value);

    if(value.context === undefined)
    {
      setErrors({
        context: ["The context field is required."]
      });
      return;
    }

    if(value.filename === undefined)
    {
      setErrors({
        filename: ["The filename field is required."]
      });
      return;
    }

    if(value.image === undefined)
    {
      setErrors({
        image: ["The image field is required."]
      });
      return;
    }

    if(!ACCEPTED_IMAGE_TYPES.includes(value.image.type))
    {
      setErrors({
        image: ["The file type is not supported."]
      });
      return;
    }

    if(value.image.size > MAX_FILE_SIZE)
    {
      setErrors({
        image: ["The file size is too large."]
      });
      return;
    }

    const formData = new FormData();
    formData.append('context', value.context);
    formData.append('filename', value.filename);
    formData.append('file', value.image);
    try
    {
      const { data } = await axios.post('http://localhost:8080/images/upload', formData);
      url.value = data.url;
      status.setSucess();
    }
    catch(error)
    {
      console.log(error);
    }
  });

</script>

<template>
  <Card v-if="status.value === 'uploading'" title="Upload" description="Upload your image here" class="w-[320px]">
    <form class="space-y-4" @submit="onSubmit">
      <div class="flex flex-col gap-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="context"
        >
          Context
        </label>
        <input
          v-model="context"
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="context"
          name="context"
          placeholder="Context"
        />
        <span class="text-sm font-medium leading-none text-red-500">{{ errors.context }}</span>
      </div>
      <div class="flex flex-col gap-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="filename"
        >
          Filename
        </label>
        <input
          v-model="filename"
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          id="filename"
          name="filename"
          placeholder="Filename"
        />
        <span class="text-sm font-medium leading-none text-red-500">{{ errors.filename }}</span>
      </div>
      <div class="flex flex-col gap-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          for="image"
        >
          Image
        </label>
        <input
          @change="onFileChange"
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          type="file"
          id="image"
          name="image"
        />
        <span class="text-sm font-medium leading-none text-red-500">{{ errors.image }}</span>
      </div>
      <Button type="submit" :disabled="isSubmitting">{{ !isSubmitting ? "Upload" : "Loading ..." }}</Button>
    </form>
  </Card>

  <Card v-else class="w-[320px] text-center" title="Upload Success" description="Your image has been uploaded successfully">
    <div class="flex flex-col gap-2">
        <label
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Image
        </label>
        <img :src="url" class="object-cover rounded-md" />
        <span class="text-sm font-medium leading-none text-red-500">{{ errors.image }}</span>
      </div>
  </Card>
</template>~/store/page-status