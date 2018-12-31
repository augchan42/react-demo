export default {
  cursorItem: 1,
  annotations: [],
  items: [
    {
      id: 1,
      title: 'David Dalton',
      groupTitle: '1',
      label: 'David Dalton',
      description: '1, Chief Executive Officer (CEO)',
      phone: '352-206-7599',
      email: 'davidalt@name.com',
      image: '/photos/q.png',
      itemTitleColor: '#4169e1'
    },
    {
      id: 2,
      parents: [1],
      title: 'Steven Lacombe',
      groupTitle: '2',
      label: 'Steven Lacombe',
      description: '2, GM, Platform Strategy',
      phone: '805-800-7397',
      email: 'stevlaco@name.com',
      image: '/photos/a.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 3,
      parents: [1],
      title: 'Nancy Smith',
      label: 'Nancy Smith',
      description: '3, GM, Strategic Marketing and Communications',
      phone: '631-787-3495',
      email: 'nancsmit@name.com',
      image: '/photos/s.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 4,
      parents: [2, 3],
      title: 'Ann Smith',
      label: 'Nancy Smith',
      description: '4, GM, Strategic Marketing and Communications',
      phone: '631-787-3495',
      email: 'nancsmit@name.com',
      image: '/photos/s.png',
      itemTitleColor: '#4b0082'
    }
  ]
};
