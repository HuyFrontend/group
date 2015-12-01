/**
 *  @name L10n
 *  @description Localization
 *  @version 1.0
    var lang = $('html').attr('lang');
    L10[lang].required.usename -> "Please enter your name"
 */
var L10n = {
  // english,
  en: {
    required: {
      username: 'Please enter your name',
      email: 'Please enter email address',
      comment: 'Please enter comments',
      capcha: 'Please enter captcha',
      firstName: 'Please enter your first name',
      lastName: 'Please enter your last name',
      fileUpload: 'Please select your resume',
      code: 'Please enter code'
    },
    invalid: {
      email: 'Please enter valid email address'
    },
    ajax: {
      contact: {
        code: [
          'Please enter your name',
          'Please enter your email',
          'Please enter valid email address',
          'Please enter message',
          'Please enter security code',
          'Your security code you have entered is not valid',
          'Cannot send your information, please try again!',
          'Send email successful !',
          'Thanks for submitting your CV. We will review and contact you if your qualification match an open positions. !',
          'Please enter your firstname',
          'Please enter your lastname',
          'Please upload your resume'
        ]
      }
    },
    text: {
      sending: 'Sending',
      send: 'Send'
    }
  },
  // french
  fr: {
    hello: 'bon jour',
    required: {
      username: 'Please enter your name',
      email: 'Please enter email address',
      comment: 'Please enter comments',
      capcha: 'Please enter captcha',
      firstName: 'Please enter your first name',
      lastName: 'Please enter your last name',
      fileUpload: 'Please select your resume',
      code: 'Please enter code'
    },
    invalid: {
      email: 'Please enter valid email address'
    },
    ajax: {
      contact: {
        code: [
          'Please enter your name',
          'Please enter your email',
          'Please enter valid email address',
          'Please enter message',
          'Please enter security code',
          'Your security code you have entered is not valid',
          'Cannot send your information, please try again!',
          'Send email successful !',
          'Thanks for submitting your CV. We will review and contact you if your qualification match an open positions. !',
          'Please enter your firstname',
          'Please enter your lastname',
          'Please upload your resume'
        ]
      }
    },
    text: {
      sending: 'Sending',
      send: 'Send'
    }
  },
  // japan
  jp: {
    hello: 'hello',
    required: {
      username: 'Please enter your name',
      email: 'Please enter email address',
      comment: 'Please enter comments',
      capcha: 'Please enter captcha',
      firstName: 'Please enter your first name',
      lastName: 'Please enter your last name',
      fileUpload: 'Please select your resume',
      code: 'Please enter code'
    },
    invalid: {
       email: 'Please enter valid email address'
    },
    ajax: {
      contact: {
        code: [
          'Please enter your name',
          'Please enter your email',
          'Please enter valid email address',
          'Please enter message',
          'Please enter security code',
          'Your security code you have entered is not valid',
          'Cannot send your information, please try again!',
          'Send email successful !',
          'Thanks for submitting your CV. We will review and contact you if your qualification match an open positions. !',
          'Please enter your firstname',
          'Please enter your lastname',
          'Please upload your resume'
        ]
      }
    },
    text: {
      sending: 'Sending',
      send: 'Send'
    }
  }
};

