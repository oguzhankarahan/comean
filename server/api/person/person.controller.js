'use strict';

var _ = require('lodash');
var Person = require('./person.model');
var Interest = require('../interest/interest.model');
var PersonInterest = require('../personInterest/personInterest.model');
var PersonFriend = require('../personFriend/personFriend.model');
var Language = require('../language/language.model');
var PersonLanguage = require('../personLanguage/personLanguage.model');
/*var Avatar = require('../avatar/avatar.model');
 var PersonAvatar = require('../personAvatar/personAvatar.model');
 var PersonImage = require('../personImage/personImage.model');
 var Language = require('../language/language.model');
 var PersonLanguage = require('../personLanguage/personLanguage.model');
 var Notification = require('../notification/notification.model');
 var PersonNotification = require('../personNotification/personNotification.model');
 var Setting = require = require('../setting/setting.model');
 var PersonSetting = require('../personSetting/personSetting.model');
 var PersonStatus = require('../personStatus/personStatus.model');*/


// Get list of persons
exports.index = function(req, res) {
  Person.find(function (err, persons) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(persons);
  });
};
/*exports.getByFull = function(req, res) {
 Person.find(function (err, persons) {
 if(err) { return handleError(res, err); }
 return res.status(200).json(persons);
 });
 };*/



// Get a single person
exports.show = function(req, res) {
  Person.findById(req.params.id, function (err, person) {
    if(err) { return handleError(res, err); }
    if(!person) { return res.status(404).send('Not Found'); }
    return res.json(person);
  });
};

exports.getPersonFriendByInterestOfset = function (req,res) {
  if (req.params.startIndex && req.params.rowCount) {
    var offsetIndex = parseInt(req.params.startIndex);
    var ofsetCount = parseInt(req.params.rowCount);
    var result = {
      personCount: 0,
      personArray: [],
      interestCountArray: [],
      friendCountArray: [],
      personLanguageArray: []
    };
    var nonPerson = [];

    PersonFriend.find({$or : [ {"personId": req.params.personid}, {"friendPersonId": req.params.personid}]}, function (err, response) {
      for(var i = 0; i < response.length; i++) {
        if(response[i].personId != req.params.personid)
          nonPerson.push(response[i].personId);
        else
          nonPerson.push(response[i].friendPersonId);

        nonPerson.push(req.params.personid);
      }
    }).then(function () {
      var indexCount = 0;
      Person.find({ "_id": { $nin: nonPerson }, active: true}).sort({firstName: 1}).skip(offsetIndex).limit(ofsetCount - offsetIndex).exec(function (error, personData) {
        if (!error) {
          result.personCount = personData.length;
          result.personArray = personData;

          for(var k = 0; k < personData.length; k++) {
            indexCount = k;
            PersonFriend.find({$or : [ {"personId": personData[k]._id}, {"friendPersonId": personData[k]._id}]}, function (friendError, friendResponse) {
              if(!friendError) {
                if(friendResponse.length != null)
                  result.friendCountArray.push(friendResponse.length);
                else
                  result.friendCountArray.push(0);
              }
            }).then(function () {
              PersonInterest.find({"personId": result.personArray[indexCount]._id}, function (interestError, interestResponse) {
                if(!interestError) {
                  if(interestResponse.length != null)
                    result.interestCountArray.push(interestResponse.length);
                  else
                    result.interestCountArray.push(0);
                }
              }).then(function () {
                var personLanguages = [];
                PersonLanguage.find({"personId": result.personArray[indexCount]._id}, function (languageError, languageResponse) {
                  if(!languageError) {
                    if(languageResponse != null)
                      for(var m = 0; m < languageResponse.length; m++) {
                        personLanguages.push(languageResponse[m]._id);
                      }
                  }
                }).then(function () {
                  Language.find({ "_id": { $in: personLanguages }}, function (languageError2, languageResponse2) {
                    if(!languageError2) {
                      if(languageResponse2 != null)
                        for(var j = 0; j < languageResponse2.length; j++) {
                          var personLanguageObject = {name: languageResponse2[j].name, personId: personData[k]._id};
                          result.personLanguageArray.push(personLanguageObject);
                        }
                    }
                  }).then(function () {
                    return res.json(result);
                  })
                })
              })
            })
          }

          /*Person.count({isActive: true}).exec(function (error, count) {
           console.log('person.count');
           console.log(error);
           console.log(count);
           console.log('!!!!');
           });*/
        } else {
          return res.json(null);

        }
      });
    });
  } else {
    return res.json(null);

  }
};


exports.create = function (req, res) {
  if (req.body.userName == "") {
    return res.status(400).send("Kullanıcı adı boş kalamaz");
  }
  if (req.body.id == "") {
    return res.status(400).send("facebook id boş kalamaz");
  }
  Person.find({id: req.body.id}, function (err, personData) {
    if (personData.length > 1) {
      return res.status(406).send("Bu id kullanılmaktadır");
    } else {
      Person.create(req.body, function (err, person) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(201).json(person);
      });
    }
  })
};



// Updates an existing person in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Person.findById(req.params.id, function (err, person) {
    if (err) { return handleError(res, err); }
    if(!person) { return res.status(404).send('Böyle bir kişi bulunmamaktadır'); }
    var updated = _.merge(person, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(person);
    });
  });
};

// Deletes a person from the DB.
exports.destroy = function(req, res) {
  Person.findById(req.params.id, function (err, person) {
    if(err) { return handleError(res, err); }
    if(!person) { return res.status(404).send('Not Found'); }
    person.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
