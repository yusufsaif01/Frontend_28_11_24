export function uploader(state: boolean = false, action: any) {
  switch (action.type) {
    case 'PENDING_UPLOAD' || 'ERROR_UPLOAD':
      return Object.assign({}, state, {
        data: true
      });
    case 'COMPLETED_UPLOAD':
      return Object.assign({}, state, {
        data: false
      });
    default:
      return state;
  }
}
