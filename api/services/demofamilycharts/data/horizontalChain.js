const primitives = require('basicprimitives');

export default {
  cursorItem: 2,
  annotations: [
    {
      annotationType: primitives.common.AnnotationType.Connector,
      fromItem: 8,
      toItem: 10,
      label: "<div class='bp-badge' style='width:16px; height:16px;background-color:red; color: white;'>1</div>Connector annotation",
      labelSize: { width: 80, height: 30 }, // new primitives.common.Size(80, 30)
      connectorShapeType: primitives.common.ConnectorShapeType.OneWay,
      color: primitives.common.Colors.Red,
      offset: 5,
      lineWidth: 2,
      lineType: primitives.common.LineType.Dashed
    }
  ],
  items: [
    {
      id: 1,
      title: 'James Holt',
      label: 'James Holt',
      description: '1, Sr. VP, Server & Tools Division',
      phone: '262-215-7998',
      email: 'jameholt@name.com',
      image: '/photos/e.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 2,
      title: 'Brad Whitt',
      label: 'Brad Whitt',
      description: '2, GM, Application Platform and Development Marketing',
      phone: '502-528-6379',
      email: 'bradwhit@name.com',
      image: '/photos/f.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 3,
      title: 'Thomas Williams',
      label: 'Thomas Williams',
      description: '3, VP, Server & Tools Marketing and Solutions',
      phone: '904-547-5342',
      email: 'thomwill@name.com',
      image: '/photos/r.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 4,
      title: 'David Kirby',
      label: 'David Kirby',
      description: '4, AGM, Infrastructure Server and IT Pro Audience Marketing',
      phone: '614-395-7238',
      email: 'davikirb@name.com',
      image: '/photos/t.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 5,
      parents: [1, 2],
      title: 'Lynette Maloney',
      label: 'Lynette Maloney',
      description: '5, GM, Name.com Experience Platforms and Solutions',
      phone: '540-822-3862',
      email: 'lynemalo@name.com',
      image: '/photos/y.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 6,
      parents: [1, 2],
      title: 'Sara Kemp',
      label: 'Sara Kemp',
      description: '6, VP, Software & Enterprise Management Division',
      phone: '918-257-4218',
      email: 'sarakemp@name.com',
      image: '/photos/g.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 7,
      parents: [1, 2, 3],
      title: 'Glen Zeigler',
      label: 'Glen Zeigler',
      description: '7, GM, Core Infrastructure Solutions',
      phone: '920-665-7222',
      email: 'glenzeig@name.com',
      image: '/photos/u.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 8,
      parents: [2, 3, 4],
      title: 'Ione Gallegos',
      label: 'Ione Gallegos',
      description: '8, GM, Patterns & Practices',
      phone: '478-322-5539',
      email: 'ionegall@name.com',
      image: '/photos/i.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 9,
      parents: [3, 4],
      title: 'Heather Simmons',
      label: 'Heather Simmons',
      description: '9, GM, Name Learning',
      phone: '620-368-3620',
      email: 'heatsimm@name.com',
      image: '/photos/p.png',
      itemTitleColor: '#4b0082'
    },
    {
      id: 10,
      parents: [3, 4],
      title: 'Steven Lacombe',
      label: 'Steven Lacombe',
      description: '10, GM, Platform Strategy',
      phone: '805-800-7397',
      email: 'stevlaco@name.com',
      image: '/photos/a.png',
      itemTitleColor: '#4b0082'
    }
  ]
};