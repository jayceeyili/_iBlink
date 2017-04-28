const path = require('path');

const presentation = require('../models/presentation');
const channel = require('../models/channel');
// const configureStore = require('../../common/store/configureStore');
const bookmarkUtil = require('../models/bookmark');
const noteUtil = require('../models/note');

let maxSlide = 0;  // TODO: improve after MVP to support multiple presentations

module.exports = {

  homepage: {
    get(req, res) {
      const channelNumber = req.query.channel;
      const sockets = {
        sentUrl: '',
        presenterIsOn: true,
        audienceIsOn: true
      };
      if (channel.channelIsLive(channelNumber)) {
        sockets.channel = channelNumber;
        sockets.receivedUrlId = 0;
      } else {
        sockets.channel = null;
        sockets.receivedUrlId = null;
      }

      presentation.getAllPresentations('0', (err, presentations) => {
        if (err) {
          console.log('Error getting all presentations', err);
        }
        // console.log('Success getting all presentations!!!! presentations:', presentations);
        // ************* INITIAL STORE ******************
        let preloadedState = {
          // livePresentation,
          // Object with:
          // * channel,
          // * presentationIndex, (in the presentations array below)
          // * currentSlideIndex, (in the slides array below)
          // * maxSlideIndex (in the slides array below)
          selectedPresentationIndex: 0,
          presentations,
          // title,
          // id,  (database ID)
          // slides: [ {original: url, thumbnail: url}, ... ]
          sockets
        };
        // ***********************************************

        // const store = configureStore(preloadedState);
        console.log('*******************************');
        console.log('Sending the following state to the React client:', preloadedState);

        preloadedState = JSON.stringify(preloadedState).replace(/</g, '\\x3c');
      // console.log('preloadedState', preloadedState);
        res.render('master', { preloadedState });
      });
    }
  },

  channel: {
    get(req, res) {
      res.redirect(`/?channel=${req.params.id}`);
    }
  },

  liveChannel: {
    get(req, res) {
      const newChannel = channel.getNewChannel();
      res.json(newChannel);
    }
  },

  presentation: {
    get(req, res) {
      res.json(presentation.getPresentation());
      // TODO later: async access to DB:
      // users.get((err, results) => {
      //   if (err) { /* do something */ }
      //   res.json(results);
      // });
    },
    post(req, res) {
      // const params = [req.body.username];
      // models.users.post(params, (err, results) => {
      //   if (err) { /* do something */ }
      //   res.sendStatus(201);
      // });
    }
  },

  audience_presentation: {
    get(req, res) {
      res.json(maxSlide);
    },
    post(req, res) {
      maxSlide = req.body.maxSlide;
      console.log(maxSlide);
      res.json();
    }
  },

  audience_presentation_add_bookmark: {
    post(req, res) {
      const userId = req.body.userId;
      const slideId = req.body.slideId;

      bookmarkUtil.addBookmark(userId, slideId);
      res.json('slide ', slideId, ' is being bookmarked');
    }
  },

  audience_presentation_remove_bookmark: {
    post(req, res) {
      const userId = req.body.userId;
      const slideId = req.body.slideId;

      bookmarkUtil.removeBookmark(userId, slideId);
      res.json('slide ', slideId, ' is being removed');
    }
  },

  audience_presentation_note: {
    post(req, res) {
      noteUtil.storeNote(req.body);
      res.status(201).send(JSON.stringify('Note Saved Successfully!'));
    },

    put(req, res) {
      noteUtil.updateNote(req.body);
      res.status(200).send(JSON.stringify('Note Updated Successfully!'));
    },

    delete(req, res) {
      noteUtil.deleteNote(req.body);
      res.status(200).send(JSON.stringify('Note Deleted Successfully!'));
    }
  },

  // upload slides into database
  presenter_presentation: {
    post(req, res) {
      console.log('In server controller, getting presentation:', req.body.newPresentation);
      presentation.storePresentation(req.body.newPresentation, (err, result) => {
        // res.writeHead({
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Headers': 'content-type'
        // });
        if (err) {
          console.log('Server controller error:', err);
          res.sendStatus(500);
        } else {
          // res.status(201);
          console.log('In server ctlr, sending updated pres:', result);
          res.status(201).send(JSON.stringify(result));  // return the whole presentation with IDs
        }
      });
    }
  },

  get_user_data: {
    get(req, res) {
      console.log('successfully gotten user data', req.params.userId)
    }
  }
};
