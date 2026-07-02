// Uploads a File to Cloudinary using an UNSIGNED upload preset (no API secret
// needed client-side). Create the preset in Cloudinary: Settings -> Upload ->
// Upload presets -> Add upload preset -> Signing Mode: Unsigned.
//
// Set these in your .env file (Vite reads anything prefixed VITE_):
//   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
//   VITE_CLOUDINARY_UPLOAD_PRESET=your-unsigned-preset-name
//
// If you're on Create React App instead of Vite, swap `import.meta.env.VITE_X`
// for `process.env.REACT_APP_X` (and rename the env vars to that prefix).

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export class CloudinaryConfigError extends Error {}

/**
 * @param {File} file
 * @param {(percent: number) => void} [onProgress]
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export function uploadImageToCloudinary(file, onProgress) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    return Promise.reject(
      new CloudinaryConfigError(
        "Cloudinary isn't configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.",
      ),
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    );

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ url: data.secure_url, publicId: data.public_id });
        } else {
          reject(new Error(data.error?.message || "Upload failed"));
        }
      } catch {
        reject(new Error("Unexpected response from Cloudinary"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}
