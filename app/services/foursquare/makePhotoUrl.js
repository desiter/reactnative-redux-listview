export default function makePhotoUrl(photo, size) {
    return `${photo.prefix}${size}${photo.suffix}`;
}
