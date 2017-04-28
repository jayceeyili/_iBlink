const actionType = {

  // Other presentation actions
  UploadPresentation: 'UPLOAD_PRESENTATION',
  AddPresentation: 'ADD_PRESENTATION',
  RemovePresentation: 'REMOVE_PRESENTATION',
  SelectPresentationIndex: 'SELECT_PRESENTATION_INDEX',
  ReceivePresentation: 'RECEIVE_PRESENTATION',

  // Matrix
  ReceiveMatrixData: 'RECEIVE_MATRIX_DATA',

  // Bookmarks
  ToggleBookmark: 'TOGGLE_BOOKMARK',
  AddBookmark: 'ADD_BOOKMARK',
  RemoveBookmark: 'REMOVE_BOOKMARK',
  ChangeBookmarkButtonColor: 'CHANGE_BOOKMARK_BUTTON_COLOR',

  // Slides
  UpdateSlideState: 'UPDATE_SLIDE_STATE',
  UpdateText: 'UPDATE_TEXT',
  AddNote: 'ADD_NOTE',
  UpdateNote: 'UPDATE_NOTE',
  DeleteNote: 'DELETE_NOTE',

  // Sockets
  CreateRoom: 'CREATE_ROOM',
  SendURL: 'SEND_URL',
  ReceiveURL: 'RECEIVE_URL',
  SendStatus: 'TOGGLE_PRESENT',
  ReceiveStatus: 'RECEIVE_STATUS',

  // Not sure needed! TODO review
  GetSlides: 'GET_SLIDES',
  GetCurrentAudienceSlide: 'GET_CURRENT_AUDIENCE_SLIDE',

  //Login/authentication
  GetUserID: 'GET_UID'
};

export default actionType;
