export const Reviews = [
  {
    id: '1',
    userId: '2',
    itemId: '1',
    rating: 4.5,
    comment: 'very cool item review',
    //upvottes and downvotes shold be sets not arrays
    upvotes: new Set(['2', '3', '5']),
    downvotes: new Set(['4', '9']),
    date: ''
  },
  {
    id: '2',
    userId: '1',
    itemId: '1',
    rating: 4.5,
    comment: 'very cool item review 2',
    //upvottes and downvotes shold be sets not arrays
    upvotes: new Set(['2', '3', '5']),
    downvotes: new Set(['4', '9']),
    date: ''
  }
]