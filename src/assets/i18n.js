export const messages = {
  en: {
    error: {
      failedToAuthorized: 'Authorization failed - {error} <br/>Contact <a href="mailto:{email}?subject=Change I2E and Data Mart Password">Technical Support</a> for assistance.',
      failedToSubmit: 'Submission failed - {error} <br/>Contact <a href="mailto:{email}?subject=Change I2E and Data Mart Password">Technical Support</a> for assistance.',
      failedToReload: 'Server communication failed - {error} <br/>Contact <a href="mailto:{email}?subject=Change I2E and Data Mart Password">Technical Support</a> for assistance.'
    },
    success: 'Your I2E and Data Mart password has been changed successfully.',
    url: {
      userInfo: '{host}/changepassword/user.json',
      reload: '{host}/changepassword/reload.json',
      allCancerActivities: '{host}/changepassword/cancerActivities.json',
      allMechanisms: '{host}/changepassword/mechanisms.json',
      changePassword: '{host}/changepassword/changePassword.json',
      searchUser: '{host}/changepassword/searchUser',
      searchGrants: '{host}/changepassword/searchGrants.json'
    }
  }
}
