import Card from './Card';

const Listings = () =>
{
    const listings = [
        {
            title: 'Listing 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            images: [
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
            ],
        },
        {
            title: 'Listing 2',
            description: 'Nullam id felis eu tortor pulvinar cursus vel at lacus.',
            images: [
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
            ],
        },
        {
            title: 'Listing 2',
            description: 'Nullam id felis eu tortor pulvinar cursus vel at lacus.',
            images: [
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
            ],
        },
        {
            title: 'Listing 2',
            description: 'Nullam id felis eu tortor pulvinar cursus vel at lacus.',
            images: [
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
            ],
        },
        {
            title: 'Listing 2',
            description: 'Nullam id felis eu tortor pulvinar cursus vel at lacus.',
            images: [
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
            ],
        },
        {
            title: 'Listing 2',
            description: 'Nullam id felis eu tortor pulvinar cursus vel at lacus.',
            images: [
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
            ],
        },
        {
            title: 'Listing 2',
            description: 'Nullam id felis eu tortor pulvinar cursus vel at lacus.',
            images: [
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
            ],
        },
        {
            title: 'Listing 2',
            description: 'Nullam id felis eu tortor pulvinar cursus vel at lacus.',
            images: [
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
                'https://via.placeholder.com/600',
            ],
        },

    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {listings.map((listing, index) => (
                <Card key={index} listing={listing} />
            ))}
        </div>
    );
};

export default Listings;