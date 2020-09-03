export function uploader(state: boolean = false, action: any) {
  switch (action.type) {
    case 'PENDING_UPLOAD':
      return Object.assign({}, state, {
        data: false
      });
    case 'COMPLETED_UPLOAD' || 'ERROR_UPLOAD':
      return Object.assign({}, state, {
        data: true
      });
    default:
      return state;
  }
}
