export const uploader = (state: any, action: any) => {
  switch (action.type) {
    case 'PENDING_UPLOAD':
      return false;
    case 'COMPLETED_UPLOAD' || 'ERROR_UPLOAD':
      return true;
    default:
      return state;
  }
};
