const actionType = {

  // Live presentations actions
  SetChannel: 'SET_CHANNEL',
  DeleteChannel: 'DELETE_CHANNEL',
  setCurrentSlideIndex: 'SET_CURRENT_SLIDE_INDEX',
  setMaxSlide: 'SET_MAX_SLIDE_INDEX',

  // Other presentation actions
  RemovePresentation: 'REMOVE_PRESENTATION',
  SelectPresentationIndex: 'SELECT_PRESENTATION_INDEX',

  // Bookmarks
  ToggleBookmark: 'TOGGLE_BOOKMARK',
  AddBookmark: 'ADD_BOOKMARK',
  RemoveBookmark: 'REMOVE_BOOKMARK',
  ChangeBookmarkButtonColor: 'CHANGE_BOOKMARK_BUTTON_COLOR',

  // Sockets
  CreateRoom: 'CREATE_ROOM',
  SendURL: 'SEND_URL',
  ReceiveURL: 'RECEIVE_URL',
  SendStatus: 'TOGGLE_PRESENT',
  ReceiveStatus: 'RECEIVE_STATUS',

  // Notes
  UpdateText: 'UPDATE_TEXT',
  AddNote: 'ADD_NOTE',

  // Not sure needed! TODO review
  GetSlides: 'GET_SLIDES',
  GetCurrentAudienceSlide: 'GET_CURRENT_AUDIENCE_SLIDE'
};

export default actionType;
