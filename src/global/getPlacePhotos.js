const { apiKey } = require("./apiKey");

export async function getPlacePhotos(placeId) {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch place photos');
        }

        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error('Place details request failed');
        }

        const photos = data.result.photos || [];
        return photos.map((photo) => {
            return {
                photoReference: photo.photo_reference,
                width: photo.width,
                height: photo.height,
                url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photo.width}&photoreference=${photo.photo_reference}&key=${apiKey}`,
            };
        });
    } catch (error) {
        console.log('Error fetching place photos:', error);
        return [];
    }
}
