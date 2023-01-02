

export interface Book {
    id: string;
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: Date;
    averageRating?: number;
    ratingsCount?: number;
    description?: string;
    imageLinks?: {
        smallThumbnail: string;
        thumbnail: string;
    }
    priceInUSD?: number;
}

export interface GoogleBooksVolume {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		publisher: string;
		publishedDate: Date;
		averageRating: number;
		ratingsCount: number;
		description: string;
		imageLinks: {
			smallThumbnail: string;
			thumbnail: string;
		}
	};
	saleInfo: {
		listPrice: {
			amount: number;
		}
	}
}

export interface GoogleBooksResponse {
	items: GoogleBooksVolume[]
}



// convert a response from the Google Books API 
// to an array of our own Book object type

export const serializeGoogleBooksVolume = (volume: GoogleBooksVolume) => {
	
	const {
		title,
		authors,
		publisher,
		publishedDate,
		averageRating,
		ratingsCount,
		description,
		imageLinks,
	} = volume.volumeInfo

	const priceInUSD = volume.saleInfo?.listPrice.amount 

	return {
		id: volume.id,
		title: title,
		authors: authors ? authors : [],
		publisher: publisher ? publisher : "",
		publishedDate: publishedDate ? publishedDate : null,
		averageRating: averageRating ? averageRating : null,
		ratingsCount: ratingsCount ? ratingsCount : null,
		description: description ? description : "",
		imageLinks: imageLinks ? imageLinks : null,
		priceInUSD: priceInUSD ? priceInUSD : null
	} as Book
}