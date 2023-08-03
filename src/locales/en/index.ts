export default {
  translation: {
    authForm: {
      title: 'Auth',
      inputs: {
        email: {
          label: 'Email',
          placeholder: 'Type your email',
        },
        password: {
          label: 'Password',
          placeholder: 'Type your password',
        },
      },
      buttons: {
        showPassword: {
          ariaLabel: 'toggle-password',
        },
        submit: {
          title: 'Sign in',
        },
      },
      messages: {
        unathorized: 'Login or password is invalid',
        defaultError: 'Something goes wrong',
        success: 'Successfully authenticated!',
        failure: 'Authentication was unsuccessful. Try again.',
      },
      errors: {
        minLength: 'Min length is {{minLength}} characters',
        maxLength: 'Max length is {{maxLength}} characters',
        pattern: 'Should be valid {{field}}',
      },
    },
  },
};
