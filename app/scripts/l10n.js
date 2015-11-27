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
    hello: 'hello',
    required: {
      username: 'Please enter your name',
      email: 'Please enter email address',
      comment: 'Please enter comments',
      capcha: 'Please enter captcha'
    },
    invalid: {
      email: 'Please enter valid email address'
    },
    ajax: {
      contact: {
        code: ['Please enter your name', 'Please enter your email', 'Please enter valid email address', 'Please enter message', 'Please enter security code', 'Your security code you have entered is not valid', 'Cannot send your information, please try again!', 'Send email successful !' ]
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
      username: 'Fr Please enter your name',
      email: 'Fr Please enter email address',
      comment: 'Please enter comments',
      capcha: 'Please enter captcha'
    },
    invalid: {
      email: 'Please enter valid email address'
    },
    ajax: {
      contact: {
        code: ['Please enter your name', 'Please enter your email', 'Please enter valid email address', 'Please enter message', 'Please enter security code', 'Your security code you have entered is not valid', 'Cannot send your information, please try again!', 'Send email successful !' ]
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
      capcha: 'Please enter captcha'
    },
    invalid: {
       email: 'Please enter valid email address'
    },
    ajax: {
      contact: {
        code: ['Please enter your name', 'Please enter your email', 'Please enter valid email address', 'Please enter message', 'Please enter security code', 'Your security code you have entered is not valid', 'Cannot send your information, please try again!', 'Send email successful !' ]
      }
    },
    text: {
      sending: 'Sending',
      send: 'Send'
    }
  }
};

