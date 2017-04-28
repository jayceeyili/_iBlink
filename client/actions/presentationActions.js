// Presentations actions that are not related to a live presentation

import ActionType from './actionType';

export const removePresentationIndex = selectedPresentationIndex => ({
  type: ActionType.RemovePresentation,
  selectedPresentationIndex
});

export function uploadPresentation(newPresentation) {
  return dispatch => {
    fetch('/presenter_presentation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newPresentation
      })
    })
    .then(res => res.json())
    .then((json) => {
      dispatch(receivePresentation(json))
    })
    .catch((error) => {
      console.error('@@@@@ Error in uploadPresentation:', error);
    });
  }
}

export function receivePresentation(presentation) {
  return {
    type: ActionType.ReceivePresentation,
    presentation
  }
}
