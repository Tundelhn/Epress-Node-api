const router = require('express').Router();
const members = require('../../Members');
const uuid = require('uuid');

//this route get all members
router.get('/', (req, res) => {
  res.json(members);
});

router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `no member with tthe id of ${req.params.id}` });
  }
});

router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: 'member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newMember = {
    id: uuid.v4(),
    name,
    email,
    status: 'active'
  };
  if (!newMember.name || !newMember.email) {
    return res.json({ msg: 'PLEASE INCLUDE A NAME AND EMaiL' });
  }
  members.push(newMember);
  //res.status(200).json({ members });
  res.redirect('/');
});

//update database
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json({ msg: 'member was updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `no member with the id of ${req.params.id}` });
  }
});

module.exports = router;
