export default function makePhotoUrl(photo, size) {
    return photo ? `${photo.prefix}${size}${photo.suffix}` : null;
}
