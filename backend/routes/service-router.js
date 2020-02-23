var express = require('express');
var router = express.Router();
var Service = require('../model/Service');
var Calendar = require('../model/Calendar');
var Avilablity = require('../model/Avilablity');



/* ======================================================= */
/*                       SERVICE                           */
/* ======================================================= */

router.post('/addService', (req, res, next) => {

  const service = new Service(req.body);
  service.save()
    .then((service) => {
      if (service) {
        res.status(200).json({ message: 'Added successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/dupService', (req, res, next) => {

  const service = new Service(req.body);
  service.save()
    .then((service) => {
      if (service) {
        res.status(200).json({ message: 'Duplicated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/updateService', (req, res, next) => {

  var id = req.body._id;
  delete req.body['_id'];
  // let key = Object.keys(req.body)
  // console.log(key);
  Service.findByIdAndUpdate({ _id: id }, req.body)
    .then((service) => {
      if (service) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});

router.post('/allServiceOfUser', (req, res, next) => {
  Service.find(req.body)
    .then((service) => {
      if (service) {
        res.status(200).json(service)
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});
router.get('/:id', (req, res, next) => {

    Service.find({_id:req.params.id})
    .then((service) => {
      if (service) {
        res.status(200).json(service[0])
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.post('/deleteService', (req, res, next) => {
  Service.findByIdAndRemove({ _id: req.body.id })
    .then((service) => {
      if (service) {
        res.status(200).json({ message: 'Deleted successfully', con: 'Deleted!', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'Unable to delete', con: 'Failed!', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});



/* ======================================================= */
/*                       CALENDAR                          */
/* ======================================================= */
router.post('/addCalendar', (req, res, next) => {

  const calendar = new Calendar(req.body);
  calendar.save()
    .then((calendar) => {
      if (calendar) {
        res.status(200).json({ message: 'Added successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});
router.post('/dupCalendar', (req, res, next) => {

  const calendar = new Calendar(req.body);
  calendar.save()
    .then((calendar) => {
      if (calendar) {
        res.status(200).json({ message: 'Duplicated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Add', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});
router.post('/updateCalendar', (req, res, next) => {

  var id = req.body._id;
  //  delete req.body['_id'];

  Calendar.findByIdAndUpdate({ _id: id }, req.body)
    .then((calendar) => {
      if (calendar) {
        res.status(200).json({ message: 'Updated successfully', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'unable to Update', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })

});

router.post('/allCalendarOfUser', (req, res, next) => {
  Calendar.find(req.body)
    .populate('service', 'name')
    .then((calendar) => {
      if (calendar) {

        res.status(200).json(calendar)
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});
router.post('/deleteCalendar', (req, res, next) => {
  Calendar.findByIdAndRemove({ _id: req.body.id })
    .then((calendar) => {
      if (calendar) {
        res.status(200).json({ message: 'Deleted successfully', con: 'Deleted!', type: 'success' })
      }
      else {
        res.status(201).json({ message: 'Unable to delete', con: 'Failed!', type: 'error' })
      }
    }).catch(err => {
      res.json(err)
    })
});


/* ======================================================= */
/*                       AVILABLITY                       */
/* ======================================================= */

router.post('/updateAvilablity', (req, res, next) => {
  let message = '';
  let i = 1;
  for (let key in req.body) { i++;
   Avilablity.findOne({date:req.body[key].date}) 
  .then((avl) => {
    if (avl) {
      Avilablity.findByIdAndUpdate({ _id: avl._id },req.body[key])
      .then((av) => {
        if (av) {
          message='updated successfully';
        }
      }).catch(err => {
        res.json(err)
      })
    }
    else {
   const newAvilablity =  new Avilablity(req.body[key])
   newAvilablity.bookingSlot.push({time:req.body[key].title}) 
   newAvilablity.bookingSlot.push({time:req.body[key].title}) 
   newAvilablity.bookingSlot.push({time:req.body[key].title}) 
   newAvilablity.save()
      .then((avl) => {
        if (avl) {
          message='Added successfully';
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }).catch(err => {
    console.log(err)
  })  
}
res.status(200).json( { message:'success', type: 'success' })
});


router.post('/allAvilablity', (req, res, next) => {

  Avilablity.find(req.body)
    .then((avl) => {
      if (avl) {
        res.status(200).json(avl)
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});

router.post('/allAvilablityforBooking', (req, res, next) => {
  console.log(req.body)
  Avilablity.find(req.body ,{date:1, title:1, bookingSlot:1, orgin:1, _id:0})
    .then((avl) => {
      if (avl) {
        res.status(200).json(avl)
      }
      else {
        res.status(201).json({ message: 'No data found' })
      }
    }).catch(err => {
      res.json(err)
    })
});

module.exports = router;
