const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

type UploadResult = {
    url: string;
    publicId: string;
};

export async function uploadToCloudinary(
    file: File,
    mediaType: 'image' | 'video' | 'gif'
): Promise<UploadResult> {
    const resourceType = mediaType === 'video' ? 'video' : 'image';
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const res = await fetch(url, { method: 'POST', body: formData });

    if (!res.ok) throw new Error('Cloudinary upload failed');

    const data = await res.json();

    return { url: data.secure_url, publicId: data.public_id };
}