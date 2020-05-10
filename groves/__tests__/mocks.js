module.exports.specie = assign => {

    return {
        _id: '507f191e810c19729de860ea',
        name: 'Abies alba',
        description: 'The leaves are rigid, needle-like and short, only 1.2-3 cm long.',
        ...assign
    }
}

module.exports.species = assign => {

    return [
        {
            name: 'False-acacia',
            description: 'The pinnate leaves, with 3-9 pairs of leaflets and a terminal one, are arranged alternately.'
        },
        {
            name: 'Osier',
            description: 'The leaves are alternate, closely packed and drooping.'
        },
        {
            name: 'Hedera helix',
            description: 'The nearly hairless, alternate leaves, 4 - 10 cm long, are of two kinds.'
        },
        {
            name: 'Sycamore',
            description: 'The leaves are opposite, 7-16 cm long, with 5 coarsely-toothed lobes.'
        },
        {
            name: 'Ligustrum vulgare',
            description: 'The opposite leaves are long, oval, pointed and leathery.'
        },
        {
            name: 'Lime',
            description: 'The alternate leaves, which are heart-shaped with a drawn-out pointed tip, are 5-10 cm long.'
        },
        {
            name: 'Whin',
            description: 'The young plants have trifoliate, clover-like leaves on most bushes but these are later replaced by rigid, deeply furrowed spines, 15-25 mm long, with some hairs, especially near the base.'
        },
        {
            name: 'May',
            description: 'The leaves are 15-30 mm long and divided into 5 to 7 lobes,  which  reach almost to the midrib and are largest at the base.'
        }
    ]
}
